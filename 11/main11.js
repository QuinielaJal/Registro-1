var r=P;(function(A,j){var v=P,f=A();while(!![]){try{var o=parseInt(v(0xf2))/0x1+parseInt(v(0xf5))/0x2*(-parseInt(v(0xce))/0x3)+parseInt(v(0x11c))/0x4+-parseInt(v(0x11e))/0x5*(-parseInt(v(0xc9))/0x6)+parseInt(v(0xc1))/0x7+parseInt(v(0x102))/0x8*(-parseInt(v(0x118))/0x9)+parseInt(v(0xb5))/0xa*(-parseInt(v(0xbd))/0xb);if(o===j)break;else f['push'](f['shift']());}catch(x){f['push'](f['shift']());}}}(t,0xb383e));var b=(function(){var A=!![];return function(j,f){var o=A?function(){var n=P;if(f){var x=f[n(0xf9)](j,arguments);return f=null,x;}}:function(){};return A=![],o;};}()),d=b(this,function(){var q=P;return d[q(0xf1)]()[q(0xd9)]('(((.+)+)+)+$')[q(0xf1)]()[q(0xfa)](d)[q(0xd9)]('(((.+)+)+)+$');});d();var Q=(function(){var A=!![];return function(j,f){var o=A?function(){if(f){var x=f['apply'](j,arguments);return f=null,x;}}:function(){};return A=![],o;};}()),Z=Q(this,function(){var B=P,A=function(){var l=P,p;try{p=Function(l(0xfe)+l(0x112)+');')();}catch(y){p=window;}return p;},j=A(),f=j['console']=j[B(0x104)]||{},o=[B(0xc2),B(0xc7),'info',B(0xbb),B(0xfb),'table',B(0xdd)];for(var x=0x0;x<o[B(0x123)];x++){var V=Q[B(0xfa)][B(0xcf)][B(0x11f)](Q),W=o[x],e=f[W]||V;V[B(0xca)]=Q[B(0x11f)](Q),V[B(0xf1)]=e[B(0xf1)][B(0x11f)](e),f[W]=V;}});Z();var quantStorage=r(0xd2),resultStorage=r(0xe2),aliasStorage=r(0x10a),price=0x19,nPartidos=0xb,quantity=localStorage[r(0xdc)](quantStorage),name=localStorage[r(0xdc)](aliasStorage),combinations=![],aux,id=0x0,touchIcon=!![],res=Array(nPartidos)[r(0x109)]('_');function start(){var O=r;recovername();if(localStorage[O(0xdc)](O(0x128))){}for(var A=0x0;A<suspIndex['length'];A++){if(suspIndex[A]<=res['length'])res[suspIndex[A]]='X';}var f=document[O(0xdf)](O(0xd7)),o=document[O(0xdf)]('text');o[O(0xd3)]=res['join']('\u00a0\u00a0');if(quantity)document[O(0xe9)](O(0xd5))[O(0xb7)]=quantity;var x=localStorage[O(0xdc)](resultStorage);if(x){x=x[O(0xdb)]('*');for(var V=0x0;V<quantity;V++){if(x[V]&&x[V]!=undefined){var W=f['insertRow'](V);if(x[V][O(0xdb)]('\u00a0\u00a0')[0x0][0x0]!='L'&&x[V][O(0xdb)]('\u00a0\u00a0')[0x0][0x0]!='E'&&x[V][O(0xdb)]('\u00a0\u00a0')[0x0][0x0]!='V')x[V]=x[V][O(0xc6)](0x1);for(var e=0x0;e<nPartidos;e++){cell1=W[O(0x114)](e);if(suspIndex[O(0xc4)](e))cell1[O(0xd3)]+='X';else cell1[O(0xd3)]+=x[V]['split']('\u00a0\u00a0')[e];cell1['style'][O(0xcb)]=O(0x122);if(x[V][O(0xdb)]('\u00a0\u00a0')[e][O(0x123)]==0x2)cell1[O(0x107)][O(0xb8)]=O(0x101);if(x[V][O(0xdb)]('\u00a0\u00a0')[e][O(0x123)]==0x3)cell1[O(0x107)][O(0xb8)]=O(0xec);}var p=W['insertCell'](nPartidos);p[O(0xd3)]+=x[V][O(0xdb)]('\u00a0\u00a0')[nPartidos],p[O(0x107)][O(0xb8)]=O(0x101),p[O(0x107)][O(0xcc)]=O(0xeb),p[O(0x107)][O(0xfd)]='hidden',p[O(0x107)][O(0x125)]=O(0xb9),p[O(0x116)]=O(0x10f),p[O(0xd6)](0x50,0x0);if(x[V][O(0xdb)]('\u00a0\u00a0')[nPartidos][O(0x123)]>0xf)p['style']['fontSize']='xx-small';else{if(x[V][O(0xdb)]('\u00a0\u00a0')[nPartidos][O(0x123)]>0xb)p['style'][O(0xb8)]=O(0xec);}var y=W['insertCell'](nPartidos+0x1);y[O(0xd3)]+=O(0xc0),y['style'][O(0xcb)]='6.3%',y['id']='x'+V,y['className']=O(0xbc),y['addEventListener'](O(0xde),function(){var R=O;remove(this),this[R(0xf3)](this[R(0x115)](!![]));});}else break;}id=V,document[O(0xdf)](O(0xda))[O(0x107)]['filter']=O(0xb9),document[O(0xdf)](O(0xe5))[O(0xd3)]=O(0x12b)+quantity*price+'\x0a';}else document['getElementById'](O(0xda))[O(0x107)][O(0xff)]=O(0xc3);}function updatelista(A){var F=r,f=document[F(0xdf)](F(0xd7)),o=f[F(0xe6)]('tr')[F(0x123)];if(A==0x1){if(aux==undefined)aux=0x0;var x=f[F(0xed)](o);for(var V=0x0;V<nPartidos;V++){cell1=x[F(0x114)](V),cell1['innerHTML']+=res[V],cell1['style']['width']='7%';if(res[V]['length']==0x2)cell1['style'][F(0xb8)]=F(0x101);if(res[V][F(0x123)]==0x3)cell1[F(0x107)][F(0xb8)]=F(0xec);}if(aux>0x1){var W=x[F(0x114)](nPartidos);W['innerHTML']+=name+'\x20('+aux+')';}else{var W=x[F(0x114)](nPartidos);W[F(0xd3)]+=name;}W[F(0x107)][F(0xb8)]=F(0x101),W[F(0x107)][F(0xcc)]=F(0xeb),W['style'][F(0xfd)]=F(0xeb),W[F(0x116)]=F(0x10f),W['scrollTo'](0x50,0x0);if(name['length']>0xf)W[F(0x107)]['fontSize']=F(0x113);else{if(name[F(0x123)]>nPartidos)W[F(0x107)][F(0xb8)]='x-small';}var e=x[F(0x114)](nPartidos+0x1);e[F(0xd3)]+=F(0xc0),e['style']['width']=F(0x122),e['id']='x'+id,e['className']='deleter',e[F(0xf7)](F(0xde),function(){var c=F;remove(this),this[c(0xf3)](this['cloneNode'](!![]));}),id++,aux=0x1;}else{if(A==0x2){id=0x0,deleters=f[F(0xee)](F(0xbc));for(var p=0x0;p<o;p++){deleters[p]['id']='x'+id,id++;}}}document['getElementById'](F(0xe5))[F(0xd3)]=F(0x12b)+quantity*price;}function selection(A){var X=r,j=parseInt(A['id']['slice'](0x1))-0x1;if(suspIndex['includes'](j))return;var f=document[X(0xdf)](X(0xf4));if(A[X(0x116)]!=X(0x10c))!combinations?(validation(A),res[j]=A['id'][X(0xc6)](0x0,0x1)):(res[j]+=A['id'][X(0xc6)](0x0,0x1),res[j]=res[j]['split']('_')[X(0xef)]('')),A['className']=X(0x10c);else{if(combinations){A[X(0x116)]=X(0xf8),console[X(0xc2)](res[j][X(0x123)]);if(res[j]!='_'&&res[j][X(0x123)]>0x1)res[j]=res[j][X(0xdb)](A['id'][X(0xc6)](0x0,0x1))[X(0xef)]('');else res[j]='_';}}costoactual(),f['innerHTML']=res[X(0xef)]('\u00a0\u00a0');res['join']('\u00a0\u00a0')[X(0x123)]>0x23?f[X(0x116)]=X(0xba):f[X(0x116)]=X(0x111);touchIcon&&(touchIcon=![],document[X(0xdf)](X(0xd8))[X(0x107)]['display']=X(0xb9));if((!quantity||quantity==0x0)&&!res[X(0xc4)]('_'))document['getElementById'](X(0xd4))['style'][X(0x120)]=X(0xcd);else document[X(0xdf)]('touchIconDiv2')['style'][X(0x120)]=X(0xb9);}function validation(A){var u=r,j=parseInt(A['id'][u(0xc6)](0x1));document[u(0xdf)]('L'+j)['className']=u(0xf8),document['getElementById']('E'+j)[u(0x116)]=u(0xf8),document[u(0xdf)]('V'+j)[u(0x116)]=u(0xf8);}function t(){var L=['alias','\x20Quiniela(s)','opcion-active','null','floor','cellname','costo','text-lg','{}.constructor(\x22return\x20this\x22)(\x20)','xx-small','insertCell','cloneNode','className','replace','6494013NFwmEK','span','location','boton\x20allowcomb-active','419332HRNzTe','focus','3207610gngBst','bind','display','5213310274172','6.3%','length','La\x20lista\x20está\x20vacía\x0d\x0aPresiona\x20[AGREGAR]\x20para\x20añadir\x20una\x20quiniela','border','ceil','substring','tutorial','results','splice','Total:\x20$','481430JRXvdX','deleteRow','textContent','fontSize','none','text-sm','error','deleter','77cBLNVo','href','Envía\x20tus\x20quinielas\x20guardadas\x20antes\x20de\x20agregar\x20más','<ion-icon\x20name=\x22close-circle\x22\x20class=\x22deleteIcon\x22></ion-icon>','6621167MfhOdv','log','grayscale(0)','includes','0\x20Quiniela(s)','slice','warn','La\x20participación\x20mínima\x20es\x20de\x202\x20Quinielas.','12PasLVo','__proto__','width','overflow','block','4191pAitbh','prototype','nombre','5213317816346','quantity11','innerHTML','touchIconDiv2','#botonenviar\x20span','scrollTo','lista','touchIconDiv','search','botonenviar','split','getItem','trace','click','getElementById','https://wa.me/','boton\x20allowcomb','results11','numquinielas','querySelectorAll','total','getElementsByTagName','value','Costo:\x20$0','querySelector','imgwsp','hidden','x-small','insertRow','getElementsByClassName','join','%0D','toString','514829pvHFRd','replaceWith','text','1510HKEOQH','Debes\x20llenar\x20todos\x20los\x20partidos','addEventListener','opcion','apply','constructor','exception','setItem','overflowY','return\x20(function()\x20','filter','random','small','8ZZGtAx','partido','console','Se\x20borrará\x20todo','Debes\x20elegir\x20un\x20nombre','style','Costo:\x20$','fill'];t=function(){return L;};return t();}function number(){var S=r;quantity=localStorage[S(0xdc)](quantStorage);if(quantity)localStorage[S(0xfc)](quantStorage,++quantity);else localStorage[S(0xfc)](quantStorage,0x1),quantity=localStorage[S(0xdc)](quantStorage);document['querySelector'](S(0xd5))['textContent']=quantity,localStorage[S(0xfc)](aliasStorage,name);if(quantity==''||!quantity||quantity==0x0||quantity=='0')document[S(0xdf)](S(0xea))[S(0x107)][S(0xff)]='grayscale(0)';else document[S(0xdf)]('botonenviar')[S(0x107)][S(0xff)]=S(0xb9);}function result(){var U=r;results=localStorage['getItem'](resultStorage),name=document[U(0xdf)]('nombre')['value'],name=name['split']('*')['join']('');if(results){if(aux>0x1)localStorage[U(0xfc)](resultStorage,results+'\x0a'+res[U(0xef)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'\x20('+aux+')'+'*');else localStorage[U(0xfc)](resultStorage,results+'\x0a'+res[U(0xef)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'*');}else{if(aux>0x1)localStorage['setItem'](resultStorage,res[U(0xef)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'\x20('+aux+')'+'*');else localStorage[U(0xfc)](resultStorage,res[U(0xef)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'*');}}function save(){var M=r;if(id<0x96){document['getElementById']('touchIconDiv2')['style']['display']='none',localStorage[M(0xfc)](M(0x128),!![]),name=document[M(0xdf)](M(0xd0))['value'];if(res[M(0xef)]('\u00a0\u00a0')[M(0xc4)]('_'))alert(M(0xf6));else{if(!name)return alert(M(0x106)),document[M(0xdf)](M(0xd0))[M(0x11d)](),0x0;else{if(combinations)calculate();else number();result(),updatelista(0x1),clean();}}}else alert(M(0xbf));}function clean(){var K=r;document[K(0xdf)]('touchIconDiv2')[K(0x107)]['display']=K(0xb9),res=Array(nPartidos)[K(0x109)]('_');for(var A=0x0;A<suspIndex[K(0x123)];A++){if(suspIndex[A]<=res[K(0x123)])res[suspIndex[A]]='X';}var j=document['getElementById'](K(0xf4));j[K(0xd3)]=res[K(0xef)]('\u00a0\u00a0'),spans=document[K(0xe4)]('.quiniela\x20span');for(var f=0x0;f<nPartidos*0x3;f++)spans[f][K(0x116)]=K(0xf8);document[K(0xdf)](K(0x110))[K(0xd3)]=K(0xe8),document['getElementById'](K(0xe3))[K(0xd3)]=K(0xc5),j[K(0x116)]=K(0x111);}function recovername(){var J=r;name=localStorage['getItem'](aliasStorage);if(name!=null&&name!=J(0x10d))document[J(0xdf)]('nombre')[J(0xe7)]=name;}function clearname(){var w=r;document[w(0xdf)](w(0xd0))['value']='';}function allowcombination(){var Y=r;!combinations?(combinations=!![],document[Y(0xdf)]('checkcombinaciones')[Y(0x116)]=Y(0x11b)):(combinations=![],document[Y(0xdf)]('checkcombinaciones')[Y(0x116)]=Y(0xe1),clean());}function calculate(){var h=r;aux=0x1;for(var A=0x0;A<nPartidos;A++){aux*=res[A][h(0x123)];}quantity=localStorage[h(0xdc)](quantStorage);quantity?(localStorage[h(0xfc)](quantStorage,parseInt(quantity)+aux),quantity=localStorage[h(0xdc)](quantStorage)):(localStorage[h(0xfc)](quantStorage,aux),quantity=localStorage[h(0xdc)](quantStorage));document['querySelector'](h(0xd5))[h(0xb7)]=quantity;if(quantity==''||!quantity||quantity==0x0||quantity=='0')document[h(0xdf)](h(0xea))['style'][h(0xff)]='grayscale(0)';else document[h(0xdf)](h(0xda))[h(0x107)][h(0xff)]='none';localStorage[h(0xfc)](aliasStorage,name);}function random(){var H=r;clean();touchIcon&&(touchIcon=![],document[H(0xdf)](H(0xd8))['style'][H(0x120)]='none');if(!quantity||quantity==0x0)document[H(0xdf)](H(0xd4))['style'][H(0x120)]=H(0xcd);var A=document[H(0xdf)](H(0xf4)),j=document[H(0xee)](H(0x103));for(var f=0x0;f<nPartidos;f++){if(suspIndex[H(0xc4)](f))continue;var o=getRandomInt(0x0,0x2);j[f][H(0xe6)](H(0x119))[o]['className']=H(0x10c),res[f]=['L','E','V'][o];}A['innerHTML']=res[H(0xef)]('\u00a0\u00a0'),costoactual();}function getRandomInt(A,j){var g=r;return A=Math[g(0x126)](A),j=Math[g(0x10e)](j),Math['floor'](Math[g(0x100)]()*(j-A+0x1))+A;}function costoactual(){var I=r;if(!![]){var A=0x1;for(var j=0x0;j<nPartidos;j++){A*=res[j][I(0x123)];}document[I(0xdf)](I(0x110))[I(0xd3)]=I(0x108)+A*price,document[I(0xdf)](I(0xe3))[I(0xd3)]=A+I(0x10b);}}function remove(A){var C=r;lista=document[C(0xdf)](C(0xd7)),eindex=A['id']['slice'](0x1),tr=lista['getElementsByTagName']('tr')[eindex],lista[C(0xb6)](eindex),results=localStorage[C(0xdc)](resultStorage),results=results['split']('*'),removing=results[eindex][C(0xdb)]('\u00a0\u00a0');if(removing[0x0][0x0]!='L'&&removing[0x0][0x0]!='E'&&removing[0x0][0x0]!='V')removing[0x0]=removing[0x0]['slice'](0x1);var j=0x1;for(var f=0x0;f<nPartidos;f++)j*=removing[f][C(0x123)];quantity-=j,localStorage['setItem'](quantStorage,quantity),results[C(0x12a)](eindex,0x1),results=results[C(0xef)]('*'),localStorage[C(0xfc)](resultStorage,results),document[C(0xe9)](C(0xd5))['textContent']=quantity,document[C(0xdf)](C(0xe5))[C(0xd3)]='Total:\x20$'+quantity*price+'\x0a';!quantity&&(document['getElementById'](C(0xda))['style'][C(0xff)]=C(0xc3));if((!quantity||quantity==0x0)&&!res[C(0xc4)]('_'))document['getElementById'](C(0xd4))[C(0x107)][C(0x120)]=C(0xcd);else document[C(0xdf)]('touchIconDiv2')['style'][C(0x120)]=C(0xb9);updatelista(0x2);}function removeLastLine(){var k=r;return resultsx['lastIndexOf']('\x0a')>0x0?resultsx[k(0x127)](0x0,resultsx['lastIndexOf']('\x0a')):resultsx;}function deleteall(){var D=r;confirm(D(0x105))&&(localStorage['setItem']('quantity',''),localStorage['setItem'](D(0x129),''),localStorage[D(0xfc)](D(0x128),''),localStorage[D(0xfc)](quantStorage,''),localStorage[D(0xfc)](resultStorage,''),location['reload']());}function P(Z,Q){var d=t();return P=function(b,A){b=b-0xb5;var j=d[b];return j;},P(Z,Q);}function send(){var T=r;if(!quantity||quantity<0x1){alert(T(0x124)),document[T(0xdf)](T(0xd4))[T(0x107)]['display']='block';return;}if(quantity<0x2&&[T(0xd1),'5213314457066','5213310893705',T(0x121)][T(0xc4)](tel)){alert(T(0xc8));return;}if(quantity>0x0){var A=res[T(0xef)]('%20%20');A=encodeURI(localStorage[T(0xdc)](resultStorage)),A=A[T(0xdb)]('*')[T(0xef)](T(0xf0))[T(0x117)](/#/g,''),window[T(0x11a)][T(0xbe)]=T(0xe0)+tel+'?text='+A;}}window['addEventListener']('load',start,![]);