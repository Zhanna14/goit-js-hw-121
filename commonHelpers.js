import{i as l,S as d,a as u}from"./assets/vendor-24f26945.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();function m(t){const n=`https://pixabay.com/api/?key=43190537-4b40a622c8cb8590492e33b18&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(n).then(r=>{if(!r.ok)throw new Error("Failed to fetch images");return r.json()}).then(r=>(r.hits.length===0&&l.error({title:"Sorry",message:"There are no images matching your search query. Please try again!",position:"topRight"}),r.hits)).catch(r=>{throw console.error("Error fetching images:",r),r})}let a=null,c=null;function h(){a=new u().spin(),document.getElementById("loader").appendChild(a.el)}function p(){a&&(a.stop(),document.getElementById("loader").innerHTML="")}function f(t){h();const s=document.getElementById("gallery");s.innerHTML="",t.forEach(n=>{const r=g(n);s.insertAdjacentHTML("beforeend",r)}),p(),c?c.refresh():y()}function g(t){return`<div class="card">
  <div class="image-container">
   <a href="${t.largeImageURL}" data-lightbox="image">
        <img src="${t.webformatURL}" alt="${t.tags}" class="image" />
      </a>
  </div>
  <table class="table">
        <tr> 
          <th class="options-name">Likes</th>
          <th class="options-name">Views</th>
          <th class="options-name">Comments</th>
          <th class="options-name">Downloads</th>
        </tr>
        <tr> 
          <td class="value-description">${t.likes}</td>
          <td class="value-description">${t.views}</td>
          <td class="value-description">${t.comments}</td>
          <td class="value-description">${t.downloads}</td>
        </tr>
    </table>
  </div>`}function y(){c=new d("#gallery a",{captionDelay:250,captionsData:"alt"})}const b=document.querySelector("form"),w=document.querySelector("#search-input");b.addEventListener("submit",async t=>{t.preventDefault();const s=w.value.trim();if(s==="")return displayErrorMessage("Please enter a search keyword"),l.error({message:"Please enter a search keyword",position:"topRight"});try{const n=await m(s);f(n)}catch(n){console.error("Error searching images:",n)}});
//# sourceMappingURL=commonHelpers.js.map
