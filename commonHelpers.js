import{a as f,i as l,S as y}from"./assets/vendor-64b55ca9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const p="https://pixabay.com/api/",g="42552421-44c442bdd9fc0080a82eeb482";async function E(n){const t=`${p}?key=${g}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`;try{const e=await f.get(t);if(e.status!==200)throw new Error(`HTTP error! Status: ${e.status}`);const o=e.data;if(!o.hits||o.hits.length===0)throw new Error("No images found for the given query.");return o.hits}catch(e){throw console.error("Error fetching images:",e),e}}const w=n=>{const t=document.getElementById("gallery"),e=document.getElementById("load-more-btn"),o=document.getElementById("loading-indicator");for(;t.firstChild;)t.removeChild(t.firstChild);if(n.length===0){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),e.style.display="none",o.style.display="none";return}n.forEach(s=>{const a=C(s);t.appendChild(a)}),new y(".gallery-item",{captionsData:"alt",captionDelay:250}).refresh()},C=n=>{const t=document.createElement("a");t.classList.add("gallery-item"),t.href=n.largeImageURL;const e=document.createElement("img");e.src=n.webformatURL,e.alt=n.tags;const o=document.createElement("div");o.classList.add("gallery-item-info");const r=i("Likes",n.likes),s=i("Views",n.views),a=i("Comments",n.comments),h=i("Downloads",n.downloads);return o.appendChild(r),o.appendChild(s),o.appendChild(a),o.appendChild(h),t.appendChild(e),t.appendChild(o),t},i=(n,t)=>{const e=document.createElement("div");e.classList.add("gallery-item-info-element");const o=document.createElement("span");o.textContent=`${n}: `;const r=document.createElement("span");return r.textContent=t,e.appendChild(o),e.appendChild(r),e},L=document.getElementById("search-form"),c=document.getElementById("search-input"),u=document.querySelector(".loader");document.getElementById("load-more-btn");function d(){const n=document.getElementById("gallery");n.innerHTML=""}function m(){u.style.display="none"}const I=()=>{u.style.display="block"};L.addEventListener("submit",function(n){n.preventDefault();const t=c.value.trim();if(d(),t===""){l.warning({title:"Warning",message:"Please enter a search term."}),d(),m();return}I(),E(t).then(e=>{e.length===0?l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."}):(w(e),c.value="")}).catch(e=>{console.error("Error in search:",e),c.value="",l.error({title:"Error",message:"An error occurred while fetching images. Please try again."})}).finally(()=>{m()})});
//# sourceMappingURL=commonHelpers.js.map
