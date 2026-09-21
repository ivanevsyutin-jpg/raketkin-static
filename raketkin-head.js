/* raketkin-head.js — вынесено из HEAD-кода Tilda (разгрузка лимита 64КБ), v2.21 */
(function(){
var BRANDS=['Bullpadel','Babolat','Head','Nox'];
function brandLabels(){return [].slice.call(document.querySelectorAll('#rec2359100721 label.t-store__filter__checkbox'));}
function applyBrand(name){
var cat=document.querySelector('#rec2359100721');
if(!cat){ location.href='/?tfc_brand[2359100721]='+encodeURIComponent(name)+'&tfc_div=:::#rec2359100721'; return; }
var labs=brandLabels();
labs.forEach(function(l){var t=l.textContent.trim();if(BRANDS.indexOf(t)>=0){var i=l.querySelector('input');if(i&&i.checked&&t!==name)l.click();}});
var tgt=labs.filter(function(l){return l.textContent.trim()===name;})[0];
if(tgt){var i=tgt.querySelector('input'); if(i&&!i.checked) tgt.click();}
var y=cat.getBoundingClientRect().top+window.pageYOffset-80; window.scrollTo({top:y,behavior:'smooth'});
}
function bindFooter(){
var foot=document.querySelector('.krf'); if(!foot||foot.getAttribute('data-krb'))return;
var bound=false;
[].slice.call(foot.querySelectorAll('a')).forEach(function(a){
var t=a.textContent.trim();
if(BRANDS.indexOf(t)>=0){
a.setAttribute('href','/?tfc_brand[2359100721]='+encodeURIComponent(t)+'&tfc_div=:::#rec2359100721');
a.addEventListener('click',function(e){ if(document.querySelector('#rec2359100721')){ e.preventDefault(); applyBrand(t);} });
bound=true;
}
});
if(bound) foot.setAttribute('data-krb','1');
}
function wrapGift(){
var p=document.querySelector('.kr-promo'); if(!p||p.getAttribute('data-krg'))return;
if(p.innerHTML.indexOf('kr-gift')<0 && p.innerHTML.indexOf('🎁')>=0){ p.innerHTML=p.innerHTML.replace('🎁','<span class="kr-gift">🎁</span>'); }
p.setAttribute('data-krg','1');
}
function popGift(){
[].slice.call(document.querySelectorAll('.t-store__prod-popup__col-right')).forEach(function(r){
if(r.querySelector('.kr-pop-gift'))return;
var pw=r.querySelector('.t-store__prod-popup__price-wrapper'); if(!pw)return;
var g=document.createElement('div'); g.className='kr-pop-gift';
g.innerHTML='<span>🎁</span><span>В подарок при заказе ракетки: защитный чехол, овергрип и защита обода — до конца июня</span>';
pw.parentNode.insertBefore(g, pw.nextSibling);
});
}
function tick(){ try{bindFooter();}catch(e){} try{wrapGift();}catch(e){} try{popGift();}catch(e){} }
setInterval(tick,700);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
function injTrust(){
if(document.querySelector('.kr-trust'))return;
var foot=document.querySelector('#rec2359781121')||document.querySelector('.krf');
if(!foot)return;
var rec=foot; while(rec&&!(rec.id&&rec.id.indexOf('rec')===0)) rec=rec.parentElement;
if(!rec)rec=foot;
var s=document.createElement('div'); s.className='kr-trust';
s.innerHTML='<div class="kr-trust__wrap"><div class="kr-trust__title">Нам доверяют паделисты по всей России</div><div class="kr-trust__in"><div class="kr-trust__rating"><div class="kr-trust__score">5.0</div><div class="kr-trust__stars">★★★★★</div><div class="kr-trust__rsub">Средний рейтинг по отзывам покупателей</div></div><div class="kr-trust__grid"><div class="kr-trust__card"><div class="kr-trust__num">1000+</div><div class="kr-trust__lbl">паделистов по всей России уже играют нашими ракетками</div></div><div class="kr-trust__card"><div class="kr-trust__num">100%</div><div class="kr-trust__lbl">оригинал — официальная продукция Bullpadel, Babolat, Head и Nox</div></div><div class="kr-trust__card"><div class="kr-trust__num">2 часа</div><div class="kr-trust__lbl">доставка по Москве, по России — СДЭК</div></div><div class="kr-trust__card"><div class="kr-trust__num">14 дней</div><div class="kr-trust__lbl">на возврат и обмен, гарантия на каждую ракетку</div></div></div></div></div>';
rec.parentNode.insertBefore(s, rec);
}
function tick(){ try{injTrust();}catch(e){} }
setInterval(tick,800);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
var REVIEWS=[
{n:'Игорь',d:'8 мая',m:'Bullpadel Neuron 02 2026',t:'Отличный продавец, отправил ракетку молниеносно, качественно упаковал. Однозначно рекомендую!'},
{n:'Алёна',d:'12 апреля',m:'Head Zephyr Pink',t:'Получила ракетку мечты, очень довольна, спасибо продавцу. Отправка быстрая, ещё положили маленький подарочек)'},
{n:'Михаил',d:'13 мая',m:'Babolat Air Veron 2025',t:'Всё очень быстро, чётко и оперативно. Ракетка новая, запечатанная.'},
{n:'Николай',d:'30 марта',m:'Nox AT10 Genius 12K 2025',t:'Отличный продавец! Ответил быстро, в тот же день отправил ракетку, привёз курьер через пару часов.'},
{n:'Владимир',d:'5 апреля',m:'Head Zephyr Pink',t:'Ракетку получил спустя полчаса как написал! Ориг, цена бомба! Будем учить жену паделу 😊'},
{n:'Дмитрий',d:'12 мая',m:'Bullpadel Vertex 05 26',t:'Комфортная покупка. Оригинальный товар. Пять баллов.'},
{n:'Ольга',d:'31 марта',m:'Oxdog Ultimate Pro Light 2026',t:'Всё прекрасно! Оперативно отвечали на все вопросы, очень быстро отправили заказ. Соответствует описанию.'},
{n:'Алексей',d:'20 апреля',m:'Bullpadel Neuron 02 Edge 2026',t:'Прислали ракетку через день СДЭКом. Товар отличный, всё в комплекте.'},
{n:'Камиль',d:'5 апреля',m:'Bullpadel Neuron 02 2026',t:'Прекрасная ракетка и коммуникация, всё отлично!'},
{n:'Антон',d:'12 апреля',m:'Bullpadel Vertex 05 MX LTD 2026',t:'Быстро ответил, всё рассказал, товар оригинал.'},
{n:'Артём',d:'2 апреля',m:'Bullpadel Vertex 04 2025',t:'Продавец оперативно ответил на все вопросы. Товар соответствует объявлению.'},
{n:'Олег',d:'15 мая',m:'Bullpadel Vertex 05 26',t:'Всё здорово, оперативно отправили — обращайтесь!'}
];
var PAL=['#0d3b34','#2f6f5e','#8a6d3b','#3a5a78','#6b4a7a','#3f6d33'];
function injRev(){
if(document.querySelector('.kr-rev'))return;
var anchor=document.querySelector('.kr-trust');
if(!anchor){var foot=document.querySelector('#rec2359781121')||document.querySelector('.krf');var rec=foot;while(rec&&!(rec.id&&rec.id.indexOf('rec')===0))rec=rec.parentElement;anchor=rec||foot;}
if(!anchor)return;
var cards=REVIEWS.map(function(r,i){
return '<div class="kr-rev__card"><div class="kr-rev__top"><div class="kr-rev__av" style="background:'+PAL[i%PAL.length]+'">'+r.n.charAt(0)+'</div><div><div class="kr-rev__name">'+r.n+'</div><div class="kr-rev__date">'+r.d+'</div></div></div><div class="kr-rev__stars">★★★★★</div><div class="kr-rev__model">'+r.m+'</div><div class="kr-rev__text">'+r.t+'</div></div>';
}).join('');
var s=document.createElement('div'); s.className='kr-rev';
s.innerHTML='<div class="kr-rev__wrap"><div class="kr-rev__head"><div class="kr-rev__title">Отзывы наших покупателей</div><div class="kr-rev__sub">Реальные отзывы с Авито · средняя оценка <b>5.0</b></div></div><div class="kr-rev__viewport"><div class="kr-rev__track">'+cards+cards+'</div></div><div class="kr-rev__src"><a href="https://www.avito.ru/user/d8fadcfe6b0f9506ca0b298a027ca0eb/profile" target="_blank" rel="noopener">Все отзывы на Авито →</a></div></div>';
anchor.parentNode.insertBefore(s, anchor);
}
function tick(){ try{injRev();}catch(e){} }
setInterval(tick,800);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
var ORD={};
function grid(){var f=document.querySelector('#rec2359100721 .t-store__card');return f?f.parentElement:null;}
function shuffle(){
var g=grid(); if(!g)return;
var cards=[].slice.call(g.children).filter(function(e){return e.classList&&e.classList.contains('t-store__card');});
if(cards.length<2)return;
cards.forEach(function(c){var u=c.getAttribute('data-product-uid')||c.getAttribute('data-product-lid'); if(u&&!(u in ORD))ORD[u]=Math.random();});
var des=cards.slice().sort(function(a,b){return (ORD[a.getAttribute('data-product-uid')]||0)-(ORD[b.getAttribute('data-product-uid')]||0);});
var same=true; for(var i=0;i<cards.length;i++){if(cards[i]!==des[i]){same=false;break;}}
if(same)return;
var fr=document.createDocumentFragment(); des.forEach(function(c){fr.appendChild(c);});
g.insertBefore(fr, g.firstChild);
}
function tick(){ try{shuffle();}catch(e){} }
setInterval(tick,600);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
var BUY={'BUY NOW':'Купить','BUY':'Купить','Buy now':'Купить','Buy Now':'Купить','Buy':'Купить','BUY IN ONE CLICK':'Купить в 1 клик','Add to cart':'В корзину','ADD TO CART':'В корзину','In cart':'В корзине'};
function trBuy(){
document.querySelectorAll('.js-store-prod-popup-buy-btn-txt,.t-store__card__btn-text,.js-store-prod-buybtn-text,.t-store__prod-popup__btn .t-btntext,.t-store__prod-popup__btn .t-btnflex__text,.t-store__card__btn .t-btntext').forEach(function(e){
var t=e.textContent.trim(); if(BUY[t]) e.textContent=BUY[t];
});
}
function navRev(){
var rv=document.querySelector('.kr-rev'); if(rv&&!rv.id) rv.id='otzyvy';
var nav=document.querySelector('.krh-nav'); if(!nav)return;
nav.querySelectorAll('a').forEach(function(a){
if(a.textContent.trim()==='Бренды'&&!a.getAttribute('data-krrev')){
a.textContent='Отзывы'; a.setAttribute('data-krrev','1'); a.setAttribute('href','#otzyvy');
a.addEventListener('click',function(e){var r=document.querySelector('.kr-rev');if(r){e.preventDefault();var y=r.getBoundingClientRect().top+window.pageYOffset-70;window.scrollTo({top:y,behavior:'smooth'});}});
}
});
}
function tick(){ try{trBuy();}catch(e){} try{navRev();}catch(e){} }
setInterval(tick,500);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
var PAGE=12, shown=PAGE;
function grid(){var f=document.querySelector('#rec2359100721 .t-store__card');return f?f.parentElement:null;}
function cardsOf(g){return [].slice.call(g.children).filter(function(e){return e.classList&&e.classList.contains('t-store__card');});}
function paginate(){var g=grid();if(!g)return;cardsOf(g).forEach(function(c,i){if(i>=shown){c.style.setProperty('display','none','important');c.setAttribute('data-krpg','1');}else if(c.getAttribute('data-krpg')){c.style.removeProperty('display');c.removeAttribute('data-krpg');}});}
document.addEventListener('click',function(e){
var t=e.target; if(!t||!t.closest)return;
if(t.closest('#rec2359100721 .t-store__filter__checkbox')||t.closest('.kr-topswitch')||t.closest('.t-store__parts-switch-wrapper')){ shown=PAGE; setTimeout(paginate,60); setTimeout(paginate,420); return; }
var btn=t.closest('.t-store__load-more-btn, .t-store__load-more-btn-wrap .t-btn, .t-store__load-more-btn-wrap a');
if(!btn)return;
var g=grid(); if(!g)return; var n=cardsOf(g).length;
if(shown<n){ e.preventDefault(); e.stopImmediatePropagation(); shown+=PAGE; paginate(); }
else { shown+=PAGE; }
},true);
setInterval(paginate,400);
if(document.readyState!=='loading')paginate(); else document.addEventListener('DOMContentLoaded',paginate);
})();
;
(function(){
function bind(){
document.querySelectorAll('.kr-faq__item').forEach(function(d){
if(d.getAttribute('data-krx'))return;
d.setAttribute('data-krx','1');
d.addEventListener('toggle',function(){
if(d.open){
document.querySelectorAll('.kr-faq__item').forEach(function(o){ if(o!==d&&o.open) o.open=false; });
}
});
});
}
setInterval(bind,700);
if(document.readyState!=='loading')bind(); else document.addEventListener('DOMContentLoaded',bind);
})();
;
(function(){
function fixC(){
var foot=document.querySelector('.krf'); if(!foot||foot.getAttribute('data-krc'))return;
var links=[].slice.call(foot.querySelectorAll('a'));
var phone=links.filter(function(a){return a.textContent.indexOf('+7')>=0;})[0];
if(!phone)return;
phone.textContent='+7 993 682-10-00';
phone.setAttribute('href','tel:+79936821000');
if(!foot.querySelector('[data-krtg]')){
var tg=phone.cloneNode(true);
tg.textContent='Telegram: @raketkinshop';
tg.setAttribute('href','https://t.me/raketkinshop');
tg.setAttribute('target','_blank');
tg.setAttribute('rel','noopener');
tg.setAttribute('data-krtg','1');
phone.parentNode.insertBefore(tg, phone.nextSibling);
}
foot.setAttribute('data-krc','1');
}
function tick(){ try{fixC();}catch(e){} }
setInterval(tick,700);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
function linkWarranty(){
var foot=document.querySelector('.krf'); if(!foot)return;
foot.querySelectorAll('a').forEach(function(a){
var t=a.textContent.trim().toLowerCase();
if(t.indexOf('гарантия')>=0 && t.indexOf('возврат')>=0 && a.getAttribute('href')!=='/garantiya-i-vozvrat'){
a.setAttribute('href','/garantiya-i-vozvrat');
}
});
}
function tick(){ try{linkWarranty();}catch(e){} }
setInterval(tick,700);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
function addOferta(){
var foot=document.querySelector('.krf'); if(!foot||foot.getAttribute('data-krof'))return;
var links=[].slice.call(foot.querySelectorAll('a'));
if(links.filter(function(a){return a.textContent.trim().toLowerCase()==='оферта';}).length){foot.setAttribute('data-krof','1');return;}
var ref=links.filter(function(a){var t=a.textContent.trim().toLowerCase();return t.indexOf('гарантия')>=0&&t.indexOf('возврат')>=0;})[0];
if(!ref)return;
var o=ref.cloneNode(true);
o.textContent='Оферта';
o.setAttribute('href','/oferta');
o.removeAttribute('data-krrev');
ref.parentNode.insertBefore(o, ref.nextSibling);
foot.setAttribute('data-krof','1');
}
function tick(){ try{addOferta();}catch(e){} }
setInterval(tick,700);
if(document.readyState!=='loading')tick(); else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
function faqId(){var f=document.querySelector('.kr-faq');if(f&&!f.id)f.id='voprosy';}
function header(){
var krh=document.querySelector('.krh');var bar=document.querySelector('.krh-bar');
if(krh&&bar&&!krh.querySelector('.krh-top')){
var top=document.createElement('div');top.className='krh-top';
top.innerHTML='<span>г. Москва</span><span class="krh-sep">·</span><span>ежедневно 10:00–21:00</span><span class="krh-sep">·</span><a href="tel:+79936821000">+7 993 682-10-00</a><span class="krh-sep">·</span><a href="https://t.me/raketkinshop" target="_blank" rel="noopener">Telegram</a>';
krh.insertBefore(top,bar);
}
var nav=document.querySelector('.krh-nav');
if(nav){
nav.querySelectorAll('a').forEach(function(a){
var t=a.textContent.trim().toLowerCase();
if(t.indexOf('доставка')>=0&&t.indexOf('оплата')>=0&&!a.getAttribute('data-krd')){
a.setAttribute('data-krd','1');a.setAttribute('href','#dostavka');
a.addEventListener('click',function(e){var d=document.querySelector('#dostavka');if(d){e.preventDefault();var y=d.getBoundingClientRect().top+window.pageYOffset-100;window.scrollTo({top:y,behavior:'smooth'});}});
}
});
if(!nav.getAttribute('data-krfaq')){
var has=[].slice.call(nav.querySelectorAll('a')).some(function(a){return a.textContent.trim().toLowerCase().indexOf('частые')>=0;});
if(!has){var ref=nav.querySelector('a');if(ref){var a=ref.cloneNode(true);a.removeAttribute('data-krrev');a.removeAttribute('data-krd');a.textContent='Частые вопросы';a.setAttribute('href','#voprosy');a.addEventListener('click',function(e){var f=document.querySelector('.kr-faq');if(f){e.preventDefault();var y=f.getBoundingClientRect().top+window.pageYOffset-100;window.scrollTo({top:y,behavior:'smooth'});}});nav.appendChild(a);}}
nav.setAttribute('data-krfaq','1');
}
}
}
function fab(){
if(document.querySelector('.kr-fab'))return;
var a=document.createElement('a');a.className='kr-fab';a.href='https://t.me/raketkinshop';a.target='_blank';a.rel='noopener';
a.innerHTML='<span class="kr-fab__ic"><svg viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg></span><span class="kr-fab__t"><b>Нужна консультация по ракетке?</b><i>Пишите в Telegram</i></span>';
document.body.appendChild(a);
}
function delivery(){
if(document.querySelector('.kr-dlv'))return;
var anc=document.querySelector('.kr-faq')||document.querySelector('.kr-trust')||document.querySelector('#rec2359781121');
if(!anc)return;
var s=document.createElement('div');s.className='kr-dlv';s.id='dostavka';
s.innerHTML='<div class="kr-dlv__wrap"><div class="kr-dlv__title">Доставка и оплата</div><div class="kr-dlv__grid"><div class="kr-dlv__card"><div class="kr-dlv__h">По России</div><p>СДЭК, Ozon, Яндекс Доставка. Доставка 500 ₽ в любой город.</p></div><div class="kr-dlv__card"><div class="kr-dlv__h">По Москве</div><p>Курьер в день заказа, 1 500 ₽. После оформления менеджер свяжется и уточнит время.</p></div><div class="kr-dlv__card"><div class="kr-dlv__h">Самовывоз</div><p>г. Москва, ул. Берёзовая аллея, 17к1. Шоурума у нас нет — дождитесь подтверждения менеджера перед тем, как приехать.</p></div></div><div class="kr-dlv__note">Оплата онлайн — картой или через СБП</div></div>';
anc.parentNode.insertBefore(s,anc);
}
function footer(){
var foot=document.querySelector('.krf');if(!foot||foot.getAttribute('data-krf2'))return;
foot.querySelectorAll('a').forEach(function(a){
var h=a.getAttribute('href')||'';var t=a.textContent.trim().toLowerCase();
if(h.indexOf('mailto:')===0){a.remove();return;}
if(t==='подбор ракетки'){a.remove();return;}
if(t.indexOf('доставка')>=0&&t.indexOf('оплата')>=0){a.setAttribute('href','/#dostavka');a.addEventListener('click',function(e){var d=document.querySelector('#dostavka');if(d){e.preventDefault();var y=d.getBoundingClientRect().top+window.pageYOffset-100;window.scrollTo({top:y,behavior:'smooth'});}});}
if(a.textContent.indexOf('Москва, ежедневно')>=0){a.textContent=a.textContent.replace('Москва, ежедневно','г. Москва, ежедневно');}
});
foot.setAttribute('data-krf2','1');
}
function tick(){try{faqId();}catch(e){}try{header();}catch(e){}try{fab();}catch(e){}try{delivery();}catch(e){}try{footer();}catch(e){}}
setInterval(tick,700);
if(document.readyState!=='loading')tick();else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){
var ICO={pin:'<svg viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',phone:'<svg viewBox="0 0 24 24"><path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',tg:'<svg viewBox="0 0 24 24"><path d="M9.8 16.2l.3-3.9 7.2-6.5c.3-.3-.1-.4-.5-.2L7.9 11 4 9.8c-.8-.3-.8-.8.2-1.2L19 2.9c.7-.3 1.3.2 1 1.2l-2.6 12.2c-.2.8-.7 1-1.4.6l-3.8-2.8-1.8 1.8c-.2.2-.4.3-.8.3z"/></svg>'};
function header(){
var t=document.querySelector('.krh-top'); if(!t||t.getAttribute('data-krh2'))return;
t.innerHTML='<span class="krh-top__i">'+ICO.pin+'<span>г. Москва</span></span>'+
'<span class="krh-top__i krh-top__hm">'+ICO.clock+'<span>ежедневно 10:00–21:00</span></span>'+
'<a class="krh-top__i" href="tel:+79936821000">'+ICO.phone+'<b>+7 993 682-10-00</b></a>'+
'<a class="krh-top__i krh-top__tg" href="https://t.me/raketkinshop" target="_blank" rel="noopener">'+ICO.tg+'<span>Telegram</span></a>';
t.setAttribute('data-krh2','1');
}
function fab(){
var f=document.querySelector('.kr-fab'); if(!f)return;
if(!f.getAttribute('data-krf2')){
f.innerHTML='<span class="kr-fab__ic">'+ICO.tg+'</span><span class="kr-fab__t"><b>Поможем с выбором</b><i>Напишите нам</i></span>';
f.setAttribute('data-krf2','1');
}
if(window.pageYOffset>520)f.classList.add('kr-fab--show');else f.classList.remove('kr-fab--show');
}
function dlv(){
var d=document.querySelector('.kr-dlv'); if(!d||d.getAttribute('data-krd2'))return;
var truck='<svg viewBox="0 0 24 24"><path d="M3 7.5h11v9H3z"/><path d="M14 10.5h3.5L21 14v2.5h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17.5" cy="18" r="1.7"/></svg>';
var bolt='<svg viewBox="0 0 24 24"><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></svg>';
var pin='<svg viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
d.innerHTML='<div class="kr-dlv__wrap"><div class="kr-dlv__title">Доставка и оплата</div><div class="kr-dlv__grid">'+
'<div class="kr-dlv__card"><div class="kr-dlv__ic">'+truck+'</div><div class="kr-dlv__h">По всей России</div><p>Отправляем СДЭК, Ozon и Яндекс Доставкой в любой город. Доставка 500 ₽, сумма сразу видна в корзине.</p></div>'+
'<div class="kr-dlv__card"><div class="kr-dlv__ic">'+bolt+'</div><div class="kr-dlv__h">По Москве — в день заказа</div><p>Курьерская доставка в день оформления, 1 500 ₽. После заказа менеджер свяжется с вами и согласует удобное время.</p></div>'+
'<div class="kr-dlv__card"><div class="kr-dlv__ic">'+pin+'</div><div class="kr-dlv__h">Самовывоз</div><p>Заберите заказ лично по адресу на карте. Шоурума у нас нет — приезжайте только после подтверждения менеджера.</p></div>'+
'</div><div class="kr-dlv__map"><div class="kr-dlv__maptt">'+pin+'Пункт самовывоза · г. Москва, ул. Берёзовая аллея, 17к1</div><iframe loading="lazy" src="https://yandex.ru/map-widget/v1/?ll=37.617536%2C55.850914&z=17&pt=37.617536%2C55.850914%2Cpm2rdm"></iframe></div>'+
'<div class="kr-dlv__note">Оплата онлайн — банковской картой или через СБП</div></div>';
d.setAttribute('data-krd2','1');
}
function tick(){try{header();}catch(e){}try{fab();}catch(e){}try{dlv();}catch(e){}}
setInterval(tick,500);
window.addEventListener('scroll',function(){var f=document.querySelector('.kr-fab');if(f){if(window.pageYOffset>520)f.classList.add('kr-fab--show');else f.classList.remove('kr-fab--show');}},{passive:true});
if(document.readyState!=='loading')tick();else document.addEventListener('DOMContentLoaded',tick);
})();
;
(function(){function fd(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);var n;while(n=w.nextNode()){var t=n.nodeValue;if(t&&t.indexOf("по России")>=0&&t.indexOf("СДЭК")>=0&&t.indexOf("Ozon")<0){n.nodeValue=t.replace(/по России\s*[—–-]\s*СДЭК[\s\S]*/,"по России — СДЭК, Ozon, Яндекс Доставка");}}}setInterval(function(){try{fd();}catch(e){}},700);fd();})();
;
(function(){
function fabClose(){var f=document.querySelector(".kr-fab");if(!f)return;try{if(localStorage.getItem("krFabClosed")==="1"){f.classList.add("kr-fab--closed");return;}}catch(_){}if(!f.querySelector(".kr-fab__x")){var x=document.createElement("span");x.className="kr-fab__x";x.innerHTML="×";x.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();try{localStorage.setItem("krFabClosed","1");}catch(_){}f.classList.add("kr-fab--closed");});f.appendChild(x);}}
setInterval(function(){try{fabClose();}catch(e){}},500);fabClose();
})();
;
(function(){
function isP(){return location.pathname.indexOf("/tproduct/")>=0;}
var C='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
var H='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V8l5 3V8l5 3V5l4 2v14"/></svg>';
var S='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 11l2 2 4-4"/></svg>';
var T='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/></svg>';
var META='<div class="kr-pp-meta"><span class="kr-pp-stock">'+C+' В наличии</span><span class="kr-pp-warr">Гарантия 14 дней<span class="kr-pp-i">i</span><span class="kr-pp-tip">Гарантия предоставляется при соблюдении правил гарантийного обслуживания. <a href="/garantiya-i-vozvrat">Гарантия и возврат →</a></span></span></div>';
var ADV='<div class="kr-pp-adv"><div class="kr-pp-adv__i"><span class="kr-pp-adv__ic">'+H+'</span><div><b>Прямое сотрудничество</b><span>Работаем с производителями напрямую</span></div></div><div class="kr-pp-adv__i"><span class="kr-pp-adv__ic">'+S+'</span><div><b>Только оригинал</b><span>100% подлинные ракетки Bullpadel, Babolat, Head, Nox</span></div></div><div class="kr-pp-adv__i"><span class="kr-pp-adv__ic">'+T+'</span><div><b>Быстрая доставка по России</b><span>Недорого и быстро — СДЭК, Ozon, Яндекс Доставка</span></div></div></div>';
function ins(){if(!isP())return;var p=document.querySelector(".js-store-prod-price");if(p&&!document.querySelector(".kr-pp-meta")){p.insertAdjacentHTML("afterend",META);}var bw=document.querySelector(".t-store__prod-popup__btn-wrapper");if(bw&&!document.querySelector(".kr-pp-adv")){bw.insertAdjacentHTML("afterend",ADV);}var ic=document.querySelector(".kr-pp-i");if(ic&&!ic.getAttribute("data-b")){ic.setAttribute("data-b","1");ic.addEventListener("click",function(e){e.stopPropagation();this.closest(".kr-pp-warr").classList.toggle("kr-open");});}}
setInterval(ins,500);ins();
})();
;

