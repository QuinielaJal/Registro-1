// Puente hacia el simulador (repo simulador-src, Worker "simulador-src").
// quinielajal.com está ligado a este proyecto de Pages, así que las rutas del simulador
// llegan aquí y se reenvían al Worker:
//   quinielajal.com/SimuladorQJ/...    → simulador Fin
//   quinielajal.com/SimuladorQJMS/...  → simulador Media
// _routes.json limita esta función a esas rutas; el resto del sitio no pasa por aquí.

const SIMULADOR = 'https://simulador-src.jair-marquez-rubio.workers.dev';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/SimuladorQJ')) return next(); // por si acaso: el resto, normal

  const respuesta = await fetch(new Request(SIMULADOR + url.pathname + url.search, request), {
    redirect: 'manual',
  });

  // Las redirecciones del Worker (ej. /SimuladorQJ → /SimuladorQJ/) deben quedarse en quinielajal.com.
  const location = respuesta.headers.get('Location');
  if (location?.startsWith(SIMULADOR)) {
    const headers = new Headers(respuesta.headers);
    headers.set('Location', url.origin + location.slice(SIMULADOR.length));
    return new Response(respuesta.body, { status: respuesta.status, headers });
  }
  return respuesta;
}
