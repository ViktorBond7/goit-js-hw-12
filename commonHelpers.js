import{S as w,i as u,a as L}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const v=document.querySelector(".form"),p=document.querySelector(".gallery"),y=document.querySelector(".loader"),a=document.querySelector('button[data-action="load-more"]'),S=document.querySelector(".search-input");y.style.display="none";y.style.display="blok";a.style.display="none";let i=1,f=3,c="";const q=new w(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});async function d(o){c=o;const t={key:"41712066-bd7b5e249df7a86bd45ef70ea",q:c,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:f},s=new URLSearchParams(t);try{return(await L.get(`https://pixabay.com/api/?${s}`)).data}catch(n){console.error(n)}finally{y.style.display="none"}}async function m(o){if(o.hits.length>0){const t=o.hits.reduce((s,{webformatURL:n,largeImageURL:e,tags:r,likes:l,views:g,comments:h,downloads:b})=>s+`<li class="gallery-item">
          <a class="gallery-link" href="${e}">
           <img class="gallery-image"
           src="${n}"
           alt="${r}"
           />
          </a>
          <div class="description">
          <p><b>Likes</b>${l}</p>
          <p><b>Views</b>${g}</p>
          <p><b>Comments</b>${h}</p>
          <p><b>Downloads</b>${b}</p>
          </div>
        </li>`,"");p.insertAdjacentHTML("beforeend",t),q.refresh(),a.style.display="block"}else a.style.display="none",u.error({position:"topRight",width:"10px",message:"Sorry, there are no images matching your search query. Please try again"})}v.addEventListener("submit",async o=>{o.preventDefault(),p.innerHTML="",y.style.display="block",i=1;const t=S.value.trim(),s=await d(t);m(s),o.target.reset()});const I=()=>{const t=document.querySelector(".gallery-item:first-child").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})};a.addEventListener("click",async()=>{const{totalHits:o}=await d(c);if(i*f>=o)u.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),a.style.display="none";else{a.style.display="flex",i+=1;const t=await d(c);m(t),I()}});
//# sourceMappingURL=commonHelpers.js.map
