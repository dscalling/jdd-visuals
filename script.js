const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const $=s=>document.querySelector(s);
const setText=(selector,value)=>{const el=$(selector);if(el)el.textContent=String(value??'')};
const setHTML=(selector,value)=>{const el=$(selector);if(el)el.innerHTML=String(value??'')};
document.title=`${SITE.brand.name} — ${SITE.brand.tagline}`;
setText('#availability',SITE.brand.availability);
setText('#availability2',SITE.brand.availability);
setText('#footerBrand',SITE.brand.name);
setText('#year',new Date().getFullYear());
setText('#legalOwner',SITE.brand.legal.owner);
setText('#legalAddress',SITE.brand.legal.address);
setText('#legalPhone',SITE.brand.legal.phone);
setText('#legalEmail',SITE.brand.legal.email);
setText('#privacyOwner',SITE.brand.legal.owner);
setText('#privacyAddress',SITE.brand.legal.address);
setText('#privacyEmail',SITE.brand.legal.email);
setText('#privacyText',SITE.legal.privacyText);
setText('#cookieText',SITE.legal.cookieText);

const icons=['✦','◇','◫'];
$('#servicesGrid').innerHTML=SITE.services.map((s,i)=>`<article class="service" data-service-index="${i}">
  <span class="service-num">${esc(s.number)}</span>
  <div class="service-icon">${icons[i]||'✦'}</div>
  <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
  <button class="service-link" type="button">MEHR ERFAHREN <span>↗</span></button>
</article>`).join('');

$('#processGrid').innerHTML=SITE.process.map(s=>`<article class="step"><div class="step-num">${esc(s[0])}</div><h3>${esc(s[1])}</h3><p>${esc(s[2])}</p></article>`).join('');

const projectIcons=['✦','◇','◫'];
$('#projectsGrid').innerHTML=SITE.projects.map((p,i)=>`<button class="project project-button" type="button" data-project-index="${i}">
  <span class="project-num">${String(i+1).padStart(2,'0')}</span>
  <div class="project-icon">${projectIcons[i]||'✦'}</div>
  <div class="project-content"><span class="tag">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div>
  <span class="project-open">GALERIE ÖFFNEN <span>↗</span></span>
</button>`).join('');

