import{a as L,S as v,i as d}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();function w(o){const{webformatURL:t,largeImageURL:i,tags:s,likes:e,views:r,comments:n,downloads:b}=o;return`<li class="gallery-item">
          <a class="gallery-link" href="${i}">
           <img class="gallery-image"
           src="${t}"
           alt="${s}"
           />
          </a>
          <div class="description">
          <p><b>Likes</b>${e}</p>
          <p><b>Views</b>${r}</p>
          <p><b>Comments</b>${n}</p>
          <p><b>Downloads</b>${b}</p>
          </div>
        </li>`}function R(o){return o.map(w).join("")}async function m(o,t){const i="41712066-bd7b5e249df7a86bd45ef70ea",s="https://pixabay.com/api/",e={key:i,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await L.get(s,{params:e})).data}const a={searchFormRes:document.querySelector(".form"),imageGalleryRes:document.querySelector(".gallery"),btnLoadMore:document.querySelector('button[data-action="load-more"]'),loadElem:document.querySelector(".loader")},E=new v(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});let c,l,f;a.searchFormRes.addEventListener("submit",S);a.btnLoadMore.addEventListener("click",q);async function S(o){if(o.preventDefault(),c=o.target.elements.query.value.trim(),l=1,!c){u("Empty field");return}p();try{const t=await m(c,l);if(t.totalHits===0){d.error({position:"topRight",width:"10px",message:"Sorry, there are no images matching your search query. Please try again"});return}f=Math.ceil(t.totalHits/15),a.imageGalleryRes.innerHTML="",h(t.hits)}catch(t){u(t)}y(),g(),o.target.reset()}async function q(){l+=1,p();const o=await m(c,l);h(o.hits),y(),g();const t=a.imageGalleryRes.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:t*2})}function h(o){const t=R(o);a.imageGalleryRes.insertAdjacentHTML("beforeend",t),E.refresh()}function M(){a.btnLoadMore.classList.remove("hidden")}function k(){a.btnLoadMore.classList.add("hidden")}function p(){a.loadElem.classList.remove("hidden")}function y(){a.loadElem.classList.add("hidden")}function u(o){d.error({title:"Error",message:o})}function g(){l>=f?(k(),d.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):M()}
//# sourceMappingURL=commonHelpers.js.map
