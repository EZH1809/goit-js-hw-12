import{a as m,i as u,S as f}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();m.defaults.baseURL="https://pixabay.com/api/";const H="42552421-44c442bdd9fc0080a82eeb482";async function y(e,o,s){return await m.get(`?key=${H}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`)}const I=e=>{const o=document.querySelector(".gallery");if(e.length===0){u.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=e.map(({id:t,largeImageURL:r,webformatURL:n,tags:L,likes:S,views:v,comments:$,downloads:q})=>`
      <a class="gallery__link" href="${r}">
        <div class="gallery-item" id="${t}">
          <img class="gallery-item__img" src="${n}" alt="${L}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b>${S}</p>
            <p class="info-item"><b>Views</b>${v}</p>
            <p class="info-item"><b>Comments</b>${$}</p>
            <p class="info-item"><b>Downloads</b>${q}</p>
          </div>
        </div>
      </a>`).join("");o.insertAdjacentHTML("beforeend",s),new f(".gallery-item",{captionsData:"alt",captionDelay:250}).refresh()},P=document.getElementById("search-form"),g=document.querySelector(".gallery"),c=document.querySelector(".load-more-btn"),d=document.querySelector(".loader");let l="",i=1;const h=15;let p;M();P.addEventListener("submit",T);c.addEventListener("click",N);function b(e){if(d.style.display="none",(e.totalHits===0||e.hits&&e.hits.length===0)&&g.innerHTML.trim()==="")_();else{I(e.hits),p=new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh();const s=Math.ceil(e.totalHits/h);i>s?(c.classList.add("is-hidden"),O()):(c.classList.remove("is-hidden"),E(w()*2))}}function T(e){if(e.preventDefault(),i=1,l=e.currentTarget.searchQuery.value.trim(),g.innerHTML="",c.classList.add("is-hidden"),l===""){D();return}const o=e.currentTarget.searchQuery;o&&(o.value=""),y(l,i,h).then(({data:s})=>{b(s)}).catch(s=>console.log(s))}function w(){const e=document.querySelector(".gallery-item");return e?e.getBoundingClientRect().height:0}function E(e){window.scrollBy({top:e,behavior:"smooth"})}function M(){g.innerHTML=""}function N(){d.style.display="block",i+=1,p.destroy(),y(l,i,h).then(({data:e})=>{console.log("Total Hits after loading more:",e.totalHits),console.log("Number of hits after loading more:",e.hits.length),b(e)}).catch(e=>console.log(e)).finally(()=>{d.style.display="none"})}function D(){u.error({title:"Error",message:"The search string cannot be empty. Please specify your search query."})}function O(){u.error({title:"",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"})}function _(){u.error({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"})}
//# sourceMappingURL=commonHelpers.js.map
