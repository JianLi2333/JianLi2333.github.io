document.addEventListener("DOMContentLoaded",(function(){let e=!1;const t=()=>{btf.sidebarPaddingR(),document.body.style.overflow="hidden",btf.animateIn(document.getElementById("menu-mask"),"to_show 0.5s"),document.getElementById("sidebar-menus").classList.add("open"),e=!0},n=()=>{const t=document.body;t.style.overflow="",t.style.paddingRight="",btf.animateOut(document.getElementById("menu-mask"),"to_hide 0.5s"),document.getElementById("sidebar-menus").classList.remove("open"),e=!1},o=()=>{const e=GLOBAL_CONFIG.highlight;if(!e)return;const{highlightCopy:t,highlightLang:n,highlightHeightLimit:o,plugin:s}=e,i=GLOBAL_CONFIG_SITE.isHighlightShrink,c=t||n||void 0!==i,a="highlighjs"===s?document.querySelectorAll("figure.highlight"):document.querySelectorAll('pre[class*="language-"]');if(!c&&!o||!a.length)return;const l="prismjs"===s,d=!0===i?"closed":"",r=void 0!==i?'<i class="fas fa-angle-down expand"></i>':"",u=t?'<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>':"",m=e=>{const t=e.parentNode;t.classList.add("copy-true");const n=window.getSelection(),o=document.createRange(),s=l?"pre code":"table .code pre";o.selectNodeContents(t.querySelectorAll(`${s}`)[0]),n.removeAllRanges(),n.addRange(o);n.toString();((e,t)=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy"))if(document.execCommand("copy"),void 0!==GLOBAL_CONFIG.Snackbar)btf.snackbarShow(GLOBAL_CONFIG.copy.success);else{const e=t.previousElementSibling;e.textContent=GLOBAL_CONFIG.copy.success,e.style.opacity=1,setTimeout((()=>{e.style.opacity=0}),700)}else void 0!==GLOBAL_CONFIG.Snackbar?btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport):t.previousElementSibling.textContent=GLOBAL_CONFIG.copy.noSupport})(0,e.lastChild),n.removeAllRanges(),t.classList.remove("copy-true")},g=function(e){const t=e.target.classList;t.contains("expand")?this.classList.toggle("closed"):t.contains("copy-button")&&m(this)},h=function(){this.classList.toggle("expand-done")},f=(e,t,n)=>{const s=document.createDocumentFragment();if(c){const t=document.createElement("div");t.className=`highlight-tools ${d}`,t.innerHTML=r+e+u,btf.addEventListenerPjax(t,"click",g),s.appendChild(t)}if(o&&t.offsetHeight>o+30){const e=document.createElement("div");e.className="code-expand-btn",e.innerHTML='<i class="fas fa-angle-double-down"></i>',btf.addEventListenerPjax(e,"click",h),s.appendChild(e)}"hl"===n?t.insertBefore(s,t.firstChild):t.parentNode.insertBefore(s,t)};l?a.forEach((e=>{if(n){const t=`<div class="code-lang">${e.getAttribute("data-language")||"Code"}</div>`;btf.wrap(e,"figure",{class:"highlight"}),f(t,e)}else btf.wrap(e,"figure",{class:"highlight"}),f("",e)})):a.forEach((e=>{if(n){let t=e.getAttribute("class").split(" ")[1];"plain"!==t&&void 0!==t||(t="Code");f(`<div class="code-lang">${t}</div>`,e,"hl")}else f("",e,"hl")}))},s=async e=>{const t=await fetch(e);return await t.json()},i=(e,t,n=!1,o)=>{const s=t.length,i=new InfiniteGrid.JustifiedInfiniteGrid(e,{gap:5,isConstantSize:!0,sizeRange:[150,600],useResizeObserver:!0,observeChildren:!0,useTransform:!0});o&&btf.addGlobalFn("igOfTabs",(()=>{i.destroy()}),!1,o);const c=e=>e.replace(/"/g,"&quot;"),a=GLOBAL_CONFIG.infinitegrid.buttonText,l=(e,n)=>{i.append(((e,n)=>{const o=[],i=(e-1)*n;for(let e=0;e<n;++e){const n=i+e;if(n>=s)break;const a=t[n],l=a.alt?`alt="${c(a.alt)}"`:"",d=a.title?`title="${c(a.title)}"`:"";o.push(`<div class="item ">\n            <img src="${a.url}" data-grid-maintained-target="true" ${l+d} />\n          </div>`)}return o})(e,n),e)},d=Math.ceil(s/10),r=t=>{const{updated:o,isResize:s,mounted:c}=t;if(o.length&&c.length&&!s){if(btf.loadLightbox(e.querySelectorAll("img:not(.medium-zoom-image)")),i.getGroups().length===d)return btf.setLoading.remove(e),void i.off("renderComplete",r);n&&(btf.setLoading.remove(e),(e=>{const t=document.createElement("button");t.textContent=a;const n=t=>{t.target.removeEventListener("click",n),t.target.remove(),btf.setLoading.add(e),l(i.getGroups().length+1,10)};t.addEventListener("click",n),e.insertAdjacentElement("afterend",t)})(e))}},u=btf.debounce((e=>{const t=(+e.groupKey||0)+1;l(t,10),t===d&&i.off("requestAppend",u)}),300);btf.setLoading.add(e),i.on("renderComplete",r),n?l(1,10):(i.on("requestAppend",u),i.renderItems()),btf.addGlobalFn("justifiedGallery",(()=>{i.destroy()}))},c=async(e,t=!1)=>{const n=async()=>{for(const n of e){if(btf.isHidden(n))continue;if(t&&n.classList.contains("loaded")){n.querySelector(".gallery-items").innerHTML="";const e=n.querySelector(":scope > button"),t=n.querySelector(":scope > .loading-container");e&&e.remove(),t&&t.remove()}const e="true"===n.getAttribute("data-button"),o=n.firstElementChild.textContent;n.classList.add("loaded");const c="url"===n.getAttribute("data-type")?await s(o):JSON.parse(o);i(n.lastElementChild,c,e,t)}};"function"==typeof InfiniteGrid||await getScript(`${GLOBAL_CONFIG.infinitegrid.js}`),n()},a=()=>{const e=document.getElementById("rightside"),t=window.innerHeight+56;let n=0;const o=document.getElementById("page-header"),s="undefined"!=typeof chatBtn,i=GLOBAL_CONFIG.percent.rightside;if(document.body.scrollHeight<=t)return void e.classList.add("rightside-show");let c="";const a=btf.throttle((()=>{const a=window.scrollY||document.documentElement.scrollTop,l=(e=>{const t=e>n;return n=e,t})(a);a>56?(""===c&&(o.classList.add("nav-fixed"),e.classList.add("rightside-show")),l?"down"!==c&&(o.classList.remove("nav-visible"),s&&window.chatBtn.hide(),c="down"):"up"!==c&&(o.classList.add("nav-visible"),s&&window.chatBtn.show(),c="up")):(c="",0===a&&o.classList.remove("nav-fixed","nav-visible"),e.classList.remove("rightside-show")),i&&(e=>{const t=btf.getScrollPercent(e,document.body),n=document.getElementById("go-up");t<95?(n.classList.add("show-percent"),n.querySelector(".scroll-percent").textContent=t):n.classList.remove("show-percent")})(a),document.body.scrollHeight<=t&&e.classList.add("rightside-show")}),300);btf.addEventListenerPjax(window,"scroll",a,{passive:!0})},l=()=>{const e=GLOBAL_CONFIG_SITE.isToc,t=GLOBAL_CONFIG.isAnchor,n=document.getElementById("article-container");if(!n||!e&&!t)return;let o,s,i,c,a;if(e){const e=document.getElementById("card-toc");s=e.querySelector(".toc-content"),o=s.querySelectorAll(".toc-link"),c=e.querySelector(".toc-percentage"),a=s.classList.contains("is-expand");const t=t=>{const n=t.target.closest(".toc-link");n&&(t.preventDefault(),btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI(n.getAttribute("href")).replace("#",""))),300),window.innerWidth<900&&e.classList.remove("open"))};btf.addEventListenerPjax(s,"click",t),i=e=>{const t=e.getBoundingClientRect().top,n=s.scrollTop;t>document.documentElement.clientHeight-100&&(s.scrollTop=n+150),t<100&&(s.scrollTop=n-150)}}const l=n.querySelectorAll("h1,h2,h3,h4,h5,h6");let d="";const r=btf.throttle((()=>{const r=window.scrollY||document.documentElement.scrollTop;e&&GLOBAL_CONFIG.percent.toc&&(c.textContent=btf.getScrollPercent(r,n)),(n=>{if(0===n)return!1;let c="",r="";if(l.forEach(((e,t)=>{if(n>btf.getEleTop(e)-80){const n=e.id;c=n?"#"+encodeURI(n):"",r=t}})),d!==r&&(t&&btf.updateAnchor(c),d=r,e)){if(s.querySelectorAll(".active").forEach((e=>{e.classList.remove("active")})),""===c)return;const e=o[r];if(e.classList.add("active"),setTimeout((()=>{i(e)}),0),a)return;let t=e.parentNode;for(;!t.matches(".toc");t=t.parentNode)t.matches("li")&&t.classList.add("active")}})(r)}),100);btf.addEventListenerPjax(window,"scroll",r,{passive:!0})},d=e=>{const t=(window.globalFn||{}).themeChange||{};t&&Object.keys(t).forEach((n=>{const o=t[n];["disqus","disqusjs"].includes(n)?setTimeout((()=>o(e)),300):o(e)}))},r={readmode:()=>{const e=document.body;e.classList.add("read-mode");const t=document.createElement("button");t.type="button",t.className="fas fa-sign-out-alt exit-readmode",e.appendChild(t);const n=()=>{e.classList.remove("read-mode"),t.remove(),t.removeEventListener("click",n)};t.addEventListener("click",n)},darkmode:()=>{const e="dark"===document.documentElement.getAttribute("data-theme")?"light":"dark";"dark"===e?(activateDarkMode(),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)):(activateLightMode(),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),saveToLocal.set("theme",e,2),d(e)},"rightside-config":e=>{const t=e.firstElementChild;t.classList.contains("show")&&(t.classList.add("status"),setTimeout((()=>{t.classList.remove("status")}),300)),t.classList.toggle("show")},"go-up":()=>{btf.scrollToDest(0,500)},"hide-aside-btn":()=>{const e=document.documentElement.classList,t=e.contains("hide-aside")?"show":"hide";saveToLocal.set("aside-status",t,2),e.toggle("hide-aside")},"mobile-toc-button":e=>{const t=document.getElementById("card-toc");t.style.transition="transform 0.3s ease-in-out",t.classList.toggle("open"),t.addEventListener("transitionend",(()=>{t.style.transition=""}),{once:!0})},"chat-btn":()=>{window.chatBtnFn()},translateLink:()=>{window.translateFn.translatePage()}};document.getElementById("rightside").addEventListener("click",(function(e){const t=e.target.closest("[id]");t&&r[t.id]&&r[t.id](this)}));const u=()=>{const e=document.querySelectorAll("#article-container .hide-button");if(!e.length)return;const t=function(e){this.classList.add("open");const t=this.nextElementSibling.querySelectorAll(".gallery-container");t.length&&c(t)};e.forEach((e=>{e.addEventListener("click",t,{once:!0})}))},m=()=>{const e=document.querySelectorAll("#article-container .tabs");if(!e.length)return;const t=(e,t)=>{Array.from(e).forEach((e=>{e.classList.remove("active"),e!==t&&e.id!==t||e.classList.add("active")}))},n=(e,n)=>{btf.addEventListenerPjax(e.firstElementChild,"click",(function(e){const o=e.target.closest("button");if(o.classList.contains("active"))return;t(this.children,o),this.classList.remove("no-default");const s=o.getAttribute("data-href"),i=this.nextElementSibling;if(t(i.children,s),n){btf.removeGlobalFnEvent("igOfTabs",this);const e=i.querySelectorAll(`:scope > #${s} .gallery-container`);e.length&&c(e,this)}}))};e.forEach((e=>{const t=!!e.querySelectorAll(".gallery-container");n(e,t),(e=>{btf.addEventListenerPjax(e.lastElementChild,"click",(t=>{t.target.closest("button")&&btf.scrollToDest(btf.getEleTop(e),300)}))})(e)}))},g=function(e){e.forEach((e=>{const t=e.getAttribute("datetime");e.textContent=btf.diffDate(t,!0),e.style.display="inline"}))};window.refreshFn=function(){GLOBAL_CONFIG_SITE.isPost?(void 0!==GLOBAL_CONFIG.noticeOutdate&&(()=>{const{limitDay:e,messagePrev:t,messageNext:n,position:o}=GLOBAL_CONFIG.noticeOutdate,s=btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);if(s>=e){const e=document.createElement("div");e.className="post-outdate-notice",e.textContent=`${t} ${s} ${n}`;const i=document.getElementById("article-container");"top"===o?i.insertBefore(e,i.firstChild):i.appendChild(e)}})(),GLOBAL_CONFIG.relativeDate.post&&g(document.querySelectorAll("#post-meta time"))):(GLOBAL_CONFIG.relativeDate.homepage&&g(document.querySelectorAll("#recent-posts time")),GLOBAL_CONFIG.runtime&&(()=>{const e=document.getElementById("runtimeshow");if(e){const t=e.getAttribute("data-publishDate");e.textContent=`${btf.diffDate(t)} ${GLOBAL_CONFIG.runtime}`}})(),(()=>{const e=document.getElementById("last-push-date");if(e){const t=e.getAttribute("data-lastPushDate");e.textContent=btf.diffDate(t,!0)}})(),(()=>{const e=document.querySelector("#aside-cat-list.expandBtn");if(!e)return;btf.addEventListenerPjax(e,"click",(e=>{const t=e.target;"I"===t.nodeName&&(e.preventDefault(),t.parentNode.classList.toggle("expand"))}),!0)})()),l(),GLOBAL_CONFIG_SITE.isHome&&(()=>{const e=document.getElementById("scroll-down");e&&btf.addEventListenerPjax(e,"click",(()=>{btf.scrollToDest(document.getElementById("content-inner").offsetTop,300)}))})(),o(),GLOBAL_CONFIG.isPhotoFigcaption&&document.querySelectorAll("#article-container img").forEach((e=>{const t=e.title||e.alt;if(!t)return;const n=document.createElement("div");n.className="img-alt is-center",n.textContent=t,e.insertAdjacentElement("afterend",n)})),a(),btf.removeGlobalFnEvent("justifiedGallery");const e=document.querySelectorAll("#article-container .gallery-container");e.length&&c(e),btf.loadLightbox(document.querySelectorAll("#article-container img:not(.no-lightbox)")),(()=>{const e=document.querySelectorAll("#article-container table");e.length&&e.forEach((e=>{e.closest(".highlight")||btf.wrap(e,"div",{class:"table-wrap"})}))})(),u(),m(),(()=>{const e=document.getElementById("switch-btn");if(!e)return;let t=!1;const n=document.getElementById("post-comment");btf.addEventListenerPjax(e,"click",(()=>{n.classList.toggle("move"),t||(t=!0,loadOtherComment())}))})(),btf.addEventListenerPjax(document.getElementById("toggle-menu"),"click",(()=>{t()}))},refreshFn(),window.addEventListener("resize",(()=>{e&&btf.isHidden(document.getElementById("toggle-menu"))&&n()})),document.getElementById("menu-mask").addEventListener("click",(e=>{n()})),document.querySelector("#sidebar-menus .menus_items").addEventListener("click",(e=>{const t=e.target.closest(".site-page.group");t&&t.classList.toggle("hide")})),GLOBAL_CONFIG.islazyload&&(window.lazyLoadInstance=new LazyLoad({elements_selector:"img",threshold:0,data_src:"lazy-src"})),void 0!==GLOBAL_CONFIG.copyright&&(()=>{const{limitCount:e,languages:t}=GLOBAL_CONFIG.copyright;document.body.addEventListener("copy",(n=>{n.preventDefault();const o=window.getSelection(0).toString();let s=o;return o.length>e&&(s=`${o}\n\n\n${t.author}\n${t.link}${window.location.href}\n${t.source}\n${t.info}`),n.clipboardData?n.clipboardData.setData("text",s):window.clipboardData.setData("text",s)}))})(),GLOBAL_CONFIG.autoDarkmode&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>{void 0===saveToLocal.get("theme")&&(e.matches?d("dark"):d("light"))}))}));