$('#statsGrid').innerHTML=SITE.stats.map(([v,l])=>`<div class="stat"><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('');
$('#faqList').innerHTML=SITE.faq.map(([q,a])=>`<article class="faq-item"><div class="faq-question"><span>${esc(q)}</span><span>+</span></div><div class="faq-answer" hidden>${esc(a)}</div></article>`).join('');

document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-question'),a=item.querySelector('.faq-answer');
  q.addEventListener('click',()=>{const open=!a.hidden;a.hidden=open;item.classList.toggle('open',!open);q.lastElementChild.textContent=open?'+':'−'});
});

// Cookie banner
const cookieBanner=$('#cookieBanner'),cookieKey='jdd_cookie_choice';
let savedCookieChoice=null;
try{savedCookieChoice=localStorage.getItem(cookieKey)}catch(e){}
if(cookieBanner&&!savedCookieChoice) cookieBanner.hidden=false;
const closeCookie=c=>{try{localStorage.setItem(cookieKey,c)}catch(e){} if(cookieBanner)cookieBanner.hidden=true};
const cookieAccept=$('#cookieAccept'),cookieNecessary=$('#cookieNecessary'),cookieSettings=$('#cookieSettings');
if(cookieAccept)cookieAccept.addEventListener('click',()=>closeCookie('accepted'));
if(cookieNecessary)cookieNecessary.addEventListener('click',()=>closeCookie('necessary'));
if(cookieSettings)cookieSettings.addEventListener('click',()=>{if(cookieBanner){cookieBanner.hidden=false;cookieBanner.scrollIntoView({block:'nearest'})}});

// Mobile menu
const menuButton=$('.menu');
if(menuButton)menuButton.addEventListener('click',()=>{
  const nav=document.querySelector('.nav nav'),open=nav.dataset.open==='true';
  nav.dataset.open=String(!open);
  nav.style.display=open?'none':'flex';
  if(!open){nav.style.position='absolute';nav.style.top='78px';nav.style.left='0';nav.style.right='0';nav.style.padding='22px 5vw';nav.style.background='rgba(4,6,11,.98)';nav.style.flexDirection='column';nav.style.alignItems='flex-start';nav.style.borderBottom='1px solid #1c2633'}
});

document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=1000){const nav=document.querySelector('.nav nav');nav.dataset.open='false';nav.style.display='none'}}));

if(window.emailjs){emailjs.init({publicKey:SITE.emailjs.publicKey});}
const projectForm=$('#projectForm'),formError=$('#formError'),formSuccess=$('#formSuccess');
if(projectForm)projectForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=projectForm.querySelector('.form-submit'),original=btn.innerHTML;
  formError.hidden=true;formSuccess.hidden=true;btn.disabled=true;btn.innerHTML='WIRD GESENDET …';
  try{if(!window.emailjs)throw new Error('EmailJS konnte nicht geladen werden.');await emailjs.sendForm(SITE.emailjs.serviceId,SITE.emailjs.inquiryTemplateId,projectForm);projectForm.reset();window.location.href='./thanks.html'}
  catch(err){console.error('EmailJS error:',err);formError.hidden=false;btn.disabled=false;btn.innerHTML=original}
});

// Service detail modals
const serviceModal=$('#serviceModal');
const closeService=()=>{if(!serviceModal)return;serviceModal.hidden=true;serviceModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
document.querySelectorAll('.service-link').forEach(btn=>btn.addEventListener('click',e=>{
  e.stopPropagation();
  const i=Number(btn.closest('.service').dataset.serviceIndex),s=SITE.services[i];
  $('#serviceModalEyebrow').textContent=`${s.number} / ${s.title}`;
  $('#serviceModalTitle').innerHTML=s.modalTitle||s.title;
  $('#serviceModalLead').textContent=s.details||s.text;
  $('#serviceModalDetails').innerHTML=(s.points||[]).map(x=>`<div><span>✦</span><p>${esc(x)}</p></div>`).join('');
  serviceModal.hidden=false;serviceModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
}));
document.querySelectorAll('[data-close-service]').forEach(x=>x.addEventListener('click',closeService));

// Work galleries: upload assets/gallery/<category>/01.jpg, 02.jpg, ... and nothing else in the JS is required.
const galleryModal=$('#galleryModal'),galleryGrid=$('#galleryGrid');
const galleryFolders=['logo-branding','thumbnails','websites'];
const galleryTitles=['Logo & Branding','Thumbnails','Websites'];
const galleryCategories=['LOGO & BRANDING','THUMBNAIL DESIGN','WEB DESIGN'];
function openGallery(i){
  const p=SITE.projects[i]||SITE.projects[0],folder=galleryFolders[i]||galleryFolders[0];
  $('#galleryCategory').textContent=galleryCategories[i]||p.category;
  $('#galleryTitle').textContent=galleryTitles[i]||p.title;
  if(!galleryModal||!galleryGrid)return;
  galleryGrid.innerHTML='<div class="gallery-loading" aria-label="Galerie wird geladen"></div>';
  galleryModal.hidden=false;galleryModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');

  // Only probe until the gallery has a few consecutive missing numbers.
  // This avoids firing dozens of requests for files that do not exist.
  const extensions=['jpg','jpeg','png','webp'];
  const loadedImages=[];
  let number=1, consecutiveMissing=0, cancelled=false;

  const loadNext=()=>{
    if(cancelled || number>18 || consecutiveMissing>=3){finishGallery();return;}
    const current=String(number).padStart(2,'0');
    let index=0, found=false;

    const tryExtension=()=>{
      if(index>=extensions.length){
        consecutiveMissing=found?0:consecutiveMissing+1;
        number++;
        loadNext();
        return;
      }
      const src=`assets/gallery/${folder}/${current}.${extensions[index++]}`;
      const probe=new Image();
      probe.onload=()=>{
        if(!found){found=true;loadedImages.push({src,order:number});}
        tryExtension();
      };
      probe.onerror=tryExtension;
      probe.src=src;
    };
    tryExtension();
  };

  const finishGallery=()=>{
    loadedImages.sort((a,b)=>a.order-b.order);
    galleryGrid.innerHTML='';
    if(!loadedImages.length){
      galleryGrid.innerHTML='<div class="gallery-empty">Noch keine Arbeiten in dieser Galerie.<br><span>Lege deine Bilder in den passenden Ordner unter <b>assets/gallery/</b>.</span></div>';
      return;
    }
    loadedImages.forEach(({src})=>{
      const img=document.createElement('img');
      img.src=src;
      img.alt=`${galleryTitles[i]||p.title}`;
      img.decoding='async';
      galleryGrid.appendChild(img);
    });
  };

  loadNext();
}
document.querySelectorAll('.project-button').forEach(btn=>btn.addEventListener('click',()=>openGallery(Number(btn.dataset.projectIndex))));
const closeGallery=()=>{if(!galleryModal)return;galleryModal.hidden=true;galleryModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
document.querySelectorAll('[data-close-gallery]').forEach(x=>x.addEventListener('click',closeGallery));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeService();closeGallery()}});

// Reviews: keep all reviews, show 6 at a time. From 8 reviews onward a clear expand control appears; expanded view uses pages.
const reviewForm=$('#reviewForm'),reviewList=$('#reviewList'),reviewControls=$('#reviewControls'),reviewToggle=$('#reviewToggle'),reviewPages=$('#reviewPages');
let stored=[];
try{stored=JSON.parse(localStorage.getItem('jdd_reviews')||'[]')}catch(e){stored=[]}
let reviewsExpanded=false,currentReviewPage=1;
const REVIEWS_PER_PAGE=6;
function renderReviews(){
  const total=stored.length;
  const avg=total?stored.reduce((a,r)=>a+Number(r.rating),0)/total:5;
  setText('#ratingAverage',avg.toFixed(1));
  setText('#ratingStars','★★★★★');
  setText('#ratingCount',total?`${total} Bewertung${total===1?'':'en'}`:'Noch keine Bewertungen');
  if(!reviewList)return;
  if(total===0){reviewList.innerHTML='';if(reviewControls)reviewControls.hidden=true;return}
  const paged=reviewsExpanded&&total>=8;
  const pageCount=Math.max(1,Math.ceil(total/REVIEWS_PER_PAGE));
  currentReviewPage=Math.min(currentReviewPage,pageCount);
  const start=paged?(currentReviewPage-1)*REVIEWS_PER_PAGE:0;
  const visible=paged?stored.slice(start,start+REVIEWS_PER_PAGE):stored.slice(0,6);
  reviewList.innerHTML=visible.map(r=>`<article class="review-card"><strong>${esc(r.name)}</strong><div class="mini-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p>${esc(r.text||'Bewertung abgegeben.')}</p></article>`).join('');
  if(reviewControls)reviewControls.hidden=total<8;
  if(reviewToggle)reviewToggle.textContent=reviwsToggleText(total);
  if(total>=8&&reviewsExpanded&&reviewPages){
    reviewPages.hidden=false;
    reviewPages.innerHTML=Array.from({length:pageCount},(_,i)=>`<button type="button" class="review-page ${i+1===currentReviewPage?'active':''}" data-review-page="${i+1}">${i+1}</button>`).join('');
    reviewPages.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{currentReviewPage=Number(b.dataset.reviewPage);renderReviews()}));
  }else if(reviewPages) reviewPages.hidden=true;
}
function reviwsToggleText(total){return reviewsExpanded?`Bewertungen einklappen ↑`:`Alle ${total} Bewertungen anzeigen ↓`}
if(reviewToggle)reviewToggle.addEventListener('click',()=>{reviewsExpanded=!reviewsExpanded;currentReviewPage=1;renderReviews()});
if(reviewForm)reviewForm.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(reviewForm),r={name:fd.get('reviewerName'),text:fd.get('reviewText'),rating:Number(fd.get('rating'))};stored.push(r);try{localStorage.setItem('jdd_reviews',JSON.stringify(stored))}catch(err){} reviewForm.reset();const star5=$('#star5');if(star5)star5.checked=true;if(stored.length>=8)reviewsExpanded=true;currentReviewPage=1;renderReviews()});
renderReviews();

