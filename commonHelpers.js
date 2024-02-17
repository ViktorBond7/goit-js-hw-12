import{a as v,S as w,i as u}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();function R(r){const{webformatURL:t,largeImageURL:n,tags:s,likes:e,views:o,comments:i,downloads:L}=r;return`<li class="gallery-item">
          <a class="gallery-link" href="${n}">
           <img class="gallery-image"
           src="${t}"
           alt="${s}"
           />
          </a>
          <div class="description">
          <p><b>Likes</b>${e}</p>
          <p><b>Views</b>${o}</p>
          <p><b>Comments</b>${i}</p>
          <p><b>Downloads</b>${L}</p>
          </div>
        </li>`}function E(r){return r.map(R).join("")}async function f(r,t,n){const s="41712066-bd7b5e249df7a86bd45ef70ea",e="https://pixabay.com/api/",o={key:s,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:t};return(await v.get(e,{params:o})).data}const a={searchFormRes:document.querySelector(".form"),imageGalleryRes:document.querySelector(".gallery"),btnLoadMore:document.querySelector('button[data-action="load-more"]'),loadElem:document.querySelector(".loader")},S=new w(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});let c,l,h,d=15;a.searchFormRes.addEventListener("submit",q);a.btnLoadMore.addEventListener("click",M);async function q(r){if(r.preventDefault(),c=r.target.elements.query.value.trim(),l=1,!c){m("Empty field");return}g();try{const t=await f(c,l,d);if(t.totalHits===0){u.error({position:"topRight",width:"10px",message:"Sorry, there are no images matching your search query. Please try again"});return}h=Math.ceil(t.totalHits/d),a.imageGalleryRes.innerHTML="",p(t.hits)}catch(t){m(t)}y(),b(),r.target.reset()}async function M(){l+=1,g();const r=await f(c,l,d);p(r.hits),y(),b();const t=a.imageGalleryRes.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:t*2})}function p(r){const t=E(r);a.imageGalleryRes.insertAdjacentHTML("beforeend",t),S.refresh()}function k(){a.btnLoadMore.classList.remove("hidden")}function $(){a.btnLoadMore.classList.add("hidden")}function g(){a.loadElem.classList.remove("hidden")}function y(){a.loadElem.classList.add("hidden")}function m(r){u.error({title:"Error",message:r})}function b(){l>=h?($(),u.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):k()}
//# sourceMappingURL=commonHelpers.js.map