;
(function(){if(location.pathname.indexOf("/tproduct/")<0)return;var L={bullpadel:"https://static.tildacdn.com/stor3162-3238-4638-b930-376366386530/9d3e4e5047b045bc4276e82d4701ea5a.jpg",babolat:"https://static.tildacdn.com/stor6362-3632-4562-a465-656230316264/bd862223833d873c4496b36d08deca89.jpg",nox:"https://static.tildacdn.com/stor6637-6430-4237-b236-623566393461/6425b4ecb9ada9680393c2102a0fffbc.jpg",head:"https://static.tildacdn.com/stor3739-3633-4561-a464-613061303966/2ace485ff1df08c9b5ff44166254c802.jpg"},S=["Описание","Преимущества","Характеристики","Почему"];function e(){var w=document.querySelector(".t-store__prod-popup__title-wrapper");if(w&&!w.querySelector(".kr-eb")){var b=((document.querySelector(".t-store__prod-popup__brand")||{}).innerText||"").toLowerCase(),lo=null,k;for(k in L){if(b.indexOf(k)>=0){lo=L[k];break;}}var d=document.createElement("div");d.className="kr-eb";var it=document.createElement("i");it.textContent="Ракетка для падел-тенниса";d.appendChild(it);if(lo){var im=document.createElement("img");im.src=lo;d.appendChild(im);}var nm=document.querySelector(".t-store__prod-popup__name");if(nm&&nm.parentNode){nm.parentNode.insertBefore(d,nm);}}var t=document.querySelector(".js-store-prod-text");if(t&&t.querySelector("strong")&&!t.getAttribute("data-k")){t.setAttribute("data-k","1");t.classList.add("krd");var f=1;t.querySelectorAll("strong").forEach(function(s){var x=s.textContent.trim();if(S.some(function(q){return x.indexOf(q)===0;})&&s.parentElement&&Math.abs(s.parentElement.textContent.trim().length-x.length)<=3){s.classList.add("kr-sec");if(f){s.classList.add("kr-f");f=0;}}});t.querySelectorAll("li").forEach(function(li){var hh=li.innerHTML,ix=hh.indexOf(" — ");if(ix>0&&hh.indexOf("<")<0){li.innerHTML="<b>"+hh.substring(0,ix)+"</b>"+hh.substring(ix);}});}}setInterval(e,500);e();})();
;
(function(){
if(location.pathname.indexOf("/tproduct/")<0)return;
document.documentElement.classList.add("krtp");
function go(){
var nm=document.querySelector(".t-store__prod-popup__name,.js-store-prod-name");
var ph=document.querySelector(".t-slds");
var b=document.querySelector(".js-store-close-text");
if(b&&b.textContent.indexOf("\u0412\u0441\u0435 \u0442\u043e\u0432\u0430\u0440\u044b")<0)b.textContent="\u0412\u0441\u0435 \u0442\u043e\u0432\u0430\u0440\u044b";
var row=ph?ph.closest(".t-container"):null;
if(row&&nm&&!document.querySelector(".kr-eyb")){var d=document.createElement("div");d.className="kr-eyb";d.innerHTML="\u0420\u0430\u043a\u0435\u0442\u043a\u0430 \u0434\u043b\u044f \u043f\u0430\u0434\u0435\u043b-\u0442\u0435\u043d\u043d\u0438\u0441\u0430<b>"+nm.textContent.trim()+"</b>";row.insertBefore(d,row.firstElementChild);}
var cw=document.querySelector(".t-store__prod-popup__close-txt-wr");
if(cw&&row&&!cw.getAttribute("data-krm")){row.insertBefore(cw,row.firstElementChild);cw.setAttribute("data-krm","1");}
var rev=document.querySelector(".kr-rev"),tt=document.querySelector(".kr-trust"),rc=document.querySelector(".krfr");
if(rev&&rc&&rc.nextElementSibling!==rev)rev.parentNode.insertBefore(rc,rev);
if(rev&&tt&&rev.nextElementSibling!==tt)rev.parentNode.insertBefore(tt,rev.nextElementSibling);
}
var n=0,iv=setInterval(function(){go();if(++n>120)clearInterval(iv);},350);go();
})();
;
(function(){function g(){var w=document.querySelector("#rec2366078741 .t-width"),f=w&&w.querySelector(".kr-faq"),rv=document.getElementById("otzyvy"),tr=document.querySelector(".kr-trust");if(!w||!f||!rv||!tr)return;if(rv.nextElementSibling===f&&tr.nextElementSibling===rv)return;w.insertBefore(tr,f);w.insertBefore(rv,f);}var n=0,iv=setInterval(function(){g();if(++n>240)clearInterval(iv);},300);g();if(window.MutationObserver){try{new MutationObserver(g).observe(document.querySelector(".t-records")||document.body,{childList:true});}catch(e){}}})();
;
(function(){if(location.pathname.indexOf("/tproduct/")>=0)return;function u(c){var a=c.querySelector('a[href*="/tproduct/"]');if(a)return a.href;return c.getAttribute("data-product-url");}document.addEventListener("click",function(e){var t=e.target;if(!t.closest)return;if(t.closest('.t-store__card__btn,.js-store-product-edit,[class*="addbtn"],[class*="cart"]'))return;var c=t.closest(".js-product,.t-store__card");if(!c)return;var url=u(c);if(url){e.stopPropagation();e.preventDefault();window.location.href=url;}},true);})();
;
(function(){if(location.pathname.indexOf("/tproduct/")<0)return;function g(){var s=document.querySelector(".t-store__prod-popup__slider");if(s){var row=s.parentNode;if(row&&row.classList&&!row.classList.contains("kr-prow"))row.classList.add("kr-prow");}var d=document.querySelector(".js-store-prod-text");var sl=document.querySelector(".t-store__prod-popup__slider");var cont=sl?sl.parentNode.parentNode:null;if(d&&cont&&d.parentNode!==cont){cont.appendChild(d);d.classList.add("kr-fulldesc");}var rel=document.querySelector(".t-store__relevants__container");if(rel&&!document.querySelector(".kr-seeall")){var b=document.createElement("div");b.className="kr-seeall";b.innerHTML='<a href="https://raketkin.shop/#rec2359100721">Смотреть все</a>';rel.parentNode.appendChild(b);}}var n=0,iv=setInterval(function(){g();if(++n>60)clearInterval(iv);},300);g();})();
;
(function(){if(window.__krcmp)return;window.__krcmp=1;var K="kr_cmp";function g(){try{return JSON.parse(localStorage.getItem(K)||"[]")}catch(e){return[]}}function s(a){localStorage.setItem(K,JSON.stringify(a));r();}function ix(a,id){for(var i=0;i<a.length;i++){if(a[i].id===id)return i;}return -1;}function pc(){var o={};var WL=["бренд","средний вес","уровень игрока","стиль игры","баланс","форма ракетки","материал","вес"];var ns=document.querySelectorAll(".js-store-prod-text li,.kr-fulldesc li,.js-store-prod-text p");for(var i=0;i<ns.length;i++){var t=(ns[i].textContent||"").trim();var sp=t.indexOf(" — ");var off=3;if(sp<0){sp=t.indexOf(": ");off=2;}if(sp>0&&sp<34){var k=t.slice(0,sp).trim();var val=t.slice(sp+off).trim();if(val&&!o[k]&&val.length<46&&val.indexOf(". ")<0&&WL.indexOf(k.toLowerCase())>=0){o[k]=val;}}}return o;}function cur(){var nm=document.querySelector(".t-store__prod-popup__name");var im=document.querySelector(".t-slds__bgimg");var pr=document.querySelector("[class*='price-val']");return {id:location.pathname,name:nm?nm.textContent.trim():"",img:im?(im.getAttribute("data-original")||""):"",price:pr?pr.textContent.trim():"",url:location.href.split("?")[0],chars:pc()};}function upd(b){var inl=ix(g(),location.pathname)>=0;b.textContent=inl?"✓ В сравнении":"Добавить к сравнению";b.className="kr-cmp-add"+(inl?" on":"");}function ab(){if(location.pathname.indexOf("/tproduct/")<0)return;var bw=document.querySelector(".t-store__prod-popup__btn-wrapper");if(!bw||document.querySelector(".kr-cmp-add"))return;var b=document.createElement("a");b.href="#";upd(b);b.onclick=function(e){e.preventDefault();var l=g();var i=ix(l,location.pathname);if(i>=0)l.splice(i,1);else l.push(cur());s(l);upd(b);};bw.parentNode.insertBefore(b,bw.nextSibling);}function r(){var l=g();var bar=document.querySelector(".kr-cmp-bar");if(!l.length){if(bar)bar.parentNode.removeChild(bar);return;}if(!bar){bar=document.createElement("div");bar.className="kr-cmp-bar";document.body.appendChild(bar);}bar.innerHTML="<button class='kr-cmp-open'>Сравнить ("+l.length+")</button><button class='kr-cmp-clear'>×</button>";bar.querySelector(".kr-cmp-open").onclick=op;bar.querySelector(".kr-cmp-clear").onclick=function(){s([]);};}function op(){var l=g();if(!l.length)return;var keys=[];for(var i=0;i<l.length;i++){var ch=l[i].chars||{};for(var k in ch){if(keys.indexOf(k)<0)keys.push(k);}}var h="<div class='kr-cmp-box'><button class='kr-cmp-x'>×</button><h2>Сравнение ракеток</h2><div class='kr-cmp-scroll'><table><tr><th></th>";for(var i=0;i<l.length;i++){var p=l[i];h+="<td class='kr-cmp-hd'><img src='"+p.img+"'><a href='"+p.url+"'>"+p.name+"</a><div class='kr-cmp-pr'>"+p.price+"</div><button class='kr-cmp-rm' data-i='"+i+"'>убрать</button></td>";}h+="</tr>";for(var j=0;j<keys.length;j++){h+="<tr><th>"+keys[j]+"</th>";for(var i2=0;i2<l.length;i2++){var c=l[i2].chars||{};h+="<td>"+(c[keys[j]]||"—")+"</td>";}h+="</tr>";}h+="</table></div></div>";var ov=document.createElement("div");ov.className="kr-cmp-ov";ov.innerHTML=h;document.body.appendChild(ov);ov.querySelector(".kr-cmp-x").onclick=function(){ov.parentNode.removeChild(ov);};ov.onclick=function(e){if(e.target===ov)ov.parentNode.removeChild(ov);};var rm=ov.querySelectorAll(".kr-cmp-rm");for(var q=0;q<rm.length;q++){rm[q].onclick=function(){var ii=+this.getAttribute("data-i");var l2=g();l2.splice(ii,1);s(l2);if(ov.parentNode)ov.parentNode.removeChild(ov);if(l2.length)op();};}}var n=0,iv=setInterval(function(){ab();r();if(++n>40)clearInterval(iv);},400);ab();r();})();