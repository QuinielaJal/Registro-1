var u=Q;(function(J,L){var t=Q,P=J();while(!![]){try{var S=-parseInt(t(0x21b))/0x1+parseInt(t(0x1e1))/0x2*(parseInt(t(0x200))/0x3)+parseInt(t(0x1bd))/0x4*(-parseInt(t(0x1cd))/0x5)+parseInt(t(0x1b4))/0x6+parseInt(t(0x204))/0x7+parseInt(t(0x20a))/0x8+-parseInt(t(0x201))/0x9;if(S===L)break;else P['push'](P['shift']());}catch(j){P['push'](P['shift']());}}}(M,0xdec07));var h=(function(){var J=!![];return function(L,P){var S=J?function(){if(P){var j=P['apply'](L,arguments);return P=null,j;}}:function(){};return J=![],S;};}()),C=h(this,function(){var v=Q;return C['toString']()[v(0x1df)](v(0x1be))['toString']()[v(0x1e9)](C)[v(0x1df)](v(0x1be));});C();var I=(function(){var J=!![];return function(L,P){var S=J?function(){if(P){var j=P['apply'](L,arguments);return P=null,j;}}:function(){};return J=![],S;};}()),R=I(this,function(){var A=Q,J=function(){var G=Q,l;try{l=Function(G(0x1e2)+G(0x1c1)+');')();}catch(B){l=window;}return l;},L=J(),P=L[A(0x1f9)]=L['console']||{},S=[A(0x1cb),A(0x1b6),A(0x20f),A(0x1cf),'exception','table','trace'];for(var j=0x0;j<S[A(0x1ec)];j++){var z=I[A(0x1e9)]['prototype']['bind'](I),c=S[j],s=P[c]||z;z[A(0x1d4)]=I[A(0x207)](I),z[A(0x1e5)]=s['toString'][A(0x207)](s),P[c]=z;}});R();var quantStorage=u(0x215),resultStorage=u(0x1c2),aliasStorage='aliasM',pricem=0x14,nPartidos=0xa,quantity=localStorage[u(0x21c)](quantStorage),name=localStorage['getItem'](aliasStorage),combinations=![],aux,id=0x0,touchIcon=!![],res=Array(nPartidos)[u(0x1e8)]('_');function start(){var E=u;recovername();if(localStorage[E(0x21c)]('tutorial')){}for(var J=0x0;J<suspIndex[E(0x1ec)];J++){if(suspIndex[J]<=res[E(0x1ec)])res[suspIndex[J]]='X';}var L=document[E(0x1fb)]('lista'),P=document[E(0x1fb)](E(0x1d0));P[E(0x1c7)]=res['join']('\u00a0\u00a0');if(quantity)document[E(0x1b8)]('#botonenviar\x20span')[E(0x1ef)]=quantity;var S=localStorage[E(0x21c)](resultStorage);if(S){S=S[E(0x1b3)]('*');for(var z=0x0;z<quantity;z++){if(S[z]&&S[z]!=undefined){var c=L[E(0x1c3)](z);if(S[z][E(0x1b3)]('\u00a0\u00a0')[0x0][0x0]!='L'&&S[z]['split']('\u00a0\u00a0')[0x0][0x0]!='E'&&S[z][E(0x1b3)]('\u00a0\u00a0')[0x0][0x0]!='V')S[z]=S[z][E(0x1ee)](0x1);for(var s=0x0;s<nPartidos;s++){cell1=c[E(0x1bb)](s);if(suspIndex[E(0x1c8)](s))cell1[E(0x1c7)]+='X';else cell1[E(0x1c7)]+=S[z]['split']('\u00a0\u00a0')[s];cell1['style'][E(0x1d2)]='6.3%';if(S[z][E(0x1b3)]('\u00a0\u00a0')[s][E(0x1ec)]==0x2)cell1[E(0x1fa)][E(0x1c0)]=E(0x1eb);if(S[z]['split']('\u00a0\u00a0')[s][E(0x1ec)]==0x3)cell1[E(0x1fa)][E(0x1c0)]=E(0x212);}var l=c[E(0x1bb)](nPartidos);l[E(0x1c7)]+=S[z][E(0x1b3)]('\u00a0\u00a0')[nPartidos],l[E(0x1fa)]['fontSize']=E(0x1eb),l[E(0x1fa)][E(0x1b5)]='hidden',l['style'][E(0x213)]=E(0x1da),l[E(0x1fa)]['border']=E(0x1bc),l[E(0x211)]='cellname',l['scrollTo'](0x50,0x0);if(S[z][E(0x1b3)]('\u00a0\u00a0')[nPartidos][E(0x1ec)]>0xf)l['style']['fontSize']=E(0x20e);else{if(S[z][E(0x1b3)]('\u00a0\u00a0')[nPartidos][E(0x1ec)]>0xb)l[E(0x1fa)][E(0x1c0)]=E(0x212);}var B=c[E(0x1bb)](nPartidos+0x1);B['innerHTML']+='<ion-icon\x20name=\x22close-circle\x22\x20class=\x22deleteIcon\x22></ion-icon>',B[E(0x1fa)][E(0x1d2)]=E(0x1d1),B['id']='x'+z,B['className']=E(0x206),B[E(0x1d3)](E(0x209),function(){var p=E;remove(this),this[p(0x1af)](this[p(0x20d)](!![]));});}else break;}id=z,document[E(0x1fb)](E(0x1fc))[E(0x1fa)][E(0x1f7)]=E(0x1bc),document[E(0x1fb)]('total')[E(0x1c7)]='Total:\x20$'+quantity*pricem+'\x0a';}else document[E(0x1fb)](E(0x1fc))[E(0x1fa)]['filter']=E(0x1ed);}function updatelista(J){var r=u,L=document[r(0x1fb)](r(0x1de)),P=L[r(0x1b0)]('tr')[r(0x1ec)];if(J==0x1){if(aux==undefined)aux=0x0;var S=L[r(0x1c3)](P);for(var z=0x0;z<nPartidos;z++){cell1=S[r(0x1bb)](z),cell1[r(0x1c7)]+=res[z],cell1[r(0x1fa)][r(0x1d2)]='7%';if(res[z][r(0x1ec)]==0x2)cell1['style'][r(0x1c0)]=r(0x1eb);if(res[z]['length']==0x3)cell1[r(0x1fa)][r(0x1c0)]=r(0x212);}if(aux>0x1){var c=S['insertCell'](nPartidos);c[r(0x1c7)]+=name+'\x20('+aux+')';}else{var c=S['insertCell'](nPartidos);c[r(0x1c7)]+=name;}c['style'][r(0x1c0)]=r(0x1eb),c[r(0x1fa)]['overflow']='hidden',c[r(0x1fa)][r(0x213)]=r(0x1da),c[r(0x211)]='cellname',c[r(0x1b1)](0x50,0x0);if(name[r(0x1ec)]>0xf)c[r(0x1fa)][r(0x1c0)]=r(0x20e);else{if(name['length']>nPartidos)c['style']['fontSize']=r(0x212);}var s=S[r(0x1bb)](nPartidos+0x1);s[r(0x1c7)]+=r(0x1e4),s[r(0x1fa)][r(0x1d2)]='6.3%',s['id']='x'+id,s['className']=r(0x206),s[r(0x1d3)](r(0x209),function(){remove(this),this['replaceWith'](this['cloneNode'](!![]));}),id++,aux=0x1;}else{if(J==0x2){id=0x0,deleters=L[r(0x210)]('deleter');for(var l=0x0;l<P;l++){deleters[l]['id']='x'+id,id++;}}}document[r(0x1fb)](r(0x1ce))[r(0x1c7)]='Total:\x20$'+quantity*pricem;}function selection(J){var y=u,L=parseInt(J['id'][y(0x1ee)](0x1))-0x1;if(suspIndex['includes'](L))return;var P=document[y(0x1fb)](y(0x1d0));if(J[y(0x211)]!='opcion-active')!combinations?(validation(J),res[L]=J['id'][y(0x1ee)](0x0,0x1)):(res[L]+=J['id']['slice'](0x0,0x1),res[L]=res[L][y(0x1b3)]('_')[y(0x21a)]('')),J[y(0x211)]=y(0x20c);else{if(combinations){J[y(0x211)]='opcion',console[y(0x1cb)](res[L]['length']);if(res[L]!='_'&&res[L]['length']>0x1)res[L]=res[L][y(0x1b3)](J['id']['slice'](0x0,0x1))[y(0x21a)]('');else res[L]='_';}}costoactual(),P[y(0x1c7)]=res['join']('\u00a0\u00a0');res['join']('\u00a0\u00a0')[y(0x1ec)]>0x23?P['className']=y(0x1ba):P[y(0x211)]=y(0x1d9);touchIcon&&(touchIcon=![],document[y(0x1fb)](y(0x1f3))['style'][y(0x1d7)]=y(0x1bc));if((!quantity||quantity==0x0)&&!res[y(0x1c8)]('_'))document[y(0x1fb)](y(0x1f5))[y(0x1fa)][y(0x1d7)]=y(0x1db);else document[y(0x1fb)]('touchIconDiv2')['style'][y(0x1d7)]='none';}function validation(J){var i=u,L=parseInt(J['id']['slice'](0x1));document['getElementById']('L'+L)['className']='opcion',document[i(0x1fb)]('E'+L)['className']=i(0x1ae),document[i(0x1fb)]('V'+L)[i(0x211)]=i(0x1ae);}function number(){var F=u;quantity=localStorage['getItem'](quantStorage);if(quantity)localStorage[F(0x1fe)](quantStorage,++quantity);else localStorage[F(0x1fe)](quantStorage,0x1),quantity=localStorage[F(0x21c)](quantStorage);document['querySelector']('#botonenviar\x20span')[F(0x1ef)]=quantity,localStorage[F(0x1fe)](aliasStorage,name);if(quantity==''||!quantity||quantity==0x0||quantity=='0')document[F(0x1fb)]('imgwsp')['style'][F(0x1f7)]=F(0x1ed);else document['getElementById'](F(0x1fc))['style']['filter']=F(0x1bc);}function result(){var X=u;results=localStorage['getItem'](resultStorage),name=document['getElementById'](X(0x1ca))[X(0x1f2)],name=name[X(0x1b3)]('*')[X(0x21a)]('');if(results){if(aux>0x1)localStorage[X(0x1fe)](resultStorage,results+'\x0a'+res['join']('\u00a0\u00a0')+'\u00a0\u00a0'+name+'\x20('+aux+')'+'*');else localStorage[X(0x1fe)](resultStorage,results+'\x0a'+res[X(0x21a)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'*');}else{if(aux>0x1)localStorage[X(0x1fe)](resultStorage,res[X(0x21a)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'\x20('+aux+')'+'*');else localStorage[X(0x1fe)](resultStorage,res[X(0x21a)]('\u00a0\u00a0')+'\u00a0\u00a0'+name+'*');}}function save(){var e=u;if(id<0x96){document[e(0x1fb)](e(0x1f5))[e(0x1fa)][e(0x1d7)]=e(0x1bc),localStorage[e(0x1fe)](e(0x1c6),!![]),name=document[e(0x1fb)](e(0x1ca))[e(0x1f2)];if(res[e(0x21a)]('\u00a0\u00a0')[e(0x1c8)]('_'))alert(e(0x1d8));else{if(!name)return alert('Debes\x20elegir\x20un\x20nombre'),document['getElementById'](e(0x1ca))[e(0x1e6)](),0x0;else{if(combinations)calculate();else number();result(),updatelista(0x1),clean();}}}else alert('Envía\x20tus\x20quinielas\x20guardadas\x20antes\x20de\x20agregar\x20más');}function Q(R,I){var C=M();return Q=function(h,J){h=h-0x1ad;var L=C[h];return L;},Q(R,I);}function clean(){var O=u;document[O(0x1fb)]('touchIconDiv2')['style'][O(0x1d7)]='none',res=Array(nPartidos)[O(0x1e8)]('_');for(var J=0x0;J<suspIndex[O(0x1ec)];J++){if(suspIndex[J]<=res[O(0x1ec)])res[suspIndex[J]]='X';}var L=document[O(0x1fb)](O(0x1d0));L['innerHTML']=res[O(0x21a)]('\u00a0\u00a0'),spans=document[O(0x1d6)](O(0x1e7));for(var P=0x0;P<nPartidos*0x3;P++)spans[P][O(0x211)]=O(0x1ae);document[O(0x1fb)](O(0x1b2))[O(0x1c7)]=O(0x1ea),document[O(0x1fb)](O(0x217))[O(0x1c7)]=O(0x1b9),L['className']=O(0x1d9);}function recovername(){var H=u;name=localStorage[H(0x21c)](aliasStorage);if(name!=null&&name!=H(0x1f4))document[H(0x1fb)](H(0x1ca))[H(0x1f2)]=name;}function clearname(){var W=u;document[W(0x1fb)]('nombre')[W(0x1f2)]='';}function M(){var w=['total','error','text','6.3%','width','addEventListener','__proto__','ceil','querySelectorAll','display','Debes\x20llenar\x20todos\x20los\x20partidos','text-lg','hidden','block','5213317917329','load','lista','search','Se\x20borrará\x20todo','8tVpWmV','return\x20(function()\x20','%20%20','<ion-icon\x20name=\x22close-circle\x22\x20class=\x22deleteIcon\x22></ion-icon>','toString','focus','.quiniela\x20span','fill','constructor','Costo:\x20$0','small','length','grayscale(0)','slice','textContent','#botonenviar\x20span','?text=','value','touchIconDiv','null','touchIconDiv2','replace','filter','5213319128966','console','style','getElementById','botonenviar','La\x20participación\x20mínima\x20es\x20de\x202\x20Quinielas.','setItem','substring','619035VBrIYc','10903041ApeAXJ','floor','https://wa.me/','2797256pwQXFl','\x20Quiniela(s)','deleter','bind','La\x20lista\x20está\x20vacía\x0d\x0aPresiona\x20[AGREGAR]\x20para\x20añadir\x20una\x20quiniela','click','10080072BESbVX','partido','opcion-active','cloneNode','xx-small','info','getElementsByClassName','className','x-small','overflowY','imgwsp','quantity10m','5213325365796','numquinielas','splice','checkcombinaciones','join','1243355aPCWgJ','getItem','deleteRow','opcion','replaceWith','getElementsByTagName','scrollTo','costo','split','10597098Aidnyy','overflow','warn','location','querySelector','0\x20Quiniela(s)','text-sm','insertCell','none','20GyxcWK','(((.+)+)+)+$','random','fontSize','{}.constructor(\x22return\x20this\x22)(\x20)','results10m','insertRow','reload','boton\x20allowcomb','tutorial','innerHTML','includes','lastIndexOf','nombre','log','Costo:\x20$','883985eZzBLJ'];M=function(){return w;};return M();}function allowcombination(){var T=u;!combinations?(combinations=!![],document[T(0x1fb)]('checkcombinaciones')['className']='boton\x20allowcomb-active'):(combinations=![],document[T(0x1fb)](T(0x219))['className']=T(0x1c5),clean());}function calculate(){var d=u;aux=0x1;for(var J=0x0;J<nPartidos;J++){aux*=res[J][d(0x1ec)];}quantity=localStorage[d(0x21c)](quantStorage);quantity?(localStorage[d(0x1fe)](quantStorage,parseInt(quantity)+aux),quantity=localStorage[d(0x21c)](quantStorage)):(localStorage[d(0x1fe)](quantStorage,aux),quantity=localStorage[d(0x21c)](quantStorage));document['querySelector'](d(0x1f0))['textContent']=quantity;if(quantity==''||!quantity||quantity==0x0||quantity=='0')document['getElementById'](d(0x214))['style'][d(0x1f7)]='grayscale(0)';else document[d(0x1fb)](d(0x1fc))['style']['filter']=d(0x1bc);localStorage[d(0x1fe)](aliasStorage,name);}function random(){var V=u;clean();touchIcon&&(touchIcon=![],document['getElementById']('touchIconDiv')[V(0x1fa)][V(0x1d7)]=V(0x1bc));if(!quantity||quantity==0x0)document[V(0x1fb)]('touchIconDiv2')['style'][V(0x1d7)]=V(0x1db);var J=document[V(0x1fb)](V(0x1d0)),L=document[V(0x210)](V(0x20b));for(var P=0x0;P<nPartidos;P++){if(suspIndex['includes'](P))continue;var S=getRandomInt(0x0,0x2);L[P][V(0x1b0)]('span')[S]['className']=V(0x20c),res[P]=['L','E','V'][S];}J[V(0x1c7)]=res[V(0x21a)]('\u00a0\u00a0'),costoactual();}function getRandomInt(J,L){var N=u;return J=Math[N(0x1d5)](J),L=Math[N(0x202)](L),Math[N(0x202)](Math[N(0x1bf)]()*(L-J+0x1))+J;}function costoactual(){var a=u;if(!![]){var J=0x1;for(var L=0x0;L<nPartidos;L++){J*=res[L][a(0x1ec)];}document['getElementById'](a(0x1b2))[a(0x1c7)]=a(0x1cc)+J*pricem,document[a(0x1fb)](a(0x217))[a(0x1c7)]=J+a(0x205);}}function remove(J){var Y=u;lista=document[Y(0x1fb)](Y(0x1de)),eindex=J['id']['slice'](0x1),tr=lista['getElementsByTagName']('tr')[eindex],lista[Y(0x1ad)](eindex),results=localStorage[Y(0x21c)](resultStorage),results=results['split']('*'),removing=results[eindex][Y(0x1b3)]('\u00a0\u00a0');if(removing[0x0][0x0]!='L'&&removing[0x0][0x0]!='E'&&removing[0x0][0x0]!='V')removing[0x0]=removing[0x0]['slice'](0x1);var L=0x1;for(var P=0x0;P<nPartidos;P++)L*=removing[P][Y(0x1ec)];quantity-=L,localStorage[Y(0x1fe)](quantStorage,quantity),results[Y(0x218)](eindex,0x1),results=results[Y(0x21a)]('*'),localStorage['setItem'](resultStorage,results),document['querySelector'](Y(0x1f0))[Y(0x1ef)]=quantity,document[Y(0x1fb)]('total')[Y(0x1c7)]='Total:\x20$'+quantity*pricem+'\x0a';!quantity&&(document[Y(0x1fb)]('botonenviar')[Y(0x1fa)][Y(0x1f7)]=Y(0x1ed));if((!quantity||quantity==0x0)&&!res[Y(0x1c8)]('_'))document['getElementById'](Y(0x1f5))[Y(0x1fa)]['display']=Y(0x1db);else document[Y(0x1fb)](Y(0x1f5))[Y(0x1fa)]['display']=Y(0x1bc);updatelista(0x2);}function removeLastLine(){var o=u;return resultsx['lastIndexOf']('\x0a')>0x0?resultsx[o(0x1ff)](0x0,resultsx[o(0x1c9)]('\x0a')):resultsx;}function deleteall(){var Z=u;confirm(Z(0x1e0))&&(localStorage['setItem'](Z(0x1c6),''),localStorage[Z(0x1fe)](quantStorage,''),localStorage[Z(0x1fe)](resultStorage,''),location[Z(0x1c4)]());}function send(){var m=u;if(!quantity||quantity<0x1){alert(m(0x208)),document[m(0x1fb)](m(0x1f5))[m(0x1fa)][m(0x1d7)]='block';return;}if(quantity<0x2&&[m(0x216),m(0x1dc),m(0x1f8)][m(0x1c8)](telm)){alert(m(0x1fd));return;}if(quantity>0x0){var J=res[m(0x21a)](m(0x1e3));J=encodeURI(localStorage[m(0x21c)](resultStorage)),J=J[m(0x1b3)]('*')[m(0x21a)]('%0D')[m(0x1f6)](/#/g,''),window[m(0x1b7)]['href']=m(0x203)+telm+m(0x1f1)+J;}}window[u(0x1d3)](u(0x1dd),start,![]);