(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,nav=$('#nav'),progress=document.querySelector('.scroll-progress span'),loader=document.querySelector('.page-loader');
  addEventListener('load',()=>{if(loader)loader.classList.add('loaded')});
  const scroll=()=>{if(nav)nav.classList.toggle('scrolled',scrollY>25);const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${max>0?scrollY/max*100:0}%`};
  addEventListener('scroll',scroll,{passive:true});scroll();
  if(!reduce&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in-view');io.unobserve(x.target)}}),{threshold:.1,rootMargin:'0px 0px -40px'});document.querySelectorAll('.reveal').forEach(x=>io.observe(x))}
  if(!reduce&&matchMedia('(pointer:fine)').matches){
    document.body.classList.add('has-cursor');const dot=$('.cursor-dot');let x=0,y=0;
    if(!dot)return;
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.opacity='1';dot.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`});
    document.addEventListener('pointerover',e=>{if(e.target.closest('button,a,.service,.project,.glass,.cookie-btn'))dot.classList.add('active')});
    document.addEventListener('pointerout',e=>{if(e.target.closest('button,a,.service,.project,.glass,.cookie-btn'))dot.classList.remove('active')});
    addEventListener('pointerleave',()=>dot.style.opacity='0');
    document.querySelectorAll('.service,.project,.glass').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)}));
    const art=$('.hero-art');if(art)addEventListener('pointermove',e=>{const px=(e.clientX/innerWidth-.5)*5,py=(e.clientY/innerHeight-.5)*4;art.style.transform=`translate(${px}px,${py}px)`});
    document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect(),mx=e.clientX-r.left-r.width/2,my=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${mx*.1}px,${my*.1}px)`});btn.addEventListener('pointerleave',()=>btn.style.transform='')});
  }
})();