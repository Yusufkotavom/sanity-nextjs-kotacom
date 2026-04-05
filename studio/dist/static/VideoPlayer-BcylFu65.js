import{R as tl,r as il,c as RA,j as DA}from"./sanity-hzCFaQqv.js";import{T as pv,i as rc,F as xA,q as OA,B as $A,a as PA,K as NA,g as UA,M as HA,G as BA,L as WA,_ as FA,p as VA,S as KA,I as GA,f as YA,y as qA,b as ZA,Q as Ra,j as zA,J as QA,m as lm,E as XA,c as JA,C as jA,d as pt,x as he,V as Db,v as xb,e as ae,h as it,r as No,k as $h,l as eT,n as tT}from"./castable-mixin-DhIkxqA0.js";import{C as Cl,M as iT}from"./mixin-BY5xW4uI.js";import"./hls-CplUDmW5.js";const w={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},z={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Ob={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_WIDTH:"mediaWidth"},$b=Object.entries(Ob),u=$b.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),aT={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Ln=$b.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...aT});Object.entries(Ln).reduce((t,[e,i])=>{const a=u[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const nT=Object.entries(u).reduce((t,[e,i])=>{const a=Ln[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),xi={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},Hr={DISABLED:"disabled",SHOWING:"showing"},M0={MOUSE:"mouse",TOUCH:"touch"},bt={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Zi={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},rT={FULLSCREEN:"fullscreen"};function sT(t){return t?.map(lT).join(" ")}function oT(t){return t?.split(/\s+/).map(dT)}function lT(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(n=>n!=null).join(":")}}function dT(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function uT(t){return t?.map(hT).join(" ")}function cT(t){return t?.split(/\s+/).map(mT)}function hT(t){if(t){const{id:e,kind:i,language:a,label:n}=t;return[e,i,a,n].filter(r=>r!=null).join(":")}}function mT(t){if(t){const[e,i,a,n]=t.split(":");return{id:e,kind:i,language:a,label:n}}}function pT(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function vv(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}function Pb(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}const Nb=t=>new Promise(e=>setTimeout(e,t)),L0=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],vT=(t,e)=>{const i=t===1?L0[e].singular:L0[e].plural;return`${t} ${i}`},Uo=t=>{if(!vv(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((o,d)=>o&&vT(o,d)).filter(o=>o).join(", ")}${i?" remaining":""}`};function xa(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),n=Math.floor(t/60%60),r=Math.floor(t/3600);const s=Math.floor(e/60%60),o=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(r=n=a="0"),r=r>0||o>0?r+":":"",n=((r||s>=10)&&n<10?"0"+n:n)+":",a=a<10?"0"+a:a,(i?"-":"")+r+n+a}const ET={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var w0;const Ph={en:ET};let dm=((w0=globalThis.navigator)==null?void 0:w0.language)||"en";const bT=t=>{dm=t},gT=t=>{var e,i,a;const[n]=dm.split("-");return((e=Ph[dm])==null?void 0:e[t])||((i=Ph[n])==null?void 0:i[t])||((a=Ph.en)==null?void 0:a[t])||t},L=(t,e={})=>gT(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`);let Ub=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},Hb=class extends Ub{},C0=class extends Hb{constructor(){super(...arguments),this.role=null}},fT=class{observe(){}unobserve(){}disconnect(){}};const Bb={createElement:function(){return new al.HTMLElement},createElementNS:function(){return new al.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},al={ResizeObserver:fT,document:Bb,Node:Hb,Element:C0,HTMLElement:class extends C0{constructor(){super(...arguments),this.innerHTML=""}get content(){return new al.DocumentFragment}},DocumentFragment:class extends Ub{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{parseFromString(e,i){return{body:{textContent:e}}}}},Wb=typeof window>"u"||typeof window.customElements>"u",Fb=Object.keys(al).every(t=>t in globalThis),p=Wb&&!Fb?al:globalThis,Ce=Wb&&!Fb?Bb:globalThis.document,R0=new WeakMap,Ev=t=>{let e=R0.get(t);return e||R0.set(t,e=new Set),e},Vb=new p.ResizeObserver(t=>{for(const e of t)for(const i of Ev(e.target))i(e)});function jr(t,e){Ev(t).add(e),Vb.observe(t)}function es(t,e){const i=Ev(t);i.delete(e),i.size||Vb.unobserve(t)}function vt(t){const e={};for(const i of t)e[i.name]=i.value;return e}function Lt(t){var e;return(e=um(t))!=null?e:cs(t,"media-controller")}function um(t){var e;const{MEDIA_CONTROLLER:i}=z,a=t.getAttribute(i);if(a)return(e=jc(t))==null?void 0:e.getElementById(a)}const Kb=(t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},_T=(t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Gb=(t,e)=>_T(t,e)[0],ta=(t,e)=>!t||!e?!1:t?.contains(e)?!0:ta(t,e.getRootNode().host),cs=(t,e)=>{if(!t)return null;const i=t.closest(e);return i||cs(t.getRootNode().host,e)};function bv(t=document){var e;const i=t?.activeElement;return i?(e=bv(i.shadowRoot))!=null?e:i:null}function jc(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function Yb(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let n=t;for(;n&&e>0;){const r=getComputedStyle(n);if(i&&r.opacity==="0"||a&&r.visibility==="hidden"||r.display==="none")return!1;n=n.parentElement,e--}return!0}function AT(t,e,i,a){const n=a.x-i.x,r=a.y-i.y,s=n*n+r*r;if(s===0)return 0;const o=((t-i.x)*n+(e-i.y)*r)/s;return Math.max(0,Math.min(1,o))}function Se(t,e){const i=TT(t,a=>a===e);return i||qb(t,e)}function TT(t,e){var i,a;let n;for(n of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let r;try{r=(a=n.sheet)==null?void 0:a.cssRules}catch{continue}for(const s of r??[])if(e(s.selectorText))return s}}function qb(t,e){var i,a;const n=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],r=n?.[n.length-1];return r?.sheet?(r?.sheet.insertRule(`${e}{}`,r.sheet.cssRules.length),(a=r.sheet.cssRules)==null?void 0:a[r.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function ne(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}function be(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}ne(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function G(t,e){return t.hasAttribute(e)}function Y(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}G(t,e)!=i&&t.toggleAttribute(e,i)}function se(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function oe(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;se(t,e,void 0)!==a&&t.setAttribute(e,a)}var Zb=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},na=(t,e,i)=>(Zb(t,e,"read from private field"),i?i.call(t):e.get(t)),yT=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Rl=(t,e,i,a)=>(Zb(t,e,"write to private field"),e.set(t,i),i),et;function kT(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}let eh=class extends p.HTMLElement{constructor(){if(super(),yT(this,et,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[z.MEDIA_CONTROLLER,u.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===z.MEDIA_CONTROLLER&&(i&&((r=(n=na(this,et))==null?void 0:n.unassociateElement)==null||r.call(n,this),Rl(this,et,null)),a&&this.isConnected&&(Rl(this,et,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=na(this,et))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a,n;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Rl(this,et,ST(this)),this.getAttribute(z.MEDIA_CONTROLLER)&&((i=(e=na(this,et))==null?void 0:e.associateElement)==null||i.call(e,this)),(a=na(this,et))==null||a.addEventListener("pointerdown",this),(n=na(this,et))==null||n.addEventListener("click",this)}disconnectedCallback(){var e,i,a,n;this.getAttribute(z.MEDIA_CONTROLLER)&&((i=(e=na(this,et))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=na(this,et))==null||a.removeEventListener("pointerdown",this),(n=na(this,et))==null||n.removeEventListener("click",this),Rl(this,et,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:r,clientY:s}=e,{left:o,top:d,width:h,height:b}=this.getBoundingClientRect(),g=r-o,v=s-d;if(g<0||v<0||g>h||v>b||h===0&&b===0)return;const{pointerType:E=this._pointerType}=e;if(this._pointerType=void 0,E===M0.TOUCH){this.handleTap(e);return}else if(E===M0.MOUSE){this.handleMouseClick(e);return}}}}get mediaPaused(){return G(this,u.MEDIA_PAUSED)}set mediaPaused(e){Y(this,u.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?w.MEDIA_PLAY_REQUEST:w.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new p.CustomEvent(i,{composed:!0,bubbles:!0}))}};et=new WeakMap;eh.shadowRootOptions={mode:"open"};eh.getTemplateHTML=kT;function ST(t){var e;const i=t.getAttribute(z.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):cs(t,"media-controller")}p.customElements.get("media-gesture-receiver")||p.customElements.define("media-gesture-receiver",eh);var D0=eh,gv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ht=(t,e,i)=>(gv(t,e,"read from private field"),i?i.call(t):e.get(t)),ot=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Za=(t,e,i,a)=>(gv(t,e,"write to private field"),e.set(t,i),i),Mt=(t,e,i)=>(gv(t,e,"access private method"),i),sc,Gn,nl,wr,cd,cm,zb,Js,hd,hm,Qb,mm,Xb,rl,th,ih,fv,ts,sl;const x={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function IT(t){return`
    <style>
      
      :host([${u.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
      }

      :host(:not([${x.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${x.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${x.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${x.AUDIO}])[${x.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${x.AUDIO}])[${x.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${x.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${x.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${x.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${x.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${x.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${x.USER_INACTIVE}]:not([${u.MEDIA_PAUSED}]):not([${u.MEDIA_IS_AIRPLAYING}]):not([${u.MEDIA_IS_CASTING}]):not([${x.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${x.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${x.USER_INACTIVE}]:not([${x.NO_AUTOHIDE}]):not([${u.MEDIA_PAUSED}]):not([${u.MEDIA_IS_CASTING}]):not([${x.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${x.USER_INACTIVE}][${x.AUTOHIDE_OVER_CONTROLS}]:not([${x.NO_AUTOHIDE}]):not([${u.MEDIA_PAUSED}]):not([${u.MEDIA_IS_CASTING}]):not([${x.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${x.AUDIO}])[${u.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${D0.shadowRootOptions.mode}">
          ${D0.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}const MT=Object.values(u),LT="sm:384 md:576 lg:768 xl:960";function wT(t){Jb(t.target,t.contentRect.width)}function Jb(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(x.BREAKPOINTS))!=null?i:LT,n=CT(a),r=RT(n,e);let s=!1;if(Object.keys(n).forEach(o=>{if(r.includes(o)){t.hasAttribute(`breakpoint${o}`)||(t.setAttribute(`breakpoint${o}`,""),s=!0);return}t.hasAttribute(`breakpoint${o}`)&&(t.removeAttribute(`breakpoint${o}`),s=!0)}),s){const o=new CustomEvent(Ln.BREAKPOINTS_CHANGE,{detail:r});t.dispatchEvent(o)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Ln.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function CT(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function RT(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}let ah=class extends p.HTMLElement{constructor(){if(super(),ot(this,cm),ot(this,hm),ot(this,mm),ot(this,rl),ot(this,ih),ot(this,ts),ot(this,sc,0),ot(this,Gn,null),ot(this,nl,null),ot(this,wr,void 0),this.breakpointsComputed=!1,ot(this,cd,new MutationObserver(Mt(this,cm,zb).bind(this))),ot(this,Js,!1),ot(this,hd,i=>{ht(this,Js)||(setTimeout(()=>{wT(i),Za(this,Js,!1)},0),Za(this,Js,!0))}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const i=vt(this.attributes),a=this.constructor.getTemplateHTML(i);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(a):this.shadowRoot.innerHTML=a}const e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){ht(this,Gn)&&this.mediaUnsetCallback(ht(this,Gn));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[x.AUTOHIDE,x.GESTURES_DISABLED].concat(MT).filter(e=>![u.MEDIA_RENDITION_LIST,u.MEDIA_AUDIO_TRACK_LIST,u.MEDIA_CHAPTERS_CUES,u.MEDIA_WIDTH,u.MEDIA_HEIGHT,u.MEDIA_ERROR,u.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==x.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Za(this,Gn,e),e.localName.includes("-")&&await p.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;ht(this,cd).observe(this,{childList:!0,subtree:!0}),jr(this,ht(this,hd));const i=this.getAttribute(x.AUDIO)!=null,a=L(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(x.USER_INACTIVE,""),Jb(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=p.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;ht(this,cd).disconnect(),es(this,ht(this,hd)),this.media&&this.mediaUnsetCallback(this.media),(e=p.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){Za(this,Gn,null)}handleEvent(e){switch(e.type){case"pointerdown":Za(this,sc,e.timeStamp);break;case"pointermove":Mt(this,hm,Qb).call(this,e);break;case"pointerup":Mt(this,mm,Xb).call(this,e);break;case"mouseleave":Mt(this,rl,th).call(this);break;case"mouseup":this.removeAttribute(x.KEYBOARD_CONTROL);break;case"keyup":Mt(this,ts,sl).call(this),this.setAttribute(x.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);Za(this,wr,isNaN(i)?0:i)}get autohide(){return(ht(this,wr)===void 0?2:ht(this,wr)).toString()}get breakpoints(){return se(this,x.BREAKPOINTS)}set breakpoints(e){oe(this,x.BREAKPOINTS,e)}get audio(){return G(this,x.AUDIO)}set audio(e){Y(this,x.AUDIO,e)}get gesturesDisabled(){return G(this,x.GESTURES_DISABLED)}set gesturesDisabled(e){Y(this,x.GESTURES_DISABLED,e)}get keyboardControl(){return G(this,x.KEYBOARD_CONTROL)}set keyboardControl(e){Y(this,x.KEYBOARD_CONTROL,e)}get noAutohide(){return G(this,x.NO_AUTOHIDE)}set noAutohide(e){Y(this,x.NO_AUTOHIDE,e)}get autohideOverControls(){return G(this,x.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){Y(this,x.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return G(this,x.USER_INACTIVE)}set userInteractive(e){Y(this,x.USER_INACTIVE,e)}};sc=new WeakMap;Gn=new WeakMap;nl=new WeakMap;wr=new WeakMap;cd=new WeakMap;cm=new WeakSet;zb=function(t){const e=this.media;for(const i of t){if(i.type!=="childList")continue;const a=i.removedNodes;for(const n of a){if(n.slot!="media"||i.target!=this)continue;let r=i.previousSibling&&i.previousSibling.previousElementSibling;if(!r||!e)this.mediaUnsetCallback(n);else{let s=r.slot!=="media";for(;(r=r.previousSibling)!==null;)r.slot=="media"&&(s=!1);s&&this.mediaUnsetCallback(n)}}if(e)for(const n of i.addedNodes)n===e&&this.handleMediaUpdated(e)}};Js=new WeakMap;hd=new WeakMap;hm=new WeakSet;Qb=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-ht(this,sc)<250)return;Mt(this,ih,fv).call(this),clearTimeout(ht(this,nl));const e=this.hasAttribute(x.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&Mt(this,ts,sl).call(this)};mm=new WeakSet;Xb=function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(x.USER_INACTIVE);[this,this.media].includes(t.target)&&e?Mt(this,rl,th).call(this):Mt(this,ts,sl).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&Mt(this,ts,sl).call(this)};rl=new WeakSet;th=function(){if(ht(this,wr)<0||this.hasAttribute(x.USER_INACTIVE))return;this.setAttribute(x.USER_INACTIVE,"");const t=new p.CustomEvent(Ln.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};ih=new WeakSet;fv=function(){if(!this.hasAttribute(x.USER_INACTIVE))return;this.removeAttribute(x.USER_INACTIVE);const t=new p.CustomEvent(Ln.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};ts=new WeakSet;sl=function(){Mt(this,ih,fv).call(this),clearTimeout(ht(this,nl));const t=parseInt(this.autohide);t<0||Za(this,nl,setTimeout(()=>{Mt(this,rl,th).call(this)},t*1e3))};ah.shadowRootOptions={mode:"open"};ah.getTemplateHTML=IT;p.customElements.get("media-container")||p.customElements.define("media-container",ah);var jb=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Pe=(t,e,i)=>(jb(t,e,"read from private field"),i?i.call(t):e.get(t)),xs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Dl=(t,e,i,a)=>(jb(t,e,"write to private field"),e.set(t,i),i),Yn,qn,oc,dn,Vi,da;let _v=class{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){xs(this,Vi),xs(this,Yn,void 0),xs(this,qn,void 0),xs(this,oc,void 0),xs(this,dn,new Set),Dl(this,Yn,e),Dl(this,qn,i),Dl(this,oc,new Set(a))}[Symbol.iterator](){return Pe(this,Vi,da).values()}get length(){return Pe(this,Vi,da).size}get value(){var e;return(e=[...Pe(this,Vi,da)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Dl(this,dn,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...Pe(this,Vi,da)][e]}values(){return Pe(this,Vi,da).values()}forEach(e,i){Pe(this,Vi,da).forEach(e,i)}add(...e){var i,a;e.forEach(n=>Pe(this,dn).add(n)),!(this.value===""&&!((i=Pe(this,Yn))!=null&&i.hasAttribute(`${Pe(this,qn)}`)))&&((a=Pe(this,Yn))==null||a.setAttribute(`${Pe(this,qn)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>Pe(this,dn).delete(a)),(i=Pe(this,Yn))==null||i.setAttribute(`${Pe(this,qn)}`,`${this.value}`)}contains(e){return Pe(this,Vi,da).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}};Yn=new WeakMap;qn=new WeakMap;oc=new WeakMap;dn=new WeakMap;Vi=new WeakSet;da=function(){return Pe(this,dn).size?Pe(this,dn):Pe(this,oc)};const DT=(t="")=>t.split(/\s+/),eg=(t="")=>{const[e,i,a]=t.split(":"),n=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?xi.CAPTIONS:xi.SUBTITLES,language:i,label:n}},nh=(t="",e={})=>DT(t).map(i=>{const a=eg(i);return{...e,...a}}),tg=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?eg(e):e):typeof t=="string"?nh(t):[t]:[],pm=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,ol=(t=[])=>Array.prototype.map.call(t,pm).join(" "),xT=(t,e)=>i=>i[t]===e,ig=t=>{const e=Object.entries(t).map(([i,a])=>xT(i,a));return i=>e.every(a=>a(i))},Ho=(t,e=[],i=[])=>{const a=tg(i).map(ig),n=r=>a.some(s=>s(r));Array.from(e).filter(n).forEach(r=>{r.mode=t})},rh=(t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:ig(e);return Array.from(t.textTracks).filter(i)},ag=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(u.MEDIA_SUBTITLES_SHOWING)},OT=t=>{var e;const{media:i,fullscreenElement:a}=t;try{const n=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(n){const r=(e=a[n])==null?void 0:e.call(a);if(r instanceof Promise)return r.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(n){console.error(n)}},x0="exitFullscreen"in Ce?"exitFullscreen":"webkitExitFullscreen"in Ce?"webkitExitFullscreen":"webkitCancelFullScreen"in Ce?"webkitCancelFullScreen":void 0,$T=t=>{var e;const{documentElement:i}=t;if(x0){const a=(e=i?.[x0])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},js="fullscreenElement"in Ce?"fullscreenElement":"webkitFullscreenElement"in Ce?"webkitFullscreenElement":void 0,PT=t=>{const{documentElement:e,media:i}=t,a=e?.[js];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===rT.FULLSCREEN?i:a},NT=t=>{var e;const{media:i,documentElement:a,fullscreenElement:n=i}=t;if(!i||!a)return!1;const r=PT(t);if(!r)return!1;if(r===n||r===i)return!0;if(r.localName.includes("-")){let s=r.shadowRoot;if(!(js in s))return ta(r,n);for(;s?.[js];){if(s[js]===n)return!0;s=(e=s[js])==null?void 0:e.shadowRoot}}return!1},UT="fullscreenEnabled"in Ce?"fullscreenEnabled":"webkitFullscreenEnabled"in Ce?"webkitFullscreenEnabled":void 0,HT=t=>{const{documentElement:e,media:i}=t;return!!e?.[UT]||i&&"webkitSupportsFullscreen"in i};let xl;const Av=()=>{var t,e;return xl||(xl=(e=(t=Ce)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),xl)},BT=async(t=Av())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([WT(t,i.signal),FT(t,e)]);return i.abort(),a},WT=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),FT=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Nb(10)}return t.volume!==e},VT=/.*Version\/.*Safari\/.*/.test(p.navigator.userAgent),ng=(t=Av())=>p.matchMedia("(display-mode: standalone)").matches&&VT?!1:typeof t?.requestPictureInPicture=="function",rg=(t=Av())=>HT({documentElement:Ce,media:t}),KT=rg(),GT=ng(),YT=!!p.WebKitPlaybackTargetAvailabilityEvent,qT=!!p.chrome,lc=t=>rh(t.media,e=>[xi.SUBTITLES,xi.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),sg=t=>rh(t.media,e=>e.mode===Hr.SHOWING&&[xi.SUBTITLES,xi.CAPTIONS].includes(e.kind)),og=(t,e)=>{const i=lc(t),a=sg(t),n=!!a.length;if(i.length){if(e===!1||n&&e!==!0)Ho(Hr.DISABLED,i,a);else if(e===!0||!n&&e!==!1){let r=i[0];const{options:s}=t;if(!s?.noSubtitlesLangPref){const b=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),g=b?[b,...globalThis.navigator.languages]:globalThis.navigator.languages,v=i.filter(E=>g.some(T=>E.language.toLowerCase().startsWith(T.split("-")[0]))).sort((E,T)=>{const f=g.findIndex(I=>E.language.toLowerCase().startsWith(I.split("-")[0])),y=g.findIndex(I=>T.language.toLowerCase().startsWith(I.split("-")[0]));return f-y});v[0]&&(r=v[0])}const{language:o,label:d,kind:h}=r;Ho(Hr.DISABLED,i,a),Ho(Hr.SHOWING,i,[{language:o,label:d,kind:h}])}}},Tv=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?ZT(t,e):Object.entries(t).every(([i,a])=>i in e&&Tv(a,e[i])),ZT=(t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((n,r)=>Tv(n,e[r])):!0},zT=Object.values(Zi);let dc;const QT=BT().then(t=>(dc=t,dc)),XT=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof p.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=p.customElements.get(i);a&&e instanceof a||(await p.customElements.whenDefined(i),p.customElements.upgrade(e))}))},JT=new p.DOMParser,jT=t=>t&&(JT.parseFromString(t,"text/html").body.textContent||t),eo={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:n}=t;if(e?.type!=="playing")return(a=(i=n?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i}=e;if(i){try{p.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(a){console.debug("Error setting muted pref",a)}i.muted=t}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const n=p.localStorage.getItem("media-chrome-pref-muted")==="true";eo.mediaMuted.set(n,e),t(n)}catch(n){console.debug("Error getting muted pref",n)}}]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i}=e;if(i){try{t==null?p.localStorage.removeItem("media-chrome-pref-volume"):p.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(a){console.debug("Error setting volume pref",a)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const n=p.localStorage.getItem("media-chrome-pref-volume");if(n==null)return;eo.mediaVolume.set(+n,e),t(+n)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!vv(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),n=i.seekable.end(i.seekable.length-1);if(!(!a&&!n))return[Number(a.toFixed(3)),Number(n.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((n,r)=>[Number(a.start(r).toFixed(3)),Number(a.end(r).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[Zi.LIVE,Zi.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:n}=e;if(zT.includes(n))return n===Zi.UNKNOWN?a:n;const r=e.duration;return r===1/0?Zi.LIVE:Number.isFinite(r)?Zi.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=eo.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===Zi.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(eo.mediaStreamType.get(t)===Zi.LIVE))return!1;const n=e.seekable;if(!n)return!0;if(!n.length)return!1;const r=n.end(n.length-1)-i;return e.currentTime>=r},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return lc(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return sg(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:n,options:r}=e;if(!n)return;const s=o=>{var d;!r.defaultSubtitles||o&&![xi.CAPTIONS,xi.SUBTITLES].includes((d=o?.track)==null?void 0:d.kind)||og(e,!0)};return n.addEventListener("loadstart",s),(i=n.textTracks)==null||i.addEventListener("addtrack",s),(a=n.textTracks)==null||a.addEventListener("removetrack",s),()=>{var o,d;n.removeEventListener("loadstart",s),(o=n.textTracks)==null||o.removeEventListener("addtrack",s),(d=n.textTracks)==null||d.removeEventListener("removetrack",s)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=rh(i,{kind:xi.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:n,startTime:r,endTime:s})=>({text:jT(n),startTime:r,endTime:s}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const n=a.querySelector('track[kind="chapters"][default][src]'),r=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return n?.addEventListener("load",t),r?.addEventListener("load",t),()=>{n?.removeEventListener("load",t),r?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:n}=t;if(!a||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===a)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?ta(a,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes("-")){let r=n.pictureInPictureElement.shadowRoot;for(;r?.pictureInPictureElement;){if(r.pictureInPictureElement===a)return!0;r=(i=r.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!Ce.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(n=>{if(n.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const r=()=>{i.removeEventListener("loadedmetadata",s),i.preload="none"},s=()=>{i.requestPictureInPicture().catch(a),r()};i.addEventListener("loadedmetadata",s),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),r()},1e3)}else throw n}else throw n})}else Ce.pictureInPictureElement&&Ce.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:n}=t;return(a=(i=n?.videoRenditions)==null?void 0:i[(e=n.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,n=Array.prototype.findIndex.call(i.videoRenditions,r=>r.id==a);i.videoRenditions.selectedIndex!=n&&(i.videoRenditions.selectedIndex=n)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(n=>n.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const n of i.audioTracks)n.enabled=a==n.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return NT(t)},set(t,e){t?OT(e):$T(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:n}=e;if(n&&!(t&&((i=n.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=n.remote)==null?void 0:a.state)!=="connected")){if(typeof n.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}n.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&p.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!KT||!rg(e))return bt.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!GT||!ng(e))return bt.UNSUPPORTED}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(dc===!1||e?.volume==null)return bt.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{dc==null&&QT.then(e=>t(e?void 0:bt.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!qT||!((i=a?.remote)!=null&&i.state))return bt.UNSUPPORTED;if(!(e==null||e==="available"))return bt.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a?.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!YT)return bt.UNSUPPORTED;if(e?.availability==="not-available")return bt.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a?.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return bt.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return bt.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return bt.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return bt.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]}},ey={[w.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,n,r;const{media:s}=e,o=i??void 0;let d,h;if(s&&o!=null){const[E]=rh(s,{kind:xi.METADATA,label:"thumbnails"}),T=Array.prototype.find.call((a=E?.cues)!=null?a:[],(f,y,I)=>y===0?f.endTime>o:y===I.length-1?f.startTime<=o:f.startTime<=o&&f.endTime>o);if(T){const f=/'^(?:[a-z]+:)?\/\//i.test(T.text)||(n=s?.querySelector('track[label="thumbnails"]'))==null?void 0:n.src,y=new URL(T.text,f);h=new URLSearchParams(y.hash).get("#xywh").split(",").map(V=>+V),d=y.href}}const b=t.mediaDuration.get(e);let v=(r=t.mediaChaptersCues.get(e).find((E,T,f)=>T===f.length-1&&b===E.endTime?E.startTime<=o&&E.endTime>=o:E.startTime<=o&&E.endTime>o))==null?void 0:r.text;return i!=null&&v==null&&(v=""),{mediaPreviewTime:o,mediaPreviewImage:d,mediaPreviewCoords:h,mediaPreviewChapter:v}},[w.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[w.MEDIA_PLAY_REQUEST](t,e){var i,a,n,r;const s="mediaPaused",d=t.mediaStreamType.get(e)===Zi.LIVE,h=!((i=e.options)!=null&&i.noAutoSeekToLive),b=t.mediaTargetLiveWindow.get(e)>0;if(d&&h&&!b){const g=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(g){const v=(r=(n=e.options)==null?void 0:n.seekToLiveOffset)!=null?r:0,E=g-v;t.mediaCurrentTime.set(E,e)}}t[s].set(!1,e)},[w.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",n=i;t[a].set(n,e)},[w.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[w.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[w.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",n=i;n&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(n,e)},[w.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",n=i;t[a].set(n,e)},[w.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,n;const r="mediaCurrentTime",s=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(s)))return;const o=(n=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?n:0,d=s-o;t[r].set(d,e)},[w.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:n}=e,r=lc(e),s=tg(i),o=(a=s[0])==null?void 0:a.language;o&&!n.noSubtitlesLangPref&&p.localStorage.setItem("media-chrome-pref-subtitles-lang",o),Ho(Hr.SHOWING,r,s)},[w.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=lc(e),n=i??[];Ho(Hr.DISABLED,a,n)},[w.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){og(e,i)},[w.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",n=i;t[a].set(n,e)},[w.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",n=i;t[a].set(n,e)},[w.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[w.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[w.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e){const i="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[i].set(!0,e)},[w.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[w.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[w.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[w.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},ty=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=eo,requestMap:n=ey,options:r={},monitorStateOwnersOnlyWithSubscriptions:s=!0})=>{const o=[],d={options:{...r}};let h=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const b=f=>{f!=null&&(Tv(f,h)||(h=Object.freeze({...h,...f}),o.forEach(y=>y(h))))},g=()=>{const f=Object.entries(a).reduce((y,[I,{get:V}])=>(y[I]=V(d),y),{});b(f)},v={};let E;const T=async(f,y)=>{var I,V,fe,qe,Re,He,Be,rt,Xe,Kt,Gt,Yt,qt,Zt,zt,Qt;const aa=!!E;if(E={...d,...E??{},...f},aa)return;await XT(...Object.values(f));const De=o.length>0&&y===0&&s,Xt=d.media!==E.media,Jt=((I=d.media)==null?void 0:I.textTracks)!==((V=E.media)==null?void 0:V.textTracks),jt=((fe=d.media)==null?void 0:fe.videoRenditions)!==((qe=E.media)==null?void 0:qe.videoRenditions),We=((Re=d.media)==null?void 0:Re.audioTracks)!==((He=E.media)==null?void 0:He.audioTracks),Ze=((Be=d.media)==null?void 0:Be.remote)!==((rt=E.media)==null?void 0:rt.remote),Ha=d.documentElement!==E.documentElement,_s=!!d.media&&(Xt||De),As=!!((Xe=d.media)!=null&&Xe.textTracks)&&(Jt||De),Ts=!!((Kt=d.media)!=null&&Kt.videoRenditions)&&(jt||De),ys=!!((Gt=d.media)!=null&&Gt.audioTracks)&&(We||De),ks=!!((Yt=d.media)!=null&&Yt.remote)&&(Ze||De),Ss=!!d.documentElement&&(Ha||De),Rn=_s||As||Ts||ys||ks||Ss,st=o.length===0&&y===1&&s,Is=!!E.media&&(Xt||st),Ms=!!((qt=E.media)!=null&&qt.textTracks)&&(Jt||st),Ls=!!((Zt=E.media)!=null&&Zt.videoRenditions)&&(jt||st),ws=!!((zt=E.media)!=null&&zt.audioTracks)&&(We||st),Cs=!!((Qt=E.media)!=null&&Qt.remote)&&(Ze||st),Rs=!!E.documentElement&&(Ha||st),Ds=Is||Ms||Ls||ws||Cs||Rs;if(!(Rn||Ds)){Object.entries(E).forEach(([R,Ct])=>{d[R]=Ct}),g(),E=void 0;return}Object.entries(a).forEach(([R,{get:Ct,mediaEvents:Lh=[],textTracksEvents:wh=[],videoRenditionsEvents:Ch=[],audioTracksEvents:Rh=[],remoteEvents:Dh=[],rootEvents:xh=[],stateOwnersUpdateHandlers:Oh=[]}])=>{v[R]||(v[R]={});const j=O=>{const K=Ct(d,O);b({[R]:K})};let H;H=v[R].mediaEvents,Lh.forEach(O=>{H&&_s&&(d.media.removeEventListener(O,H),v[R].mediaEvents=void 0),Is&&(E.media.addEventListener(O,j),v[R].mediaEvents=j)}),H=v[R].textTracksEvents,wh.forEach(O=>{var K,me;H&&As&&((K=d.media.textTracks)==null||K.removeEventListener(O,H),v[R].textTracksEvents=void 0),Ms&&((me=E.media.textTracks)==null||me.addEventListener(O,j),v[R].textTracksEvents=j)}),H=v[R].videoRenditionsEvents,Ch.forEach(O=>{var K,me;H&&Ts&&((K=d.media.videoRenditions)==null||K.removeEventListener(O,H),v[R].videoRenditionsEvents=void 0),Ls&&((me=E.media.videoRenditions)==null||me.addEventListener(O,j),v[R].videoRenditionsEvents=j)}),H=v[R].audioTracksEvents,Rh.forEach(O=>{var K,me;H&&ys&&((K=d.media.audioTracks)==null||K.removeEventListener(O,H),v[R].audioTracksEvents=void 0),ws&&((me=E.media.audioTracks)==null||me.addEventListener(O,j),v[R].audioTracksEvents=j)}),H=v[R].remoteEvents,Dh.forEach(O=>{var K,me;H&&ks&&((K=d.media.remote)==null||K.removeEventListener(O,H),v[R].remoteEvents=void 0),Cs&&((me=E.media.remote)==null||me.addEventListener(O,j),v[R].remoteEvents=j)}),H=v[R].rootEvents,xh.forEach(O=>{H&&Ss&&(d.documentElement.removeEventListener(O,H),v[R].rootEvents=void 0),Rs&&(E.documentElement.addEventListener(O,j),v[R].rootEvents=j)});const Ba=v[R].stateOwnersUpdateHandlers;Oh.forEach(O=>{Ba&&Rn&&Ba(),Ds&&(v[R].stateOwnersUpdateHandlers=O(j,E))})}),Object.entries(E).forEach(([R,Ct])=>{d[R]=Ct}),g(),E=void 0};return T({media:t,fullscreenElement:e,documentElement:i,options:r}),{dispatch(f){const{type:y,detail:I}=f;if(n[y]&&h.mediaErrorCode==null){b(n[y](a,d,f));return}y==="mediaelementchangerequest"?T({media:I}):y==="fullscreenelementchangerequest"?T({fullscreenElement:I}):y==="documentelementchangerequest"?T({documentElement:I}):y==="optionschangerequest"&&Object.entries(I??{}).forEach(([V,fe])=>{d.options[V]=fe})},getState(){return h},subscribe(f){return T({},o.length+1),o.push(f),f(h),()=>{const y=o.indexOf(f);y>=0&&(T({},o.length-1),o.splice(y,1))}}}};var yv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},U=(t,e,i)=>(yv(t,e,"read from private field"),i?i.call(t):e.get(t)),Ui=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ra=(t,e,i,a)=>(yv(t,e,"write to private field"),e.set(t,i),i),La=(t,e,i)=>(yv(t,e,"access private method"),i),un,to,te,io,si,md,pd,vm,is,ll,vd,Em;const lg=["ArrowLeft","ArrowRight","Enter"," ","f","m","k","c"],O0=10,M={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYS_USED:"keysused",LIVE_EDGE_OFFSET:"liveedgeoffset",SEEK_TO_LIVE_OFFSET:"seektoliveoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_HOTKEYS:"nohotkeys",NO_VOLUME_PREF:"novolumepref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_DEFAULT_STORE:"nodefaultstore",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",LANG:"lang"};let iy=class extends ah{constructor(){super(),Ui(this,pd),Ui(this,is),Ui(this,vd),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,Ui(this,un,new _v(this,M.HOTKEYS)),Ui(this,to,void 0),Ui(this,te,void 0),Ui(this,io,void 0),Ui(this,si,void 0),Ui(this,md,i=>{var a;(a=U(this,te))==null||a.dispatch(i)}),this.associateElement(this);let e={};ra(this,io,i=>{Object.entries(i).forEach(([a,n])=>{if(a in e&&e[a]===n)return;this.propagateMediaState(a,n);const r=a.toLowerCase(),s=new p.CustomEvent(nT[r],{composed:!0,detail:n});this.dispatchEvent(s)}),e=i}),this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(M.NO_HOTKEYS,M.HOTKEYS,M.DEFAULT_STREAM_TYPE,M.DEFAULT_SUBTITLES,M.DEFAULT_DURATION,M.LANG)}get mediaStore(){return U(this,te)}set mediaStore(e){var i,a;if(U(this,te)&&((i=U(this,si))==null||i.call(this),ra(this,si,void 0)),ra(this,te,e),!U(this,te)&&!this.hasAttribute(M.NO_DEFAULT_STORE)){La(this,pd,vm).call(this);return}ra(this,si,(a=U(this,te))==null?void 0:a.subscribe(U(this,io)))}get fullscreenElement(){var e;return(e=U(this,to))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(M.FULLSCREEN_ELEMENT)&&this.removeAttribute(M.FULLSCREEN_ELEMENT),ra(this,to,e),(i=U(this,te))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return G(this,M.DEFAULT_SUBTITLES)}set defaultSubtitles(e){Y(this,M.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return se(this,M.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){oe(this,M.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return ne(this,M.DEFAULT_DURATION)}set defaultDuration(e){be(this,M.DEFAULT_DURATION,e)}get noHotkeys(){return G(this,M.NO_HOTKEYS)}set noHotkeys(e){Y(this,M.NO_HOTKEYS,e)}get keysUsed(){return se(this,M.KEYS_USED)}set keysUsed(e){oe(this,M.KEYS_USED,e)}get liveEdgeOffset(){return ne(this,M.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){be(this,M.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return G(this,M.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){Y(this,M.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return G(this,M.NO_VOLUME_PREF)}set noVolumePref(e){Y(this,M.NO_VOLUME_PREF,e)}get noSubtitlesLangPref(){return G(this,M.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){Y(this,M.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return G(this,M.NO_DEFAULT_STORE)}set noDefaultStore(e){Y(this,M.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var n,r,s,o,d,h,b,g;if(super.attributeChangedCallback(e,i,a),e===M.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(M.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===M.HOTKEYS)U(this,un).value=a;else if(e===M.DEFAULT_SUBTITLES&&a!==i)(n=U(this,te))==null||n.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(M.DEFAULT_SUBTITLES)}});else if(e===M.DEFAULT_STREAM_TYPE)(s=U(this,te))==null||s.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(r=this.getAttribute(M.DEFAULT_STREAM_TYPE))!=null?r:void 0}});else if(e===M.LIVE_EDGE_OFFSET)(o=U(this,te))==null||o.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(M.LIVE_EDGE_OFFSET)?+this.getAttribute(M.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(M.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(M.LIVE_EDGE_OFFSET)}});else if(e===M.SEEK_TO_LIVE_OFFSET)(d=U(this,te))==null||d.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(M.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(M.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===M.NO_AUTO_SEEK_TO_LIVE)(h=U(this,te))==null||h.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(M.NO_AUTO_SEEK_TO_LIVE)}});else if(e===M.FULLSCREEN_ELEMENT){const v=a?(b=this.getRootNode())==null?void 0:b.getElementById(a):void 0;ra(this,to,v),(g=U(this,te))==null||g.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===M.LANG&&a!==i&&bT(a)}connectedCallback(){var e,i;!U(this,te)&&!this.hasAttribute(M.NO_DEFAULT_STORE)&&La(this,pd,vm).call(this),(e=U(this,te))==null||e.dispatch({type:"documentelementchangerequest",detail:Ce}),super.connectedCallback(),U(this,te)&&!U(this,si)&&ra(this,si,(i=U(this,te))==null?void 0:i.subscribe(U(this,io))),this.enableHotkeys()}disconnectedCallback(){var e,i,a,n;(e=super.disconnectedCallback)==null||e.call(this),U(this,te)&&((i=U(this,te))==null||i.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=U(this,te))==null||a.dispatch({type:w.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),U(this,si)&&((n=U(this,si))==null||n.call(this),ra(this,si,void 0))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=U(this,te))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=U(this,te))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){N0(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),n=this.unregisterMediaStateReceiver.bind(this),r=ly(e,a,n);Object.values(w).forEach(s=>{e.addEventListener(s,U(this,md))}),i.set(e,r)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(w).forEach(n=>{e.removeEventListener(n,U(this,md))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),U(this,te)&&Object.entries(U(this,te).getState()).forEach(([n,r])=>{N0([e],n,r)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",La(this,vd,Em))}disableHotkeys(){this.removeEventListener("keydown",La(this,vd,Em)),this.removeEventListener("keyup",La(this,is,ll))}get hotkeys(){return se(this,M.HOTKEYS)}set hotkeys(e){oe(this,M.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,n,r,s;const o=e.target;if(((n=(a=(i=o.getAttribute(M.KEYS_USED))==null?void 0:i.split(" "))!=null?a:o?.keysUsed)!=null?n:[]).map(v=>v==="Space"?" ":v).filter(Boolean).includes(e.key))return;let h,b,g;if(!U(this,un).contains(`no${e.key.toLowerCase()}`)&&!(e.key===" "&&U(this,un).contains("nospace")))switch(e.key){case" ":case"k":h=U(this,te).getState().mediaPaused?w.MEDIA_PLAY_REQUEST:w.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new p.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"m":h=this.mediaStore.getState().mediaVolumeLevel==="off"?w.MEDIA_UNMUTE_REQUEST:w.MEDIA_MUTE_REQUEST,this.dispatchEvent(new p.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"f":h=this.mediaStore.getState().mediaIsFullscreen?w.MEDIA_EXIT_FULLSCREEN_REQUEST:w.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new p.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new p.CustomEvent(w.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":{const v=this.hasAttribute(M.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(M.KEYBOARD_BACKWARD_SEEK_OFFSET):O0;b=Math.max(((r=this.mediaStore.getState().mediaCurrentTime)!=null?r:0)-v,0),g=new p.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(g);break}case"ArrowRight":{const v=this.hasAttribute(M.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(M.KEYBOARD_FORWARD_SEEK_OFFSET):O0;b=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)+v,0),g=new p.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(g);break}}}};un=new WeakMap;to=new WeakMap;te=new WeakMap;io=new WeakMap;si=new WeakMap;md=new WeakMap;pd=new WeakSet;vm=function(){var t;this.mediaStore=ty({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(M.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(M.DEFAULT_DURATION)?+this.getAttribute(M.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(M.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(M.LIVE_EDGE_OFFSET)?+this.getAttribute(M.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(M.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(M.SEEK_TO_LIVE_OFFSET):this.hasAttribute(M.LIVE_EDGE_OFFSET)?+this.getAttribute(M.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(M.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(M.NO_VOLUME_PREF),noSubtitlesLangPref:this.hasAttribute(M.NO_SUBTITLES_LANG_PREF)}})};is=new WeakSet;ll=function(t){const{key:e}=t;if(!lg.includes(e)){this.removeEventListener("keyup",La(this,is,ll));return}this.keyboardShortcutHandler(t)};vd=new WeakSet;Em=function(t){const{metaKey:e,altKey:i,key:a}=t;if(e||i||!lg.includes(a)){this.removeEventListener("keyup",La(this,is,ll));return}[" ","ArrowLeft","ArrowRight"].includes(a)&&!(U(this,un).contains(`no${a.toLowerCase()}`)||a===" "&&U(this,un).contains("nospace"))&&t.preventDefault(),this.addEventListener("keyup",La(this,is,ll),{once:!0})};const ay=Object.values(u),ny=Object.values(Ob),dg=t=>{var e,i,a,n;let{observedAttributes:r}=t.constructor;!r&&((e=t.nodeName)!=null&&e.includes("-"))&&(p.customElements.upgrade(t),{observedAttributes:r}=t.constructor);const s=(n=(a=(i=t?.getAttribute)==null?void 0:i.call(t,z.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:n.call(a,/\s+/);return Array.isArray(r||s)?(r||s).filter(o=>ay.includes(o)):[]},ry=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&p.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof p.customElements.get(t.nodeName.toLowerCase()))&&p.customElements.upgrade(t),ny.some(a=>a in t)},bm=t=>ry(t)||!!dg(t).length,$0=t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},P0={[u.MEDIA_SUBTITLES_LIST]:ol,[u.MEDIA_SUBTITLES_SHOWING]:ol,[u.MEDIA_SEEKABLE]:$0,[u.MEDIA_BUFFERED]:t=>t?.map($0).join(" "),[u.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[u.MEDIA_RENDITION_LIST]:sT,[u.MEDIA_AUDIO_TRACK_LIST]:uT},sy=async(t,e,i)=>{var a,n;if(t.isConnected||await Nb(0),typeof i=="boolean"||i==null)return Y(t,e,i);if(typeof i=="number")return be(t,e,i);if(typeof i=="string")return oe(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const r=(n=(a=P0[e])==null?void 0:a.call(P0,i))!=null?n:i;return t.setAttribute(e,r)},oy=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},za=(t,e)=>{if(oy(t))return;const i=(n,r)=>{var s,o;bm(n)&&r(n);const{children:d=[]}=n??{},h=(o=(s=n?.shadowRoot)==null?void 0:s.children)!=null?o:[];[...d,...h].forEach(g=>za(g,r))},a=t?.nodeName.toLowerCase();if(a.includes("-")&&!bm(t)){p.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},N0=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const n=dg(a),r=e.toLowerCase();n.includes(r)&&sy(a,r,i)})},ly=(t,e,i)=>{za(t,e);const a=b=>{var g;const v=(g=b?.composedPath()[0])!=null?g:b.target;e(v)},n=b=>{var g;const v=(g=b?.composedPath()[0])!=null?g:b.target;i(v)};t.addEventListener(w.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(w.UNREGISTER_MEDIA_STATE_RECEIVER,n);const r=b=>{b.forEach(g=>{const{addedNodes:v=[],removedNodes:E=[],type:T,target:f,attributeName:y}=g;T==="childList"?(Array.prototype.forEach.call(v,I=>za(I,e)),Array.prototype.forEach.call(E,I=>za(I,i))):T==="attributes"&&y===z.MEDIA_CHROME_ATTRIBUTES&&(bm(f)?e(f):i(f))})};let s=[];const o=b=>{const g=b.target;g.name!=="media"&&(s.forEach(v=>za(v,i)),s=[...g.assignedElements({flatten:!0})],s.forEach(v=>za(v,e)))};t.addEventListener("slotchange",o);const d=new MutationObserver(r);return d.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{za(t,i),t.removeEventListener("slotchange",o),d.disconnect(),t.removeEventListener(w.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(w.UNREGISTER_MEDIA_STATE_RECEIVER,n)}};p.customElements.get("media-controller")||p.customElements.define("media-controller",iy);const Dn={PLACEMENT:"placement",BOUNDS:"bounds"};function dy(t){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}let sh=class extends p.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Yb(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),n=(e=cs(this,"#"+this.bounds))!=null?e:Lt(this);if(!n)return;const{x:r,width:s}=n.getBoundingClientRect(),{x:o,width:d}=this.getBoundingClientRect(),h=o+d,b=r+s,g=a.getPropertyValue("--media-tooltip-offset-x"),v=g?parseFloat(g.replace("px","")):0,E=a.getPropertyValue("--media-tooltip-container-margin"),T=E?parseFloat(E.replace("px","")):0,f=o-r+v-T,y=h-b+v+T;if(f<0){this.style.setProperty("--media-tooltip-offset-x",`${f}px`);return}if(y>0){this.style.setProperty("--media-tooltip-offset-x",`${y}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Dn.PLACEMENT,Dn.BOUNDS]}get placement(){return se(this,Dn.PLACEMENT)}set placement(e){oe(this,Dn.PLACEMENT,e)}get bounds(){return se(this,Dn.BOUNDS)}set bounds(e){oe(this,Dn.BOUNDS,e)}};sh.shadowRootOptions={mode:"open"};sh.getTemplateHTML=dy;p.customElements.get("media-tooltip")||p.customElements.define("media-tooltip",sh);var U0=sh,kv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ye=(t,e,i)=>(kv(t,e,"read from private field"),i?i.call(t):e.get(t)),xn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ol=(t,e,i,a)=>(kv(t,e,"write to private field"),e.set(t,i),i),uy=(t,e,i)=>(kv(t,e,"access private method"),i),oi,Cr,wa,Zn,Ed,gm,ug;const sa={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function cy(t,e={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${U0.shadowRootOptions.mode}">
          ${U0.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}function hy(t,e){return`
    <slot></slot>
  `}function my(){return""}let Ye=class extends p.HTMLElement{constructor(){if(super(),xn(this,gm),xn(this,oi,void 0),this.preventClick=!1,this.tooltipEl=null,xn(this,Cr,e=>{this.preventClick||this.handleClick(e),setTimeout(ye(this,wa),0)}),xn(this,wa,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),xn(this,Zn,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",ye(this,Zn));return}this.preventClick||this.handleClick(e)}),xn(this,Ed,e=>{const{metaKey:i,altKey:a,key:n}=e;if(i||a||!this.keysUsed.includes(n)){this.removeEventListener("keyup",ye(this,Zn));return}this.addEventListener("keyup",ye(this,Zn),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",sa.TOOLTIP_PLACEMENT,z.MEDIA_CONTROLLER]}enable(){this.addEventListener("click",ye(this,Cr)),this.addEventListener("keydown",ye(this,Ed)),this.tabIndex=0}disable(){this.removeEventListener("click",ye(this,Cr)),this.removeEventListener("keydown",ye(this,Ed)),this.removeEventListener("keyup",ye(this,Zn)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===z.MEDIA_CONTROLLER?(i&&((r=(n=ye(this,oi))==null?void 0:n.unassociateElement)==null||r.call(n,this),Ol(this,oi,null)),a&&this.isConnected&&(Ol(this,oi,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=ye(this,oi))==null?void 0:o.associateElement)==null||d.call(o,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===sa.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i&&(this.tooltipEl.placement=a),ye(this,wa).call(this)}connectedCallback(){var e,i,a;const{style:n}=Se(this.shadowRoot,":host");n.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const r=this.getAttribute(z.MEDIA_CONTROLLER);r&&(Ol(this,oi,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ye(this,oi))==null?void 0:i.associateElement)==null||a.call(i,this)),p.customElements.whenDefined("media-tooltip").then(()=>uy(this,gm,ug).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=ye(this,oi))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ol(this,oi,null),this.removeEventListener("mouseenter",ye(this,wa)),this.removeEventListener("focus",ye(this,wa)),this.removeEventListener("click",ye(this,Cr))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return se(this,sa.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){oe(this,sa.TOOLTIP_PLACEMENT,e)}get mediaController(){return se(this,z.MEDIA_CONTROLLER)}set mediaController(e){oe(this,z.MEDIA_CONTROLLER,e)}get disabled(){return G(this,sa.DISABLED)}set disabled(e){Y(this,sa.DISABLED,e)}get noTooltip(){return G(this,sa.NO_TOOLTIP)}set noTooltip(e){Y(this,sa.NO_TOOLTIP,e)}handleClick(e){}};oi=new WeakMap;Cr=new WeakMap;wa=new WeakMap;Zn=new WeakMap;Ed=new WeakMap;gm=new WeakSet;ug=function(){this.addEventListener("mouseenter",ye(this,wa)),this.addEventListener("focus",ye(this,wa)),this.addEventListener("click",ye(this,Cr));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};Ye.shadowRootOptions={mode:"open"};Ye.getTemplateHTML=cy;Ye.getSlotTemplateHTML=hy;Ye.getTooltipContentHTML=my;p.customElements.get("media-chrome-button")||p.customElements.define("media-chrome-button",Ye);const H0=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function py(t){return`
    <style>
      :host([${u.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${u.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${u.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${u.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${H0}</slot>
      <slot name="exit">${H0}</slot>
    </slot>
  `}function vy(){return`
    <slot name="tooltip-enter">${L("start airplay")}</slot>
    <slot name="tooltip-exit">${L("stop airplay")}</slot>
  `}const B0=t=>{const e=t.mediaIsAirplaying?L("stop airplay"):L("start airplay");t.setAttribute("aria-label",e)};let Sv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_IS_AIRPLAYING,u.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),B0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_IS_AIRPLAYING&&B0(this)}get mediaIsAirplaying(){return G(this,u.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){Y(this,u.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return se(this,u.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){oe(this,u.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new p.CustomEvent(w.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};Sv.getSlotTemplateHTML=py;Sv.getTooltipContentHTML=vy;p.customElements.get("media-airplay-button")||p.customElements.define("media-airplay-button",Sv);const Ey=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,by=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function gy(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${Ey}</slot>
      <slot name="off">${by}</slot>
    </slot>
  `}function fy(){return`
    <slot name="tooltip-enable">${L("Enable captions")}</slot>
    <slot name="tooltip-disable">${L("Disable captions")}</slot>
  `}const W0=t=>{t.setAttribute("aria-checked",ag(t).toString())};let Iv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_SUBTITLES_LIST,u.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",L("closed captions")),W0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_SUBTITLES_SHOWING&&W0(this)}get mediaSubtitlesList(){return F0(this,u.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){V0(this,u.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return F0(this,u.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){V0(this,u.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new p.CustomEvent(w.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};Iv.getSlotTemplateHTML=gy;Iv.getTooltipContentHTML=fy;const F0=(t,e)=>{const i=t.getAttribute(e);return i?nh(i):[]},V0=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=ol(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};p.customElements.get("media-captions-button")||p.customElements.define("media-captions-button",Iv);const _y='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',Ay='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function Ty(t){return`
    <style>
      :host([${u.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${u.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${u.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${u.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${_y}</slot>
      <slot name="exit">${Ay}</slot>
    </slot>
  `}function yy(){return`
    <slot name="tooltip-enter">${L("Start casting")}</slot>
    <slot name="tooltip-exit">${L("Stop casting")}</slot>
  `}const K0=t=>{const e=t.mediaIsCasting?L("stop casting"):L("start casting");t.setAttribute("aria-label",e)};let Mv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_IS_CASTING,u.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),K0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_IS_CASTING&&K0(this)}get mediaIsCasting(){return G(this,u.MEDIA_IS_CASTING)}set mediaIsCasting(e){Y(this,u.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return se(this,u.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){oe(this,u.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?w.MEDIA_EXIT_CAST_REQUEST:w.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new p.CustomEvent(e,{composed:!0,bubbles:!0}))}};Mv.getSlotTemplateHTML=Ty;Mv.getTooltipContentHTML=yy;p.customElements.get("media-cast-button")||p.customElements.define("media-cast-button",Mv);var Lv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},gn=(t,e,i)=>(Lv(t,e,"read from private field"),e.get(t)),Hi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wv=(t,e,i,a)=>(Lv(t,e,"write to private field"),e.set(t,i),i),Wa=(t,e,i)=>(Lv(t,e,"access private method"),i),uc,dl,wn,bd,fm,_m,cg,Am,hg,Tm,mg,ym,pg,km,vg;function ky(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(t)}
  `}function Sy(t){return`
    <slot id="content"></slot>
  `}const Os={OPEN:"open",ANCHOR:"anchor"};let wl=class extends p.HTMLElement{constructor(){super(),Hi(this,bd),Hi(this,_m),Hi(this,Am),Hi(this,Tm),Hi(this,ym),Hi(this,km),Hi(this,uc,!1),Hi(this,dl,null),Hi(this,wn,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[Os.OPEN,Os.ANCHOR]}get open(){return G(this,Os.OPEN)}set open(e){Y(this,Os.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Wa(this,Tm,mg).call(this,e);break;case"focusout":Wa(this,ym,pg).call(this,e);break;case"keydown":Wa(this,km,vg).call(this,e);break}}connectedCallback(){Wa(this,bd,fm).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,i,a){Wa(this,bd,fm).call(this),e===Os.OPEN&&a!==i&&(this.open?Wa(this,_m,cg).call(this):Wa(this,Am,hg).call(this))}focus(){wv(this,dl,bv());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}};uc=new WeakMap;dl=new WeakMap;wn=new WeakMap;bd=new WeakSet;fm=function(){if(!gn(this,uc)&&(wv(this,uc,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=Se(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};_m=new WeakSet;cg=function(){var t;(t=gn(this,wn))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Am=new WeakSet;hg=function(){var t;(t=gn(this,wn))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};Tm=new WeakSet;mg=function(t){wv(this,wn,t.relatedTarget),ta(this,t.relatedTarget)||(this.open=!this.open)};ym=new WeakSet;pg=function(t){var e;ta(this,t.relatedTarget)||((e=gn(this,dl))==null||e.focus(),gn(this,wn)&&gn(this,wn)!==t.relatedTarget&&this.open&&(this.open=!1))};km=new WeakSet;vg=function(t){var e,i,a,n,r;const{key:s,ctrlKey:o,altKey:d,metaKey:h}=t;o||d||h||this.keysUsed.includes(s)&&(t.preventDefault(),t.stopPropagation(),s==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(n=(a=this.nextElementSibling)==null?void 0:a.focus)==null||n.call(a),this.blur()):s==="Escape"&&((r=gn(this,dl))==null||r.focus(),this.open=!1))};wl.shadowRootOptions={mode:"open"};wl.getTemplateHTML=ky;wl.getSlotTemplateHTML=Sy;p.customElements.get("media-chrome-dialog")||p.customElements.define("media-chrome-dialog",wl);var Cv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},pe=(t,e,i)=>(Cv(t,e,"read from private field"),i?i.call(t):e.get(t)),Fe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ua=(t,e,i,a)=>(Cv(t,e,"write to private field"),e.set(t,i),i),Pt=(t,e,i)=>(Cv(t,e,"access private method"),i),li,oh,gd,fd,Ht,cc,_d,Ad,Td,Rv,Eg,yd,Sm,kd,Im,hc,Dv,Mm,bg,Lm,gg,wm,fg,Cm,_g;function Iy(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
      <input id="range" type="range" min="0" max="1" step="any" value="0">
    </div>
    <div id="rightgap"></div>
  `}let hs=class extends p.HTMLElement{constructor(){if(super(),Fe(this,Rv),Fe(this,yd),Fe(this,kd),Fe(this,hc),Fe(this,Mm),Fe(this,Lm),Fe(this,wm),Fe(this,Cm),Fe(this,li,void 0),Fe(this,oh,void 0),Fe(this,gd,void 0),Fe(this,fd,void 0),Fe(this,Ht,{}),Fe(this,cc,[]),Fe(this,_d,()=>{if(this.range.matches(":focus-visible")){const{style:e}=Se(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),Fe(this,Ad,()=>{const{style:e}=Se(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),Fe(this,Td,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),ua(this,gd,this.shadowRoot.querySelector("#startpoint")),ua(this,fd,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",z.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===z.MEDIA_CONTROLLER?(i&&((r=(n=pe(this,li))==null?void 0:n.unassociateElement)==null||r.call(n,this),ua(this,li,null)),a&&this.isConnected&&(ua(this,li,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=pe(this,li))==null?void 0:o.associateElement)==null||d.call(o,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Pt(this,yd,Sm).call(this)):(this.range.setAttribute(e,a),Pt(this,kd,Im).call(this)))}connectedCallback(){var e,i,a;const{style:n}=Se(this.shadowRoot,":host");n.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),pe(this,Ht).pointer=Se(this.shadowRoot,"#pointer"),pe(this,Ht).progress=Se(this.shadowRoot,"#progress"),pe(this,Ht).thumb=Se(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),pe(this,Ht).activeSegment=Se(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const r=this.getAttribute(z.MEDIA_CONTROLLER);r&&(ua(this,li,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=pe(this,li))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",pe(this,_d)),this.shadowRoot.addEventListener("focusout",pe(this,Ad)),Pt(this,yd,Sm).call(this),jr(this.container,pe(this,Td))}disconnectedCallback(){var e,i;Pt(this,kd,Im).call(this),(i=(e=pe(this,li))==null?void 0:e.unassociateElement)==null||i.call(e,this),ua(this,li,null),this.shadowRoot.removeEventListener("focusin",pe(this,_d)),this.shadowRoot.removeEventListener("focusout",pe(this,Ad)),es(this.container,pe(this,Td))}updatePointerBar(e){var i;(i=pe(this,Ht).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=pe(this,Ht).progress)==null||e.style.setProperty("width",`${a}%`),(i=pe(this,Ht).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(r=>[r.start,r.end]),+this.range.max])];ua(this,cc,[...a]);const n=a.pop();for(const[r,s]of a.entries()){const[o,d]=[r===0,r===a.length-1],h=o?"calc(var(--segments-gap) / -1)":`${s*100}%`,g=`calc(${((d?n:a[r+1])-s)*100}%${o||d?"":" - var(--segments-gap)"})`,v=Ce.createElementNS("http://www.w3.org/2000/svg","rect"),E=Se(this.shadowRoot,`#segments-clipping rect:nth-child(${r+1})`);E.style.setProperty("x",h),E.style.setProperty("width",g),i.append(v)}}getPointerRatio(e){return AT(e.clientX,e.clientY,pe(this,gd).getBoundingClientRect(),pe(this,fd).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Pt(this,Cm,_g).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Pt(this,Mm,bg).call(this,e);break;case"pointerdown":Pt(this,hc,Dv).call(this,e);break;case"pointerup":Pt(this,Lm,gg).call(this);break;case"pointerleave":Pt(this,wm,fg).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};li=new WeakMap;oh=new WeakMap;gd=new WeakMap;fd=new WeakMap;Ht=new WeakMap;cc=new WeakMap;_d=new WeakMap;Ad=new WeakMap;Td=new WeakMap;Rv=new WeakSet;Eg=function(t){const e=pe(this,Ht).activeSegment;if(!e)return;const i=this.getPointerRatio(t),n=`#segments-clipping rect:nth-child(${pe(this,cc).findIndex((r,s,o)=>{const d=o[s+1];return d!=null&&i>=r&&i<=d})+1})`;(e.selectorText!=n||!e.style.transform)&&(e.selectorText=n,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};yd=new WeakSet;Sm=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};kd=new WeakSet;Im=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(t=p.window)==null||t.removeEventListener("pointerup",this),(e=p.window)==null||e.removeEventListener("pointermove",this)};hc=new WeakSet;Dv=function(t){var e;ua(this,oh,t.composedPath().includes(this.range)),(e=p.window)==null||e.addEventListener("pointerup",this)};Mm=new WeakSet;bg=function(t){var e;t.pointerType!=="mouse"&&Pt(this,hc,Dv).call(this,t),this.addEventListener("pointerleave",this),(e=p.window)==null||e.addEventListener("pointermove",this)};Lm=new WeakSet;gg=function(){var t;(t=p.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};wm=new WeakSet;fg=function(){var t,e;this.removeEventListener("pointerleave",this),(t=p.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=pe(this,Ht).activeSegment)==null||e.style.removeProperty("transform")};Cm=new WeakSet;_g=function(t){this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Pt(this,Rv,Eg).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!pe(this,oh))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})))};hs.shadowRootOptions={mode:"open"};hs.getTemplateHTML=Iy;p.customElements.get("media-chrome-range")||p.customElements.define("media-chrome-range",hs);var Ag=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$l=(t,e,i)=>(Ag(t,e,"read from private field"),i?i.call(t):e.get(t)),My=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Pl=(t,e,i,a)=>(Ag(t,e,"write to private field"),e.set(t,i),i),di;function Ly(t){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}let xv=class extends p.HTMLElement{constructor(){if(super(),My(this,di,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[z.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===z.MEDIA_CONTROLLER&&(i&&((r=(n=$l(this,di))==null?void 0:n.unassociateElement)==null||r.call(n,this),Pl(this,di,null)),a&&this.isConnected&&(Pl(this,di,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=$l(this,di))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a;const n=this.getAttribute(z.MEDIA_CONTROLLER);n&&(Pl(this,di,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=$l(this,di))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=$l(this,di))==null?void 0:e.unassociateElement)==null||i.call(e,this),Pl(this,di,null)}};di=new WeakMap;xv.shadowRootOptions={mode:"open"};xv.getTemplateHTML=Ly;p.customElements.get("media-control-bar")||p.customElements.define("media-control-bar",xv);var Tg=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Nl=(t,e,i)=>(Tg(t,e,"read from private field"),i?i.call(t):e.get(t)),wy=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ul=(t,e,i,a)=>(Tg(t,e,"write to private field"),e.set(t,i),i),ui;function Cy(t,e={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}function Ry(t,e){return`
    <slot></slot>
  `}let Pa=class extends p.HTMLElement{constructor(){if(super(),wy(this,ui,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[z.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===z.MEDIA_CONTROLLER&&(i&&((r=(n=Nl(this,ui))==null?void 0:n.unassociateElement)==null||r.call(n,this),Ul(this,ui,null)),a&&this.isConnected&&(Ul(this,ui,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=Nl(this,ui))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a;const{style:n}=Se(this.shadowRoot,":host");n.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const r=this.getAttribute(z.MEDIA_CONTROLLER);r&&(Ul(this,ui,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Nl(this,ui))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Nl(this,ui))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ul(this,ui,null)}};ui=new WeakMap;Pa.shadowRootOptions={mode:"open"};Pa.getTemplateHTML=Cy;Pa.getSlotTemplateHTML=Ry;p.customElements.get("media-text-display")||p.customElements.define("media-text-display",Pa);var yg=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},G0=(t,e,i)=>(yg(t,e,"read from private field"),i?i.call(t):e.get(t)),Dy=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},xy=(t,e,i,a)=>(yg(t,e,"write to private field"),e.set(t,i),i),ao;function Oy(t,e){return`
    <slot>${xa(e.mediaDuration)}</slot>
  `}let kg=class extends Pa{constructor(){var e;super(),Dy(this,ao,void 0),xy(this,ao,this.shadowRoot.querySelector("slot")),G0(this,ao).textContent=xa((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===u.MEDIA_DURATION&&(G0(this,ao).textContent=xa(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return ne(this,u.MEDIA_DURATION)}set mediaDuration(e){be(this,u.MEDIA_DURATION,e)}};ao=new WeakMap;kg.getSlotTemplateHTML=Oy;p.customElements.get("media-duration-display")||p.customElements.define("media-duration-display",kg);const $y={2:L("Network Error"),3:L("Decode Error"),4:L("Source Not Supported"),5:L("Encryption Error")},Py={2:L("A network error caused the media download to fail."),3:L("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:L("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:L("The media is encrypted and there are no keys to decrypt it.")},Sg=t=>{var e,i;return t.code===1?null:{title:(e=$y[t.code])!=null?e:`Error ${t.code}`,message:(i=Py[t.code])!=null?i:t.message}};var Ig=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ny=(t,e,i)=>(Ig(t,e,"read from private field"),i?i.call(t):e.get(t)),Uy=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Hy=(t,e,i,a)=>(Ig(t,e,"write to private field"),e.set(t,i),i),Sd;function By(t){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${Mg({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function Wy(t){return t.code&&Sg(t)!==null}function Mg(t){var e;const{title:i,message:a}=(e=Sg(t))!=null?e:{};let n="";return i&&(n+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(n+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),n}const Y0=[u.MEDIA_ERROR_CODE,u.MEDIA_ERROR_MESSAGE];let Ov=class extends wl{constructor(){super(...arguments),Uy(this,Sd,null)}static get observedAttributes(){return[...super.observedAttributes,...Y0]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var n;if(super.attributeChangedCallback(e,i,a),!Y0.includes(e))return;const r=(n=this.mediaError)!=null?n:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=Wy(r),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(r))}get mediaError(){return Ny(this,Sd)}set mediaError(e){Hy(this,Sd,e)}get mediaErrorCode(){return ne(this,"mediaerrorcode")}set mediaErrorCode(e){be(this,"mediaerrorcode",e)}get mediaErrorMessage(){return se(this,"mediaerrormessage")}set mediaErrorMessage(e){oe(this,"mediaerrormessage",e)}};Sd=new WeakMap;Ov.getSlotTemplateHTML=By;Ov.formatErrorMessage=Mg;p.customElements.get("media-error-dialog")||p.customElements.define("media-error-dialog",Ov);const Fy=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,Vy=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Ky(t){return`
    <style>
      :host([${u.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${u.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${u.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${u.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Fy}</slot>
      <slot name="exit">${Vy}</slot>
    </slot>
  `}function Gy(){return`
    <slot name="tooltip-enter">${L("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${L("Exit fullscreen mode")}</slot>
  `}const q0=t=>{const e=t.mediaIsFullscreen?L("exit fullscreen mode"):L("enter fullscreen mode");t.setAttribute("aria-label",e)};let $v=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_IS_FULLSCREEN,u.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),q0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_IS_FULLSCREEN&&q0(this)}get mediaFullscreenUnavailable(){return se(this,u.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){oe(this,u.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return G(this,u.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){Y(this,u.MEDIA_IS_FULLSCREEN,e)}handleClick(){const e=this.mediaIsFullscreen?w.MEDIA_EXIT_FULLSCREEN_REQUEST:w.MEDIA_ENTER_FULLSCREEN_REQUEST;this.dispatchEvent(new p.CustomEvent(e,{composed:!0,bubbles:!0}))}};$v.getSlotTemplateHTML=Ky;$v.getTooltipContentHTML=Gy;p.customElements.get("media-fullscreen-button")||p.customElements.define("media-fullscreen-button",$v);const{MEDIA_TIME_IS_LIVE:Id,MEDIA_PAUSED:Bo}=u,{MEDIA_SEEK_TO_LIVE_REQUEST:Yy,MEDIA_PLAY_REQUEST:qy}=w,Zy='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>';function zy(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Id}]:not([${Bo}])) slot[name=indicator] > *,
      :host([${Id}]:not([${Bo}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Id}]:not([${Bo}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Zy}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${L("live")}</slot>
  `}const Z0=t=>{const e=t.mediaPaused||!t.mediaTimeIsLive,i=L(e?"seek to live":"playing live");t.setAttribute("aria-label",i),e?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")};let Lg=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,Id,Bo]}connectedCallback(){super.connectedCallback(),Z0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Z0(this)}get mediaPaused(){return G(this,u.MEDIA_PAUSED)}set mediaPaused(e){Y(this,u.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return G(this,u.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){Y(this,u.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new p.CustomEvent(Yy,{composed:!0,bubbles:!0})),this.hasAttribute(Bo)&&this.dispatchEvent(new p.CustomEvent(qy,{composed:!0,bubbles:!0})))}};Lg.getSlotTemplateHTML=zy;p.customElements.get("media-live-button")||p.customElements.define("media-live-button",Lg);var wg=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$s=(t,e,i)=>(wg(t,e,"read from private field"),i?i.call(t):e.get(t)),z0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ps=(t,e,i,a)=>(wg(t,e,"write to private field"),e.set(t,i),i),ci,Md;const Hl={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},Cg=500,Qy=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function Xy(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${Cg}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${u.MEDIA_LOADING}]:not([${u.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${u.MEDIA_LOADING}]:not([${u.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${u.MEDIA_LOADING}]:not([${u.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${Qy}</slot>
    <div id="status" role="status" aria-live="polite">${L("media loading")}</div>
  `}let Pv=class extends p.HTMLElement{constructor(){if(super(),z0(this,ci,void 0),z0(this,Md,Cg),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[z.MEDIA_CONTROLLER,u.MEDIA_PAUSED,u.MEDIA_LOADING,Hl.LOADING_DELAY]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===Hl.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===z.MEDIA_CONTROLLER&&(i&&((r=(n=$s(this,ci))==null?void 0:n.unassociateElement)==null||r.call(n,this),Ps(this,ci,null)),a&&this.isConnected&&(Ps(this,ci,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=$s(this,ci))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a;const n=this.getAttribute(z.MEDIA_CONTROLLER);n&&(Ps(this,ci,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=$s(this,ci))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=$s(this,ci))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ps(this,ci,null)}get loadingDelay(){return $s(this,Md)}set loadingDelay(e){Ps(this,Md,e);const{style:i}=Se(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return G(this,u.MEDIA_PAUSED)}set mediaPaused(e){Y(this,u.MEDIA_PAUSED,e)}get mediaLoading(){return G(this,u.MEDIA_LOADING)}set mediaLoading(e){Y(this,u.MEDIA_LOADING,e)}get mediaController(){return se(this,z.MEDIA_CONTROLLER)}set mediaController(e){oe(this,z.MEDIA_CONTROLLER,e)}get noAutohide(){return G(this,Hl.NO_AUTOHIDE)}set noAutohide(e){Y(this,Hl.NO_AUTOHIDE,e)}};ci=new WeakMap;Md=new WeakMap;Pv.shadowRootOptions={mode:"open"};Pv.getTemplateHTML=Xy;p.customElements.get("media-loading-indicator")||p.customElements.define("media-loading-indicator",Pv);const Jy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Q0=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,jy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function e2(t){return`
    <style>
      :host(:not([${u.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${u.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${u.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${u.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${u.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${u.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${u.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${Jy}</slot>
      <slot name="low">${Q0}</slot>
      <slot name="medium">${Q0}</slot>
      <slot name="high">${jy}</slot>
    </slot>
  `}function t2(){return`
    <slot name="tooltip-mute">${L("Mute")}</slot>
    <slot name="tooltip-unmute">${L("Unmute")}</slot>
  `}const X0=t=>{const e=t.mediaVolumeLevel==="off",i=L(e?"unmute":"mute");t.setAttribute("aria-label",i)};let Nv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),X0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_VOLUME_LEVEL&&X0(this)}get mediaVolumeLevel(){return se(this,u.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){oe(this,u.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?w.MEDIA_UNMUTE_REQUEST:w.MEDIA_MUTE_REQUEST;this.dispatchEvent(new p.CustomEvent(e,{composed:!0,bubbles:!0}))}};Nv.getSlotTemplateHTML=e2;Nv.getTooltipContentHTML=t2;p.customElements.get("media-mute-button")||p.customElements.define("media-mute-button",Nv);const J0=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function i2(t){return`
    <style>
      :host([${u.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${u.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${u.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${u.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${J0}</slot>
      <slot name="exit">${J0}</slot>
    </slot>
  `}function a2(){return`
    <slot name="tooltip-enter">${L("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${L("Exit picture in picture mode")}</slot>
  `}const j0=t=>{const e=t.mediaIsPip?L("exit picture in picture mode"):L("enter picture in picture mode");t.setAttribute("aria-label",e)};let Uv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_IS_PIP,u.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),j0(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_IS_PIP&&j0(this)}get mediaPipUnavailable(){return se(this,u.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){oe(this,u.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return G(this,u.MEDIA_IS_PIP)}set mediaIsPip(e){Y(this,u.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?w.MEDIA_EXIT_PIP_REQUEST:w.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new p.CustomEvent(e,{composed:!0,bubbles:!0}))}};Uv.getSlotTemplateHTML=i2;Uv.getTooltipContentHTML=a2;p.customElements.get("media-pip-button")||p.customElements.define("media-pip-button",Uv);var n2=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},On=(t,e,i)=>(n2(t,e,"read from private field"),i?i.call(t):e.get(t)),r2=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ca;const Nh={RATES:"rates"},Rg=[1,1.2,1.5,1.7,2],Rr=1;function s2(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||Rr}x</slot>
  `}function o2(){return L("Playback rate")}let Hv=class extends Ye{constructor(){var e;super(),r2(this,ca,new _v(this,Nh.RATES,{defaultValue:Rg})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Rr}x`}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PLAYBACK_RATE,Nh.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Nh.RATES&&(On(this,ca).value=a),e===u.MEDIA_PLAYBACK_RATE){const n=a?+a:Number.NaN,r=Number.isNaN(n)?Rr:n;this.container.innerHTML=`${r}x`,this.setAttribute("aria-label",L("Playback rate {playbackRate}",{playbackRate:r}))}}get rates(){return On(this,ca)}set rates(e){e?Array.isArray(e)?On(this,ca).value=e.join(" "):typeof e=="string"&&(On(this,ca).value=e):On(this,ca).value=""}get mediaPlaybackRate(){return ne(this,u.MEDIA_PLAYBACK_RATE,Rr)}set mediaPlaybackRate(e){be(this,u.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(On(this,ca).values(),s=>+s).sort((s,o)=>s-o),n=(i=(e=a.find(s=>s>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:Rr,r=new p.CustomEvent(w.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:n});this.dispatchEvent(r)}};ca=new WeakMap;Hv.getSlotTemplateHTML=s2;Hv.getTooltipContentHTML=o2;p.customElements.get("media-playback-rate-button")||p.customElements.define("media-playback-rate-button",Hv);const l2=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,d2=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function u2(t){return`
    <style>
      :host([${u.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${u.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${u.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${u.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${l2}</slot>
      <slot name="pause">${d2}</slot>
    </slot>
  `}function c2(){return`
    <slot name="tooltip-play">${L("Play")}</slot>
    <slot name="tooltip-pause">${L("Pause")}</slot>
  `}const e1=t=>{const e=t.mediaPaused?L("play"):L("pause");t.setAttribute("aria-label",e)};let Bv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PAUSED,u.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),e1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_PAUSED&&e1(this)}get mediaPaused(){return G(this,u.MEDIA_PAUSED)}set mediaPaused(e){Y(this,u.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?w.MEDIA_PLAY_REQUEST:w.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new p.CustomEvent(e,{composed:!0,bubbles:!0}))}};Bv.getSlotTemplateHTML=u2;Bv.getTooltipContentHTML=c2;p.customElements.get("media-play-button")||p.customElements.define("media-play-button",Bv);const ei={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function h2(t){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}const m2=t=>{t.style.removeProperty("background-image")},p2=(t,e)=>{t.style["background-image"]=`url('${e}')`};let Wv=class extends p.HTMLElement{static get observedAttributes(){return[ei.PLACEHOLDER_SRC,ei.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===ei.SRC&&(a==null?this.image.removeAttribute(ei.SRC):this.image.setAttribute(ei.SRC,a)),e===ei.PLACEHOLDER_SRC&&(a==null?m2(this.image):p2(this.image,a))}get placeholderSrc(){return se(this,ei.PLACEHOLDER_SRC)}set placeholderSrc(e){oe(this,ei.SRC,e)}get src(){return se(this,ei.SRC)}set src(e){oe(this,ei.SRC,e)}};Wv.shadowRootOptions={mode:"open"};Wv.getTemplateHTML=h2;p.customElements.get("media-poster-image")||p.customElements.define("media-poster-image",Wv);var Dg=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},v2=(t,e,i)=>(Dg(t,e,"read from private field"),i?i.call(t):e.get(t)),E2=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},b2=(t,e,i,a)=>(Dg(t,e,"write to private field"),e.set(t,i),i),Ld;let g2=class extends Pa{constructor(){super(),E2(this,Ld,void 0),b2(this,Ld,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PREVIEW_CHAPTER]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_PREVIEW_CHAPTER&&a!==i&&a!=null&&(v2(this,Ld).textContent=a,a!==""?this.setAttribute("aria-valuetext",`chapter: ${a}`):this.removeAttribute("aria-valuetext"))}get mediaPreviewChapter(){return se(this,u.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){oe(this,u.MEDIA_PREVIEW_CHAPTER,e)}};Ld=new WeakMap;p.customElements.get("media-preview-chapter-display")||p.customElements.define("media-preview-chapter-display",g2);var xg=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Bl=(t,e,i)=>(xg(t,e,"read from private field"),i?i.call(t):e.get(t)),f2=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Wl=(t,e,i,a)=>(xg(t,e,"write to private field"),e.set(t,i),i),hi;function _2(t){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}let lh=class extends p.HTMLElement{constructor(){if(super(),f2(this,hi,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[z.MEDIA_CONTROLLER,u.MEDIA_PREVIEW_IMAGE,u.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const n=this.getAttribute(z.MEDIA_CONTROLLER);n&&(Wl(this,hi,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=Bl(this,hi))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Bl(this,hi))==null?void 0:e.unassociateElement)==null||i.call(e,this),Wl(this,hi,null)}attributeChangedCallback(e,i,a){var n,r,s,o,d;[u.MEDIA_PREVIEW_IMAGE,u.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===z.MEDIA_CONTROLLER&&(i&&((r=(n=Bl(this,hi))==null?void 0:n.unassociateElement)==null||r.call(n,this),Wl(this,hi,null)),a&&this.isConnected&&(Wl(this,hi,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=Bl(this,hi))==null?void 0:o.associateElement)==null||d.call(o,this)))}get mediaPreviewImage(){return se(this,u.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){oe(this,u.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(u.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(u.MEDIA_PREVIEW_COORDS);return}this.setAttribute(u.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,n,r,s]=e,o=i.split("#")[0],d=getComputedStyle(this),{maxWidth:h,maxHeight:b,minWidth:g,minHeight:v}=d,E=Math.min(parseInt(h)/r,parseInt(b)/s),T=Math.max(parseInt(g)/r,parseInt(v)/s),f=E<1,y=f?E:T>1?T:1,{style:I}=Se(this.shadowRoot,":host"),V=Se(this.shadowRoot,"img").style,fe=this.shadowRoot.querySelector("img"),qe=f?"min":"max";I.setProperty(`${qe}-width`,"initial","important"),I.setProperty(`${qe}-height`,"initial","important"),I.width=`${r*y}px`,I.height=`${s*y}px`;const Re=()=>{V.width=`${this.imgWidth*y}px`,V.height=`${this.imgHeight*y}px`,V.display="block"};fe.src!==o&&(fe.onload=()=>{this.imgWidth=fe.naturalWidth,this.imgHeight=fe.naturalHeight,Re()},fe.src=o,Re()),Re(),V.transform=`translate(-${a*y}px, -${n*y}px)`}};hi=new WeakMap;lh.shadowRootOptions={mode:"open"};lh.getTemplateHTML=_2;p.customElements.get("media-preview-thumbnail")||p.customElements.define("media-preview-thumbnail",lh);var t1=lh,Og=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},i1=(t,e,i)=>(Og(t,e,"read from private field"),i?i.call(t):e.get(t)),A2=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},T2=(t,e,i,a)=>(Og(t,e,"write to private field"),e.set(t,i),i),no;let y2=class extends Pa{constructor(){super(),A2(this,no,void 0),T2(this,no,this.shadowRoot.querySelector("slot")),i1(this,no).textContent=xa(0)}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_PREVIEW_TIME&&a!=null&&(i1(this,no).textContent=xa(parseFloat(a)))}get mediaPreviewTime(){return ne(this,u.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){be(this,u.MEDIA_PREVIEW_TIME,e)}};no=new WeakMap;p.customElements.get("media-preview-time-display")||p.customElements.define("media-preview-time-display",y2);const $n={SEEK_OFFSET:"seekoffset"},Uh=30,k2=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function S2(t,e){return`
    <slot name="icon">${k2(e.seekOffset)}</slot>
  `}function I2(){return L("Seek backward")}const M2=0;let Fv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_CURRENT_TIME,$n.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ne(this,$n.SEEK_OFFSET,Uh)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===$n.SEEK_OFFSET&&(this.seekOffset=ne(this,$n.SEEK_OFFSET,Uh))}get seekOffset(){return ne(this,$n.SEEK_OFFSET,Uh)}set seekOffset(e){be(this,$n.SEEK_OFFSET,e),this.setAttribute("aria-label",L("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Kb(Gb(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ne(this,u.MEDIA_CURRENT_TIME,M2)}set mediaCurrentTime(e){be(this,u.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new p.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};Fv.getSlotTemplateHTML=S2;Fv.getTooltipContentHTML=I2;p.customElements.get("media-seek-backward-button")||p.customElements.define("media-seek-backward-button",Fv);const Pn={SEEK_OFFSET:"seekoffset"},Hh=30,L2=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function w2(t,e){return`
    <slot name="icon">${L2(e.seekOffset)}</slot>
  `}function C2(){return L("Seek forward")}const R2=0;let Vv=class extends Ye{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_CURRENT_TIME,Pn.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ne(this,Pn.SEEK_OFFSET,Hh)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===Pn.SEEK_OFFSET&&(this.seekOffset=ne(this,Pn.SEEK_OFFSET,Hh))}get seekOffset(){return ne(this,Pn.SEEK_OFFSET,Hh)}set seekOffset(e){be(this,Pn.SEEK_OFFSET,e),this.setAttribute("aria-label",L("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Kb(Gb(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ne(this,u.MEDIA_CURRENT_TIME,R2)}set mediaCurrentTime(e){be(this,u.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new p.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};Vv.getSlotTemplateHTML=w2;Vv.getTooltipContentHTML=C2;p.customElements.get("media-seek-forward-button")||p.customElements.define("media-seek-forward-button",Vv);var $g=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Bh=(t,e,i)=>($g(t,e,"read from private field"),i?i.call(t):e.get(t)),D2=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},x2=(t,e,i,a)=>($g(t,e,"write to private field"),e.set(t,i),i),zn;const Qa={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},a1=[...Object.values(Qa),u.MEDIA_CURRENT_TIME,u.MEDIA_DURATION,u.MEDIA_SEEKABLE],n1=["Enter"," "],O2="&nbsp;/&nbsp;",Rm=(t,{timesSep:e=O2}={})=>{var i,a;const n=(i=t.mediaCurrentTime)!=null?i:0,[,r]=(a=t.mediaSeekable)!=null?a:[];let s=0;Number.isFinite(t.mediaDuration)?s=t.mediaDuration:Number.isFinite(r)&&(s=r);const o=t.remaining?xa(0-(s-n)):xa(n);return t.showDuration?`${o}${e}${xa(s)}`:o},$2="video not loaded, unknown time.",P2=t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let n=null;if(Number.isFinite(t.mediaDuration)?n=t.mediaDuration:Number.isFinite(a)&&(n=a),i==null||n===null){t.setAttribute("aria-valuetext",$2);return}const r=t.remaining?Uo(0-(n-i)):Uo(i);if(!t.showDuration){t.setAttribute("aria-valuetext",r);return}const s=Uo(n),o=`${r} of ${s}`;t.setAttribute("aria-valuetext",o)};function N2(t,e){return`
    <slot>${Rm(e)}</slot>
  `}let Pg=class extends Pa{constructor(){super(),D2(this,zn,void 0),x2(this,zn,this.shadowRoot.querySelector("slot")),Bh(this,zn).innerHTML=`${Rm(this)}`}static get observedAttributes(){return[...super.observedAttributes,...a1,"disabled"]}connectedCallback(){const{style:e}=Se(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",L("playback time"));const i=a=>{const{key:n}=a;if(!n1.includes(n)){this.removeEventListener("keyup",i);return}this.toggleTimeDisplay()};this.addEventListener("keydown",a=>{const{metaKey:n,altKey:r,key:s}=a;if(n||r||!n1.includes(s)){this.removeEventListener("keyup",i);return}this.addEventListener("keyup",i)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,i,a){a1.includes(e)?this.update():e==="disabled"&&a!==i&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,i,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return G(this,Qa.REMAINING)}set remaining(e){Y(this,Qa.REMAINING,e)}get showDuration(){return G(this,Qa.SHOW_DURATION)}set showDuration(e){Y(this,Qa.SHOW_DURATION,e)}get noToggle(){return G(this,Qa.NO_TOGGLE)}set noToggle(e){Y(this,Qa.NO_TOGGLE,e)}get mediaDuration(){return ne(this,u.MEDIA_DURATION)}set mediaDuration(e){be(this,u.MEDIA_DURATION,e)}get mediaCurrentTime(){return ne(this,u.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){be(this,u.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(u.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(u.MEDIA_SEEKABLE);return}this.setAttribute(u.MEDIA_SEEKABLE,e.join(":"))}update(){const e=Rm(this);P2(this),e!==Bh(this,zn).innerHTML&&(Bh(this,zn).innerHTML=e)}};zn=new WeakMap;Pg.getSlotTemplateHTML=N2;p.customElements.get("media-time-display")||p.customElements.define("media-time-display",Pg);var Ng=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Oe=(t,e,i)=>(Ng(t,e,"read from private field"),e.get(t)),ti=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},dt=(t,e,i,a)=>(Ng(t,e,"write to private field"),e.set(t,i),i),U2=(t,e,i,a)=>({set _(n){dt(t,e,n)},get _(){return Oe(t,e)}}),Qn,wd,Xn,ro,Cd,Rd,Dd,Jn,Xa,xd;let H2=class{constructor(e,i,a){ti(this,Qn,void 0),ti(this,wd,void 0),ti(this,Xn,void 0),ti(this,ro,void 0),ti(this,Cd,void 0),ti(this,Rd,void 0),ti(this,Dd,void 0),ti(this,Jn,void 0),ti(this,Xa,0),ti(this,xd,(n=performance.now())=>{dt(this,Xa,requestAnimationFrame(Oe(this,xd))),dt(this,ro,performance.now()-Oe(this,Xn));const r=1e3/this.fps;if(Oe(this,ro)>r){dt(this,Xn,n-Oe(this,ro)%r);const s=1e3/((n-Oe(this,wd))/++U2(this,Cd)._),o=(n-Oe(this,Rd))/1e3/this.duration;let d=Oe(this,Dd)+o*this.playbackRate;d-Oe(this,Qn).valueAsNumber>0?dt(this,Jn,this.playbackRate/this.duration/s):(dt(this,Jn,.995*Oe(this,Jn)),d=Oe(this,Qn).valueAsNumber+Oe(this,Jn)),this.callback(d)}}),dt(this,Qn,e),this.callback=i,this.fps=a}start(){Oe(this,Xa)===0&&(dt(this,Xn,performance.now()),dt(this,wd,Oe(this,Xn)),dt(this,Cd,0),Oe(this,xd).call(this))}stop(){Oe(this,Xa)!==0&&(cancelAnimationFrame(Oe(this,Xa)),dt(this,Xa,0))}update({start:e,duration:i,playbackRate:a}){const n=e-Oe(this,Qn).valueAsNumber,r=Math.abs(i-this.duration);(n>0||n<-.03||r>=.5)&&this.callback(e),dt(this,Dd,e),dt(this,Rd,performance.now()),this.duration=i,this.playbackRate=a}};Qn=new WeakMap;wd=new WeakMap;Xn=new WeakMap;ro=new WeakMap;Cd=new WeakMap;Rd=new WeakMap;Dd=new WeakMap;Jn=new WeakMap;Xa=new WeakMap;xd=new WeakMap;var Kv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Le=(t,e,i)=>(Kv(t,e,"read from private field"),i?i.call(t):e.get(t)),xe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},mi=(t,e,i,a)=>(Kv(t,e,"write to private field"),e.set(t,i),i),Qe=(t,e,i)=>(Kv(t,e,"access private method"),i),jn,fn,mc,Wo,pc,Od,ul,cl,er,tr,so,Gv,Ug,Dm,vc,Yv,Ec,qv,bc,Zv,xm,Hg,hl,gc,Om,Bg;const B2="video not loaded, unknown time.",W2=t=>{const e=t.range,i=Uo(+Wg(t)),a=Uo(+t.mediaSeekableEnd),n=i&&a?`${i} of ${a}`:B2;e.setAttribute("aria-valuetext",n)};function F2(t){return`
    ${hs.getTemplateHTML(t)}
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${u.MEDIA_PREVIEW_IMAGE}], [${u.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${u.MEDIA_PREVIEW_IMAGE}], [${u.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${u.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${u.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${u.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${u.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${u.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${u.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${u.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${u.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${u.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${u.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${u.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${u.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${t1.shadowRootOptions.mode}">
            ${t1.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}const Fl=(t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const n=(e-i)/(a-i);return Math.max(0,Math.min(n,1))},Wg=(t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i};let zv=class extends hs{constructor(){super(),xe(this,tr),xe(this,Gv),xe(this,vc),xe(this,Ec),xe(this,bc),xe(this,xm),xe(this,hl),xe(this,Om),xe(this,jn,void 0),xe(this,fn,void 0),xe(this,mc,void 0),xe(this,Wo,void 0),xe(this,pc,void 0),xe(this,Od,void 0),xe(this,ul,void 0),xe(this,cl,void 0),xe(this,er,void 0),xe(this,Dm,a=>{this.dragging||(vv(a)&&(this.range.valueAsNumber=a),this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),mi(this,mc,this.shadowRoot.querySelectorAll('[part~="box"]')),mi(this,pc,this.shadowRoot.querySelector('[part~="preview-box"]')),mi(this,Od,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);mi(this,ul,parseInt(i.getPropertyValue("--media-box-padding-left"))),mi(this,cl,parseInt(i.getPropertyValue("--media-box-padding-right"))),mi(this,fn,new H2(this.range,Le(this,Dm),60))}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PAUSED,u.MEDIA_DURATION,u.MEDIA_SEEKABLE,u.MEDIA_CURRENT_TIME,u.MEDIA_PREVIEW_IMAGE,u.MEDIA_PREVIEW_TIME,u.MEDIA_PREVIEW_CHAPTER,u.MEDIA_BUFFERED,u.MEDIA_PLAYBACK_RATE,u.MEDIA_LOADING,u.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",L("seek")),Qe(this,tr,so).call(this),mi(this,jn,this.getRootNode()),(e=Le(this,jn))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),Qe(this,tr,so).call(this),(e=Le(this,jn))==null||e.removeEventListener("transitionstart",this),mi(this,jn,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===u.MEDIA_CURRENT_TIME||e===u.MEDIA_PAUSED||e===u.MEDIA_ENDED||e===u.MEDIA_LOADING||e===u.MEDIA_DURATION||e===u.MEDIA_SEEKABLE?(Le(this,fn).update({start:Fl(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),Qe(this,tr,so).call(this),W2(this)):e===u.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===u.MEDIA_DURATION||e===u.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=Le(this,er),this.updateBar()))}get mediaChaptersCues(){return Le(this,er)}set mediaChaptersCues(e){var i;mi(this,er,e),this.updateSegments((i=Le(this,er))==null?void 0:i.map(a=>({start:Fl(this,a.startTime),end:Fl(this,a.endTime)})))}get mediaPaused(){return G(this,u.MEDIA_PAUSED)}set mediaPaused(e){Y(this,u.MEDIA_PAUSED,e)}get mediaLoading(){return G(this,u.MEDIA_LOADING)}set mediaLoading(e){Y(this,u.MEDIA_LOADING,e)}get mediaDuration(){return ne(this,u.MEDIA_DURATION)}set mediaDuration(e){be(this,u.MEDIA_DURATION,e)}get mediaCurrentTime(){return ne(this,u.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){be(this,u.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return ne(this,u.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){be(this,u.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(u.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(u.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(u.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(u.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(u.MEDIA_SEEKABLE);return}this.setAttribute(u.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return se(this,u.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){oe(this,u.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return ne(this,u.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){be(this,u.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return G(this,u.MEDIA_ENDED)}set mediaEnded(e){Y(this,u.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const r=this.mediaCurrentTime,[,s=this.mediaSeekableStart]=(e=i.find(([o,d])=>o<=r&&r<=d))!=null?e:[];a=Fl(this,s)}const{style:n}=Se(this.shadowRoot,"#buffered");n.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=Se(this.shadowRoot,"#current-rail"),a=Se(this.shadowRoot,'[part~="current-box"]'),n=Qe(this,vc,Yv).call(this,Le(this,Od)),r=Qe(this,Ec,qv).call(this,n,this.range.valueAsNumber),s=Qe(this,bc,Zv).call(this,n,this.range.valueAsNumber);i.style.transform=`translateX(${r})`,i.style.setProperty("--_range-width",`${n.range.width}`),a.style.setProperty("--_box-shift",`${s}`),a.style.setProperty("--_box-width",`${n.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":Qe(this,Om,Bg).call(this);break;case"pointermove":Qe(this,xm,Hg).call(this,e);break;case"pointerup":case"pointerleave":Qe(this,hl,gc).call(this,null);break;case"transitionstart":ta(e.target,this)&&setTimeout(()=>Qe(this,tr,so).call(this),0);break}}};jn=new WeakMap;fn=new WeakMap;mc=new WeakMap;Wo=new WeakMap;pc=new WeakMap;Od=new WeakMap;ul=new WeakMap;cl=new WeakMap;er=new WeakMap;tr=new WeakSet;so=function(){Qe(this,Gv,Ug).call(this)?Le(this,fn).start():Le(this,fn).stop()};Gv=new WeakSet;Ug=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Yb(this)};Dm=new WeakMap;vc=new WeakSet;Yv=function(t){var e;const a=((e=this.getAttribute("bounds")?cs(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=t.offsetWidth,s=-(n.left-a.left-r/2),o=a.right-n.left-r/2;return{box:{width:r,min:s,max:o},bounds:a,range:n}};Ec=new WeakSet;qv=function(t,e){let i=`${e*100}%`;const{width:a,min:n,max:r}=t.box;if(!a)return i;if(Number.isNaN(n)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${n}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(r)){const o=`calc(1 / var(--_range-width) * 100 * ${r}% - var(--media-box-padding-right))`;i=`min(${i}, ${o})`}return i};bc=new WeakSet;Zv=function(t,e){const{width:i,min:a,max:n}=t.box,r=e*t.range.width;if(r<a+Le(this,ul)){const s=t.range.left-t.bounds.left-Le(this,ul);return`${r-i/2+s}px`}if(r>n-Le(this,cl)){const s=t.bounds.right-t.range.right-Le(this,cl);return`${r+i/2-s-t.range.width}px`}return 0};xm=new WeakSet;Hg=function(t){const e=[...Le(this,mc)].some(b=>t.composedPath().includes(b));if(!this.dragging&&(e||!t.composedPath().includes(this))){Qe(this,hl,gc).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=Se(this.shadowRoot,"#preview-rail"),n=Se(this.shadowRoot,'[part~="preview-box"]'),r=Qe(this,vc,Yv).call(this,Le(this,pc));let s=(t.clientX-r.range.left)/r.range.width;s=Math.max(0,Math.min(1,s));const o=Qe(this,Ec,qv).call(this,r,s),d=Qe(this,bc,Zv).call(this,r,s);a.style.transform=`translateX(${o})`,a.style.setProperty("--_range-width",`${r.range.width}`),n.style.setProperty("--_box-shift",`${d}`),n.style.setProperty("--_box-width",`${r.box.width}px`);const h=Math.round(Le(this,Wo))-Math.round(s*i);Math.abs(h)<1&&s>.01&&s<.99||(mi(this,Wo,s*i),Qe(this,hl,gc).call(this,Le(this,Wo)))};hl=new WeakSet;gc=function(t){this.dispatchEvent(new p.CustomEvent(w.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Om=new WeakSet;Bg=function(){Le(this,fn).stop();const t=Wg(this);this.dispatchEvent(new p.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};zv.shadowRootOptions={mode:"open"};zv.getTemplateHTML=F2;p.customElements.get("media-time-range")||p.customElements.define("media-time-range",zv);const V2=1,K2=t=>t.mediaMuted?0:t.mediaVolume,G2=t=>`${Math.round(t*100)}%`;let Y2=class extends hs{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_VOLUME,u.MEDIA_MUTED,u.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{const e=this.range.value,i=new p.CustomEvent(w.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",L("volume"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===u.MEDIA_VOLUME||e===u.MEDIA_MUTED)&&(this.range.valueAsNumber=K2(this),this.range.setAttribute("aria-valuetext",G2(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return ne(this,u.MEDIA_VOLUME,V2)}set mediaVolume(e){be(this,u.MEDIA_VOLUME,e)}get mediaMuted(){return G(this,u.MEDIA_MUTED)}set mediaMuted(e){Y(this,u.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return se(this,u.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){oe(this,u.MEDIA_VOLUME_UNAVAILABLE,e)}};p.customElements.get("media-volume-range")||p.customElements.define("media-volume-range",Y2);var Fg=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},P=(t,e,i)=>(Fg(t,e,"read from private field"),i?i.call(t):e.get(t)),Si=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ji=(t,e,i,a)=>(Fg(t,e,"write to private field"),e.set(t,i),i),ir,$d,Ja,oo,ha,ma,pa,ja,ar,Pd,Dt;const r1=1,s1=0,q2=1,Z2={processCallback(t,e,i){if(i){for(const[a,n]of e)if(a in i){const r=i[a];typeof r=="boolean"&&n instanceof _n&&typeof n.element[n.attributeName]=="boolean"?n.booleanValue=r:typeof r=="function"&&n instanceof _n?n.element[n.attributeName]=r:n.value=r}}}};let Qv=class extends p.DocumentFragment{constructor(e,i,a=Z2){var n;super(),Si(this,ir,void 0),Si(this,$d,void 0),this.append(e.content.cloneNode(!0)),Ji(this,ir,Vg(this)),Ji(this,$d,a),(n=a.createCallback)==null||n.call(a,this,P(this,ir),i),a.processCallback(this,P(this,ir),i)}update(e){P(this,$d).processCallback(this,P(this,ir),e)}};ir=new WeakMap;$d=new WeakMap;const Vg=(t,e=[])=>{let i,a;for(const n of t.attributes||[])if(n.value.includes("{{")){const r=new Q2;for([i,a]of l1(n.value))if(!i)r.append(a);else{const s=new _n(t,n.name,n.namespaceURI);r.append(s),e.push([a,s])}n.value=r.toString()}for(const n of t.childNodes)if(n.nodeType===r1&&!(n instanceof HTMLTemplateElement))Vg(n,e);else{const r=n.data;if(n.nodeType===r1||r.includes("{{")){const s=[];if(r)for([i,a]of l1(r))if(!i)s.push(new Text(a));else{const o=new Yg(t);s.push(o),e.push([a,o])}else if(n instanceof HTMLTemplateElement){const o=new qg(t,n);s.push(o),e.push([o.expression,o])}n.replaceWith(...s.flatMap(o=>o.replacementNodes||[o]))}}return e},o1={},l1=t=>{let e="",i=0,a=o1[t],n=0,r;if(a)return a;for(a=[];r=t[n];n++)r==="{"&&t[n+1]==="{"&&t[n-1]!=="\\"&&t[n+2]&&++i==1?(e&&a.push([s1,e]),e="",n++):r==="}"&&t[n+1]==="}"&&t[n-1]!=="\\"&&!--i?(a.push([q2,e.trim()]),e="",n++):e+=r||"";return e&&a.push([s1,(i>0?"{{":"")+e]),o1[t]=a},z2=11;let Kg=class{get value(){return""}set value(e){}toString(){return this.value}};const Gg=new WeakMap;let Q2=class{constructor(){Si(this,Ja,[])}[Symbol.iterator](){return P(this,Ja).values()}get length(){return P(this,Ja).length}item(e){return P(this,Ja)[e]}append(...e){for(const i of e)i instanceof _n&&Gg.set(i,this),P(this,Ja).push(i)}toString(){return P(this,Ja).join("")}};Ja=new WeakMap;let _n=class extends Kg{constructor(e,i,a){super(),Si(this,ja),Si(this,oo,""),Si(this,ha,void 0),Si(this,ma,void 0),Si(this,pa,void 0),Ji(this,ha,e),Ji(this,ma,i),Ji(this,pa,a)}get attributeName(){return P(this,ma)}get attributeNamespace(){return P(this,pa)}get element(){return P(this,ha)}get value(){return P(this,oo)}set value(e){P(this,oo)!==e&&(Ji(this,oo,e),!P(this,ja,ar)||P(this,ja,ar).length===1?e==null?P(this,ha).removeAttributeNS(P(this,pa),P(this,ma)):P(this,ha).setAttributeNS(P(this,pa),P(this,ma),e):P(this,ha).setAttributeNS(P(this,pa),P(this,ma),P(this,ja,ar).toString()))}get booleanValue(){return P(this,ha).hasAttributeNS(P(this,pa),P(this,ma))}set booleanValue(e){if(!P(this,ja,ar)||P(this,ja,ar).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}};oo=new WeakMap;ha=new WeakMap;ma=new WeakMap;pa=new WeakMap;ja=new WeakSet;ar=function(){return Gg.get(this)};let Yg=class extends Kg{constructor(e,i){super(),Si(this,Pd,void 0),Si(this,Dt,void 0),Ji(this,Pd,e),Ji(this,Dt,i?[...i]:[new Text])}get replacementNodes(){return P(this,Dt)}get parentNode(){return P(this,Pd)}get nextSibling(){return P(this,Dt)[P(this,Dt).length-1].nextSibling}get previousSibling(){return P(this,Dt)[0].previousSibling}get value(){return P(this,Dt).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===z2?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),Ji(this,Dt,X2(P(this,Dt)[0].parentNode,P(this,Dt),i,this.nextSibling))}};Pd=new WeakMap;Dt=new WeakMap;let qg=class extends Yg{constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let n=i.getAttribute("expression")||i.getAttribute(a)||"";n.startsWith("{{")&&(n=n.trim().slice(2,-2).trim()),super(e),this.expression=n,this.template=i,this.directive=a}};function X2(t,e,i,a=null){let n=0,r,s,o,d=i.length,h=e.length;for(;n<d&&n<h&&e[n]==i[n];)n++;for(;n<d&&n<h&&i[d-1]==e[h-1];)a=i[--h,--d];if(n==h)for(;n<d;)t.insertBefore(i[n++],a);if(n==d)for(;n<h;)t.removeChild(e[n++]);else{for(r=e[n];n<d;)o=i[n++],s=r?r.nextSibling:a,r==o?r=s:n<d&&i[n]==s?(t.replaceChild(o,r),r=s):t.insertBefore(o,r);for(;r!=a;)s=r.nextSibling,t.removeChild(r),r=s}return i}const d1={string:t=>String(t)};let Zg=class{constructor(e){this.template=e,this.state=void 0}};const cn=new WeakMap,hn=new WeakMap,$m={partial:(t,e)=>{e[t.expression]=new Zg(t.template)},if:(t,e)=>{var i;if(zg(t.expression,e))if(cn.get(t)!==t.template){cn.set(t,t.template);const a=new Qv(t.template,e,Xv);t.replace(a),hn.set(t,a)}else(i=hn.get(t))==null||i.update(e);else t.replace(""),cn.delete(t),hn.delete(t)}},J2=Object.keys($m),Xv={processCallback(t,e,i){var a,n;if(i)for(const[r,s]of e){if(s instanceof qg){if(!s.directive){const d=J2.find(h=>s.template.hasAttribute(h));d&&(s.directive=d,s.expression=s.template.getAttribute(d))}(a=$m[s.directive])==null||a.call($m,s,i);continue}let o=zg(r,i);if(o instanceof Zg){cn.get(s)!==o.template?(cn.set(s,o.template),o=new Qv(o.template,o.state,Xv),s.value=o,hn.set(s,o)):(n=hn.get(s))==null||n.update(o.state);continue}o?(s instanceof _n&&s.attributeName.startsWith("aria-")&&(o=String(o)),s instanceof _n?typeof o=="boolean"?s.booleanValue=o:typeof o=="function"?s.element[s.attributeName]=o:s.value=o:(s.value=o,cn.delete(s),hn.delete(s))):s instanceof _n?s.value=void 0:(s.value=void 0,cn.delete(s),hn.delete(s))}}},u1={"!":t=>!t,"!!":t=>!!t,"==":(t,e)=>t==e,"!=":(t,e)=>t!=e,">":(t,e)=>t>e,">=":(t,e)=>t>=e,"<":(t,e)=>t<e,"<=":(t,e)=>t<=e,"??":(t,e)=>t??e,"|":(t,e)=>{var i;return(i=d1[e])==null?void 0:i.call(d1,t)}};function j2(t){return ek(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}function zg(t,e={}){var i,a,n,r,s,o,d;const h=j2(t);if(h.length===0||h.some(({type:b})=>!b))return Ns(t);if(((i=h[0])==null?void 0:i.token)===">"){const b=e[(a=h[1])==null?void 0:a.token];if(!b)return Ns(t);const g={...e};b.state=g;const v=h.slice(2);for(let E=0;E<v.length;E+=3){const T=(n=v[E])==null?void 0:n.token,f=(r=v[E+1])==null?void 0:r.token,y=(s=v[E+2])==null?void 0:s.token;T&&f==="="&&(g[T]=Us(y,e))}return b}if(h.length===1)return Vl(h[0])?Us(h[0].token,e):Ns(t);if(h.length===2){const b=(o=h[0])==null?void 0:o.token,g=u1[b];if(!g||!Vl(h[1]))return Ns(t);const v=Us(h[1].token,e);return g(v)}if(h.length===3){const b=(d=h[1])==null?void 0:d.token,g=u1[b];if(!g||!Vl(h[0])||!Vl(h[2]))return Ns(t);const v=Us(h[0].token,e);if(b==="|")return g(v,h[2].token);const E=Us(h[2].token,e);return g(v,E)}}function Ns(t){return console.warn(`Warning: invalid expression \`${t}\``),!1}function Vl({type:t}){return["number","boolean","string","param"].includes(t)}function Us(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):Pb(t)?parseFloat(t):e[t]}function ek(t,e){let i,a,n;const r=[];for(;t;){n=null,i=t.length;for(const s in e)a=e[s].exec(t),a&&a.index<i&&(n={token:a[0],type:s,matches:a.slice(1)},i=a.index);i&&r.push({token:t.substr(0,i),type:void 0}),n&&r.push(n),t=t.substr(i+(n?n.token.length:0))}return r}var Jv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Pm=(t,e,i)=>(Jv(t,e,"read from private field"),i?i.call(t):e.get(t)),Hs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},mn=(t,e,i,a)=>(Jv(t,e,"write to private field"),e.set(t,i),i),Wh=(t,e,i)=>(Jv(t,e,"access private method"),i),Br,Nd,Wr,Nm,Qg,Ud,Um;const Fh={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},Xg=Ce.createElement("template");Xg.innerHTML=`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;let dh=class extends p.HTMLElement{constructor(){super(),Hs(this,Nm),Hs(this,Ud),Hs(this,Br,void 0),Hs(this,Nd,void 0),Hs(this,Wr,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer());const e=new MutationObserver(i=>{var a;this.mediaController&&!((a=this.mediaController)!=null&&a.breakpointsComputed)||i.some(n=>{const r=n.target;return r===this?!0:r.localName!=="media-controller"?!1:!!(Fh[n.attributeName]||n.attributeName.startsWith("breakpoint"))})&&this.render()});e.observe(this,{attributes:!0}),e.observe(this.renderRoot,{attributes:!0,subtree:!0}),this.addEventListener(Ln.BREAKPOINTS_COMPUTED,this.render),Wh(this,Nm,Qg).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=Pm(this,Br))!=null?e:this.constructor.template}set template(e){mn(this,Wr,null),mn(this,Br,e),this.createRenderer()}get props(){var e,i,a;const n=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:s})=>Fh[s]||s.startsWith("breakpoint")),...Array.from(this.attributes)],r={};for(const s of n){const o=(a=Fh[s.name])!=null?a:pT(s.name);let{value:d}=s;d!=null?(Pb(d)&&(d=parseFloat(d)),r[o]=d===""?!0:d):r[o]=!1}return r}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&Wh(this,Ud,Um).call(this)}connectedCallback(){Wh(this,Ud,Um).call(this)}createRenderer(){this.template&&this.template!==Pm(this,Nd)&&(mn(this,Nd,this.template),this.renderer=new Qv(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(Xg.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}};Br=new WeakMap;Nd=new WeakMap;Wr=new WeakMap;Nm=new WeakSet;Qg=function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}};Ud=new WeakSet;Um=function(){var t;const e=this.getAttribute("template");if(!e||e===Pm(this,Wr))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){mn(this,Wr,e),mn(this,Br,a),this.createRenderer();return}tk(e)&&(mn(this,Wr,e),ik(e).then(n=>{const r=Ce.createElement("template");r.innerHTML=n,mn(this,Br,r),this.createRenderer()}).catch(console.error))};dh.observedAttributes=["template"];dh.processor=Xv;function tk(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}async function ik(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}p.customElements.get("media-theme")||p.customElements.define("media-theme",dh);function ak({anchor:t,floating:e,placement:i}){const a=nk({anchor:t,floating:e}),{x:n,y:r}=sk(a,i);return{x:n,y:r}}function nk({anchor:t,floating:e}){return{anchor:rk(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function rk(t,e){var i;const a=t.getBoundingClientRect(),n=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-n.x,y:a.y-n.y,width:a.width,height:a.height}}function sk({anchor:t,floating:e},i){const a=ok(i)==="x"?"y":"x",n=a==="y"?"height":"width",r=Jg(i),s=t.x+t.width/2-e.width/2,o=t.y+t.height/2-e.height/2,d=t[n]/2-e[n]/2;let h;switch(r){case"top":h={x:s,y:t.y-e.height};break;case"bottom":h={x:s,y:t.y+t.height};break;case"right":h={x:t.x+t.width,y:o};break;case"left":h={x:t.x-e.width,y:o};break;default:h={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":h[a]-=d;break;case"end":h[a]+=d;break}return h}function Jg(t){return t.split("-")[0]}function ok(t){return["top","bottom"].includes(Jg(t))?"y":"x"}let jv=class extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}},lk=class extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}};var eE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Z=(t,e,i)=>(eE(t,e,"read from private field"),i?i.call(t):e.get(t)),ee=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},pi=(t,e,i,a)=>(eE(t,e,"write to private field"),e.set(t,i),i),ie=(t,e,i)=>(eE(t,e,"access private method"),i),vi,An,$a,Hd,Bd,Tn,ml,Hm,jg,fc,Wd,Bm,Wm,ef,Fm,tf,Vm,af,Fr,Vr,Kr,pl,_c,tE,Km,nf,iE,rf,Gm,sf,aE,of,Ym,lf,qm,df,Fo,Ac,Zm,uf,Vo,Tc,Fd,zm;function as({type:t,text:e,value:i,checked:a}){const n=Ce.createElement("media-chrome-menu-item");n.type=t,n.part.add("menu-item"),n.part.add(t),n.value=i,n.checked=a;const r=Ce.createElement("span");return r.textContent=e,n.append(r),n}function yn(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}function dk(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex);
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `}const Fa={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};let Ni=class extends p.HTMLElement{constructor(){if(super(),ee(this,Hm),ee(this,Wd),ee(this,Wm),ee(this,Fm),ee(this,Vm),ee(this,Kr),ee(this,_c),ee(this,Km),ee(this,iE),ee(this,Gm),ee(this,aE),ee(this,Ym),ee(this,qm),ee(this,Fo),ee(this,Zm),ee(this,Vo),ee(this,Fd),ee(this,vi,null),ee(this,An,null),ee(this,$a,null),ee(this,Hd,new Set),ee(this,Bd,void 0),ee(this,Tn,!1),ee(this,ml,null),ee(this,fc,()=>{const e=Z(this,Hd),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));pi(this,Hd,i)}),ee(this,Fr,()=>{ie(this,Kr,pl).call(this),ie(this,_c,tE).call(this,!1)}),ee(this,Vr,()=>{ie(this,Kr,pl).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),pi(this,Bd,new MutationObserver(Z(this,fc))),Z(this,Bd).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[Fa.DISABLED,Fa.HIDDEN,Fa.STYLE,Fa.ANCHOR,z.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":ie(this,Hm,jg).call(this,e);break;case"invoke":ie(this,Wm,ef).call(this,e);break;case"click":ie(this,Km,nf).call(this,e);break;case"toggle":ie(this,Gm,sf).call(this,e);break;case"focusout":ie(this,Ym,lf).call(this,e);break;case"keydown":ie(this,qm,df).call(this,e);break}}connectedCallback(){var e,i;pi(this,ml,qb(this.shadowRoot,":host")),ie(this,Wd,Bm).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),pi(this,vi,um(this)),(i=(e=Z(this,vi))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(jr(vl(this),Z(this,Fr)),jr(this,Z(this,Vr)))}disconnectedCallback(){var e,i;es(vl(this),Z(this,Fr)),es(this,Z(this,Vr)),this.disable(),(i=(e=Z(this,vi))==null?void 0:e.unassociateElement)==null||i.call(e,this),pi(this,vi,null)}attributeChangedCallback(e,i,a){var n,r,s,o;e===Fa.HIDDEN&&a!==i?(Z(this,Tn)||pi(this,Tn,!0),this.hidden?ie(this,Vm,af).call(this):ie(this,Fm,tf).call(this),this.dispatchEvent(new lk({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===z.MEDIA_CONTROLLER?(i&&((r=(n=Z(this,vi))==null?void 0:n.unassociateElement)==null||r.call(n,this),pi(this,vi,null)),a&&this.isConnected&&(pi(this,vi,um(this)),(o=(s=Z(this,vi))==null?void 0:s.associateElement)==null||o.call(s,this))):e===Fa.DISABLED&&a!==i?a==null?this.enable():this.disable():e===Fa.STYLE&&a!==i&&ie(this,Wd,Bm).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=jc(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(uk)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&ie(this,Fd,zm).call(this,i)}focus(){if(pi(this,An,bv()),this.items.length){ie(this,Vo,Tc).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=ie(this,Fo,Ac).call(this,e);a&&(ie(this,Fd,zm).call(this,a,a.type==="checkbox"),Z(this,$a)&&!this.hidden&&((i=Z(this,An))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:n}=e,r=this.items,s=(a=(i=ie(this,Fo,Ac).call(this,e))!=null?i:ie(this,Zm,uf).call(this))!=null?a:r[0],o=r.indexOf(s);let d=Math.max(0,o);n==="ArrowDown"?d++:n==="ArrowUp"?d--:e.key==="Home"?d=0:e.key==="End"&&(d=r.length-1),d<0&&(d=r.length-1),d>r.length-1&&(d=0),ie(this,Vo,Tc).call(this,r[d]),r[d].focus()}};vi=new WeakMap;An=new WeakMap;$a=new WeakMap;Hd=new WeakMap;Bd=new WeakMap;Tn=new WeakMap;ml=new WeakMap;Hm=new WeakSet;jg=function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();if(["header","title"].includes(e.name)){const i=this.shadowRoot.querySelector('slot[name="header"]');i.hidden=e.assignedNodes().length===0}e.name||Z(this,fc).call(this)};fc=new WeakMap;Wd=new WeakSet;Bm=function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};Wm=new WeakSet;ef=function(t){pi(this,$a,t.relatedTarget),ta(this,t.relatedTarget)||(this.hidden=!this.hidden)};Fm=new WeakSet;tf=function(){var t;(t=Z(this,$a))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),jr(vl(this),Z(this,Fr)),jr(this,Z(this,Vr))};Vm=new WeakSet;af=function(){var t;(t=Z(this,$a))==null||t.setAttribute("aria-expanded","false"),es(vl(this),Z(this,Fr)),es(this,Z(this,Vr))};Fr=new WeakMap;Vr=new WeakMap;Kr=new WeakSet;pl=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=ak({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const n=vl(this).getBoundingClientRect(),r=n.width-e-t,s=n.height-i-this.offsetHeight,{style:o}=Z(this,ml);o.setProperty("position","absolute"),o.setProperty("right",`${Math.max(0,r)}px`),o.setProperty("--_menu-bottom",`${s}px`);const d=getComputedStyle(this),b=o.getPropertyValue("--_menu-bottom")===d.bottom?s:parseFloat(d.bottom),g=n.height-b-parseFloat(d.marginBottom);this.style.setProperty("--_menu-max-height",`${g}px`)};_c=new WeakSet;tE=function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=Z(this,ml);if(t||a.setProperty("--media-menu-transition-in","none"),i){const n=i.offsetHeight,r=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${r}px`),this.style.setProperty("min-height",`${n}px`),ie(this,Kr,pl).call(this,r)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),ie(this,Kr,pl).call(this);a.removeProperty("--media-menu-transition-in")};Km=new WeakSet;nf=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(Z(this,iE,rf))){(e=Z(this,An))==null||e.focus(),this.hidden=!0;return}const i=ie(this,Fo,Ac).call(this,t);!i||i.hasAttribute("disabled")||(ie(this,Vo,Tc).call(this,i),this.handleSelect(t))};iE=new WeakSet;rf=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};Gm=new WeakSet;sf=function(t){if(t.target===this)return;ie(this,aE,of).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new jv({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);ie(this,_c,tE).call(this,!0)};aE=new WeakSet;of=function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};Ym=new WeakSet;lf=function(t){var e;ta(this,t.relatedTarget)||(Z(this,Tn)&&((e=Z(this,An))==null||e.focus()),Z(this,$a)&&Z(this,$a)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};qm=new WeakSet;df=function(t){var e,i,a,n,r;const{key:s,ctrlKey:o,altKey:d,metaKey:h}=t;if(!(o||d||h)&&this.keysUsed.includes(s))if(t.preventDefault(),t.stopPropagation(),s==="Tab"){if(Z(this,Tn)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(n=(a=this.nextElementSibling)==null?void 0:a.focus)==null||n.call(a),this.blur()}else s==="Escape"?((r=Z(this,An))==null||r.focus(),Z(this,Tn)&&(this.hidden=!0)):s==="Enter"||s===" "?this.handleSelect(t):this.handleMove(t)};Fo=new WeakSet;Ac=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};Zm=new WeakSet;uf=function(){return this.items.find(t=>t.tabIndex===0)};Vo=new WeakSet;Tc=function(t){for(const e of this.items)e.tabIndex=e===t?0:-1};Fd=new WeakSet;zm=function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,n)=>a!=i[n])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};Ni.shadowRootOptions={mode:"open"};Ni.getTemplateHTML=dk;function uk(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}function vl(t){var e;return(e=t.getAttribute("bounds")?cs(t,`#${t.getAttribute("bounds")}`):Lt(t)||t.parentElement)!=null?e:t}p.customElements.get("media-chrome-menu")||p.customElements.define("media-chrome-menu",Ni);var nE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},wi=(t,e,i)=>(nE(t,e,"read from private field"),i?i.call(t):e.get(t)),Bi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Vh=(t,e,i,a)=>(nE(t,e,"write to private field"),e.set(t,i),i),Ii=(t,e,i)=>(nE(t,e,"access private method"),i),Vd,Ko,Qm,cf,rE,hf,sE,mf,Ci,ns,El,Xm,pf,Kd,Jm;function ck(t){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(t)}
    </slot>
    <slot name="submenu"></slot>
  `}function hk(t){return""}const gt={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};let ms=class extends p.HTMLElement{constructor(){if(super(),Bi(this,Qm),Bi(this,rE),Bi(this,sE),Bi(this,ns),Bi(this,Xm),Bi(this,Kd),Bi(this,Vd,!1),Bi(this,Ko,void 0),Bi(this,Ci,()=>{var e,i;this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),n=(e=this.submenuElement.checkedItems)==null?void 0:e[0],r=(i=n?.dataset.description)!=null?i:n?.text,s=Ce.createElement("span");s.textContent=r??"",a.replaceChildren(s)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=vt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[gt.TYPE,gt.DISABLED,gt.CHECKED,gt.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Bs(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Ii(this,Qm,cf).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":Ii(this,Xm,pf).call(this,e);break;case"keyup":Ii(this,ns,El).call(this,e);break}}attributeChangedCallback(e,i,a){e===gt.CHECKED&&Bs(this)&&!wi(this,Vd)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===gt.TYPE&&a!==i?this.role="menuitem"+a:e===gt.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(gt.DISABLED)||this.enable(),this.role="menuitem"+this.type,Vh(this,Ko,jm(this,this.parentNode)),Ii(this,Kd,Jm).call(this)}disconnectedCallback(){this.disable(),Ii(this,Kd,Jm).call(this),Vh(this,Ko,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=jc(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(gt.TYPE))!=null?e:""}set type(e){this.setAttribute(gt.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(gt.VALUE))!=null?e:this.text}set value(e){this.setAttribute(gt.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(Bs(this))return this.getAttribute("aria-checked")==="true"}set checked(e){Bs(this)&&(Vh(this,Vd,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){Bs(this)||this.invokeTargetElement&&ta(this,e.target)&&this.invokeTargetElement.dispatchEvent(new jv({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};Vd=new WeakMap;Ko=new WeakMap;Qm=new WeakSet;cf=function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Ii(this,rE,hf).call(this):Ii(this,sE,mf).call(this))};rE=new WeakSet;hf=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",wi(this,Ci)),this.submenuElement.addEventListener("addmenuitem",wi(this,Ci)),this.submenuElement.addEventListener("removemenuitem",wi(this,Ci)),wi(this,Ci).call(this)};sE=new WeakSet;mf=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",wi(this,Ci)),this.submenuElement.removeEventListener("addmenuitem",wi(this,Ci)),this.submenuElement.removeEventListener("removemenuitem",wi(this,Ci)),wi(this,Ci).call(this)};Ci=new WeakMap;ns=new WeakSet;El=function(t){const{key:e}=t;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",Ii(this,ns,El));return}this.handleClick(t)};Xm=new WeakSet;pf=function(t){const{metaKey:e,altKey:i,key:a}=t;if(e||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",Ii(this,ns,El));return}this.addEventListener("keyup",Ii(this,ns,El),{once:!0})};Kd=new WeakSet;Jm=function(){var t;const e=(t=wi(this,Ko))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")};ms.shadowRootOptions={mode:"open"};ms.getTemplateHTML=ck;ms.getSuffixSlotInnerHTML=hk;function Bs(t){return t.type==="radio"||t.type==="checkbox"}function jm(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?jm(t,i):e?.items?e:jm(e,e?.parentNode)}p.customElements.get("media-chrome-menu-item")||p.customElements.define("media-chrome-menu-item",ms);function mk(t){return`
    ${Ni.getTemplateHTML(t)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `}let vf=class extends Ni{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Lt(this).querySelector("media-settings-menu-button")}};vf.getTemplateHTML=mk;p.customElements.get("media-settings-menu")||p.customElements.define("media-settings-menu",vf);function pk(t){return`
    ${ms.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function vk(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}let uh=class extends ms{};uh.shadowRootOptions={mode:"open"};uh.getTemplateHTML=pk;uh.getSuffixSlotInnerHTML=vk;p.customElements.get("media-settings-menu-item")||p.customElements.define("media-settings-menu-item",uh);let ps=class extends Ye{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=jc(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new jv({relatedTarget:this}))}};p.customElements.get("media-chrome-menu-button")||p.customElements.define("media-chrome-menu-button",ps);function Ek(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `}function bk(){return L("Settings")}let oE=class extends ps{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",L("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Lt(this).querySelector("media-settings-menu")}};oE.getSlotTemplateHTML=Ek;oE.getTooltipContentHTML=bk;p.customElements.get("media-settings-menu-button")||p.customElements.define("media-settings-menu-button",oE);var lE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ef=(t,e,i)=>(lE(t,e,"read from private field"),i?i.call(t):e.get(t)),Kl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ep=(t,e,i,a)=>(lE(t,e,"write to private field"),e.set(t,i),i),Gl=(t,e,i)=>(lE(t,e,"access private method"),i),lo,yc,Gd,tp,Yd,ip;let gk=class extends Ni{constructor(){super(...arguments),Kl(this,Gd),Kl(this,Yd),Kl(this,lo,[]),Kl(this,yc,void 0)}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_AUDIO_TRACK_LIST,u.MEDIA_AUDIO_TRACK_ENABLED,u.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===u.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(ep(this,lo,cT(a??"")),Gl(this,Gd,tp).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Gl(this,Yd,ip))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Gl(this,Yd,ip))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=Lt(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return Ef(this,lo)}set mediaAudioTrackList(e){ep(this,lo,e),Gl(this,Gd,tp).call(this)}get mediaAudioTrackEnabled(){var e;return(e=se(this,u.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){oe(this,u.MEDIA_AUDIO_TRACK_ENABLED,e)}};lo=new WeakMap;yc=new WeakMap;Gd=new WeakSet;tp=function(){if(Ef(this,yc)===JSON.stringify(this.mediaAudioTrackList))return;ep(this,yc,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="";for(const e of t){const i=this.formatMenuItemText(e.label,e),a=as({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(yn(this,"checked-indicator")),this.defaultSlot.append(a)}};Yd=new WeakSet;ip=function(){if(this.value==null)return;const t=new p.CustomEvent(w.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};p.customElements.get("media-audio-track-menu")||p.customElements.define("media-audio-track-menu",gk);const fk=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function _k(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${fk}</slot>
  `}function Ak(){return L("Audio")}let dE=class extends ps{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_AUDIO_TRACK_ENABLED,u.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",L("Audio"))}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Lt(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=se(this,u.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){oe(this,u.MEDIA_AUDIO_TRACK_ENABLED,e)}};dE.getSlotTemplateHTML=_k;dE.getTooltipContentHTML=Ak;p.customElements.get("media-audio-track-menu-button")||p.customElements.define("media-audio-track-menu-button",dE);var uE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Tk=(t,e,i)=>(uE(t,e,"read from private field"),e.get(t)),Kh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},yk=(t,e,i,a)=>(uE(t,e,"write to private field"),e.set(t,i),i),Gh=(t,e,i)=>(uE(t,e,"access private method"),i),kc,ap,bf,qd,np;const kk=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function Sk(t){return`
    ${Ni.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${kk}</slot>
  `}let gf=class extends Ni{constructor(){super(...arguments),Kh(this,ap),Kh(this,qd),Kh(this,kc,void 0)}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_SUBTITLES_LIST,u.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_SUBTITLES_LIST&&i!==a?Gh(this,ap,bf).call(this):e===u.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Gh(this,qd,np))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Gh(this,qd,np))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Lt(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return c1(this,u.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){h1(this,u.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return c1(this,u.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){h1(this,u.MEDIA_SUBTITLES_SHOWING,e)}};kc=new WeakMap;ap=new WeakSet;bf=function(){var t;if(Tk(this,kc)===JSON.stringify(this.mediaSubtitlesList))return;yk(this,kc,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const e=!this.value,i=as({type:"radio",text:this.formatMenuItemText(L("Off")),value:"off",checked:e});i.prepend(yn(this,"checked-indicator")),this.defaultSlot.append(i);const a=this.mediaSubtitlesList;for(const n of a){const r=as({type:"radio",text:this.formatMenuItemText(n.label,n),value:pm(n),checked:this.value==pm(n)});r.prepend(yn(this,"checked-indicator")),((t=n.kind)!=null?t:"subs")==="captions"&&r.append(yn(this,"captions-indicator")),this.defaultSlot.append(r)}};qd=new WeakSet;np=function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(u.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new p.CustomEvent(w.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new p.CustomEvent(w.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};gf.getTemplateHTML=Sk;const c1=(t,e)=>{const i=t.getAttribute(e);return i?nh(i):[]},h1=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=ol(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};p.customElements.get("media-captions-menu")||p.customElements.define("media-captions-menu",gf);const Ik=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Mk=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function Lk(){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${Ik}</slot>
      <slot name="off">${Mk}</slot>
    </slot>
  `}function wk(){return L("Captions")}const m1=t=>{t.setAttribute("aria-checked",ag(t).toString())};let cE=class extends ps{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_SUBTITLES_LIST,u.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",L("closed captions")),m1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_SUBTITLES_SHOWING&&m1(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Lt(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return p1(this,u.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){v1(this,u.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return p1(this,u.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){v1(this,u.MEDIA_SUBTITLES_SHOWING,e)}};cE.getSlotTemplateHTML=Lk;cE.getTooltipContentHTML=wk;const p1=(t,e)=>{const i=t.getAttribute(e);return i?nh(i):[]},v1=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=ol(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};p.customElements.get("media-captions-menu-button")||p.customElements.define("media-captions-menu-button",cE);var ff=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},nr=(t,e,i)=>(ff(t,e,"read from private field"),i?i.call(t):e.get(t)),Yh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ws=(t,e,i)=>(ff(t,e,"access private method"),i),ka,uo,Zd,zd,rp;const qh={RATES:"rates"};let Ck=class extends Ni{constructor(){super(),Yh(this,uo),Yh(this,zd),Yh(this,ka,new _v(this,qh.RATES,{defaultValue:Rg})),Ws(this,uo,Zd).call(this)}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PLAYBACK_RATE,qh.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_PLAYBACK_RATE&&i!=a?this.value=a:e===qh.RATES&&i!=a&&(nr(this,ka).value=a,Ws(this,uo,Zd).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ws(this,zd,rp))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ws(this,zd,rp))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Lt(this).querySelector("media-playback-rate-menu-button")}get rates(){return nr(this,ka)}set rates(e){e?Array.isArray(e)?nr(this,ka).value=e.join(" "):typeof e=="string"&&(nr(this,ka).value=e):nr(this,ka).value="",Ws(this,uo,Zd).call(this)}get mediaPlaybackRate(){return ne(this,u.MEDIA_PLAYBACK_RATE,Rr)}set mediaPlaybackRate(e){be(this,u.MEDIA_PLAYBACK_RATE,e)}};ka=new WeakMap;uo=new WeakSet;Zd=function(){this.defaultSlot.textContent="";for(const t of nr(this,ka)){const e=as({type:"radio",text:this.formatMenuItemText(`${t}x`,t),value:t,checked:this.mediaPlaybackRate===Number(t)});e.prepend(yn(this,"checked-indicator")),this.defaultSlot.append(e)}};zd=new WeakSet;rp=function(){if(!this.value)return;const t=new p.CustomEvent(w.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};p.customElements.get("media-playback-rate-menu")||p.customElements.define("media-playback-rate-menu",Ck);const Qd=1;function Rk(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||Qd}x</slot>
  `}function Dk(){return L("Playback rate")}let hE=class extends ps{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Qd}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===u.MEDIA_PLAYBACK_RATE){const n=a?+a:Number.NaN,r=Number.isNaN(n)?Qd:n;this.container.innerHTML=`${r}x`,this.setAttribute("aria-label",L("Playback rate {playbackRate}",{playbackRate:r}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Lt(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return ne(this,u.MEDIA_PLAYBACK_RATE,Qd)}set mediaPlaybackRate(e){be(this,u.MEDIA_PLAYBACK_RATE,e)}};hE.getSlotTemplateHTML=Rk;hE.getTooltipContentHTML=Dk;p.customElements.get("media-playback-rate-menu-button")||p.customElements.define("media-playback-rate-menu-button",hE);var mE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},co=(t,e,i)=>(mE(t,e,"read from private field"),i?i.call(t):e.get(t)),Yl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},E1=(t,e,i,a)=>(mE(t,e,"write to private field"),e.set(t,i),i),Nn=(t,e,i)=>(mE(t,e,"access private method"),i),ho,Dr,rr,mo,Xd,sp;let xk=class extends Ni{constructor(){super(...arguments),Yl(this,rr),Yl(this,Xd),Yl(this,ho,[]),Yl(this,Dr,{})}static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_RENDITION_LIST,u.MEDIA_RENDITION_SELECTED,u.MEDIA_RENDITION_UNAVAILABLE,u.MEDIA_HEIGHT]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===u.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a??"auto",Nn(this,rr,mo).call(this)):e===u.MEDIA_RENDITION_LIST&&i!==a?(E1(this,ho,oT(a)),Nn(this,rr,mo).call(this)):e===u.MEDIA_HEIGHT&&i!==a&&Nn(this,rr,mo).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Nn(this,Xd,sp))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Nn(this,Xd,sp))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Lt(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return co(this,ho)}set mediaRenditionList(e){E1(this,ho,e),Nn(this,rr,mo).call(this)}get mediaRenditionSelected(){return se(this,u.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){oe(this,u.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ne(this,u.MEDIA_HEIGHT)}set mediaHeight(e){be(this,u.MEDIA_HEIGHT,e)}};ho=new WeakMap;Dr=new WeakMap;rr=new WeakSet;mo=function(){if(co(this,Dr).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&co(this,Dr).mediaHeight===this.mediaHeight)return;co(this,Dr).mediaRenditionList=JSON.stringify(this.mediaRenditionList),co(this,Dr).mediaHeight=this.mediaHeight;const t=this.mediaRenditionList.sort((r,s)=>s.height-r.height);for(const r of t)r.selected=r.id===this.mediaRenditionSelected;this.defaultSlot.textContent="";const e=!this.mediaRenditionSelected;for(const r of t){const s=this.formatMenuItemText(`${Math.min(r.width,r.height)}p`,r),o=as({type:"radio",text:s,value:`${r.id}`,checked:r.selected&&!e});o.prepend(yn(this,"checked-indicator")),this.defaultSlot.append(o)}const i=e?this.formatMenuItemText(`${L("Auto")} (${this.mediaHeight}p)`):this.formatMenuItemText(L("Auto")),a=as({type:"radio",text:i,value:"auto",checked:e}),n=this.mediaHeight>0?`${L("Auto")} (${this.mediaHeight}p)`:L("Auto");a.dataset.description=n,a.prepend(yn(this,"checked-indicator")),this.defaultSlot.append(a)};Xd=new WeakSet;sp=function(){if(this.value==null)return;const t=new p.CustomEvent(w.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};p.customElements.get("media-rendition-menu")||p.customElements.define("media-rendition-menu",xk);const Ok=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function $k(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${Ok}</slot>
  `}function Pk(){return L("Quality")}let pE=class extends ps{static get observedAttributes(){return[...super.observedAttributes,u.MEDIA_RENDITION_SELECTED,u.MEDIA_RENDITION_UNAVAILABLE,u.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",L("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Lt(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return se(this,u.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){oe(this,u.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ne(this,u.MEDIA_HEIGHT)}set mediaHeight(e){be(this,u.MEDIA_HEIGHT,e)}};pE.getSlotTemplateHTML=$k;pE.getTooltipContentHTML=Pk;p.customElements.get("media-rendition-menu-button")||p.customElements.define("media-rendition-menu-button",pE);const op=p.document?.createElement?.("template");op&&(op.innerHTML=`
    <!-- Sutro -->
    <style>
      :host {
        --_primary-color: var(--media-primary-color, #fff);
        --_secondary-color: var(--media-secondary-color, transparent);
        --_accent-color: var(--media-accent-color, #fff);
      }

      media-controller {
        --base: 18px;

        font-size: calc(0.75 * var(--base));
        font-family: Roboto, Arial, sans-serif;
        --media-font-family: Roboto, helvetica neue, segoe ui, arial, sans-serif;
        -webkit-font-smoothing: antialiased;

        --media-primary-color: #fff;
        --media-secondary-color: transparent;
        --media-menu-background: rgba(28, 28, 28, 0.6);
        --media-text-color: var(--_primary-color);
        --media-control-hover-background: var(--media-secondary-color);

        --media-range-track-height: calc(0.125 * var(--base));
        --media-range-thumb-height: var(--base);
        --media-range-thumb-width: var(--base);
        --media-range-thumb-border-radius: var(--base);

        --media-control-height: calc(2 * var(--base));
      }

      media-controller[breakpointmd] {
        --base: 20px;
      }

      /* The biggest size controller is tied to going fullscreen
          instead of a player width */
      media-controller[mediaisfullscreen] {
        --base: 24px;
      }

      .media-button {
        --media-control-hover-background: var(--_secondary-color);
        --media-tooltip-background: rgb(28 28 28 / .24);
        --media-text-content-height: 1.2;
        --media-tooltip-padding: .7em 1em;
        --media-tooltip-distance: 8px;
        --media-tooltip-container-margin: 18px;
        position: relative;
        padding: 0;
        opacity: 0.9;
        transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
      }

      .media-button svg {
        fill: none;
        stroke: var(--_primary-color);
        stroke-width: 1;
        stroke-linecap: 'round';
        stroke-linejoin: 'round';
      }

      svg .svg-shadow {
        stroke: #000;
        stroke-opacity: 0.15;
        stroke-width: 2px;
        fill: none;
      }
    </style>

    <media-controller
      breakpoints="md:480"
      defaultsubtitles="{{defaultsubtitles}}"
      defaultduration="{{defaultduration}}"
      gesturesdisabled="{{disabled}}"
      hotkeys="{{hotkeys}}"
      nohotkeys="{{nohotkeys}}"
      defaultstreamtype="on-demand"
    >
      <slot name="media" slot="media"></slot>
      <slot name="poster" slot="poster"></slot>
      <slot name="centered-chrome" slot="centered-chrome"></slot>
      <media-error-dialog slot="dialog"></media-error-dialog>

      <!-- Controls Gradient -->
      <style>
        .media-gradient-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: calc(8 * var(--base));
          pointer-events: none;
        }

        .media-gradient-bottom::before {
          content: '';
          --gradient-steps: hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%,
            hsl(0 0% 0% / 0.104) 22.5%, hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%,
            hsl(0 0% 0% / 0.45) 47.1%, hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%,
            hsl(0 0% 0% / 0.825) 71%, hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%,
            hsl(0 0% 0%) 100%;

          position: absolute;
          inset: 0;
          opacity: 0.7;
          background: linear-gradient(to bottom, var(--gradient-steps));
        }
      </style>
      <div class="media-gradient-bottom"></div>

      <!-- Settings Menu -->
      <style>
        media-settings-menu {
          --media-menu-icon-height: 20px;
          --media-menu-item-icon-height: 20px;
          --media-settings-menu-min-width: calc(10 * var(--base));
          --media-menu-transform-in: translateY(0) scale(1);
          --media-menu-transform-out: translateY(20px) rotate(3deg) scale(1);
          padding-block: calc(0.15 * var(--base));
          margin-right: 10px;
          margin-bottom: 17px;
          border-radius: 8px;
          z-index: 2;
          user-select: none;
        }

        media-settings-menu-item,
        [role='menu']::part(menu-item) {
          --media-icon-color: var(--_primary-color);
          margin-inline: calc(0.45 * var(--base));
          height: calc(1.6 * var(--base));
          font-size: calc(0.7 * var(--base));
          font-weight: 400;
          padding: 0;
          padding-left: calc(0.4 * var(--base));
          padding-right: calc(0.1 * var(--base));
          border-radius: 6px;
          text-shadow: none;
        }

        [slot='submenu']::part(back button) {
          font-size: calc(0.7 * var(--base));
        }

        media-settings-menu-item:hover {
          --media-icon-color: #000;
          color: #000;
          background-color: #fff;
        }

        media-settings-menu-item:hover [slot='submenu']::part(menu-item),
        [slot='submenu']::part(back indicator) {
          --media-icon-color: var(--_primary-color);
        }

        media-settings-menu-item:hover [slot='submenu']::part(menu-item):hover {
          --media-icon-color: #000;
          color: #000;
          background-color: #fff;
        }

        media-settings-menu-item[submenusize='0'] {
          display: none;
        }

        /* Also hide if only 'Auto' is added. */
        .quality-settings[submenusize='1'] {
          display: none;
        }
      </style>
      <media-settings-menu hidden anchor="auto">
        <media-settings-menu-item>
          Playback Speed
          <media-playback-rate-menu slot="submenu" hidden>
            <div slot="title">Playback Speed</div>
          </media-playback-rate-menu>
        </media-settings-menu-item>
        <media-settings-menu-item class="quality-settings">
          Quality
          <media-rendition-menu slot="submenu" hidden>
            <div slot="title">Quality</div>
          </media-rendition-menu>
        </media-settings-menu-item>
        <media-settings-menu-item>
          Subtitles/CC
          <media-captions-menu slot="submenu" hidden>
            <div slot="title">Subtitles/CC</div>
          </media-captions-menu>
        </media-settings-menu-item>
      </media-settings-menu>

      <!-- Control Bar -->
      <style>
        media-control-bar {
          position: absolute;
          height: calc(2 * var(--base));
          line-height: calc(2 * var(--base));
          bottom: var(--base);
          left: var(--base);
          right: var(--base);
        }
      </style>
      <media-control-bar>
        <!-- Play/Pause -->
        <style>
          @keyframes bounce-scale-play {
            0% {
              transform: scale(0.75, 0.75);
            }
            50% {
              transform: scale(115%, 115%);
            }
            100% {
              transform: scale(1, 1);
            }
          }

          .media-button {
            border-radius: 25%;
            backdrop-filter: blur(10px) invert(15%) brightness(80%) opacity(0);
            -webkit-backdrop-filter: blur(10px) invert(15%) brightness(80%) opacity(0);
            transition: backdrop-filter 0.3s, -webkit-backdrop-filter 0.3s, box-shadow 0.3s;
          }

          .media-button:hover {
            /* background-color: rgba(0, 0, 0, 0.05); */
            box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;
            /* hue-rotate(120deg) */
            backdrop-filter: blur(10px) invert(15%) brightness(80%) opacity(1);
            -webkit-backdrop-filter: blur(10px) invert(15%) brightness(80%) opacity(1);
            transition: backdrop-filter 0.3s, -webkit-backdrop-filter 0.3s;
          }

          media-play-button #icon-play {
            opacity: 0;
            transform-box: view-box;
            transform-origin: center center;
            transform: scale(0.5, 0.5);
            transition: all 0.5s;
          }

          media-play-button[mediapaused] #icon-play {
            opacity: 1;
            transform: scale(1, 1);
            animation: 0.35s bounce-scale-play ease-in-out;
          }

          @keyframes bounce-pause-left {
            0% {
              font-size: 10px;
            }
            50% {
              font-size: 3px;
            }
            100% {
              font-size: 4px;
            }
          }

          @keyframes bounce-pause-right {
            0% {
              font-size: 10px;
              transform: translateX(-8px);
            }
            50% {
              font-size: 3px;
              transform: translateX(1px);
            }
            100% {
              font-size: 4px;
              transform: translateX(0);
            }
          }

          media-play-button #pause-left,
          media-play-button #pause-right {
            /* Using font-size to animate height because using scale was resulting in unexpected positioning */
            font-size: 4px;
            opacity: 1;
            transform: translateX(0);
            transform-box: view-box;
          }

          media-play-button:not([mediapaused]) #pause-left {
            animation: 0.3s bounce-pause-left ease-out;
          }

          media-play-button:not([mediapaused]) #pause-right {
            animation: 0.3s bounce-pause-right ease-out;
          }

          media-play-button[mediapaused] #pause-left,
          media-play-button[mediapaused] #pause-right {
            opacity: 0;
            font-size: 10px;
          }

          media-play-button[mediapaused] #pause-right {
            transform-origin: right center;
            transform: translateX(-8px);
          }
        </style>
        <media-play-button mediapaused class="media-button">
          <svg slot="icon" viewBox="0 0 32 32">
            <!-- <use class="svg-shadow" xlink:href="#icon-play"></use> -->
            <g>
              <path
                id="icon-play"
                d="M20.7131 14.6976C21.7208 15.2735 21.7208 16.7265 20.7131 17.3024L12.7442 21.856C11.7442 22.4274 10.5 21.7054 10.5 20.5536L10.5 11.4464C10.5 10.2946 11.7442 9.57257 12.7442 10.144L20.7131 14.6976Z"
              />
            </g>
            <!-- <use class="svg-shadow" xlink:href="#icon-pause"></use> -->
            <g id="icon-pause">
              <rect id="pause-left" x="10.5" width="1em" y="10.5" height="11" rx="0.5" />
              <rect id="pause-right" x="17.5" width="1em" y="10.5" height="11" rx="0.5" />
            </g>
          </svg>
        </media-play-button>

        <!-- Volume/Mute -->
        <style>
          media-mute-button {
            position: relative;
          }

          media-mute-button .muted-path {
            transition: clip-path 0.2s ease-out;
          }

          media-mute-button #muted-path-2 {
            transition-delay: 0.2s;
          }

          media-mute-button .muted-path {
            clip-path: inset(0);
          }

          media-mute-button:not([mediavolumelevel='off']) #muted-path-1 {
            clip-path: inset(0 0 100% 0);
          }

          media-mute-button:not([mediavolumelevel='off']) #muted-path-2 {
            clip-path: inset(0 0 100% 0);
          }

          media-mute-button .muted-path {
            opacity: 0;
          }

          media-mute-button[mediavolumelevel='off'] .muted-path {
            opacity: 1;
          }

          media-mute-button .vol-path {
            opacity: 1;
            transition: opacity 0.4s;
          }

          media-mute-button[mediavolumelevel='off'] .vol-path {
            opacity: 0;
          }

          media-mute-button[mediavolumelevel='low'] #vol-high-path,
          media-mute-button[mediavolumelevel='medium'] #vol-high-path {
            opacity: 0;
          }

          media-volume-range {
            --media-range-track-background: rgba(255, 255, 255, 0.2);
            --media-range-thumb-opacity: 0;
          }

          @keyframes volume-in {
            0% {
              visibility: hidden;
              opacity: 0;
              transform: translateY(50%) rotate(1deg);
            }
            50% {
              visibility: visible;
              opacity: 1;
              transform: rotate(-2deg);
            }
            100% {
              visibility: visible;
              opacity: 1;
              transform: translateY(0) rotate(0deg);
            }
          }

          @keyframes volume-out {
            0% {
              visibility: visible;
              opacity: 1;
              transform: translateY(0) rotate(0deg);
            }
            50% {
              opacity: 1;
              transform: rotate(0deg);
            }
            100% {
              visibility: hidden;
              opacity: 0;
              transform: translateY(50%) rotate(1deg);
            }
          }

          .media-volume-range-wrapper {
            opacity: 0;
            visibility: hidden;

            position: absolute;
            top: -100%;
            left: calc(2 * var(--base));

            width: calc(10 * var(--base));
            height: calc(2.5 * var(--base));
            transform-origin: center left;
          }

          media-volume-range {
            /*
              Hide range and animation until mediavolume attribute is set.
              'visibility' didn't work, hovering over media-volume-range-wrapper
              caused it to show. Should require mute-button:hover.
            */
            opacity: 0;
            transition: opacity 0s 1s;

            width: calc(10 * var(--base));
            height: var(--base);
            padding: 0;
            border-radius: calc(0.25 * var(--base));
            overflow: hidden;
            background: rgba(0, 0, 0, 0.2);

            --media-range-bar-color: var(--media-accent-color);

            --media-range-padding-left: 0;
            --media-range-padding-right: 0;

            --media-range-track-width: calc(10 * var(--base));
            --media-range-track-height: var(--base);
            --media-range-track-border-radius: calc(0.25 * var(--base));
            --media-range-track-backdrop-filter: blur(10px) brightness(80%);

            /* This makes zero volume still show some of the bar.
               I can't make the bar have curved corners otherwise though. */
            --media-range-thumb-width: var(--base);
            --media-range-thumb-border-radius: calc(0.25 * var(--base));

            /* The Sutro design has a gradient like this, but not sure I like it */
            /* --media-range-thumb-box-shadow: 10px 0px 20px rgba(255, 255, 255, 0.5); */
          }

          media-volume-range[mediavolume] {
            opacity: 1;
          }

          [keyboardcontrol] media-volume-range:focus {
            /* TODO: This appears to be creating a think outline */
            outline: 1px solid rgba(27, 127, 204, 0.9);
          }

          media-mute-button:hover + .media-volume-range-wrapper,
          media-mute-button:focus + .media-volume-range-wrapper,
          media-mute-button:focus-within + .media-volume-range-wrapper,
          .media-volume-range-wrapper:hover,
          .media-volume-range-wrapper:focus,
          .media-volume-range-wrapper:focus-within {
            animation: 0.3s volume-in forwards ease-out;
          }

          .media-volume-range-wrapper:not(:hover, :focus-within) {
            animation: 0.3s volume-out ease-out;
          }

          /* When keyboard navigating the volume range and wrapper need to always be visible
            otherwise focus state can't land on it. This is ok when keyboard navigating because
            the hovering issues aren't a concern, unless you happen to be keyboard AND mouse navigating.
          */
          [keyboardcontrol] .media-volume-range-wrapper,
          [keyboardcontrol] .media-volume-range-wrapper:focus-within,
          [keyboardcontrol] .media-volume-range-wrapper:focus-within media-volume-range {
            visibility: visible;
          }
        </style>
        <media-mute-button class="media-button" notooltip>
          <use class="svg-shadow" xlink:href="#vol-paths"></use>
          <svg slot="icon" viewBox="0 0 32 32">
            <g id="vol-paths">
              <path
                id="speaker-path"
                d="M16.5 20.486v-8.972c0-1.537-2.037-2.08-2.802-.745l-1.026 1.79a2.5 2.5 0 0 1-.8.85l-1.194.78A1.5 1.5 0 0 0 10 15.446v1.11c0 .506.255.978.678 1.255l1.194.782a2.5 2.5 0 0 1 .8.849l1.026 1.79c.765 1.334 2.802.792 2.802-.745Z"
              />
              <path
                id="vol-low-path"
                class="vol-path"
                d="M18.5 18C19.6046 18 20.5 17.1046 20.5 16C20.5 14.8954 19.6046 14 18.5 14"
              />
              <path
                id="vol-high-path"
                class="vol-path"
                d="M18 21C20.7614 21 23 18.7614 23 16C23 13.2386 20.7614 11 18 11"
              />
              <path id="muted-path-1" class="muted-path" d="M23 18L19 14" />
              <path id="muted-path-2" class="muted-path" d="M23 14L19 18" />
            </g>
          </svg>
        </media-mute-button>
        <div class="media-volume-range-wrapper">
          <media-volume-range></media-volume-range>
        </div>

        <!-- Time Display -->
        <style>
          media-time-display {
            position: relative;
            padding: calc(0.5 * var(--base));
            font-size: calc(0.7 * var(--base));
            border-radius: calc(0.5 * var(--base));
          }

          media-controller[breakpointmd] media-time-display:not([showduration]) {
            display: none;
          }

          media-controller:not([breakpointmd]) media-time-display[showduration] {
            display: none;
          }
        </style>
        <media-time-display></media-time-display>
        <media-time-display showduration></media-time-display>

        <!-- Time Range / Progress Bar -->
        <style>
          media-time-range {
            height: calc(2 * var(--base));
            border-radius: calc(0.25 * var(--base));

            --media-range-track-backdrop-filter: invert(10%) blur(5px) brightness(110%);
            --media-range-track-background: rgba(255, 255, 255, 0.2);
            --media-range-track-pointer-background: rgba(255, 255, 255, 0.5);
            --media-range-track-border-radius: calc(0.25 * var(--base));

            --media-time-range-buffered-color: rgba(255, 255, 255, 0.4);
            --media-range-bar-color: var(--media-accent-color);

            --media-range-thumb-background: var(--media-accent-color);
            --media-range-thumb-transition: opacity 0.1s linear;
            --media-range-thumb-opacity: 0;

            --media-preview-thumbnail-border: calc(0.125 * var(--base)) solid #fff;
            --media-preview-thumbnail-border-radius: calc(0.5 * var(--base));
            --media-preview-thumbnail-min-width: calc(8 * var(--base));
            --media-preview-thumbnail-max-width: calc(10 * var(--base));
            --media-preview-thumbnail-min-height: calc(5 * var(--base));
            --media-preview-thumbnail-max-height: calc(7 * var(--base));
            --media-preview-box-margin: 0 0 -10px;
          }
          media-time-range:hover {
            --media-range-thumb-opacity: 1;
            --media-range-track-height: calc(0.25 * var(--base));
          }

          media-preview-thumbnail {
            margin-bottom: 5px;
          }

          media-preview-chapter-display {
            font-size: calc(0.6 * var(--base));
            padding-block: 0;
          }

          media-preview-time-display {
            font-size: calc(0.65 * var(--base));
            padding-top: 0;
          }
        </style>
        <media-time-range>
          <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
          <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
          <media-preview-time-display slot="preview"></media-preview-time-display>
        </media-time-range>

        <!-- Subtitles/CC Button -->
        <style>
          media-captions-button {
            position: relative;
          }

          media-controller:not([breakpointmd]) media-captions-button {
            display: none;
          }

          media-captions-button svg :is(path, rect) {
            stroke: none;
            fill: var(--_primary-color);
          }

          /* Disble the captions button when no subtitles are available */
          media-captions-button:not([mediasubtitleslist]) svg {
            opacity: 0.3;
          }

          media-captions-button #cc-underline {
            opacity: 1;
          }

          media-captions-button[mediasubtitleslist][aria-checked='true'] #cc-underline {
            opacity: 1;
          }

          media-captions-button #cc-underline {
            transition: clip-path 0.15s ease-out;
          }

          media-captions-button #cc-underline {
            clip-path: inset(0 100% 0 0);
          }

          media-captions-button[aria-checked='true'] #cc-underline {
            clip-path: inset(0 0 0 0);
          }
        </style>
        <media-captions-button class="media-button">
          <svg slot="icon" viewBox="0 0 32 32">
            <use class="svg-shadow" xlink:href="#cc-icon"></use>
            <g id="cc-icon">
              <path
                class="cc-c"
                d="M15.6634 14.3574H14.5636C14.4985 14.0523 14.3847 13.7842 14.2221 13.5532C14.0624 13.3222 13.8673 13.1283 13.6367 12.9715C13.409 12.8118 13.1562 12.692 12.8783 12.6122C12.6004 12.5323 12.3107 12.4924 12.0091 12.4924C11.4592 12.4924 10.961 12.6264 10.5146 12.8945C10.0711 13.1625 9.71776 13.5575 9.45463 14.0794C9.19445 14.6012 9.06436 15.2414 9.06436 16C9.06436 16.7586 9.19445 17.3988 9.45463 17.9206C9.71776 18.4425 10.0711 18.8375 10.5146 19.1055C10.961 19.3736 11.4592 19.5076 12.0091 19.5076C12.3107 19.5076 12.6004 19.4677 12.8783 19.3878C13.1562 19.308 13.409 19.1896 13.6367 19.0328C13.8673 18.8731 14.0624 18.6778 14.2221 18.4468C14.3847 18.2129 14.4985 17.9449 14.5636 17.6426H15.6634C15.5806 18.0903 15.4298 18.491 15.2111 18.8446C14.9923 19.1982 14.7203 19.499 14.3951 19.7471C14.0698 19.9924 13.7047 20.1792 13.2996 20.3075C12.8976 20.4358 12.4674 20.5 12.0091 20.5C11.2345 20.5 10.5456 20.3175 9.94246 19.9525C9.33932 19.5875 8.8648 19.0684 8.51888 18.3954C8.17296 17.7224 8 16.924 8 16C8 15.076 8.17296 14.2776 8.51888 13.6046C8.8648 12.9316 9.33932 12.4125 9.94246 12.0475C10.5456 11.6825 11.2345 11.5 12.0091 11.5C12.4674 11.5 12.8976 11.5642 13.2996 11.6925C13.7047 11.8208 14.0698 12.009 14.3951 12.2571C14.7203 12.5024 14.9923 12.8018 15.2111 13.1554C15.4298 13.5062 15.5806 13.9068 15.6634 14.3574Z"
              />
              <path
                class="cc-c"
                d="M24 14.3574H22.9002C22.8351 14.0523 22.7213 13.7842 22.5587 13.5532C22.399 13.3222 22.2039 13.1283 21.9733 12.9715C21.7456 12.8118 21.4928 12.692 21.2149 12.6122C20.937 12.5323 20.6473 12.4924 20.3457 12.4924C19.7958 12.4924 19.2976 12.6264 18.8511 12.8945C18.4077 13.1625 18.0543 13.5575 17.7912 14.0794C17.531 14.6012 17.4009 15.2414 17.4009 16C17.4009 16.7586 17.531 17.3988 17.7912 17.9206C18.0543 18.4425 18.4077 18.8375 18.8511 19.1055C19.2976 19.3736 19.7958 19.5076 20.3457 19.5076C20.6473 19.5076 20.937 19.4677 21.2149 19.3878C21.4928 19.308 21.7456 19.1896 21.9733 19.0328C22.2039 18.8731 22.399 18.6778 22.5587 18.4468C22.7213 18.2129 22.8351 17.9449 22.9002 17.6426H24C23.9172 18.0903 23.7664 18.491 23.5476 18.8446C23.3289 19.1982 23.0569 19.499 22.7316 19.7471C22.4064 19.9924 22.0413 20.1792 21.6362 20.3075C21.2341 20.4358 20.804 20.5 20.3457 20.5C19.5711 20.5 18.8822 20.3175 18.279 19.9525C17.6759 19.5875 17.2014 19.0684 16.8555 18.3954C16.5095 17.7224 16.3366 16.924 16.3366 16C16.3366 15.076 16.5095 14.2776 16.8555 13.6046C17.2014 12.9316 17.6759 12.4125 18.279 12.0475C18.8822 11.6825 19.5711 11.5 20.3457 11.5C20.804 11.5 21.2341 11.5642 21.6362 11.6925C22.0413 11.8208 22.4064 12.009 22.7316 12.2571C23.0569 12.5024 23.3289 12.8018 23.5476 13.1554C23.7664 13.5062 23.9172 13.9068 24 14.3574Z"
              />
              <rect id="cc-underline" x="8" y="23" width="16" height="1" rx="0.5" />
            </g>
          </svg>
        </media-captions-button>

        <!-- Settings Menu Button -->
        <style>
          media-settings-menu-button svg {
            transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
            transform: rotateZ(0deg);
          }
          media-settings-menu-button[aria-expanded='true'] svg {
            transform: rotateZ(30deg);
          }
        </style>
        <media-settings-menu-button class="media-button">
          <svg slot="icon" viewBox="0 0 32 32">
            <use class="svg-shadow" xlink:href="#settings-icon"></use>
            <g id="settings-icon">
              <path
                d="M16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18Z"
              />
              <path
                d="M21.0176 13.0362L20.9715 12.9531C20.8445 12.7239 20.7797 12.4629 20.784 12.1982L20.8049 10.8997C20.8092 10.6343 20.675 10.3874 20.4545 10.2549L18.5385 9.10362C18.3186 8.97143 18.0472 8.9738 17.8293 9.10981L16.7658 9.77382C16.5485 9.90953 16.2999 9.98121 16.0465 9.98121H15.9543C15.7004 9.98121 15.4513 9.90922 15.2336 9.77295L14.1652 9.10413C13.9467 8.96728 13.674 8.96518 13.4535 9.09864L11.5436 10.2545C11.3242 10.3873 11.1908 10.6336 11.1951 10.8981L11.216 12.1982C11.2203 12.4629 11.1555 12.7239 11.0285 12.9531L10.9831 13.0351C10.856 13.2645 10.6715 13.4535 10.4493 13.5819L9.36075 14.2109C9.13763 14.3398 8.99942 14.5851 9 14.8511L9.00501 17.152C9.00559 17.4163 9.1432 17.6597 9.36476 17.7883L10.4481 18.4167C10.671 18.546 10.8559 18.7364 10.9826 18.9673L11.0313 19.0559C11.1565 19.284 11.2203 19.5431 11.2161 19.8059L11.1951 21.1003C11.1908 21.3657 11.325 21.6126 11.5456 21.7452L13.4615 22.8964C13.6814 23.0286 13.9528 23.0262 14.1707 22.8902L15.2342 22.2262C15.4515 22.0905 15.7001 22.0188 15.9535 22.0188H16.0457C16.2996 22.0188 16.5487 22.0908 16.7664 22.227L17.8348 22.8959C18.0534 23.0327 18.326 23.0348 18.5465 22.9014L20.4564 21.7455C20.6758 21.6127 20.8092 21.3664 20.8049 21.1019L20.784 19.8018C20.7797 19.5371 20.8445 19.2761 20.9715 19.0469L21.0169 18.9649C21.144 18.7355 21.3285 18.5465 21.5507 18.4181L22.6393 17.7891C22.8624 17.6602 23.0006 17.4149 23 17.1489L22.995 14.848C22.9944 14.5837 22.8568 14.3403 22.6352 14.2117L21.5493 13.5818C21.328 13.4534 21.1442 13.2649 21.0176 13.0362Z"
              />
            </g>
          </svg>
        </media-settings-menu-button>

        <!-- PIP/Mini Player Button -->
        <style>
          media-controller:not([breakpointmd]) media-pip-button {
            display: none;
          }
        </style>
        <media-pip-button class="media-button">
          <svg slot="icon" viewBox="0 0 32 32">
            <use class="svg-shadow" xlink:href="#pip-icon"></use>
            <g id="pip-icon">
              <path
                d="M12 22H9.77778C9.34822 22 9 21.6162 9 21.1429V10.8571C9 10.3838 9.34822 10 9.77778 10L22.2222 10C22.6518 10 23 10.3838 23 10.8571V12.5714"
              />
              <path
                d="M15 21.5714V16.4286C15 16.1919 15.199 16 15.4444 16H22.5556C22.801 16 23 16.1919 23 16.4286V17V21.5714C23 21.8081 22.801 22 22.5556 22H20.3333H17.6667H15.4444C15.199 22 15 21.8081 15 21.5714Z"
              />
            </g>
          </svg>
        </media-pip-button>

        <!-- Airplay Button -->
        <media-airplay-button class="media-button">
          <svg viewBox="0 0 32 32" aria-hidden="true" slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.5 20h1.722c.43 0 .778-.32.778-.714v-8.572c0-.394-.348-.714-.778-.714H9.778c-.43 0-.778.32-.778.714v1.429"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.5 20H9.778c-.43 0-.778-.32-.778-.714v-8.572c0-.394.348-.714.778-.714h12.444c.43 0 .778.32.778.714v1.429"/>
            <path stroke-linejoin="round" d="m16 19 3.464 3.75h-6.928L16 19Z"/>
          </svg>
        </media-airplay-button>

        <!-- Cast Button -->
        <media-cast-button class="media-button">
          <svg slot="icon" viewBox="0 0 32 32">
            <use class="svg-shadow" xlink:href="#cast-icon"></use>
            <g id="cast-icon">
              <path
                d="M18.5 21.833h4.167c.46 0 .833-.373.833-.833V11a.833.833 0 0 0-.833-.833H9.333A.833.833 0 0 0 8.5 11v1.111m0 8.056c.92 0 1.667.746 1.667 1.666M8.5 17.667a4.167 4.167 0 0 1 4.167 4.166"
              />
              <path d="M8.5 15.167a6.667 6.667 0 0 1 6.667 6.666" />
            </g>
          </svg>
        </media-cast-button>

        <!-- Fullscreen Button -->
        <style>
          /* Having trouble getting @property to work in the shadow dom
             to clean this up. Like https://codepen.io/luwes/pen/oNRyZyx */

          media-fullscreen-button .fs-arrow {
            translate: 0% 0%;
          }
          media-fullscreen-button:hover .fs-arrow {
            animation: 0.35s up-left-bounce cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          media-fullscreen-button:hover #fs-enter-top,
          media-fullscreen-button:hover #fs-exit-bottom {
            animation-name: up-right-bounce;
          }

          media-fullscreen-button:hover #fs-enter-bottom,
          media-fullscreen-button:hover #fs-exit-top {
            animation-name: down-left-bounce;
          }

          @keyframes up-left-bounce {
            0% {
              translate: 0 0;
            }
            50% {
              translate: -4% -4%;
            }
          }
          @keyframes up-right-bounce {
            0% {
              translate: 0 0;
            }
            50% {
              translate: 4% -4%;
            }
          }
          @keyframes down-left-bounce {
            0% {
              translate: 0 0;
            }
            50% {
              translate: -4% 4%;
            }
          }
          @keyframes down-right-bounce {
            0% {
              translate: 0 0;
            }
            50% {
              translate: 4% 4%;
            }
          }
        </style>
        <media-fullscreen-button class="media-button">
          <svg slot="enter" viewBox="0 0 32 32">
            <use class="svg-shadow" xlink:href="#fs-enter-paths"></use>
            <g id="fs-enter-paths">
              <g id="fs-enter-top" class="fs-arrow">
                <path d="M18 10H22V14" />
                <path d="M22 10L18 14" />
              </g>
              <g id="fs-enter-bottom" class="fs-arrow">
                <path d="M14 22L10 22V18" />
                <path d="M10 22L14 18" />
              </g>
            </g>
          </svg>
          <svg slot="exit" viewBox="0 0 32 32">
            <use class="svg-shadow" xlink:href="#fs-exit-paths"></use>
            <g id="fs-exit-paths">
              <g id="fs-exit-top" class="fs-arrow">
                <path d="M22 14H18V10" />
                <path d="M22 10L18 14" />
              </g>
              <g id="fs-exit-bottom" class="fs-arrow">
                <path d="M10 18L14 18V22" />
                <path d="M14 18L10 22" />
              </g>
            </g>
          </svg>
        </media-fullscreen-button>
      </media-control-bar>
    </media-controller>

  `);class Nk extends dh{static template=op}p.customElements&&!p.customElements.get("media-theme-sutro")&&p.customElements.define("media-theme-sutro",Nk);var _f=t=>{throw TypeError(t)},vE=(t,e,i)=>e.has(t)||_f("Cannot "+i),Te=(t,e,i)=>(vE(t,e,"read from private field"),i?i.call(t):e.get(t)),ft=(t,e,i)=>e.has(t)?_f("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Nt=(t,e,i,a)=>(vE(t,e,"write to private field"),e.set(t,i),i),ql=(t,e,i)=>(vE(t,e,"access private method"),i),Uk=()=>{try{return"0.30.5"}catch{}return"UNKNOWN"},Hk=Uk(),Bk=()=>Hk,Wk=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,m={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",MAX_AUTO_RESOLUTION:"max-auto-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo",CAP_RENDITION_TO_PLAYER_SIZE:"cap-rendition-to-player-size"},Fk=Object.values(m),b1=Bk(),g1="mux-video",po,Jd,vo,jd,eu,tu,iu,au,Eo,nu,Tt,en,ru,bo,Vk=class extends Cl{constructor(){super(),ft(this,Tt),ft(this,po),ft(this,Jd),ft(this,vo,{}),ft(this,jd,{}),ft(this,eu),ft(this,tu),ft(this,iu),ft(this,au),ft(this,Eo,""),ft(this,nu,e=>{var i;let a=XA(this.nativeEl),n=(i=this.metadata)!=null?i:{};this.metadata={...a,...n},a?.["com.mux.video.branding"]==="mux-free-plan"&&(Nt(this,Eo,"default"),this.updateLogo())}),ft(this,ru),Nt(this,Jd,pv())}static get NAME(){return g1}static get VERSION(){return b1}static get observedAttributes(){var e;return[...Fk,...(e=Cl.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?Wk:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${Cl.getTemplateHTML(e)}
      <style>
        :host {
          position: relative;
        }
        slot[name="logo"] {
          display: flex;
          justify-content: end;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        slot[name="logo"]:has([part="logo"]) {
          opacity: 1;
        }
        slot[name="logo"] [part="logo"] {
          width: 5rem;
          pointer-events: none;
          user-select: none;
        }
      </style>
      <slot name="logo">
        ${this.getLogoHTML((i=e[m.LOGO])!=null?i:"")}
      </slot>
    `}get preferCmcd(){var e;return(e=this.getAttribute(m.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?rc.includes(e)?this.setAttribute(m.PREFER_CMCD,e):console.warn(`Invalid value for preferCmcd. Must be one of ${rc.join()}`):this.removeAttribute(m.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(m.PLAYER_INIT_TIME)?+this.getAttribute(m.PLAYER_INIT_TIME):Te(this,Jd)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(m.PLAYER_INIT_TIME):this.setAttribute(m.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=Te(this,iu))!=null?e:g1}set playerSoftwareName(e){Nt(this,iu,e)}get playerSoftwareVersion(){var e;return(e=Te(this,tu))!=null?e:b1}set playerSoftwareVersion(e){Nt(this,tu,e)}get _hls(){var e;return(e=Te(this,Tt,en))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=xA(this.nativeEl))!=null?e:null}get errorTranslator(){return Te(this,au)}set errorTranslator(e){Nt(this,au,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(m.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(m.TYPE,e):this.removeAttribute(m.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(m.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(m.DEBUG,""):this.removeAttribute(m.DEBUG))}get disableTracking(){return this.hasAttribute(m.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(m.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(m.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(m.DISABLE_COOKIES,""):this.removeAttribute(m.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(m.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(m.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(m.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(m.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(m.START_TIME):this.setAttribute(m.START_TIME,`${e}`))}get playbackId(){var e;return this.hasAttribute(m.PLAYBACK_ID)?this.getAttribute(m.PLAYBACK_ID):(e=OA(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(m.PLAYBACK_ID,e):this.removeAttribute(m.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(m.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(m.MAX_RESOLUTION,e):this.removeAttribute(m.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(m.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(m.MIN_RESOLUTION,e):this.removeAttribute(m.MIN_RESOLUTION))}get maxAutoResolution(){var e;return(e=this.getAttribute(m.MAX_AUTO_RESOLUTION))!=null?e:void 0}set maxAutoResolution(e){e==null?this.removeAttribute(m.MAX_AUTO_RESOLUTION):this.setAttribute(m.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return(e=this.getAttribute(m.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(m.RENDITION_ORDER,e):this.removeAttribute(m.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(m.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(m.PROGRAM_START_TIME):this.setAttribute(m.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(m.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(m.PROGRAM_END_TIME):this.setAttribute(m.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(m.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(m.ASSET_START_TIME):this.setAttribute(m.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(m.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(m.ASSET_END_TIME):this.setAttribute(m.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(m.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(m.CUSTOM_DOMAIN,e):this.removeAttribute(m.CUSTOM_DOMAIN))}get capRenditionToPlayerSize(){var e;return((e=this._hlsConfig)==null?void 0:e.capLevelToPlayerSize)!=null?this._hlsConfig.capLevelToPlayerSize:Te(this,ru)}set capRenditionToPlayerSize(e){Nt(this,ru,e)}get drmToken(){var e;return(e=this.getAttribute(m.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(m.DRM_TOKEN,e):this.removeAttribute(m.DRM_TOKEN))}get playbackToken(){var e,i,a,n;if(this.hasAttribute(m.PLAYBACK_TOKEN))return(e=this.getAttribute(m.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(m.PLAYBACK_ID)){let[,r]=$A((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(r).get("token"))!=null?a:void 0}if(this.src)return(n=new URLSearchParams(this.src).get("token"))!=null?n:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(m.PLAYBACK_TOKEN,e):this.removeAttribute(m.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(m.PLAYBACK_TOKEN),i=this.getAttribute(m.DRM_TOKEN);return{...Te(this,jd),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){Nt(this,jd,e??{})}get ended(){return PA(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(m.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(m.ENV_KEY,e):this.removeAttribute(m.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(m.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(m.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(m.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(m.STREAM_TYPE))!=null?e:NA(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(m.STREAM_TYPE,e):this.removeAttribute(m.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(m.TARGET_LIVE_WINDOW)?+this.getAttribute(m.TARGET_LIVE_WINDOW):UA(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(m.TARGET_LIVE_WINDOW):this.setAttribute(m.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(m.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,n=(e=this.nativeEl.seekable.end(0))!=null?e:0,r=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(r,n-a)}return HA(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(m.LIVE_EDGE_OFFSET))return+this.getAttribute(m.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(m.LIVE_EDGE_OFFSET):this.setAttribute(m.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return BA(this.nativeEl)}async addCuePoints(e){return WA(this.nativeEl,e)}get activeCuePoint(){return FA(this.nativeEl)}get cuePoints(){return VA(this.nativeEl)}async addChapters(e){return KA(this.nativeEl,e)}get activeChapter(){return GA(this.nativeEl)}get chapters(){return YA(this.nativeEl)}getStartDate(){return qA(this.nativeEl,this._hls)}get currentPdt(){return ZA(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(m.PREFER_PLAYBACK);if(e===Ra.MSE||e===Ra.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===Ra.MSE||e===Ra.NATIVE?this.setAttribute(m.PREFER_PLAYBACK,e):this.removeAttribute(m.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![m.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...Te(this,vo)}}set metadata(e){Nt(this,vo,e??{}),this.mux&&this.mux.emit("hb",Te(this,vo))}get _hlsConfig(){return Te(this,eu)}set _hlsConfig(e){Nt(this,eu,e)}get logo(){var e;return(e=this.getAttribute(m.LOGO))!=null?e:Te(this,Eo)}set logo(e){e?this.setAttribute(m.LOGO,e):this.removeAttribute(m.LOGO)}load(){zA(this,this.nativeEl,Te(this,Tt,en))}unload(){QA(this.nativeEl,Te(this,Tt,en),this)}attributeChangedCallback(e,i,a){var n,r;switch(Cl.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case m.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case m.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let s=!!i,o=!!a;!s&&o?ql(this,Tt,bo).call(this):s&&!o?this.unload():s&&o&&(this.unload(),ql(this,Tt,bo).call(this));break}case"autoplay":if(a===i)break;(n=Te(this,Tt,en))==null||n.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(r=Te(this,Tt,en))==null||r.setPreload(a);break;case m.PLAYBACK_ID:case m.CUSTOM_DOMAIN:case m.MAX_RESOLUTION:case m.MIN_RESOLUTION:case m.RENDITION_ORDER:case m.PROGRAM_START_TIME:case m.PROGRAM_END_TIME:case m.ASSET_START_TIME:case m.ASSET_END_TIME:case m.PLAYBACK_TOKEN:this.src=lm(this);break;case m.DEBUG:{let s=this.debug;this.mux&&console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."),this._hls&&(this._hls.config.debug=s);break}case m.METADATA_URL:a&&fetch(a).then(s=>s.json()).then(s=>this.metadata=s).catch(()=>console.error(`Unable to load or parse metadata JSON from metadata-url ${a}!`));break;case m.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case m.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case m.LOGO:(a==null||a!==i)&&this.updateLogo();break;case m.DISABLE_TRACKING:{if(a==null||a!==i){let s=this.currentTime,o=this.paused;this.unload(),ql(this,Tt,bo).call(this).then(()=>{this.currentTime=s,o||this.play()})}break}case m.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(s=>{s.trim().startsWith("muxData")&&(document.cookie=s.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}case m.CAP_RENDITION_TO_PLAYER_SIZE:(a==null||a!==i)&&(this.capRenditionToPlayerSize=a!=null?!0:void 0)}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(Te(this,Eo)||this.logo);e.innerHTML=i}connectedCallback(){var e,i;(e=super.connectedCallback)==null||e.call(this),(i=this.nativeEl)==null||i.addEventListener("muxmetadata",Te(this,nu)),this.nativeEl&&this.src&&!Te(this,Tt,en)&&ql(this,Tt,bo).call(this)}disconnectedCallback(){var e,i;(e=this.nativeEl)==null||e.removeEventListener("muxmetadata",Te(this,nu)),this.unload(),(i=super.disconnectedCallback)==null||i.call(this)}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}};po=new WeakMap,Jd=new WeakMap,vo=new WeakMap,jd=new WeakMap,eu=new WeakMap,tu=new WeakMap,iu=new WeakMap,au=new WeakMap,Eo=new WeakMap,nu=new WeakMap,Tt=new WeakSet,en=function(){return JA(this.nativeEl)},ru=new WeakMap,bo=async function(){Te(this,po)||(await Nt(this,po,Promise.resolve()),Nt(this,po,null),this.load())};var Af=t=>{throw TypeError(t)},Tf=(t,e,i)=>e.has(t)||Af("Cannot "+i),Kk=(t,e,i)=>(Tf(t,e,"read from private field"),i?i.call(t):e.get(t)),Gk=(t,e,i)=>e.has(t)?Af("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Yk=(t,e,i,a)=>(Tf(t,e,"write to private field"),e.set(t,i),i),yf=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment>"u"){class t extends yf{}globalThis.DocumentFragment=t}var qk=class extends yf{},Zk={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(qk)}},zk={customElements:Zk},Qk=typeof window>"u"||typeof globalThis.customElements>"u",Zh=Qk?zk:globalThis,su,f1=class extends jA(iT(Vk)){constructor(){super(...arguments),Gk(this,su)}get autoplay(){let t=this.getAttribute("autoplay");return t===null?!1:t===""?!0:t}set autoplay(t){let e=this.autoplay;t!==e&&(t?this.setAttribute("autoplay",typeof t=="string"?t:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var t;return(t=Kk(this,su))!=null?t:this.muxCastCustomData}set castCustomData(t){Yk(this,su,t)}};su=new WeakMap;Zh.customElements.get("mux-video")||(Zh.customElements.define("mux-video",f1),Zh.MuxVideoElement=f1);const S={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},Q={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},kf={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},Sf=Object.entries(kf),l=Sf.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),Xk={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Pi=Sf.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...Xk});Object.entries(Pi).reduce((t,[e,i])=>{const a=l[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const Jk=Object.entries(l).reduce((t,[e,i])=>{const a=Pi[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),Oi={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},Gr={DISABLED:"disabled",SHOWING:"showing"},zh={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},lt={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},zi={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},jk={FULLSCREEN:"fullscreen"};function eS(t){return t?.map(iS).join(" ")}function tS(t){return t?.split(/\s+/).map(aS)}function iS(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(n=>n!=null).join(":")}}function aS(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function nS(t){return t?.map(sS).join(" ")}function rS(t){return t?.split(/\s+/).map(oS)}function sS(t){if(t){const{id:e,kind:i,language:a,label:n}=t;return[e,i,a,n].filter(r=>r!=null).join(":")}}function oS(t){if(t){const[e,i,a,n]=t.split(":");return{id:e,kind:i,language:a,label:n}}}function lS(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function EE(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}function If(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}const Mf=t=>new Promise(e=>setTimeout(e,t)),dS={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var _1;const Qh={en:dS};let lp=((_1=globalThis.navigator)==null?void 0:_1.language)||"en";const uS=t=>{lp=t},cS=t=>{var e,i,a;const[n]=lp.split("-");return((e=Qh[lp])==null?void 0:e[t])||((i=Qh[n])==null?void 0:i[t])||((a=Qh.en)==null?void 0:a[t])||t},k=(t,e={})=>cS(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),A1=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],hS=(t,e)=>{const i=k(t===1?A1[e].singular:A1[e].plural);return`${t} ${i}`},Go=t=>{if(!EE(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),r=[a.getHours(),a.getMinutes(),a.getSeconds()].map((s,o)=>s&&hS(s,o)).filter(s=>s).join(", ");return i?k("{time} remaining",{time:r}):r};function Oa(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),n=Math.floor(t/60%60),r=Math.floor(t/3600);const s=Math.floor(e/60%60),o=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(r=n=a="0"),r=r>0||o>0?r+":":"",n=((r||s>=10)&&n<10?"0"+n:n)+":",a=a<10?"0"+a:a,(i?"-":"")+r+n+a}class Lf{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class wf extends Lf{}let T1=class extends wf{constructor(){super(...arguments),this.role=null}};class mS{observe(){}unobserve(){}disconnect(){}}const Cf={createElement:function(){return new bl.HTMLElement},createElementNS:function(){return new bl.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},bl={ResizeObserver:mS,document:Cf,Node:wf,Element:T1,HTMLElement:class extends T1{constructor(){super(...arguments),this.innerHTML=""}get content(){return new bl.DocumentFragment}},DocumentFragment:class extends Lf{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{parseFromString(e,i){return{body:{textContent:e}}}}},Rf="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",Df=Object.keys(bl).every(t=>t in globalThis),c=Rf&&!Df?bl:globalThis,Ie=Rf&&!Df?Cf:globalThis.document,y1=new WeakMap,bE=t=>{let e=y1.get(t);return e||y1.set(t,e=new Set),e},xf=new c.ResizeObserver(t=>{for(const e of t)for(const i of bE(e.target))i(e)});function rs(t,e){bE(t).add(e),xf.observe(t)}function ss(t,e){const i=bE(t);i.delete(e),i.size||xf.unobserve(t)}function Et(t){const e={};for(const i of t)e[i.name]=i.value;return e}function nt(t){var e;return(e=dp(t))!=null?e:vs(t,"media-controller")}function dp(t){var e;const{MEDIA_CONTROLLER:i}=Q,a=t.getAttribute(i);if(a)return(e=ch(t))==null?void 0:e.getElementById(a)}const Of=(t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},pS=(t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},$f=(t,e)=>pS(t,e)[0],ia=(t,e)=>!t||!e?!1:t?.contains(e)?!0:ia(t,e.getRootNode().host),vs=(t,e)=>{if(!t)return null;const i=t.closest(e);return i||vs(t.getRootNode().host,e)};function gE(t=document){var e;const i=t?.activeElement;return i?(e=gE(i.shadowRoot))!=null?e:i:null}function ch(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function Pf(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let n=t;for(;n&&e>0;){const r=getComputedStyle(n);if(i&&r.opacity==="0"||a&&r.visibility==="hidden"||r.display==="none")return!1;n=n.parentElement,e--}return!0}function vS(t,e,i,a){const n=a.x-i.x,r=a.y-i.y,s=n*n+r*r;if(s===0)return 0;const o=((t-i.x)*n+(e-i.y)*r)/s;return Math.max(0,Math.min(1,o))}function we(t,e){const i=ES(t,a=>a===e);return i||fE(t,e)}function ES(t,e){var i,a;let n;for(n of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let r;try{r=(a=n.sheet)==null?void 0:a.cssRules}catch{continue}for(const s of r??[])if(e(s.selectorText))return s}}function fE(t,e){var i,a;const n=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],r=n?.[n.length-1];if(!r?.sheet)return console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};const s=r?.sheet.insertRule(`${e}{}`,r.sheet.cssRules.length);return(a=r.sheet.cssRules)==null?void 0:a[s]}function re(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}function ge(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}re(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function W(t,e){return t.hasAttribute(e)}function F(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}W(t,e)!=i&&t.toggleAttribute(e,i)}function ce(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function le(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;ce(t,e,void 0)!==a&&t.setAttribute(e,a)}var Nf=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Rt=(t,e,i)=>(Nf(t,e,"read from private field"),i?i.call(t):e.get(t)),bS=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Zl=(t,e,i,a)=>(Nf(t,e,"write to private field"),e.set(t,i),i),Ke;function gS(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}class hh extends c.HTMLElement{constructor(){if(super(),bS(this,Ke,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,l.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===Q.MEDIA_CONTROLLER&&(i&&((r=(n=Rt(this,Ke))==null?void 0:n.unassociateElement)==null||r.call(n,this),Zl(this,Ke,null)),a&&this.isConnected&&(Zl(this,Ke,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=Rt(this,Ke))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Zl(this,Ke,fS(this)),this.getAttribute(Q.MEDIA_CONTROLLER)&&((i=(e=Rt(this,Ke))==null?void 0:e.associateElement)==null||i.call(e,this)),Rt(this,Ke)&&(Rt(this,Ke).addEventListener("pointerdown",this),Rt(this,Ke).addEventListener("click",this),Rt(this,Ke).hasAttribute("tabindex")||(Rt(this,Ke).tabIndex=0))}disconnectedCallback(){var e,i,a,n;this.getAttribute(Q.MEDIA_CONTROLLER)&&((i=(e=Rt(this,Ke))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=Rt(this,Ke))==null||a.removeEventListener("pointerdown",this),(n=Rt(this,Ke))==null||n.removeEventListener("click",this),Zl(this,Ke,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:r,clientY:s}=e,{left:o,top:d,width:h,height:b}=this.getBoundingClientRect(),g=r-o,v=s-d;if(g<0||v<0||g>h||v>b||h===0&&b===0)return;const E=this._pointerType||"mouse";if(this._pointerType=void 0,E===zh.TOUCH){this.handleTap(e);return}else if(E===zh.MOUSE||E===zh.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return W(this,l.MEDIA_PAUSED)}set mediaPaused(e){F(this,l.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?S.MEDIA_PLAY_REQUEST:S.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new c.CustomEvent(i,{composed:!0,bubbles:!0}))}}Ke=new WeakMap;hh.shadowRootOptions={mode:"open"};hh.getTemplateHTML=gS;function fS(t){var e;const i=t.getAttribute(Q.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):vs(t,"media-controller")}c.customElements.get("media-gesture-receiver")||c.customElements.define("media-gesture-receiver",hh);var k1=hh,_E=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},_e=(t,e,i)=>(_E(t,e,"read from private field"),i?i.call(t):e.get(t)),Je=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},xt=(t,e,i,a)=>(_E(t,e,"write to private field"),e.set(t,i),i),Ft=(t,e,i)=>(_E(t,e,"access private method"),i),go,Sc,sr,os,xr,up,or,ou,cp,Uf,hp,Hf,gl,mh,ph,AE,ls,fl,va,lu;const D={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function _S(t){return`
    <style>
      
      :host([${l.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${D.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${D.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${D.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${D.AUDIO}])[${D.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${D.AUDIO}])[${D.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${D.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${D.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${D.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${D.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${D.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${D.USER_INACTIVE}]:not([${l.MEDIA_PAUSED}]):not([${l.MEDIA_IS_AIRPLAYING}]):not([${l.MEDIA_IS_CASTING}]):not([${D.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${D.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${D.USER_INACTIVE}]:not([${D.NO_AUTOHIDE}]):not([${l.MEDIA_PAUSED}]):not([${l.MEDIA_IS_CASTING}]):not([${D.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${D.USER_INACTIVE}][${D.AUTOHIDE_OVER_CONTROLS}]:not([${D.NO_AUTOHIDE}]):not([${l.MEDIA_PAUSED}]):not([${l.MEDIA_IS_CASTING}]):not([${D.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${D.AUDIO}])[${l.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${k1.shadowRootOptions.mode}">
          ${k1.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}const AS=Object.values(l),TS="sm:384 md:576 lg:768 xl:960";function yS(t){Bf(t.target,t.contentRect.width)}function Bf(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(D.BREAKPOINTS))!=null?i:TS,n=kS(a),r=SS(n,e);let s=!1;if(Object.keys(n).forEach(o=>{if(r.includes(o)){t.hasAttribute(`breakpoint${o}`)||(t.setAttribute(`breakpoint${o}`,""),s=!0);return}t.hasAttribute(`breakpoint${o}`)&&(t.removeAttribute(`breakpoint${o}`),s=!0)}),s){const o=new CustomEvent(Pi.BREAKPOINTS_CHANGE,{detail:r});t.dispatchEvent(o)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Pi.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function kS(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function SS(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}class vh extends c.HTMLElement{constructor(){if(super(),Je(this,cp),Je(this,hp),Je(this,gl),Je(this,ph),Je(this,ls),Je(this,go,void 0),Je(this,Sc,0),Je(this,sr,null),Je(this,os,null),Je(this,xr,void 0),this.breakpointsComputed=!1,Je(this,up,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const n=a.removedNodes;for(const r of n){if(r.slot!="media"||a.target!=this)continue;let s=a.previousSibling&&a.previousSibling.previousElementSibling;if(!s||!i)this.mediaUnsetCallback(r);else{let o=s.slot!=="media";for(;(s=s.previousSibling)!==null;)s.slot=="media"&&(o=!1);o&&this.mediaUnsetCallback(r)}}if(i)for(const r of a.addedNodes)r===i&&this.handleMediaUpdated(i)}}),Je(this,or,!1),Je(this,ou,e=>{_e(this,or)||(setTimeout(()=>{yS(e),xt(this,or,!1)},0),xt(this,or,!0))}),Je(this,va,void 0),Je(this,lu,()=>{if(!_e(this,va).assignedElements({flatten:!0}).length){_e(this,sr)&&this.mediaUnsetCallback(_e(this,sr));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}xt(this,go,new MutationObserver(_e(this,up)))}static get observedAttributes(){return[D.AUTOHIDE,D.GESTURES_DISABLED].concat(AS).filter(e=>![l.MEDIA_RENDITION_LIST,l.MEDIA_AUDIO_TRACK_LIST,l.MEDIA_CHAPTERS_CUES,l.MEDIA_WIDTH,l.MEDIA_HEIGHT,l.MEDIA_ERROR,l.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==D.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(xt(this,sr,e),e.localName.includes("-")&&await c.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;_e(this,go).observe(this,{childList:!0,subtree:!0}),rs(this,_e(this,ou));const i=this.getAttribute(D.AUDIO)!=null,a=k(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(D.USER_INACTIVE,""),Bf(this,this.getBoundingClientRect().width);const n=this.querySelector(":scope > slot[slot=media]");n&&(xt(this,va,n),_e(this,va).addEventListener("slotchange",_e(this,lu))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=c.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;ss(this,_e(this,ou)),clearTimeout(_e(this,os)),_e(this,go).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=c.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),_e(this,va)&&(_e(this,va).removeEventListener("slotchange",_e(this,lu)),xt(this,va,null)),xt(this,or,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){xt(this,sr,null)}handleEvent(e){switch(e.type){case"pointerdown":xt(this,Sc,e.timeStamp);break;case"pointermove":Ft(this,cp,Uf).call(this,e);break;case"pointerup":Ft(this,hp,Hf).call(this,e);break;case"mouseleave":Ft(this,gl,mh).call(this);break;case"mouseup":this.removeAttribute(D.KEYBOARD_CONTROL);break;case"keyup":Ft(this,ls,fl).call(this),this.setAttribute(D.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);xt(this,xr,isNaN(i)?0:i)}get autohide(){return(_e(this,xr)===void 0?2:_e(this,xr)).toString()}get breakpoints(){return ce(this,D.BREAKPOINTS)}set breakpoints(e){le(this,D.BREAKPOINTS,e)}get audio(){return W(this,D.AUDIO)}set audio(e){F(this,D.AUDIO,e)}get gesturesDisabled(){return W(this,D.GESTURES_DISABLED)}set gesturesDisabled(e){F(this,D.GESTURES_DISABLED,e)}get keyboardControl(){return W(this,D.KEYBOARD_CONTROL)}set keyboardControl(e){F(this,D.KEYBOARD_CONTROL,e)}get noAutohide(){return W(this,D.NO_AUTOHIDE)}set noAutohide(e){F(this,D.NO_AUTOHIDE,e)}get autohideOverControls(){return W(this,D.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){F(this,D.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return W(this,D.USER_INACTIVE)}set userInteractive(e){F(this,D.USER_INACTIVE,e)}}go=new WeakMap;Sc=new WeakMap;sr=new WeakMap;os=new WeakMap;xr=new WeakMap;up=new WeakMap;or=new WeakMap;ou=new WeakMap;cp=new WeakSet;Uf=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-_e(this,Sc)<250)return;Ft(this,ph,AE).call(this),clearTimeout(_e(this,os));const e=this.hasAttribute(D.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&Ft(this,ls,fl).call(this)};hp=new WeakSet;Hf=function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(D.USER_INACTIVE);[this,this.media].includes(t.target)&&e?Ft(this,gl,mh).call(this):Ft(this,ls,fl).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&Ft(this,ls,fl).call(this)};gl=new WeakSet;mh=function(){if(_e(this,xr)<0||this.hasAttribute(D.USER_INACTIVE))return;this.setAttribute(D.USER_INACTIVE,"");const t=new c.CustomEvent(Pi.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};ph=new WeakSet;AE=function(){if(!this.hasAttribute(D.USER_INACTIVE))return;this.removeAttribute(D.USER_INACTIVE);const t=new c.CustomEvent(Pi.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};ls=new WeakSet;fl=function(){Ft(this,ph,AE).call(this),clearTimeout(_e(this,os));const t=parseInt(this.autohide);t<0||xt(this,os,setTimeout(()=>{Ft(this,gl,mh).call(this)},t*1e3))};va=new WeakMap;lu=new WeakMap;vh.shadowRootOptions={mode:"open"};vh.getTemplateHTML=_S;c.customElements.get("media-container")||c.customElements.define("media-container",vh);var Wf=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ne=(t,e,i)=>(Wf(t,e,"read from private field"),i?i.call(t):e.get(t)),Fs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},zl=(t,e,i,a)=>(Wf(t,e,"write to private field"),e.set(t,i),i),lr,dr,Ic,pn,Ki,Ea;class TE{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Fs(this,Ki),Fs(this,lr,void 0),Fs(this,dr,void 0),Fs(this,Ic,void 0),Fs(this,pn,new Set),zl(this,lr,e),zl(this,dr,i),zl(this,Ic,new Set(a))}[Symbol.iterator](){return Ne(this,Ki,Ea).values()}get length(){return Ne(this,Ki,Ea).size}get value(){var e;return(e=[...Ne(this,Ki,Ea)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(zl(this,pn,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...Ne(this,Ki,Ea)][e]}values(){return Ne(this,Ki,Ea).values()}forEach(e,i){Ne(this,Ki,Ea).forEach(e,i)}add(...e){var i,a;e.forEach(n=>Ne(this,pn).add(n)),!(this.value===""&&!((i=Ne(this,lr))!=null&&i.hasAttribute(`${Ne(this,dr)}`)))&&((a=Ne(this,lr))==null||a.setAttribute(`${Ne(this,dr)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>Ne(this,pn).delete(a)),(i=Ne(this,lr))==null||i.setAttribute(`${Ne(this,dr)}`,`${this.value}`)}contains(e){return Ne(this,Ki,Ea).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}lr=new WeakMap;dr=new WeakMap;Ic=new WeakMap;pn=new WeakMap;Ki=new WeakSet;Ea=function(){return Ne(this,pn).size?Ne(this,pn):Ne(this,Ic)};const IS=(t="")=>t.split(/\s+/),Ff=(t="")=>{const[e,i,a]=t.split(":"),n=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?Oi.CAPTIONS:Oi.SUBTITLES,language:i,label:n}},Eh=(t="",e={})=>IS(t).map(i=>{const a=Ff(i);return{...e,...a}}),Vf=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Ff(e):e):typeof t=="string"?Eh(t):[t]:[],mp=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,_l=(t=[])=>Array.prototype.map.call(t,mp).join(" "),MS=(t,e)=>i=>i[t]===e,Kf=t=>{const e=Object.entries(t).map(([i,a])=>MS(i,a));return i=>e.every(a=>a(i))},Yo=(t,e=[],i=[])=>{const a=Vf(i).map(Kf),n=r=>a.some(s=>s(r));Array.from(e).filter(n).forEach(r=>{r.mode=t})},bh=(t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Kf(e);return Array.from(t.textTracks).filter(i)},Gf=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(l.MEDIA_SUBTITLES_SHOWING)},LS=t=>{var e;const{media:i,fullscreenElement:a}=t;try{const n=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(n){const r=(e=a[n])==null?void 0:e.call(a);if(r instanceof Promise)return r.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(n){console.error(n)}},S1="exitFullscreen"in Ie?"exitFullscreen":"webkitExitFullscreen"in Ie?"webkitExitFullscreen":"webkitCancelFullScreen"in Ie?"webkitCancelFullScreen":void 0,wS=t=>{var e;const{documentElement:i}=t;if(S1){const a=(e=i?.[S1])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},fo="fullscreenElement"in Ie?"fullscreenElement":"webkitFullscreenElement"in Ie?"webkitFullscreenElement":void 0,CS=t=>{const{documentElement:e,media:i}=t,a=e?.[fo];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===jk.FULLSCREEN?i:a},RS=t=>{var e;const{media:i,documentElement:a,fullscreenElement:n=i}=t;if(!i||!a)return!1;const r=CS(t);if(!r)return!1;if(r===n||r===i)return!0;if(r.localName.includes("-")){let s=r.shadowRoot;if(!(fo in s))return ia(r,n);for(;s?.[fo];){if(s[fo]===n)return!0;s=(e=s[fo])==null?void 0:e.shadowRoot}}return!1},DS="fullscreenEnabled"in Ie?"fullscreenEnabled":"webkitFullscreenEnabled"in Ie?"webkitFullscreenEnabled":void 0,xS=t=>{const{documentElement:e,media:i}=t;return!!e?.[DS]||i&&"webkitSupportsFullscreen"in i};let Ql;const yE=()=>{var t,e;return Ql||(Ql=(e=(t=Ie)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Ql)},OS=async(t=yE())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([$S(t,i.signal),PS(t,e)]);return i.abort(),a},$S=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),PS=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Mf(10)}return t.volume!==e},NS=/.*Version\/.*Safari\/.*/.test(c.navigator.userAgent),Yf=(t=yE())=>c.matchMedia("(display-mode: standalone)").matches&&NS?!1:typeof t?.requestPictureInPicture=="function",qf=(t=yE())=>xS({documentElement:Ie,media:t}),US=qf(),HS=Yf(),BS=!!c.WebKitPlaybackTargetAvailabilityEvent,WS=!!c.chrome,Mc=t=>bh(t.media,e=>[Oi.SUBTITLES,Oi.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),Zf=t=>bh(t.media,e=>e.mode===Gr.SHOWING&&[Oi.SUBTITLES,Oi.CAPTIONS].includes(e.kind)),zf=(t,e)=>{const i=Mc(t),a=Zf(t),n=!!a.length;if(i.length){if(e===!1||n&&e!==!0)Yo(Gr.DISABLED,i,a);else if(e===!0||!n&&e!==!1){let r=i[0];const{options:s}=t;if(!s?.noSubtitlesLangPref){const b=c.localStorage.getItem("media-chrome-pref-subtitles-lang"),g=b?[b,...c.navigator.languages]:c.navigator.languages,v=i.filter(E=>g.some(T=>E.language.toLowerCase().startsWith(T.split("-")[0]))).sort((E,T)=>{const f=g.findIndex(I=>E.language.toLowerCase().startsWith(I.split("-")[0])),y=g.findIndex(I=>T.language.toLowerCase().startsWith(I.split("-")[0]));return f-y});v[0]&&(r=v[0])}const{language:o,label:d,kind:h}=r;Yo(Gr.DISABLED,i,a),Yo(Gr.SHOWING,i,[{language:o,label:d,kind:h}])}}},kE=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?FS(t,e):Object.entries(t).every(([i,a])=>i in e&&kE(a,e[i])),FS=(t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((n,r)=>kE(n,e[r])):!0},VS=Object.values(zi);let Lc;const KS=OS().then(t=>(Lc=t,Lc)),GS=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof c.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=c.customElements.get(i);a&&e instanceof a||(await c.customElements.whenDefined(i),c.customElements.upgrade(e))}))},YS=new c.DOMParser,qS=t=>t&&(YS.parseFromString(t,"text/html").body.textContent||t),_o={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:n}=t;if(e?.type!=="playing")return(a=(i=n?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const n=c.localStorage.getItem("media-chrome-pref-muted")!==null,r=i.hasAttribute("muted");if(a){n&&c.localStorage.removeItem("media-chrome-pref-muted");return}if(r&&!n)return;c.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(n){console.debug("Error setting muted pref",n)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const n=c.localStorage.getItem("media-chrome-pref-muted")==="true";_o.mediaMuted.set(n,e),t(n)}catch(n){console.debug("Error getting muted pref",n)}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?c.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&c.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(n){console.debug("Error setting volume pref",n)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const n=c.localStorage.getItem("media-chrome-pref-volume");if(n==null)return;_o.mediaVolume.set(+n,e),t(+n)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!EE(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),n=i.seekable.end(i.seekable.length-1);if(!(!a&&!n))return[Number(a.toFixed(3)),Number(n.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((n,r)=>[Number(a.start(r).toFixed(3)),Number(a.end(r).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[zi.LIVE,zi.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:n}=e;if(VS.includes(n))return n===zi.UNKNOWN?a:n;const r=e.duration;return r===1/0?zi.LIVE:Number.isFinite(r)?zi.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=_o.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===zi.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(_o.mediaStreamType.get(t)===zi.LIVE))return!1;const n=e.seekable;if(!n)return!0;if(!n.length)return!1;const r=n.end(n.length-1)-i;return e.currentTime>=r},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Mc(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return Zf(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:n,options:r}=e;if(!n)return;const s=o=>{var d;!r.defaultSubtitles||o&&![Oi.CAPTIONS,Oi.SUBTITLES].includes((d=o?.track)==null?void 0:d.kind)||zf(e,!0)};return n.addEventListener("loadstart",s),(i=n.textTracks)==null||i.addEventListener("addtrack",s),(a=n.textTracks)==null||a.addEventListener("removetrack",s),()=>{var o,d;n.removeEventListener("loadstart",s),(o=n.textTracks)==null||o.removeEventListener("addtrack",s),(d=n.textTracks)==null||d.removeEventListener("removetrack",s)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=bh(i,{kind:Oi.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:n,startTime:r,endTime:s})=>({text:qS(n),startTime:r,endTime:s}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const n=a.querySelector('track[kind="chapters"][default][src]'),r=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return n?.addEventListener("load",t),r?.addEventListener("load",t),()=>{n?.removeEventListener("load",t),r?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:n}=t;if(!a||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===a)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?ia(a,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes("-")){let r=n.pictureInPictureElement.shadowRoot;for(;r?.pictureInPictureElement;){if(r.pictureInPictureElement===a)return!0;r=(i=r.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!Ie.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(n=>{if(n.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const r=()=>{i.removeEventListener("loadedmetadata",s),i.preload="none"},s=()=>{i.requestPictureInPicture().catch(a),r()};i.addEventListener("loadedmetadata",s),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),r()},1e3)}else throw n}else throw n})}else Ie.pictureInPictureElement&&Ie.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:n}=t;return(a=(i=n?.videoRenditions)==null?void 0:i[(e=n.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,n=Array.prototype.findIndex.call(i.videoRenditions,r=>r.id==a);i.videoRenditions.selectedIndex!=n&&(i.videoRenditions.selectedIndex=n)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(n=>n.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const n of i.audioTracks)n.enabled=a==n.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return RS(t)},set(t,e,i){var a,n;t?(LS(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((n=e.media)==null||n.focus())):wS(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:n}=e;if(n&&!(t&&((i=n.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=n.remote)==null?void 0:a.state)!=="connected")){if(typeof n.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}n.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&c.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!US||!qf(e))return lt.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!HS||!Yf(e))return lt.UNSUPPORTED;if(e?.disablePictureInPicture)return lt.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(Lc===!1||e?.volume==null)return lt.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Lc==null&&KS.then(e=>t(e?void 0:lt.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!WS||!((i=a?.remote)!=null&&i.state))return lt.UNSUPPORTED;if(!(e==null||e==="available"))return lt.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a?.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!BS)return lt.UNSUPPORTED;if(e?.availability==="not-available")return lt.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a?.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return lt.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return lt.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return lt.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return lt.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},ZS={[S.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,n,r;const{media:s}=e,o=i??void 0;let d,h;if(s&&o!=null){const[E]=bh(s,{kind:Oi.METADATA,label:"thumbnails"}),T=Array.prototype.find.call((a=E?.cues)!=null?a:[],(f,y,I)=>y===0?f.endTime>o:y===I.length-1?f.startTime<=o:f.startTime<=o&&f.endTime>o);if(T){const f=/'^(?:[a-z]+:)?\/\//i.test(T.text)||(n=s?.querySelector('track[label="thumbnails"]'))==null?void 0:n.src,y=new URL(T.text,f);h=new URLSearchParams(y.hash).get("#xywh").split(",").map(V=>+V),d=y.href}}const b=t.mediaDuration.get(e);let v=(r=t.mediaChaptersCues.get(e).find((E,T,f)=>T===f.length-1&&b===E.endTime?E.startTime<=o&&E.endTime>=o:E.startTime<=o&&E.endTime>o))==null?void 0:r.text;return i!=null&&v==null&&(v=""),{mediaPreviewTime:o,mediaPreviewImage:d,mediaPreviewCoords:h,mediaPreviewChapter:v}},[S.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[S.MEDIA_PLAY_REQUEST](t,e){var i,a,n,r;const s="mediaPaused",d=t.mediaStreamType.get(e)===zi.LIVE,h=!((i=e.options)!=null&&i.noAutoSeekToLive),b=t.mediaTargetLiveWindow.get(e)>0;if(d&&h&&!b){const g=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(g){const v=(r=(n=e.options)==null?void 0:n.seekToLiveOffset)!=null?r:0,E=g-v;t.mediaCurrentTime.set(E,e)}}t[s].set(!1,e)},[S.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",n=i;t[a].set(n,e)},[S.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[S.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[S.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",n=!!i;return t[a].set(n,e),{mediaLoop:n}},[S.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",n=i;n&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(n,e)},[S.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",n=i;t[a].set(n,e)},[S.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,n;const r="mediaCurrentTime",s=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(s)))return;const o=(n=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?n:0,d=s-o;t[r].set(d,e)},[S.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:n}=e,r=Mc(e),s=Vf(i),o=(a=s[0])==null?void 0:a.language;o&&!n.noSubtitlesLangPref&&c.localStorage.setItem("media-chrome-pref-subtitles-lang",o),Yo(Gr.SHOWING,r,s)},[S.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=Mc(e),n=i??[];Yo(Gr.DISABLED,a,n)},[S.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){zf(e,i)},[S.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",n=i;t[a].set(n,e)},[S.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",n=i;t[a].set(n,e)},[S.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[S.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[S.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[S.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[S.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[S.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[S.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},zS=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=_o,requestMap:n=ZS,options:r={},monitorStateOwnersOnlyWithSubscriptions:s=!0})=>{const o=[],d={options:{...r}};let h=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const b=f=>{f!=null&&(kE(f,h)||(h=Object.freeze({...h,...f}),o.forEach(y=>y(h))))},g=()=>{const f=Object.entries(a).reduce((y,[I,{get:V}])=>(y[I]=V(d),y),{});b(f)},v={};let E;const T=async(f,y)=>{var I,V,fe,qe,Re,He,Be,rt,Xe,Kt,Gt,Yt,qt,Zt,zt,Qt;const aa=!!E;if(E={...d,...E??{},...f},aa)return;await GS(...Object.values(f));const De=o.length>0&&y===0&&s,Xt=d.media!==E.media,Jt=((I=d.media)==null?void 0:I.textTracks)!==((V=E.media)==null?void 0:V.textTracks),jt=((fe=d.media)==null?void 0:fe.videoRenditions)!==((qe=E.media)==null?void 0:qe.videoRenditions),We=((Re=d.media)==null?void 0:Re.audioTracks)!==((He=E.media)==null?void 0:He.audioTracks),Ze=((Be=d.media)==null?void 0:Be.remote)!==((rt=E.media)==null?void 0:rt.remote),Ha=d.documentElement!==E.documentElement,_s=!!d.media&&(Xt||De),As=!!((Xe=d.media)!=null&&Xe.textTracks)&&(Jt||De),Ts=!!((Kt=d.media)!=null&&Kt.videoRenditions)&&(jt||De),ys=!!((Gt=d.media)!=null&&Gt.audioTracks)&&(We||De),ks=!!((Yt=d.media)!=null&&Yt.remote)&&(Ze||De),Ss=!!d.documentElement&&(Ha||De),Rn=_s||As||Ts||ys||ks||Ss,st=o.length===0&&y===1&&s,Is=!!E.media&&(Xt||st),Ms=!!((qt=E.media)!=null&&qt.textTracks)&&(Jt||st),Ls=!!((Zt=E.media)!=null&&Zt.videoRenditions)&&(jt||st),ws=!!((zt=E.media)!=null&&zt.audioTracks)&&(We||st),Cs=!!((Qt=E.media)!=null&&Qt.remote)&&(Ze||st),Rs=!!E.documentElement&&(Ha||st),Ds=Is||Ms||Ls||ws||Cs||Rs;if(!(Rn||Ds)){Object.entries(E).forEach(([R,Ct])=>{d[R]=Ct}),g(),E=void 0;return}Object.entries(a).forEach(([R,{get:Ct,mediaEvents:Lh=[],textTracksEvents:wh=[],videoRenditionsEvents:Ch=[],audioTracksEvents:Rh=[],remoteEvents:Dh=[],rootEvents:xh=[],stateOwnersUpdateHandlers:Oh=[]}])=>{v[R]||(v[R]={});const j=O=>{const K=Ct(d,O);b({[R]:K})};let H;H=v[R].mediaEvents,Lh.forEach(O=>{H&&_s&&(d.media.removeEventListener(O,H),v[R].mediaEvents=void 0),Is&&(E.media.addEventListener(O,j),v[R].mediaEvents=j)}),H=v[R].textTracksEvents,wh.forEach(O=>{var K,me;H&&As&&((K=d.media.textTracks)==null||K.removeEventListener(O,H),v[R].textTracksEvents=void 0),Ms&&((me=E.media.textTracks)==null||me.addEventListener(O,j),v[R].textTracksEvents=j)}),H=v[R].videoRenditionsEvents,Ch.forEach(O=>{var K,me;H&&Ts&&((K=d.media.videoRenditions)==null||K.removeEventListener(O,H),v[R].videoRenditionsEvents=void 0),Ls&&((me=E.media.videoRenditions)==null||me.addEventListener(O,j),v[R].videoRenditionsEvents=j)}),H=v[R].audioTracksEvents,Rh.forEach(O=>{var K,me;H&&ys&&((K=d.media.audioTracks)==null||K.removeEventListener(O,H),v[R].audioTracksEvents=void 0),ws&&((me=E.media.audioTracks)==null||me.addEventListener(O,j),v[R].audioTracksEvents=j)}),H=v[R].remoteEvents,Dh.forEach(O=>{var K,me;H&&ks&&((K=d.media.remote)==null||K.removeEventListener(O,H),v[R].remoteEvents=void 0),Cs&&((me=E.media.remote)==null||me.addEventListener(O,j),v[R].remoteEvents=j)}),H=v[R].rootEvents,xh.forEach(O=>{H&&Ss&&(d.documentElement.removeEventListener(O,H),v[R].rootEvents=void 0),Rs&&(E.documentElement.addEventListener(O,j),v[R].rootEvents=j)});const Ba=v[R].stateOwnersUpdateHandlers;if(Ba&&Rn&&(Array.isArray(Ba)?Ba:[Ba]).forEach(K=>{typeof K=="function"&&K()}),Ds){const O=Oh.map(K=>K(j,E)).filter(K=>typeof K=="function");v[R].stateOwnersUpdateHandlers=O.length===1?O[0]:O}else Rn&&(v[R].stateOwnersUpdateHandlers=void 0)}),Object.entries(E).forEach(([R,Ct])=>{d[R]=Ct}),g(),E=void 0};return T({media:t,fullscreenElement:e,documentElement:i,options:r}),{dispatch(f){const{type:y,detail:I}=f;if(n[y]&&h.mediaErrorCode==null){b(n[y](a,d,f));return}y==="mediaelementchangerequest"?T({media:I}):y==="fullscreenelementchangerequest"?T({fullscreenElement:I}):y==="documentelementchangerequest"?T({documentElement:I}):y==="optionschangerequest"&&(Object.entries(I??{}).forEach(([V,fe])=>{d.options[V]=fe}),g())},getState(){return h},subscribe(f){return T({},o.length+1),o.push(f),f(h),()=>{const y=o.indexOf(f);y>=0&&(T({},o.length-1),o.splice(y,1))}}}};var SE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},C=(t,e,i)=>(SE(t,e,"read from private field"),i?i.call(t):e.get(t)),_t=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ot=(t,e,i,a)=>(SE(t,e,"write to private field"),e.set(t,i),i),Vs=(t,e,i)=>(SE(t,e,"access private method"),i),Qi,Ao,B,Ri,To,Ei,du,yo,uu,pp,kn,cu,vp,Ep,Qf;const Xf=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],I1=10,M1=.025,L1=.25,QS=.25,XS=2,A={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class Jf extends vh{constructor(){super(),_t(this,uu),_t(this,cu),_t(this,Ep),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,_t(this,Qi,new TE(this,A.HOTKEYS)),_t(this,Ao,void 0),_t(this,B,void 0),_t(this,Ri,null),_t(this,To,void 0),_t(this,Ei,void 0),_t(this,du,i=>{var a;(a=C(this,B))==null||a.dispatch(i)}),_t(this,yo,void 0),_t(this,kn,i=>{const{key:a,shiftKey:n}=i;if(!(n&&(a==="/"||a==="?")||Xf.includes(a))){this.removeEventListener("keyup",C(this,kn));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};Ot(this,To,i=>{Object.entries(i).forEach(([a,n])=>{if(a in e&&e[a]===n)return;this.propagateMediaState(a,n);const r=a.toLowerCase(),s=new c.CustomEvent(Jk[r],{composed:!0,detail:n});this.dispatchEvent(s)}),e=i})}static get observedAttributes(){return super.observedAttributes.concat(A.NO_HOTKEYS,A.HOTKEYS,A.DEFAULT_STREAM_TYPE,A.DEFAULT_SUBTITLES,A.DEFAULT_DURATION,A.NO_MUTED_PREF,A.NO_VOLUME_PREF,A.LANG,A.LOOP,A.LIVE_EDGE_OFFSET,A.SEEK_TO_LIVE_OFFSET,A.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return C(this,B)}set mediaStore(e){var i,a;if(C(this,B)&&((i=C(this,Ei))==null||i.call(this),Ot(this,Ei,void 0)),Ot(this,B,e),!C(this,B)&&!this.hasAttribute(A.NO_DEFAULT_STORE)){Vs(this,uu,pp).call(this);return}Ot(this,Ei,(a=C(this,B))==null?void 0:a.subscribe(C(this,To)))}get fullscreenElement(){var e;return(e=C(this,Ao))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(A.FULLSCREEN_ELEMENT)&&this.removeAttribute(A.FULLSCREEN_ELEMENT),Ot(this,Ao,e),(i=C(this,B))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return W(this,A.DEFAULT_SUBTITLES)}set defaultSubtitles(e){F(this,A.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return ce(this,A.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){le(this,A.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return re(this,A.DEFAULT_DURATION)}set defaultDuration(e){ge(this,A.DEFAULT_DURATION,e)}get noHotkeys(){return W(this,A.NO_HOTKEYS)}set noHotkeys(e){F(this,A.NO_HOTKEYS,e)}get keysUsed(){return ce(this,A.KEYS_USED)}set keysUsed(e){le(this,A.KEYS_USED,e)}get liveEdgeOffset(){return re(this,A.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){ge(this,A.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return W(this,A.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){F(this,A.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return W(this,A.NO_VOLUME_PREF)}set noVolumePref(e){F(this,A.NO_VOLUME_PREF,e)}get noMutedPref(){return W(this,A.NO_MUTED_PREF)}set noMutedPref(e){F(this,A.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return W(this,A.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){F(this,A.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return W(this,A.NO_DEFAULT_STORE)}set noDefaultStore(e){F(this,A.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var n,r,s,o,d,h,b,g,v,E,T,f;if(super.attributeChangedCallback(e,i,a),e===A.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(A.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===A.HOTKEYS)C(this,Qi).value=a;else if(e===A.DEFAULT_SUBTITLES&&a!==i)(n=C(this,B))==null||n.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(A.DEFAULT_SUBTITLES)}});else if(e===A.DEFAULT_STREAM_TYPE)(s=C(this,B))==null||s.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(r=this.getAttribute(A.DEFAULT_STREAM_TYPE))!=null?r:void 0}});else if(e===A.LIVE_EDGE_OFFSET&&a!==i)(o=C(this,B))==null||o.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(A.LIVE_EDGE_OFFSET)?+this.getAttribute(A.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(A.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(A.SEEK_TO_LIVE_OFFSET):this.hasAttribute(A.LIVE_EDGE_OFFSET)?+this.getAttribute(A.LIVE_EDGE_OFFSET):void 0}});else if(e===A.SEEK_TO_LIVE_OFFSET&&a!==i)(d=C(this,B))==null||d.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(A.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(A.SEEK_TO_LIVE_OFFSET):this.hasAttribute(A.LIVE_EDGE_OFFSET)?+this.getAttribute(A.LIVE_EDGE_OFFSET):void 0}});else if(e===A.NO_AUTO_SEEK_TO_LIVE)(h=C(this,B))==null||h.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(A.NO_AUTO_SEEK_TO_LIVE)}});else if(e===A.FULLSCREEN_ELEMENT){const y=a?(b=this.getRootNode())==null?void 0:b.getElementById(a):void 0;Ot(this,Ao,y),(g=C(this,B))==null||g.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===A.LANG&&a!==i?(uS(a),(v=C(this,B))==null||v.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===A.LOOP&&a!==i?(E=C(this,B))==null||E.dispatch({type:S.MEDIA_LOOP_REQUEST,detail:a!=null}):e===A.NO_VOLUME_PREF&&a!==i?(T=C(this,B))==null||T.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(A.NO_VOLUME_PREF)}}):e===A.NO_MUTED_PREF&&a!==i&&((f=C(this,B))==null||f.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(A.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;this.associateElement(this),!C(this,B)&&!this.hasAttribute(A.NO_DEFAULT_STORE)&&Vs(this,uu,pp).call(this),(e=C(this,B))==null||e.dispatch({type:"documentelementchangerequest",detail:Ie}),(i=C(this,B))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),C(this,B)&&!C(this,Ei)&&Ot(this,Ei,(a=C(this,B))==null?void 0:a.subscribe(C(this,To))),C(this,yo)!==void 0&&C(this,B)&&this.media&&setTimeout(()=>{var n,r,s;(r=(n=this.media)==null?void 0:n.textTracks)!=null&&r.length&&((s=C(this,B))==null||s.dispatch({type:S.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:C(this,yo)}))},0),this.hasAttribute(A.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,n,r,s;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),C(this,B)){const o=C(this,B).getState();Ot(this,yo,!!((i=o.mediaSubtitlesShowing)!=null&&i.length)),(a=C(this,B))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(n=C(this,B))==null||n.dispatch({type:"documentelementchangerequest",detail:void 0}),(r=C(this,B))==null||r.dispatch({type:S.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}C(this,Ei)&&((s=C(this,Ei))==null||s.call(this),Ot(this,Ei,void 0)),this.unassociateElement(this),C(this,Ri)&&(C(this,Ri).remove(),Ot(this,Ri,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=C(this,B))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=C(this,B))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){R1(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),n=this.unregisterMediaStateReceiver.bind(this),r=aI(e,a,n);Object.values(S).forEach(s=>{e.addEventListener(s,C(this,du))}),i.set(e,r)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(S).forEach(n=>{e.removeEventListener(n,C(this,du))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),C(this,B)&&Object.entries(C(this,B).getState()).forEach(([n,r])=>{R1([e],n,r)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Vs(this,cu,vp))}disableHotkeys(){this.removeEventListener("keydown",Vs(this,cu,vp)),this.removeEventListener("keyup",C(this,kn))}get hotkeys(){return C(this,Qi)}set hotkeys(e){le(this,A.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,n,r,s,o,d,h,b;const g=e.target;if(((n=(a=(i=g.getAttribute(A.KEYS_USED))==null?void 0:i.split(" "))!=null?a:g?.keysUsed)!=null?n:[]).map(I=>I==="Space"?" ":I).filter(Boolean).includes(e.key))return;let E,T,f;if(!(C(this,Qi).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&C(this,Qi).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&C(this,Qi).contains("noshift+/")))switch(e.key){case" ":case"k":E=C(this,B).getState().mediaPaused?S.MEDIA_PLAY_REQUEST:S.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new c.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"m":E=this.mediaStore.getState().mediaVolumeLevel==="off"?S.MEDIA_UNMUTE_REQUEST:S.MEDIA_MUTE_REQUEST,this.dispatchEvent(new c.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"f":E=this.mediaStore.getState().mediaIsFullscreen?S.MEDIA_EXIT_FULLSCREEN_REQUEST:S.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new c.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new c.CustomEvent(S.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const I=this.hasAttribute(A.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(A.KEYBOARD_BACKWARD_SEEK_OFFSET):I1;T=Math.max(((r=this.mediaStore.getState().mediaCurrentTime)!=null?r:0)-I,0),f=new c.CustomEvent(S.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:T}),this.dispatchEvent(f);break}case"ArrowRight":case"l":{const I=this.hasAttribute(A.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(A.KEYBOARD_FORWARD_SEEK_OFFSET):I1;T=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)+I,0),f=new c.CustomEvent(S.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:T}),this.dispatchEvent(f);break}case"ArrowUp":{const I=this.hasAttribute(A.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(A.KEYBOARD_UP_VOLUME_STEP):M1;T=Math.min(((o=this.mediaStore.getState().mediaVolume)!=null?o:1)+I,1),f=new c.CustomEvent(S.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:T}),this.dispatchEvent(f);break}case"ArrowDown":{const I=this.hasAttribute(A.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(A.KEYBOARD_DOWN_VOLUME_STEP):M1;T=Math.max(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)-I,0),f=new c.CustomEvent(S.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:T}),this.dispatchEvent(f);break}case"<":{const I=(h=this.mediaStore.getState().mediaPlaybackRate)!=null?h:1;T=Math.max(I-L1,QS).toFixed(2),f=new c.CustomEvent(S.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:T}),this.dispatchEvent(f);break}case">":{const I=(b=this.mediaStore.getState().mediaPlaybackRate)!=null?b:1;T=Math.min(I+L1,XS).toFixed(2),f=new c.CustomEvent(S.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:T}),this.dispatchEvent(f);break}case"/":case"?":{e.shiftKey&&Vs(this,Ep,Qf).call(this);break}case"p":{E=this.mediaStore.getState().mediaIsPip?S.MEDIA_EXIT_PIP_REQUEST:S.MEDIA_ENTER_PIP_REQUEST,f=new c.CustomEvent(E,{composed:!0,bubbles:!0}),this.dispatchEvent(f);break}}}}Qi=new WeakMap;Ao=new WeakMap;B=new WeakMap;Ri=new WeakMap;To=new WeakMap;Ei=new WeakMap;du=new WeakMap;yo=new WeakMap;uu=new WeakSet;pp=function(){var t;this.mediaStore=zS({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(A.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(A.DEFAULT_DURATION)?+this.getAttribute(A.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(A.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(A.LIVE_EDGE_OFFSET)?+this.getAttribute(A.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(A.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(A.SEEK_TO_LIVE_OFFSET):this.hasAttribute(A.LIVE_EDGE_OFFSET)?+this.getAttribute(A.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(A.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(A.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(A.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(A.NO_SUBTITLES_LANG_PREF)}})};kn=new WeakMap;cu=new WeakSet;vp=function(t){var e;const{metaKey:i,altKey:a,key:n,shiftKey:r}=t,s=r&&(n==="/"||n==="?");if(s&&((e=C(this,Ri))!=null&&e.open)){this.removeEventListener("keyup",C(this,kn));return}if(i||a||!s&&!Xf.includes(n)){this.removeEventListener("keyup",C(this,kn));return}const o=t.target,d=o instanceof HTMLElement&&(o.tagName.toLowerCase()==="media-volume-range"||o.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(n)&&!(C(this,Qi).contains(`no${n.toLowerCase()}`)||n===" "&&C(this,Qi).contains("nospace"))&&!d&&t.preventDefault(),this.addEventListener("keyup",C(this,kn),{once:!0})};Ep=new WeakSet;Qf=function(){C(this,Ri)||(Ot(this,Ri,Ie.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(C(this,Ri))),C(this,Ri).open=!0};const JS=Object.values(l),jS=Object.values(kf),jf=t=>{var e,i,a,n;let{observedAttributes:r}=t.constructor;!r&&((e=t.nodeName)!=null&&e.includes("-"))&&(c.customElements.upgrade(t),{observedAttributes:r}=t.constructor);const s=(n=(a=(i=t?.getAttribute)==null?void 0:i.call(t,Q.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:n.call(a,/\s+/);return Array.isArray(r||s)?(r||s).filter(o=>JS.includes(o)):[]},eI=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&c.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof c.customElements.get(t.nodeName.toLowerCase()))&&c.customElements.upgrade(t),jS.some(a=>a in t)},bp=t=>eI(t)||!!jf(t).length,w1=t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},C1={[l.MEDIA_SUBTITLES_LIST]:_l,[l.MEDIA_SUBTITLES_SHOWING]:_l,[l.MEDIA_SEEKABLE]:w1,[l.MEDIA_BUFFERED]:t=>t?.map(w1).join(" "),[l.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[l.MEDIA_RENDITION_LIST]:eS,[l.MEDIA_AUDIO_TRACK_LIST]:nS},tI=async(t,e,i)=>{var a,n;if(t.isConnected||await Mf(0),typeof i=="boolean"||i==null)return F(t,e,i);if(typeof i=="number")return ge(t,e,i);if(typeof i=="string")return le(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const r=(n=(a=C1[e])==null?void 0:a.call(C1,i))!=null?n:i;return t.setAttribute(e,r)},iI=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},tn=(t,e)=>{if(iI(t))return;const i=(n,r)=>{var s,o;bp(n)&&r(n);const{children:d=[]}=n??{},h=(o=(s=n?.shadowRoot)==null?void 0:s.children)!=null?o:[];[...d,...h].forEach(g=>tn(g,r))},a=t?.nodeName.toLowerCase();if(a.includes("-")&&!bp(t)){c.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},R1=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const n=jf(a),r=e.toLowerCase();n.includes(r)&&tI(a,r,i)})},aI=(t,e,i)=>{tn(t,e);const a=b=>{var g;const v=(g=b?.composedPath()[0])!=null?g:b.target;e(v)},n=b=>{var g;const v=(g=b?.composedPath()[0])!=null?g:b.target;i(v)};t.addEventListener(S.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(S.UNREGISTER_MEDIA_STATE_RECEIVER,n);const r=b=>{b.forEach(g=>{const{addedNodes:v=[],removedNodes:E=[],type:T,target:f,attributeName:y}=g;T==="childList"?(Array.prototype.forEach.call(v,I=>tn(I,e)),Array.prototype.forEach.call(E,I=>tn(I,i))):T==="attributes"&&y===Q.MEDIA_CHROME_ATTRIBUTES&&(bp(f)?e(f):i(f))})};let s=[];const o=b=>{const g=b.target;g.name!=="media"&&(s.forEach(v=>tn(v,i)),s=[...g.assignedElements({flatten:!0})],s.forEach(v=>tn(v,e)))};t.addEventListener("slotchange",o);const d=new MutationObserver(r);return d.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{tn(t,i),t.removeEventListener("slotchange",o),d.disconnect(),t.removeEventListener(S.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(S.UNREGISTER_MEDIA_STATE_RECEIVER,n)}};c.customElements.get("media-controller")||c.customElements.define("media-controller",Jf);var nI=Jf;const Un={PLACEMENT:"placement",BOUNDS:"bounds"};function rI(t){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}class gh extends c.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Pf(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),n=(e=vs(this,"#"+this.bounds))!=null?e:nt(this);if(!n)return;const{x:r,width:s}=n.getBoundingClientRect(),{x:o,width:d}=this.getBoundingClientRect(),h=o+d,b=r+s,g=a.getPropertyValue("--media-tooltip-offset-x"),v=g?parseFloat(g.replace("px","")):0,E=a.getPropertyValue("--media-tooltip-container-margin"),T=E?parseFloat(E.replace("px","")):0,f=o-r+v-T,y=h-b+v+T;if(f<0){this.style.setProperty("--media-tooltip-offset-x",`${f}px`);return}if(y>0){this.style.setProperty("--media-tooltip-offset-x",`${y}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Un.PLACEMENT,Un.BOUNDS]}get placement(){return ce(this,Un.PLACEMENT)}set placement(e){le(this,Un.PLACEMENT,e)}get bounds(){return ce(this,Un.BOUNDS)}set bounds(e){le(this,Un.BOUNDS,e)}}gh.shadowRootOptions={mode:"open"};gh.getTemplateHTML=rI;c.customElements.get("media-tooltip")||c.customElements.define("media-tooltip",gh);var D1=gh,IE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ke=(t,e,i)=>(IE(t,e,"read from private field"),i?i.call(t):e.get(t)),Hn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xl=(t,e,i,a)=>(IE(t,e,"write to private field"),e.set(t,i),i),sI=(t,e,i)=>(IE(t,e,"access private method"),i),bi,Or,Ca,ur,hu,gp,e_;const oa={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function oI(t,e={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${D1.shadowRootOptions.mode}">
          ${D1.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}function lI(t,e){return`
    <slot></slot>
  `}function dI(){return""}class Ue extends c.HTMLElement{constructor(){if(super(),Hn(this,gp),Hn(this,bi,void 0),this.preventClick=!1,this.tooltipEl=null,Hn(this,Or,e=>{this.preventClick||this.handleClick(e),setTimeout(ke(this,Ca),0)}),Hn(this,Ca,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),Hn(this,ur,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",ke(this,ur));return}this.preventClick||this.handleClick(e)}),Hn(this,hu,e=>{const{metaKey:i,altKey:a,key:n}=e;if(i||a||!this.keysUsed.includes(n)){this.removeEventListener("keyup",ke(this,ur));return}this.addEventListener("keyup",ke(this,ur),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",oa.TOOLTIP_PLACEMENT,Q.MEDIA_CONTROLLER,l.MEDIA_LANG]}enable(){this.addEventListener("click",ke(this,Or)),this.addEventListener("keydown",ke(this,hu)),this.tabIndex=0}disable(){this.removeEventListener("click",ke(this,Or)),this.removeEventListener("keydown",ke(this,hu)),this.removeEventListener("keyup",ke(this,ur)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===Q.MEDIA_CONTROLLER?(i&&((r=(n=ke(this,bi))==null?void 0:n.unassociateElement)==null||r.call(n,this),Xl(this,bi,null)),a&&this.isConnected&&(Xl(this,bi,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=ke(this,bi))==null?void 0:o.associateElement)==null||d.call(o,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===oa.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===l.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),ke(this,Ca).call(this)}connectedCallback(){var e,i,a;const{style:n}=we(this.shadowRoot,":host");n.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(Xl(this,bi,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ke(this,bi))==null?void 0:i.associateElement)==null||a.call(i,this)),c.customElements.whenDefined("media-tooltip").then(()=>sI(this,gp,e_).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=ke(this,bi))==null?void 0:e.unassociateElement)==null||i.call(e,this),Xl(this,bi,null),this.removeEventListener("mouseenter",ke(this,Ca)),this.removeEventListener("focus",ke(this,Ca)),this.removeEventListener("click",ke(this,Or))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return ce(this,oa.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){le(this,oa.TOOLTIP_PLACEMENT,e)}get mediaController(){return ce(this,Q.MEDIA_CONTROLLER)}set mediaController(e){le(this,Q.MEDIA_CONTROLLER,e)}get disabled(){return W(this,oa.DISABLED)}set disabled(e){F(this,oa.DISABLED,e)}get noTooltip(){return W(this,oa.NO_TOOLTIP)}set noTooltip(e){F(this,oa.NO_TOOLTIP,e)}handleClick(e){}}bi=new WeakMap;Or=new WeakMap;Ca=new WeakMap;ur=new WeakMap;hu=new WeakMap;gp=new WeakSet;e_=function(){this.addEventListener("mouseenter",ke(this,Ca)),this.addEventListener("focus",ke(this,Ca)),this.addEventListener("click",ke(this,Or));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};Ue.shadowRootOptions={mode:"open"};Ue.getTemplateHTML=oI;Ue.getSlotTemplateHTML=lI;Ue.getTooltipContentHTML=dI;c.customElements.get("media-chrome-button")||c.customElements.define("media-chrome-button",Ue);const x1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function uI(t){return`
    <style>
      :host([${l.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${l.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${l.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${l.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${x1}</slot>
      <slot name="exit">${x1}</slot>
    </slot>
  `}function cI(){return`
    <slot name="tooltip-enter">${k("start airplay")}</slot>
    <slot name="tooltip-exit">${k("stop airplay")}</slot>
  `}const O1=t=>{const e=t.mediaIsAirplaying?k("stop airplay"):k("start airplay");t.setAttribute("aria-label",e)};class ME extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_IS_AIRPLAYING,l.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),O1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_IS_AIRPLAYING&&O1(this)}get mediaIsAirplaying(){return W(this,l.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){F(this,l.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return ce(this,l.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){le(this,l.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new c.CustomEvent(S.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}ME.getSlotTemplateHTML=uI;ME.getTooltipContentHTML=cI;c.customElements.get("media-airplay-button")||c.customElements.define("media-airplay-button",ME);const hI=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,mI=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function pI(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${hI}</slot>
      <slot name="off">${mI}</slot>
    </slot>
  `}function vI(){return`
    <slot name="tooltip-enable">${k("Enable captions")}</slot>
    <slot name="tooltip-disable">${k("Disable captions")}</slot>
  `}const $1=t=>{t.setAttribute("aria-checked",Gf(t).toString())};class LE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_SUBTITLES_LIST,l.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",k("closed captions")),$1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_SUBTITLES_SHOWING&&$1(this)}get mediaSubtitlesList(){return P1(this,l.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){N1(this,l.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return P1(this,l.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){N1(this,l.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new c.CustomEvent(S.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}LE.getSlotTemplateHTML=pI;LE.getTooltipContentHTML=vI;const P1=(t,e)=>{const i=t.getAttribute(e);return i?Eh(i):[]},N1=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=_l(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};c.customElements.get("media-captions-button")||c.customElements.define("media-captions-button",LE);const EI='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',bI='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function gI(t){return`
    <style>
      :host([${l.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${l.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${l.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${l.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${EI}</slot>
      <slot name="exit">${bI}</slot>
    </slot>
  `}function fI(){return`
    <slot name="tooltip-enter">${k("Start casting")}</slot>
    <slot name="tooltip-exit">${k("Stop casting")}</slot>
  `}const U1=t=>{const e=t.mediaIsCasting?k("stop casting"):k("start casting");t.setAttribute("aria-label",e)};class wE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_IS_CASTING,l.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),U1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_IS_CASTING&&U1(this)}get mediaIsCasting(){return W(this,l.MEDIA_IS_CASTING)}set mediaIsCasting(e){F(this,l.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return ce(this,l.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){le(this,l.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?S.MEDIA_EXIT_CAST_REQUEST:S.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new c.CustomEvent(e,{composed:!0,bubbles:!0}))}}wE.getSlotTemplateHTML=gI;wE.getTooltipContentHTML=fI;c.customElements.get("media-cast-button")||c.customElements.define("media-cast-button",wE);var CE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Sn=(t,e,i)=>(CE(t,e,"read from private field"),e.get(t)),Wi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},RE=(t,e,i,a)=>(CE(t,e,"write to private field"),e.set(t,i),i),Va=(t,e,i)=>(CE(t,e,"access private method"),i),wc,Al,Cn,mu,fp,_p,t_,Ap,i_,Tp,a_,yp,n_,kp,r_;function _I(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(t)}
  `}function AI(t){return`
    <slot id="content"></slot>
  `}const Ks={OPEN:"open",ANCHOR:"anchor"};class Es extends c.HTMLElement{constructor(){super(),Wi(this,mu),Wi(this,_p),Wi(this,Ap),Wi(this,Tp),Wi(this,yp),Wi(this,kp),Wi(this,wc,!1),Wi(this,Al,null),Wi(this,Cn,null)}static get observedAttributes(){return[Ks.OPEN,Ks.ANCHOR]}get open(){return W(this,Ks.OPEN)}set open(e){F(this,Ks.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Va(this,Tp,a_).call(this,e);break;case"focusout":Va(this,yp,n_).call(this,e);break;case"keydown":Va(this,kp,r_).call(this,e);break}}connectedCallback(){Va(this,mu,fp).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){Va(this,mu,fp).call(this),e===Ks.OPEN&&a!==i&&(this.open?Va(this,_p,t_).call(this):Va(this,Ap,i_).call(this))}focus(){RE(this,Al,gE());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}}wc=new WeakMap;Al=new WeakMap;Cn=new WeakMap;mu=new WeakSet;fp=function(){if(!Sn(this,wc)&&(RE(this,wc,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=we(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};_p=new WeakSet;t_=function(){var t;(t=Sn(this,Cn))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Ap=new WeakSet;i_=function(){var t;(t=Sn(this,Cn))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};Tp=new WeakSet;a_=function(t){RE(this,Cn,t.relatedTarget),ia(this,t.relatedTarget)||(this.open=!this.open)};yp=new WeakSet;n_=function(t){var e;ia(this,t.relatedTarget)||((e=Sn(this,Al))==null||e.focus(),Sn(this,Cn)&&Sn(this,Cn)!==t.relatedTarget&&this.open&&(this.open=!1))};kp=new WeakSet;r_=function(t){var e,i,a,n,r;const{key:s,ctrlKey:o,altKey:d,metaKey:h}=t;o||d||h||this.keysUsed.includes(s)&&(t.preventDefault(),t.stopPropagation(),s==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(n=(a=this.nextElementSibling)==null?void 0:a.focus)==null||n.call(a),this.blur()):s==="Escape"&&((r=Sn(this,Al))==null||r.focus(),this.open=!1))};Es.shadowRootOptions={mode:"open"};Es.getTemplateHTML=_I;Es.getSlotTemplateHTML=AI;c.customElements.get("media-chrome-dialog")||c.customElements.define("media-chrome-dialog",Es);var DE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ve=(t,e,i)=>(DE(t,e,"read from private field"),i?i.call(t):e.get(t)),Ve=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ba=(t,e,i,a)=>(DE(t,e,"write to private field"),e.set(t,i),i),Ut=(t,e,i)=>(DE(t,e,"access private method"),i),gi,fh,pu,vu,Bt,Cc,Eu,bu,gu,xE,s_,fu,Sp,_u,Ip,Rc,OE,Mp,o_,Lp,l_,wp,d_,Cp,u_;function TI(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(t)}
    </div>
    <div id="rightgap"></div>
  `}function yI(t){return""}class bs extends c.HTMLElement{constructor(){if(super(),Ve(this,xE),Ve(this,fu),Ve(this,_u),Ve(this,Rc),Ve(this,Mp),Ve(this,Lp),Ve(this,wp),Ve(this,Cp),Ve(this,gi,void 0),Ve(this,fh,void 0),Ve(this,pu,void 0),Ve(this,vu,void 0),Ve(this,Bt,{}),Ve(this,Cc,[]),Ve(this,Eu,()=>{if(this.range.matches(":focus-visible")){const{style:e}=we(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),Ve(this,bu,()=>{const{style:e}=we(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),Ve(this,gu,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),ba(this,pu,this.shadowRoot.querySelector("#startpoint")),ba(this,vu,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===Q.MEDIA_CONTROLLER?(i&&((r=(n=ve(this,gi))==null?void 0:n.unassociateElement)==null||r.call(n,this),ba(this,gi,null)),a&&this.isConnected&&(ba(this,gi,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=ve(this,gi))==null?void 0:o.associateElement)==null||d.call(o,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Ut(this,fu,Sp).call(this)):(this.range.setAttribute(e,a),Ut(this,_u,Ip).call(this)))}connectedCallback(){var e,i,a;const{style:n}=we(this.shadowRoot,":host");n.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),ve(this,Bt).pointer=we(this.shadowRoot,"#pointer"),ve(this,Bt).progress=we(this.shadowRoot,"#progress"),ve(this,Bt).thumb=we(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),ve(this,Bt).activeSegment=we(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(ba(this,gi,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ve(this,gi))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",ve(this,Eu)),this.shadowRoot.addEventListener("focusout",ve(this,bu)),Ut(this,fu,Sp).call(this),rs(this.container,ve(this,gu))}disconnectedCallback(){var e,i;Ut(this,_u,Ip).call(this),(i=(e=ve(this,gi))==null?void 0:e.unassociateElement)==null||i.call(e,this),ba(this,gi,null),this.shadowRoot.removeEventListener("focusin",ve(this,Eu)),this.shadowRoot.removeEventListener("focusout",ve(this,bu)),ss(this.container,ve(this,gu))}updatePointerBar(e){var i;(i=ve(this,Bt).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=ve(this,Bt).progress)==null||e.style.setProperty("width",`${a}%`),(i=ve(this,Bt).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(r=>[r.start,r.end]),+this.range.max])];ba(this,Cc,[...a]);const n=a.pop();for(const[r,s]of a.entries()){const[o,d]=[r===0,r===a.length-1],h=o?"calc(var(--segments-gap) / -1)":`${s*100}%`,g=`calc(${((d?n:a[r+1])-s)*100}%${o||d?"":" - var(--segments-gap)"})`,v=Ie.createElementNS("http://www.w3.org/2000/svg","rect"),E=fE(this.shadowRoot,`#segments-clipping rect:nth-child(${r+1})`);E.style.setProperty("x",h),E.style.setProperty("width",g),i.append(v)}}getPointerRatio(e){return vS(e.clientX,e.clientY,ve(this,pu).getBoundingClientRect(),ve(this,vu).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Ut(this,Cp,u_).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Ut(this,Mp,o_).call(this,e);break;case"pointerdown":Ut(this,Rc,OE).call(this,e);break;case"pointerup":Ut(this,Lp,l_).call(this);break;case"pointerleave":Ut(this,wp,d_).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}gi=new WeakMap;fh=new WeakMap;pu=new WeakMap;vu=new WeakMap;Bt=new WeakMap;Cc=new WeakMap;Eu=new WeakMap;bu=new WeakMap;gu=new WeakMap;xE=new WeakSet;s_=function(t){const e=ve(this,Bt).activeSegment;if(!e)return;const i=this.getPointerRatio(t),n=`#segments-clipping rect:nth-child(${ve(this,Cc).findIndex((r,s,o)=>{const d=o[s+1];return d!=null&&i>=r&&i<=d})+1})`;(e.selectorText!=n||!e.style.transform)&&(e.selectorText=n,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};fu=new WeakSet;Sp=function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};_u=new WeakSet;Ip=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=c.window)==null||t.removeEventListener("pointerup",this),(e=c.window)==null||e.removeEventListener("pointermove",this)};Rc=new WeakSet;OE=function(t){var e;ba(this,fh,t.composedPath().includes(this.range)),(e=c.window)==null||e.addEventListener("pointerup",this,{once:!0})};Mp=new WeakSet;o_=function(t){var e;t.pointerType!=="mouse"&&Ut(this,Rc,OE).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=c.window)==null||e.addEventListener("pointermove",this)};Lp=new WeakSet;l_=function(){var t;(t=c.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};wp=new WeakSet;d_=function(){var t,e;this.removeEventListener("pointerleave",this),(t=c.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=ve(this,Bt).activeSegment)==null||e.style.removeProperty("transform")};Cp=new WeakSet;u_=function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Ut(this,xE,s_).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!ve(this,fh))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))};bs.shadowRootOptions={mode:"open"};bs.getTemplateHTML=TI;bs.getContainerTemplateHTML=yI;c.customElements.get("media-chrome-range")||c.customElements.define("media-chrome-range",bs);var c_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Jl=(t,e,i)=>(c_(t,e,"read from private field"),i?i.call(t):e.get(t)),kI=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},jl=(t,e,i,a)=>(c_(t,e,"write to private field"),e.set(t,i),i),fi;function SI(t){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}class $E extends c.HTMLElement{constructor(){if(super(),kI(this,fi,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===Q.MEDIA_CONTROLLER&&(i&&((r=(n=Jl(this,fi))==null?void 0:n.unassociateElement)==null||r.call(n,this),jl(this,fi,null)),a&&this.isConnected&&(jl(this,fi,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=Jl(this,fi))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a;const n=this.getAttribute(Q.MEDIA_CONTROLLER);n&&(jl(this,fi,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=Jl(this,fi))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Jl(this,fi))==null?void 0:e.unassociateElement)==null||i.call(e,this),jl(this,fi,null)}}fi=new WeakMap;$E.shadowRootOptions={mode:"open"};$E.getTemplateHTML=SI;c.customElements.get("media-control-bar")||c.customElements.define("media-control-bar",$E);var h_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ed=(t,e,i)=>(h_(t,e,"read from private field"),i?i.call(t):e.get(t)),II=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},td=(t,e,i,a)=>(h_(t,e,"write to private field"),e.set(t,i),i),_i;function MI(t,e={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}function LI(t,e){return`
    <slot></slot>
  `}class Na extends c.HTMLElement{constructor(){if(super(),II(this,_i,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===Q.MEDIA_CONTROLLER&&(i&&((r=(n=ed(this,_i))==null?void 0:n.unassociateElement)==null||r.call(n,this),td(this,_i,null)),a&&this.isConnected&&(td(this,_i,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=ed(this,_i))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a;const{style:n}=we(this.shadowRoot,":host");n.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(td(this,_i,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ed(this,_i))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=ed(this,_i))==null?void 0:e.unassociateElement)==null||i.call(e,this),td(this,_i,null)}}_i=new WeakMap;Na.shadowRootOptions={mode:"open"};Na.getTemplateHTML=MI;Na.getSlotTemplateHTML=LI;c.customElements.get("media-text-display")||c.customElements.define("media-text-display",Na);var m_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},H1=(t,e,i)=>(m_(t,e,"read from private field"),i?i.call(t):e.get(t)),wI=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},CI=(t,e,i,a)=>(m_(t,e,"write to private field"),e.set(t,i),i),ko;function RI(t,e){return`
    <slot>${Oa(e.mediaDuration)}</slot>
  `}class p_ extends Na{constructor(){var e;super(),wI(this,ko,void 0),CI(this,ko,this.shadowRoot.querySelector("slot")),H1(this,ko).textContent=Oa((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===l.MEDIA_DURATION&&(H1(this,ko).textContent=Oa(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return re(this,l.MEDIA_DURATION)}set mediaDuration(e){ge(this,l.MEDIA_DURATION,e)}}ko=new WeakMap;p_.getSlotTemplateHTML=RI;c.customElements.get("media-duration-display")||c.customElements.define("media-duration-display",p_);const DI={2:k("Network Error"),3:k("Decode Error"),4:k("Source Not Supported"),5:k("Encryption Error")},xI={2:k("A network error caused the media download to fail."),3:k("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:k("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:k("The media is encrypted and there are no keys to decrypt it.")},PE=t=>{var e,i;return t.code===1?null:{title:(e=DI[t.code])!=null?e:`Error ${t.code}`,message:(i=xI[t.code])!=null?i:t.message}};var v_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},OI=(t,e,i)=>(v_(t,e,"read from private field"),i?i.call(t):e.get(t)),$I=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},PI=(t,e,i,a)=>(v_(t,e,"write to private field"),e.set(t,i),i),Au;function NI(t){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${E_({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function UI(t){return t.code&&PE(t)!==null}function E_(t){var e;const{title:i,message:a}=(e=PE(t))!=null?e:{};let n="";return i&&(n+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(n+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),n}const B1=[l.MEDIA_ERROR_CODE,l.MEDIA_ERROR_MESSAGE];class _h extends Es{constructor(){super(...arguments),$I(this,Au,null)}static get observedAttributes(){return[...super.observedAttributes,...B1]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var n;if(super.attributeChangedCallback(e,i,a),!B1.includes(e))return;const r=(n=this.mediaError)!=null?n:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=UI(r),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(r),!this.hasAttribute("aria-label"))){const{title:s}=PE(r);s&&this.setAttribute("aria-label",s)}}get mediaError(){return OI(this,Au)}set mediaError(e){PI(this,Au,e)}get mediaErrorCode(){return re(this,"mediaerrorcode")}set mediaErrorCode(e){ge(this,"mediaerrorcode",e)}get mediaErrorMessage(){return ce(this,"mediaerrormessage")}set mediaErrorMessage(e){le(this,"mediaerrormessage",e)}}Au=new WeakMap;_h.getSlotTemplateHTML=NI;_h.formatErrorMessage=E_;c.customElements.get("media-error-dialog")||c.customElements.define("media-error-dialog",_h);var b_=_h,HI=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},la=(t,e,i)=>(HI(t,e,"read from private field"),i?i.call(t):e.get(t)),W1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},cr,hr;function BI(t){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${WI()}
    </slot>
  `}function WI(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((r,s)=>s>0?`<span class="key-separator">or</span><span class="key">${r}</span>`:`<span class="key">${r}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}class g_ extends Es{constructor(){super(...arguments),W1(this,cr,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const n=e.composedPath(),r=n[0]===this||n.includes(this),s=n.includes(a);r&&!s&&(this.open=!1)}),W1(this,hr,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",la(this,cr)),document.addEventListener("keydown",la(this,hr)))}disconnectedCallback(){this.removeEventListener("click",la(this,cr)),document.removeEventListener("keydown",la(this,hr))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",la(this,cr)),document.addEventListener("keydown",la(this,hr))):(this.removeEventListener("click",la(this,cr)),document.removeEventListener("keydown",la(this,hr))))}}cr=new WeakMap;hr=new WeakMap;g_.getSlotTemplateHTML=BI;c.customElements.get("media-keyboard-shortcuts-dialog")||c.customElements.define("media-keyboard-shortcuts-dialog",g_);var f_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},FI=(t,e,i)=>(f_(t,e,"read from private field"),e.get(t)),VI=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},KI=(t,e,i,a)=>(f_(t,e,"write to private field"),e.set(t,i),i),Tu;const GI=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,YI=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function qI(t){return`
    <style>
      :host([${l.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${l.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${l.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${l.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${GI}</slot>
      <slot name="exit">${YI}</slot>
    </slot>
  `}function ZI(){return`
    <slot name="tooltip-enter">${k("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${k("Exit fullscreen mode")}</slot>
  `}const F1=t=>{const e=t.mediaIsFullscreen?k("exit fullscreen mode"):k("enter fullscreen mode");t.setAttribute("aria-label",e)};class NE extends Ue{constructor(){super(...arguments),VI(this,Tu,null)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_IS_FULLSCREEN,l.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),F1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_IS_FULLSCREEN&&F1(this)}get mediaFullscreenUnavailable(){return ce(this,l.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){le(this,l.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return W(this,l.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){F(this,l.MEDIA_IS_FULLSCREEN,e)}handleClick(e){KI(this,Tu,e);const i=FI(this,Tu)instanceof PointerEvent,a=this.mediaIsFullscreen?new c.CustomEvent(S.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new c.CustomEvent(S.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}}Tu=new WeakMap;NE.getSlotTemplateHTML=qI;NE.getTooltipContentHTML=ZI;c.customElements.get("media-fullscreen-button")||c.customElements.define("media-fullscreen-button",NE);const{MEDIA_TIME_IS_LIVE:yu,MEDIA_PAUSED:qo}=l,{MEDIA_SEEK_TO_LIVE_REQUEST:zI,MEDIA_PLAY_REQUEST:QI}=S,XI='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function JI(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${yu}]:not([${qo}])) slot[name=indicator] > *,
      :host([${yu}]:not([${qo}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${yu}]:not([${qo}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${XI}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${k("live")}</slot>
  `}const V1=t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=k(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const n=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');n&&(n.textContent=k("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")};class __ extends Ue{static get observedAttributes(){return[...super.observedAttributes,yu,qo]}connectedCallback(){super.connectedCallback(),V1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),V1(this)}get mediaPaused(){return W(this,l.MEDIA_PAUSED)}set mediaPaused(e){F(this,l.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return W(this,l.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){F(this,l.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new c.CustomEvent(zI,{composed:!0,bubbles:!0})),this.hasAttribute(qo)&&this.dispatchEvent(new c.CustomEvent(QI,{composed:!0,bubbles:!0})))}}__.getSlotTemplateHTML=JI;c.customElements.get("media-live-button")||c.customElements.define("media-live-button",__);var A_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Gs=(t,e,i)=>(A_(t,e,"read from private field"),i?i.call(t):e.get(t)),K1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ys=(t,e,i,a)=>(A_(t,e,"write to private field"),e.set(t,i),i),Ai,ku;const id={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},T_=500,jI=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function eM(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${T_}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${l.MEDIA_LOADING}]:not([${l.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${l.MEDIA_LOADING}]:not([${l.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${l.MEDIA_LOADING}]:not([${l.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${jI}</slot>
    <div id="status" role="status" aria-live="polite">${k("media loading")}</div>
  `}class UE extends c.HTMLElement{constructor(){if(super(),K1(this,Ai,void 0),K1(this,ku,T_),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,l.MEDIA_PAUSED,l.MEDIA_LOADING,id.LOADING_DELAY]}attributeChangedCallback(e,i,a){var n,r,s,o,d;e===id.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===Q.MEDIA_CONTROLLER&&(i&&((r=(n=Gs(this,Ai))==null?void 0:n.unassociateElement)==null||r.call(n,this),Ys(this,Ai,null)),a&&this.isConnected&&(Ys(this,Ai,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=Gs(this,Ai))==null?void 0:o.associateElement)==null||d.call(o,this)))}connectedCallback(){var e,i,a;const n=this.getAttribute(Q.MEDIA_CONTROLLER);n&&(Ys(this,Ai,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=Gs(this,Ai))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Gs(this,Ai))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ys(this,Ai,null)}get loadingDelay(){return Gs(this,ku)}set loadingDelay(e){Ys(this,ku,e);const{style:i}=we(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return W(this,l.MEDIA_PAUSED)}set mediaPaused(e){F(this,l.MEDIA_PAUSED,e)}get mediaLoading(){return W(this,l.MEDIA_LOADING)}set mediaLoading(e){F(this,l.MEDIA_LOADING,e)}get mediaController(){return ce(this,Q.MEDIA_CONTROLLER)}set mediaController(e){le(this,Q.MEDIA_CONTROLLER,e)}get noAutohide(){return W(this,id.NO_AUTOHIDE)}set noAutohide(e){F(this,id.NO_AUTOHIDE,e)}}Ai=new WeakMap;ku=new WeakMap;UE.shadowRootOptions={mode:"open"};UE.getTemplateHTML=eM;c.customElements.get("media-loading-indicator")||c.customElements.define("media-loading-indicator",UE);const tM=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,G1=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,iM=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function aM(t){return`
    <style>
      :host(:not([${l.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${l.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${l.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${l.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${l.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${l.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${l.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${tM}</slot>
      <slot name="low">${G1}</slot>
      <slot name="medium">${G1}</slot>
      <slot name="high">${iM}</slot>
    </slot>
  `}function nM(){return`
    <slot name="tooltip-mute">${k("Mute")}</slot>
    <slot name="tooltip-unmute">${k("Unmute")}</slot>
  `}const Y1=t=>{const e=t.mediaVolumeLevel==="off",i=k(e?"unmute":"mute");t.setAttribute("aria-label",i)};class HE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),Y1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_VOLUME_LEVEL&&Y1(this)}get mediaVolumeLevel(){return ce(this,l.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){le(this,l.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?S.MEDIA_UNMUTE_REQUEST:S.MEDIA_MUTE_REQUEST;this.dispatchEvent(new c.CustomEvent(e,{composed:!0,bubbles:!0}))}}HE.getSlotTemplateHTML=aM;HE.getTooltipContentHTML=nM;c.customElements.get("media-mute-button")||c.customElements.define("media-mute-button",HE);const q1=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function rM(t){return`
    <style>
      :host([${l.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${l.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${l.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${l.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${q1}</slot>
      <slot name="exit">${q1}</slot>
    </slot>
  `}function sM(){return`
    <slot name="tooltip-enter">${k("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${k("Exit picture in picture mode")}</slot>
  `}const Z1=t=>{const e=t.mediaIsPip?k("exit picture in picture mode"):k("enter picture in picture mode");t.setAttribute("aria-label",e)};class BE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_IS_PIP,l.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Z1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_IS_PIP&&Z1(this)}get mediaPipUnavailable(){return ce(this,l.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){le(this,l.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return W(this,l.MEDIA_IS_PIP)}set mediaIsPip(e){F(this,l.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?S.MEDIA_EXIT_PIP_REQUEST:S.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new c.CustomEvent(e,{composed:!0,bubbles:!0}))}}BE.getSlotTemplateHTML=rM;BE.getTooltipContentHTML=sM;c.customElements.get("media-pip-button")||c.customElements.define("media-pip-button",BE);var oM=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Bn=(t,e,i)=>(oM(t,e,"read from private field"),i?i.call(t):e.get(t)),lM=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ga;const Xh={RATES:"rates"},y_=[1,1.2,1.5,1.7,2],$r=1;function dM(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||$r}x</slot>
  `}function uM(){return k("Playback rate")}class WE extends Ue{constructor(){var e;super(),lM(this,ga,new TE(this,Xh.RATES,{defaultValue:y_})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:$r}x`}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PLAYBACK_RATE,Xh.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Xh.RATES&&(Bn(this,ga).value=a),e===l.MEDIA_PLAYBACK_RATE){const n=a?+a:Number.NaN,r=Number.isNaN(n)?$r:n;this.container.innerHTML=`${r}x`,this.setAttribute("aria-label",k("Playback rate {playbackRate}",{playbackRate:r}))}}get rates(){return Bn(this,ga)}set rates(e){e?Array.isArray(e)?Bn(this,ga).value=e.join(" "):typeof e=="string"&&(Bn(this,ga).value=e):Bn(this,ga).value=""}get mediaPlaybackRate(){return re(this,l.MEDIA_PLAYBACK_RATE,$r)}set mediaPlaybackRate(e){ge(this,l.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(Bn(this,ga).values(),s=>+s).sort((s,o)=>s-o),n=(i=(e=a.find(s=>s>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:$r,r=new c.CustomEvent(S.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:n});this.dispatchEvent(r)}}ga=new WeakMap;WE.getSlotTemplateHTML=dM;WE.getTooltipContentHTML=uM;c.customElements.get("media-playback-rate-button")||c.customElements.define("media-playback-rate-button",WE);const cM=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,hM=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function mM(t){return`
    <style>
      :host([${l.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${l.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${l.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${l.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${cM}</slot>
      <slot name="pause">${hM}</slot>
    </slot>
  `}function pM(){return`
    <slot name="tooltip-play">${k("Play")}</slot>
    <slot name="tooltip-pause">${k("Pause")}</slot>
  `}const z1=t=>{const e=t.mediaPaused?k("play"):k("pause");t.setAttribute("aria-label",e)};class FE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PAUSED,l.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),z1(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===l.MEDIA_PAUSED||e===l.MEDIA_LANG)&&z1(this)}get mediaPaused(){return W(this,l.MEDIA_PAUSED)}set mediaPaused(e){F(this,l.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?S.MEDIA_PLAY_REQUEST:S.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new c.CustomEvent(e,{composed:!0,bubbles:!0}))}}FE.getSlotTemplateHTML=mM;FE.getTooltipContentHTML=pM;c.customElements.get("media-play-button")||c.customElements.define("media-play-button",FE);const ii={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function vM(t){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}const EM=t=>{t.style.removeProperty("background-image")},bM=(t,e)=>{t.style["background-image"]=`url('${e}')`};class VE extends c.HTMLElement{static get observedAttributes(){return[ii.PLACEHOLDER_SRC,ii.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===ii.SRC&&(a==null?this.image.removeAttribute(ii.SRC):this.image.setAttribute(ii.SRC,a)),e===ii.PLACEHOLDER_SRC&&(a==null?EM(this.image):bM(this.image,a))}get placeholderSrc(){return ce(this,ii.PLACEHOLDER_SRC)}set placeholderSrc(e){le(this,ii.SRC,e)}get src(){return ce(this,ii.SRC)}set src(e){le(this,ii.SRC,e)}}VE.shadowRootOptions={mode:"open"};VE.getTemplateHTML=vM;c.customElements.get("media-poster-image")||c.customElements.define("media-poster-image",VE);var k_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},gM=(t,e,i)=>(k_(t,e,"read from private field"),i?i.call(t):e.get(t)),fM=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_M=(t,e,i,a)=>(k_(t,e,"write to private field"),e.set(t,i),i),Su;class AM extends Na{constructor(){super(),fM(this,Su,void 0),_M(this,Su,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PREVIEW_CHAPTER,l.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===l.MEDIA_PREVIEW_CHAPTER||e===l.MEDIA_LANG)&&a!==i&&a!=null)if(gM(this,Su).textContent=a,a!==""){const n=k("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",n)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return ce(this,l.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){le(this,l.MEDIA_PREVIEW_CHAPTER,e)}}Su=new WeakMap;c.customElements.get("media-preview-chapter-display")||c.customElements.define("media-preview-chapter-display",AM);var S_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ad=(t,e,i)=>(S_(t,e,"read from private field"),i?i.call(t):e.get(t)),TM=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},nd=(t,e,i,a)=>(S_(t,e,"write to private field"),e.set(t,i),i),Ti;function yM(t){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}class Ah extends c.HTMLElement{constructor(){if(super(),TM(this,Ti,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,l.MEDIA_PREVIEW_IMAGE,l.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const n=this.getAttribute(Q.MEDIA_CONTROLLER);n&&(nd(this,Ti,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=ad(this,Ti))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=ad(this,Ti))==null?void 0:e.unassociateElement)==null||i.call(e,this),nd(this,Ti,null)}attributeChangedCallback(e,i,a){var n,r,s,o,d;[l.MEDIA_PREVIEW_IMAGE,l.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===Q.MEDIA_CONTROLLER&&(i&&((r=(n=ad(this,Ti))==null?void 0:n.unassociateElement)==null||r.call(n,this),nd(this,Ti,null)),a&&this.isConnected&&(nd(this,Ti,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(d=(o=ad(this,Ti))==null?void 0:o.associateElement)==null||d.call(o,this)))}get mediaPreviewImage(){return ce(this,l.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){le(this,l.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(l.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(l.MEDIA_PREVIEW_COORDS);return}this.setAttribute(l.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,n,r,s]=e,o=i.split("#")[0],d=getComputedStyle(this),{maxWidth:h,maxHeight:b,minWidth:g,minHeight:v}=d,E=d.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let T,f;if(E==="fill"){const He=parseInt(h)/r,Be=parseInt(b)/s,rt=parseInt(g)/r,Xe=parseInt(v)/s;T=He<1?He:Math.max(He,rt),f=Be<1?Be:Math.max(Be,Xe)}else{const He=Math.min(parseInt(h)/r,parseInt(b)/s),Be=Math.max(parseInt(g)/r,parseInt(v)/s),Xe=He<1?He:Be>1?Be:1;T=Xe,f=Xe}const{style:y}=we(this.shadowRoot,":host"),I=we(this.shadowRoot,"img").style,V=this.shadowRoot.querySelector("img"),qe=Math.min(T,f)<1?"min":"max";y.setProperty(`${qe}-width`,"initial","important"),y.setProperty(`${qe}-height`,"initial","important"),y.width=`${r*T}px`,y.height=`${s*f}px`;const Re=()=>{I.width=`${this.imgWidth*T}px`,I.height=`${this.imgHeight*f}px`,I.display="block"};V.src!==o&&(V.onload=()=>{this.imgWidth=V.naturalWidth,this.imgHeight=V.naturalHeight,Re(),V.onload=null},V.src=o,Re()),Re(),I.transform=`translate(-${a*T}px, -${n*f}px)`}}Ti=new WeakMap;Ah.shadowRootOptions={mode:"open"};Ah.getTemplateHTML=yM;c.customElements.get("media-preview-thumbnail")||c.customElements.define("media-preview-thumbnail",Ah);var Q1=Ah,I_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},X1=(t,e,i)=>(I_(t,e,"read from private field"),i?i.call(t):e.get(t)),kM=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},SM=(t,e,i,a)=>(I_(t,e,"write to private field"),e.set(t,i),i),So;class IM extends Na{constructor(){super(),kM(this,So,void 0),SM(this,So,this.shadowRoot.querySelector("slot")),X1(this,So).textContent=Oa(0)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_PREVIEW_TIME&&a!=null&&(X1(this,So).textContent=Oa(parseFloat(a)))}get mediaPreviewTime(){return re(this,l.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ge(this,l.MEDIA_PREVIEW_TIME,e)}}So=new WeakMap;c.customElements.get("media-preview-time-display")||c.customElements.define("media-preview-time-display",IM);const Wn={SEEK_OFFSET:"seekoffset"},Jh=30,MM=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function LM(t,e){return`
    <slot name="icon">${MM(e.seekOffset)}</slot>
  `}const wM=(t,e)=>{t.setAttribute("aria-label",k("seek back {seekOffset} seconds",{seekOffset:e}))};function CM(){return k("Seek backward")}const RM=0;class KE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_CURRENT_TIME,Wn.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=re(this,Wn.SEEK_OFFSET,Jh)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),wM(this,this.seekOffset),e===Wn.SEEK_OFFSET&&(this.seekOffset=re(this,Wn.SEEK_OFFSET,Jh))}get seekOffset(){return re(this,Wn.SEEK_OFFSET,Jh)}set seekOffset(e){ge(this,Wn.SEEK_OFFSET,e),this.setAttribute("aria-label",k("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Of($f(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return re(this,l.MEDIA_CURRENT_TIME,RM)}set mediaCurrentTime(e){ge(this,l.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new c.CustomEvent(S.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}KE.getSlotTemplateHTML=LM;KE.getTooltipContentHTML=CM;c.customElements.get("media-seek-backward-button")||c.customElements.define("media-seek-backward-button",KE);const Fn={SEEK_OFFSET:"seekoffset"},jh=30,DM=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function xM(t,e){return`
    <slot name="icon">${DM(e.seekOffset)}</slot>
  `}const OM=(t,e)=>{t.setAttribute("aria-label",k("seek forward {seekOffset} seconds",{seekOffset:e}))};function $M(){return k("Seek forward")}const PM=0;class GE extends Ue{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_CURRENT_TIME,Fn.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=re(this,Fn.SEEK_OFFSET,jh)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),OM(this,this.seekOffset),e===Fn.SEEK_OFFSET&&(this.seekOffset=re(this,Fn.SEEK_OFFSET,jh))}get seekOffset(){return re(this,Fn.SEEK_OFFSET,jh)}set seekOffset(e){ge(this,Fn.SEEK_OFFSET,e),this.setAttribute("aria-label",k("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Of($f(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return re(this,l.MEDIA_CURRENT_TIME,PM)}set mediaCurrentTime(e){ge(this,l.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new c.CustomEvent(S.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}GE.getSlotTemplateHTML=xM;GE.getTooltipContentHTML=$M;c.customElements.get("media-seek-forward-button")||c.customElements.define("media-seek-forward-button",GE);var YE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Wt=(t,e,i)=>(YE(t,e,"read from private field"),i?i.call(t):e.get(t)),Ka=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},qE=(t,e,i,a)=>(YE(t,e,"write to private field"),e.set(t,i),i),Sa=(t,e,i)=>(YE(t,e,"access private method"),i),mr,$i,Th,ZE,M_,Dc,zE,Io,Iu,Mu,Rp;const fa={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},J1=[...Object.values(fa),l.MEDIA_CURRENT_TIME,l.MEDIA_DURATION,l.MEDIA_SEEKABLE],L_=["Enter"," "],NM="&nbsp;/&nbsp;",Dp=(t,{timesSep:e=NM}={})=>{var i,a;const n=(i=t.mediaCurrentTime)!=null?i:0,[,r]=(a=t.mediaSeekable)!=null?a:[];let s=0;Number.isFinite(t.mediaDuration)?s=t.mediaDuration:Number.isFinite(r)&&(s=r);const o=t.remaining?Oa(0-(s-n)):Oa(n);return t.showDuration?`${o}${e}${Oa(s)}`:o},UM=t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let n=null;if(Number.isFinite(t.mediaDuration)?n=t.mediaDuration:Number.isFinite(a)&&(n=a),i==null||n===null){t.setAttribute("aria-valuetext",k("video not loaded, unknown time."));return}const r=t.remaining?Go(0-(n-i)):Go(i);if(!t.showDuration){t.setAttribute("aria-valuetext",r);return}const s=Go(n),o=k("{currentTime} of {totalTime}",{currentTime:r,totalTime:s});t.setAttribute("aria-valuetext",o)};function HM(t,e){return`
    <slot>${Dp(e)}</slot>
  `}const BM=t=>{t.setAttribute("aria-label",k("playback time"))};class w_ extends Na{constructor(){super(),Ka(this,ZE),Ka(this,Dc),Ka(this,Io),Ka(this,Mu),Ka(this,mr,void 0),Ka(this,$i,null),Ka(this,Th,e=>{const{metaKey:i,altKey:a,key:n}=e;if(i||a||!L_.includes(n)){this.removeEventListener("keyup",Wt(this,$i));return}this.addEventListener("keyup",Wt(this,$i))}),qE(this,mr,this.shadowRoot.querySelector("slot")),Wt(this,mr).innerHTML=`${Dp(this)}`}static get observedAttributes(){return[...super.observedAttributes,...J1,"disabled"]}connectedCallback(){const{style:e}=we(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",k("playback time")),Sa(this,Io,Iu).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),Sa(this,Dc,zE).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){BM(this),J1.includes(e)?this.update():e==="disabled"&&a!==i?a==null?Sa(this,Io,Iu).call(this):Sa(this,Mu,Rp).call(this):e===fa.NO_TOGGLE&&a!==i&&(this.noToggle?Sa(this,Mu,Rp).call(this):Sa(this,Io,Iu).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return W(this,fa.REMAINING)}set remaining(e){F(this,fa.REMAINING,e)}get showDuration(){return W(this,fa.SHOW_DURATION)}set showDuration(e){F(this,fa.SHOW_DURATION,e)}get noToggle(){return W(this,fa.NO_TOGGLE)}set noToggle(e){F(this,fa.NO_TOGGLE,e)}get mediaDuration(){return re(this,l.MEDIA_DURATION)}set mediaDuration(e){ge(this,l.MEDIA_DURATION,e)}get mediaCurrentTime(){return re(this,l.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ge(this,l.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(l.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(l.MEDIA_SEEKABLE);return}this.setAttribute(l.MEDIA_SEEKABLE,e.join(":"))}update(){const e=Dp(this);UM(this),e!==Wt(this,mr).innerHTML&&(Wt(this,mr).innerHTML=e)}}mr=new WeakMap;$i=new WeakMap;Th=new WeakMap;ZE=new WeakSet;M_=function(){Wt(this,$i)||(qE(this,$i,t=>{const{key:e}=t;if(!L_.includes(e)){this.removeEventListener("keyup",Wt(this,$i));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",Wt(this,Th)),this.addEventListener("click",this.toggleTimeDisplay))};Dc=new WeakSet;zE=function(){Wt(this,$i)&&(this.removeEventListener("keyup",Wt(this,$i)),this.removeEventListener("keydown",Wt(this,Th)),this.removeEventListener("click",this.toggleTimeDisplay),qE(this,$i,null))};Io=new WeakSet;Iu=function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),Sa(this,ZE,M_).call(this))};Mu=new WeakSet;Rp=function(){this.removeAttribute("role"),this.disable(),Sa(this,Dc,zE).call(this)};w_.getSlotTemplateHTML=HM;c.customElements.get("media-time-display")||c.customElements.define("media-time-display",w_);var C_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$e=(t,e,i)=>(C_(t,e,"read from private field"),e.get(t)),ai=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ut=(t,e,i,a)=>(C_(t,e,"write to private field"),e.set(t,i),i),WM=(t,e,i,a)=>({set _(n){ut(t,e,n)},get _(){return $e(t,e)}}),pr,Lu,vr,Mo,wu,Cu,Ru,Er,an,Du;class FM{constructor(e,i,a){ai(this,pr,void 0),ai(this,Lu,void 0),ai(this,vr,void 0),ai(this,Mo,void 0),ai(this,wu,void 0),ai(this,Cu,void 0),ai(this,Ru,void 0),ai(this,Er,void 0),ai(this,an,0),ai(this,Du,(n=performance.now())=>{ut(this,an,requestAnimationFrame($e(this,Du))),ut(this,Mo,performance.now()-$e(this,vr));const r=1e3/this.fps;if($e(this,Mo)>r){ut(this,vr,n-$e(this,Mo)%r);const s=1e3/((n-$e(this,Lu))/++WM(this,wu)._),o=(n-$e(this,Cu))/1e3/this.duration;let d=$e(this,Ru)+o*this.playbackRate;d-$e(this,pr).valueAsNumber>0?ut(this,Er,this.playbackRate/this.duration/s):(ut(this,Er,.995*$e(this,Er)),d=$e(this,pr).valueAsNumber+$e(this,Er)),this.callback(d)}}),ut(this,pr,e),this.callback=i,this.fps=a}start(){$e(this,an)===0&&(ut(this,vr,performance.now()),ut(this,Lu,$e(this,vr)),ut(this,wu,0),$e(this,Du).call(this))}stop(){$e(this,an)!==0&&(cancelAnimationFrame($e(this,an)),ut(this,an,0))}update({start:e,duration:i,playbackRate:a}){const n=e-$e(this,pr).valueAsNumber,r=Math.abs(i-this.duration);(n>0||n<-.03||r>=.5)&&this.callback(e),ut(this,Ru,e),ut(this,Cu,performance.now()),this.duration=i,this.playbackRate=a}}pr=new WeakMap;Lu=new WeakMap;vr=new WeakMap;Mo=new WeakMap;wu=new WeakMap;Cu=new WeakMap;Ru=new WeakMap;Er=new WeakMap;an=new WeakMap;Du=new WeakMap;var QE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ue=(t,e,i)=>(QE(t,e,"read from private field"),i?i.call(t):e.get(t)),Me=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},yt=(t,e,i,a)=>(QE(t,e,"write to private field"),e.set(t,i),i),It=(t,e,i)=>(QE(t,e,"access private method"),i),br,Ia,xc,Zo,Oc,xu,Tl,yl,gr,fr,Lo,xp,R_,Op,$c,XE,Pc,JE,Nc,jE,$p,D_,kl,Uc,Pp,x_;const VM=t=>{const e=t.range,i=Go(+O_(t)),a=Go(+t.mediaSeekableEnd),n=i&&a?k("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):k("video not loaded, unknown time.");e.setAttribute("aria-valuetext",n)};function KM(t){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${l.MEDIA_PREVIEW_IMAGE}], [${l.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${l.MEDIA_PREVIEW_IMAGE}], [${l.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${l.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${l.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${l.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${l.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${l.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${l.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${l.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${l.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${l.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${l.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${l.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${l.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${Q1.shadowRootOptions.mode}">
            ${Q1.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}const rd=(t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const n=(e-i)/(a-i);return Math.max(0,Math.min(n,1))},O_=(t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i};class e0 extends bs{constructor(){super(),Me(this,xp),Me(this,$c),Me(this,Pc),Me(this,Nc),Me(this,$p),Me(this,kl),Me(this,Pp),Me(this,br,null),Me(this,Ia,void 0),Me(this,xc,void 0),Me(this,Zo,void 0),Me(this,Oc,void 0),Me(this,xu,void 0),Me(this,Tl,void 0),Me(this,yl,void 0),Me(this,gr,void 0),Me(this,fr,void 0),Me(this,Lo,()=>{It(this,xp,R_).call(this)?ue(this,Ia).start():ue(this,Ia).stop()}),Me(this,Op,a=>{this.dragging||(EE(a)&&(this.range.valueAsNumber=a),ue(this,fr)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),yt(this,xc,this.shadowRoot.querySelectorAll('[part~="box"]')),yt(this,Oc,this.shadowRoot.querySelector('[part~="preview-box"]')),yt(this,xu,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);yt(this,Tl,parseInt(i.getPropertyValue("--media-box-padding-left"))),yt(this,yl,parseInt(i.getPropertyValue("--media-box-padding-right"))),yt(this,Ia,new FM(this.range,ue(this,Op),60))}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PAUSED,l.MEDIA_DURATION,l.MEDIA_SEEKABLE,l.MEDIA_CURRENT_TIME,l.MEDIA_PREVIEW_IMAGE,l.MEDIA_PREVIEW_TIME,l.MEDIA_PREVIEW_CHAPTER,l.MEDIA_BUFFERED,l.MEDIA_PLAYBACK_RATE,l.MEDIA_LOADING,l.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",k("seek")),ue(this,Lo).call(this),yt(this,br,this.getRootNode()),(e=ue(this,br))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),ue(this,Ia).stop(),(e=ue(this,br))==null||e.removeEventListener("transitionstart",this),yt(this,br,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===l.MEDIA_CURRENT_TIME||e===l.MEDIA_PAUSED||e===l.MEDIA_ENDED||e===l.MEDIA_LOADING||e===l.MEDIA_DURATION||e===l.MEDIA_SEEKABLE?(ue(this,Ia).update({start:rd(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),ue(this,Lo).call(this),VM(this)):e===l.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===l.MEDIA_DURATION||e===l.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=ue(this,gr),this.updateBar()))}get mediaChaptersCues(){return ue(this,gr)}set mediaChaptersCues(e){var i;yt(this,gr,e),this.updateSegments((i=ue(this,gr))==null?void 0:i.map(a=>({start:rd(this,a.startTime),end:rd(this,a.endTime)})))}get mediaPaused(){return W(this,l.MEDIA_PAUSED)}set mediaPaused(e){F(this,l.MEDIA_PAUSED,e)}get mediaLoading(){return W(this,l.MEDIA_LOADING)}set mediaLoading(e){F(this,l.MEDIA_LOADING,e)}get mediaDuration(){return re(this,l.MEDIA_DURATION)}set mediaDuration(e){ge(this,l.MEDIA_DURATION,e)}get mediaCurrentTime(){return re(this,l.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ge(this,l.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return re(this,l.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){ge(this,l.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(l.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(l.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(l.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(l.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(l.MEDIA_SEEKABLE);return}this.setAttribute(l.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return ce(this,l.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){le(this,l.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return re(this,l.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ge(this,l.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return W(this,l.MEDIA_ENDED)}set mediaEnded(e){F(this,l.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const r=this.mediaCurrentTime,[,s=this.mediaSeekableStart]=(e=i.find(([o,d])=>o<=r&&r<=d))!=null?e:[];a=rd(this,s)}const{style:n}=we(this.shadowRoot,"#buffered");n.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=we(this.shadowRoot,"#current-rail"),a=we(this.shadowRoot,'[part~="current-box"]'),n=It(this,$c,XE).call(this,ue(this,xu)),r=It(this,Pc,JE).call(this,n,this.range.valueAsNumber),s=It(this,Nc,jE).call(this,n,this.range.valueAsNumber);i.style.transform=`translateX(${r})`,i.style.setProperty("--_range-width",`${n.range.width}`),a.style.setProperty("--_box-shift",`${s}`),a.style.setProperty("--_box-width",`${n.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":It(this,Pp,x_).call(this);break;case"pointermove":It(this,$p,D_).call(this,e);break;case"pointerup":ue(this,fr)&&yt(this,fr,!1);break;case"pointerdown":yt(this,fr,!0);break;case"pointerleave":It(this,kl,Uc).call(this,null);break;case"transitionstart":ia(e.target,this)&&setTimeout(()=>ue(this,Lo).call(this),0);break}}}br=new WeakMap;Ia=new WeakMap;xc=new WeakMap;Zo=new WeakMap;Oc=new WeakMap;xu=new WeakMap;Tl=new WeakMap;yl=new WeakMap;gr=new WeakMap;fr=new WeakMap;Lo=new WeakMap;xp=new WeakSet;R_=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Pf(this)};Op=new WeakMap;$c=new WeakSet;XE=function(t){var e;const a=((e=this.getAttribute("bounds")?vs(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=t.offsetWidth,s=-(n.left-a.left-r/2),o=a.right-n.left-r/2;return{box:{width:r,min:s,max:o},bounds:a,range:n}};Pc=new WeakSet;JE=function(t,e){let i=`${e*100}%`;const{width:a,min:n,max:r}=t.box;if(!a)return i;if(Number.isNaN(n)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${n}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(r)){const o=`calc(1 / var(--_range-width) * 100 * ${r}% - var(--media-box-padding-right))`;i=`min(${i}, ${o})`}return i};Nc=new WeakSet;jE=function(t,e){const{width:i,min:a,max:n}=t.box,r=e*t.range.width;if(r<a+ue(this,Tl)){const s=t.range.left-t.bounds.left-ue(this,Tl);return`${r-i/2+s}px`}if(r>n-ue(this,yl)){const s=t.bounds.right-t.range.right-ue(this,yl);return`${r+i/2-s-t.range.width}px`}return 0};$p=new WeakSet;D_=function(t){const e=[...ue(this,xc)].some(b=>t.composedPath().includes(b));if(!this.dragging&&(e||!t.composedPath().includes(this))){It(this,kl,Uc).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=we(this.shadowRoot,"#preview-rail"),n=we(this.shadowRoot,'[part~="preview-box"]'),r=It(this,$c,XE).call(this,ue(this,Oc));let s=(t.clientX-r.range.left)/r.range.width;s=Math.max(0,Math.min(1,s));const o=It(this,Pc,JE).call(this,r,s),d=It(this,Nc,jE).call(this,r,s);a.style.transform=`translateX(${o})`,a.style.setProperty("--_range-width",`${r.range.width}`),n.style.setProperty("--_box-shift",`${d}`),n.style.setProperty("--_box-width",`${r.box.width}px`);const h=Math.round(ue(this,Zo))-Math.round(s*i);Math.abs(h)<1&&s>.01&&s<.99||(yt(this,Zo,s*i),It(this,kl,Uc).call(this,ue(this,Zo)))};kl=new WeakSet;Uc=function(t){this.dispatchEvent(new c.CustomEvent(S.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Pp=new WeakSet;x_=function(){ue(this,Ia).stop();const t=O_(this);this.dispatchEvent(new c.CustomEvent(S.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};e0.shadowRootOptions={mode:"open"};e0.getContainerTemplateHTML=KM;c.customElements.get("media-time-range")||c.customElements.define("media-time-range",e0);var GM=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},j1=(t,e,i)=>(GM(t,e,"read from private field"),i?i.call(t):e.get(t)),YM=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ou;const qM=1,ZM=t=>t.mediaMuted?0:t.mediaVolume,zM=t=>`${Math.round(t*100)}%`;class QM extends bs{constructor(){super(...arguments),YM(this,Ou,()=>{const e=this.range.value,i=new c.CustomEvent(S.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_VOLUME,l.MEDIA_MUTED,l.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",k("volume")),this.range.addEventListener("input",j1(this,Ou))}disconnectedCallback(){this.range.removeEventListener("input",j1(this,Ou)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===l.MEDIA_VOLUME||e===l.MEDIA_MUTED)&&(this.range.valueAsNumber=ZM(this),this.range.setAttribute("aria-valuetext",zM(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return re(this,l.MEDIA_VOLUME,qM)}set mediaVolume(e){ge(this,l.MEDIA_VOLUME,e)}get mediaMuted(){return W(this,l.MEDIA_MUTED)}set mediaMuted(e){F(this,l.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return ce(this,l.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){le(this,l.MEDIA_VOLUME_UNAVAILABLE,e)}}Ou=new WeakMap;c.customElements.get("media-volume-range")||c.customElements.define("media-volume-range",QM);function XM(t){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${l.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function JM(){return k("Loop")}class t0 extends Ue{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=k("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return W(this,l.MEDIA_LOOP)}set mediaLoop(e){F(this,l.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new c.CustomEvent(S.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}t0.getSlotTemplateHTML=XM;t0.getTooltipContentHTML=JM;c.customElements.get("media-loop-button")||c.customElements.define("media-loop-button",t0);var $_=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},N=(t,e,i)=>($_(t,e,"read from private field"),i?i.call(t):e.get(t)),Mi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ji=(t,e,i,a)=>($_(t,e,"write to private field"),e.set(t,i),i),_r,$u,nn,wo,_a,Aa,Ta,rn,Ar,Pu,$t;const eb=1,tb=0,jM=1,eL={processCallback(t,e,i){if(i){for(const[a,n]of e)if(a in i){const r=i[a];typeof r=="boolean"&&n instanceof Vt&&typeof n.element[n.attributeName]=="boolean"?n.booleanValue=r:typeof r=="function"&&n instanceof Vt?n.element[n.attributeName]=r:n.value=r}}}};class yh extends c.DocumentFragment{constructor(e,i,a=eL){var n;super(),Mi(this,_r,void 0),Mi(this,$u,void 0),this.append(e.content.cloneNode(!0)),ji(this,_r,P_(this)),ji(this,$u,a),(n=a.createCallback)==null||n.call(a,this,N(this,_r),i),a.processCallback(this,N(this,_r),i)}update(e){N(this,$u).processCallback(this,N(this,_r),e)}}_r=new WeakMap;$u=new WeakMap;const P_=(t,e=[])=>{let i,a;for(const n of t.attributes||[])if(n.value.includes("{{")){const r=new iL;for([i,a]of ab(n.value))if(!i)r.append(a);else{const s=new Vt(t,n.name,n.namespaceURI);r.append(s),e.push([a,s])}n.value=r.toString()}for(const n of t.childNodes)if(n.nodeType===eb&&!(n instanceof HTMLTemplateElement))P_(n,e);else{const r=n.data;if(n.nodeType===eb||r.includes("{{")){const s=[];if(r)for([i,a]of ab(r))if(!i)s.push(new Text(a));else{const o=new gs(t);s.push(o),e.push([a,o])}else if(n instanceof HTMLTemplateElement){const o=new H_(t,n);s.push(o),e.push([o.expression,o])}n.replaceWith(...s.flatMap(o=>o.replacementNodes||[o]))}}return e},ib={},ab=t=>{let e="",i=0,a=ib[t],n=0,r;if(a)return a;for(a=[];r=t[n];n++)r==="{"&&t[n+1]==="{"&&t[n-1]!=="\\"&&t[n+2]&&++i==1?(e&&a.push([tb,e]),e="",n++):r==="}"&&t[n+1]==="}"&&t[n-1]!=="\\"&&!--i?(a.push([jM,e.trim()]),e="",n++):e+=r||"";return e&&a.push([tb,(i>0?"{{":"")+e]),ib[t]=a},tL=11;class N_{get value(){return""}set value(e){}toString(){return this.value}}const U_=new WeakMap;class iL{constructor(){Mi(this,nn,[])}[Symbol.iterator](){return N(this,nn).values()}get length(){return N(this,nn).length}item(e){return N(this,nn)[e]}append(...e){for(const i of e)i instanceof Vt&&U_.set(i,this),N(this,nn).push(i)}toString(){return N(this,nn).join("")}}nn=new WeakMap;class Vt extends N_{constructor(e,i,a){super(),Mi(this,rn),Mi(this,wo,""),Mi(this,_a,void 0),Mi(this,Aa,void 0),Mi(this,Ta,void 0),ji(this,_a,e),ji(this,Aa,i),ji(this,Ta,a)}get attributeName(){return N(this,Aa)}get attributeNamespace(){return N(this,Ta)}get element(){return N(this,_a)}get value(){return N(this,wo)}set value(e){N(this,wo)!==e&&(ji(this,wo,e),!N(this,rn,Ar)||N(this,rn,Ar).length===1?e==null?N(this,_a).removeAttributeNS(N(this,Ta),N(this,Aa)):N(this,_a).setAttributeNS(N(this,Ta),N(this,Aa),e):N(this,_a).setAttributeNS(N(this,Ta),N(this,Aa),N(this,rn,Ar).toString()))}get booleanValue(){return N(this,_a).hasAttributeNS(N(this,Ta),N(this,Aa))}set booleanValue(e){if(!N(this,rn,Ar)||N(this,rn,Ar).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}}wo=new WeakMap;_a=new WeakMap;Aa=new WeakMap;Ta=new WeakMap;rn=new WeakSet;Ar=function(){return U_.get(this)};class gs extends N_{constructor(e,i){super(),Mi(this,Pu,void 0),Mi(this,$t,void 0),ji(this,Pu,e),ji(this,$t,i?[...i]:[new Text])}get replacementNodes(){return N(this,$t)}get parentNode(){return N(this,Pu)}get nextSibling(){return N(this,$t)[N(this,$t).length-1].nextSibling}get previousSibling(){return N(this,$t)[0].previousSibling}get value(){return N(this,$t).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===tL?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),ji(this,$t,aL(N(this,$t)[0].parentNode,N(this,$t),i,this.nextSibling))}}Pu=new WeakMap;$t=new WeakMap;class H_ extends gs{constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let n=i.getAttribute("expression")||i.getAttribute(a)||"";n.startsWith("{{")&&(n=n.trim().slice(2,-2).trim()),super(e),this.expression=n,this.template=i,this.directive=a}}function aL(t,e,i,a=null){let n=0,r,s,o,d=i.length,h=e.length;for(;n<d&&n<h&&e[n]==i[n];)n++;for(;n<d&&n<h&&i[d-1]==e[h-1];)a=i[--h,--d];if(n==h)for(;n<d;)t.insertBefore(i[n++],a);if(n==d)for(;n<h;)t.removeChild(e[n++]);else{for(r=e[n];n<d;)o=i[n++],s=r?r.nextSibling:a,r==o?r=s:n<d&&i[n]==s?(t.replaceChild(o,r),r=s):t.insertBefore(o,r);for(;r!=a;)s=r.nextSibling,t.removeChild(r),r=s}return i}const nb={string:t=>String(t)};class B_{constructor(e){this.template=e,this.state=void 0}}const vn=new WeakMap,En=new WeakMap,Np={partial:(t,e)=>{e[t.expression]=new B_(t.template)},if:(t,e)=>{var i;if(W_(t.expression,e))if(vn.get(t)!==t.template){vn.set(t,t.template);const a=new yh(t.template,e,i0);t.replace(a),En.set(t,a)}else(i=En.get(t))==null||i.update(e);else t.replace(""),vn.delete(t),En.delete(t)}},nL=Object.keys(Np),i0={processCallback(t,e,i){var a,n;if(i)for(const[r,s]of e){if(s instanceof H_){if(!s.directive){const d=nL.find(h=>s.template.hasAttribute(h));d&&(s.directive=d,s.expression=s.template.getAttribute(d))}(a=Np[s.directive])==null||a.call(Np,s,i);continue}let o=W_(r,i);if(o instanceof B_){vn.get(s)!==o.template?(vn.set(s,o.template),o=new yh(o.template,o.state,i0),s.value=o,En.set(s,o)):(n=En.get(s))==null||n.update(o.state);continue}o?(s instanceof Vt&&s.attributeName.startsWith("aria-")&&(o=String(o)),s instanceof Vt?typeof o=="boolean"?s.booleanValue=o:typeof o=="function"?s.element[s.attributeName]=o:s.value=o:(s.value=o,vn.delete(s),En.delete(s))):s instanceof Vt?s.value=void 0:(s.value=void 0,vn.delete(s),En.delete(s))}}},rb={"!":t=>!t,"!!":t=>!!t,"==":(t,e)=>t==e,"!=":(t,e)=>t!=e,">":(t,e)=>t>e,">=":(t,e)=>t>=e,"<":(t,e)=>t<e,"<=":(t,e)=>t<=e,"??":(t,e)=>t??e,"|":(t,e)=>{var i;return(i=nb[e])==null?void 0:i.call(nb,t)}};function rL(t){return sL(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}function W_(t,e={}){var i,a,n,r,s,o,d;const h=rL(t);if(h.length===0||h.some(({type:b})=>!b))return qs(t);if(((i=h[0])==null?void 0:i.token)===">"){const b=e[(a=h[1])==null?void 0:a.token];if(!b)return qs(t);const g={...e};b.state=g;const v=h.slice(2);for(let E=0;E<v.length;E+=3){const T=(n=v[E])==null?void 0:n.token,f=(r=v[E+1])==null?void 0:r.token,y=(s=v[E+2])==null?void 0:s.token;T&&f==="="&&(g[T]=Zs(y,e))}return b}if(h.length===1)return sd(h[0])?Zs(h[0].token,e):qs(t);if(h.length===2){const b=(o=h[0])==null?void 0:o.token,g=rb[b];if(!g||!sd(h[1]))return qs(t);const v=Zs(h[1].token,e);return g(v)}if(h.length===3){const b=(d=h[1])==null?void 0:d.token,g=rb[b];if(!g||!sd(h[0])||!sd(h[2]))return qs(t);const v=Zs(h[0].token,e);if(b==="|")return g(v,h[2].token);const E=Zs(h[2].token,e);return g(v,E)}}function qs(t){return console.warn(`Warning: invalid expression \`${t}\``),!1}function sd({type:t}){return["number","boolean","string","param"].includes(t)}function Zs(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):If(t)?parseFloat(t):e[t]}function sL(t,e){let i,a,n;const r=[];for(;t;){n=null,i=t.length;for(const s in e)a=e[s].exec(t),a&&a.index<i&&(n={token:a[0],type:s,matches:a.slice(1)},i=a.index);i&&r.push({token:t.substr(0,i),type:void 0}),n&&r.push(n),t=t.substr(i+(n?n.token.length:0))}return r}var a0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ya=(t,e,i)=>(a0(t,e,"read from private field"),i?i.call(t):e.get(t)),Ga=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xi=(t,e,i,a)=>(a0(t,e,"write to private field"),e.set(t,i),i),em=(t,e,i)=>(a0(t,e,"access private method"),i),Yr,Nu,qr,Tr,Up,F_,Uu,Hp,Co;const tm={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},V_=Ie.createElement("template");V_.innerHTML=`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;class kh extends c.HTMLElement{constructor(){super(),Ga(this,Up),Ga(this,Uu),Ga(this,Yr,void 0),Ga(this,Nu,void 0),Ga(this,qr,void 0),Ga(this,Tr,void 0),Ga(this,Co,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer()),Xi(this,Tr,new MutationObserver(e=>{var i;this.mediaController&&!((i=this.mediaController)!=null&&i.breakpointsComputed)||e.some(a=>{const n=a.target;return n===this?!0:n.localName!=="media-controller"?!1:!!(tm[a.attributeName]||a.attributeName.startsWith("breakpoint"))})&&this.render()})),Xi(this,Co,this.render.bind(this)),em(this,Up,F_).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=ya(this,Yr))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(Xi(this,Yr,e),Xi(this,qr,null),this.createRenderer())}get props(){var e,i,a;const n=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:s})=>tm[s]||s.startsWith("breakpoint")),...Array.from(this.attributes)],r={};for(const s of n){const o=(a=tm[s.name])!=null?a:lS(s.name);let{value:d}=s;d!=null?(If(d)&&(d=parseFloat(d)),r[o]=d===""?!0:d):r[o]=!1}return r}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&em(this,Uu,Hp).call(this)}connectedCallback(){this.addEventListener(Pi.BREAKPOINTS_COMPUTED,ya(this,Co)),ya(this,Tr).observe(this,{attributes:!0}),ya(this,Tr).observe(this.renderRoot,{attributes:!0,subtree:!0}),em(this,Uu,Hp).call(this)}disconnectedCallback(){this.removeEventListener(Pi.BREAKPOINTS_COMPUTED,ya(this,Co)),ya(this,Tr).disconnect()}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==ya(this,Nu)&&(Xi(this,Nu,this.template),this.renderer=new yh(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(V_.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}}Yr=new WeakMap;Nu=new WeakMap;qr=new WeakMap;Tr=new WeakMap;Up=new WeakSet;F_=function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}};Uu=new WeakSet;Hp=function(){var t;const e=this.getAttribute("template");if(!e||e===ya(this,qr))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){Xi(this,qr,e),Xi(this,Yr,a),this.createRenderer();return}oL(e)&&(Xi(this,qr,e),lL(e).then(n=>{const r=Ie.createElement("template");r.innerHTML=n,Xi(this,Yr,r),this.createRenderer()}).catch(console.error))};Co=new WeakMap;kh.observedAttributes=["template"];kh.processor=i0;function oL(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}async function lL(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}c.customElements.get("media-theme")||c.customElements.define("media-theme",kh);function dL({anchor:t,floating:e,placement:i}){const a=uL({anchor:t,floating:e}),{x:n,y:r}=hL(a,i);return{x:n,y:r}}function uL({anchor:t,floating:e}){return{anchor:cL(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function cL(t,e){var i;const a=t.getBoundingClientRect(),n=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-n.x,y:a.y-n.y,width:a.width,height:a.height}}function hL({anchor:t,floating:e},i){const a=mL(i)==="x"?"y":"x",n=a==="y"?"height":"width",r=K_(i),s=t.x+t.width/2-e.width/2,o=t.y+t.height/2-e.height/2,d=t[n]/2-e[n]/2;let h;switch(r){case"top":h={x:s,y:t.y-e.height};break;case"bottom":h={x:s,y:t.y+t.height};break;case"right":h={x:t.x+t.width,y:o};break;case"left":h={x:t.x-e.width,y:o};break;default:h={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":h[a]-=d;break;case"end":h[a]+=d;break}return h}function K_(t){return t.split("-")[0]}function mL(t){return["top","bottom"].includes(K_(t))?"y":"x"}class n0 extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}}class pL extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}}var r0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},q=(t,e,i)=>(r0(t,e,"read from private field"),i?i.call(t):e.get(t)),X=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},kt=(t,e,i,a)=>(r0(t,e,"write to private field"),e.set(t,i),i),J=(t,e,i)=>(r0(t,e,"access private method"),i),yi,Da,ea,Hu,Ro,In,Sl,Bp,G_,Hc,s0,Bc,Bu,Wp,Fp,Y_,Vp,q_,Kp,Z_,Zr,zr,Qr,Il,Wc,o0,Gp,z_,l0,Q_,Yp,X_,d0,J_,qp,j_,Zp,eA,zo,Fc,zp,tA,Qo,Vc,Wu,Qp;function ds({type:t,text:e,value:i,checked:a}){const n=Ie.createElement("media-chrome-menu-item");n.type=t,n.part.add("menu-item"),n.part.add(t),n.value=i,n.checked=a;const r=Ie.createElement("span");return r.textContent=e,n.append(r),n}function Mn(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}function vL(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;
        
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `}const Ya={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class wt extends c.HTMLElement{constructor(){if(super(),X(this,Bp),X(this,Hc),X(this,Bu),X(this,Fp),X(this,Vp),X(this,Kp),X(this,Qr),X(this,Wc),X(this,Gp),X(this,l0),X(this,Yp),X(this,d0),X(this,qp),X(this,Zp),X(this,zo),X(this,zp),X(this,Qo),X(this,Wu),X(this,yi,null),X(this,Da,null),X(this,ea,null),X(this,Hu,new Set),X(this,Ro,void 0),X(this,In,!1),X(this,Sl,null),X(this,Bc,()=>{const e=q(this,Hu),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));kt(this,Hu,i)}),X(this,Zr,()=>{J(this,Qr,Il).call(this),J(this,Wc,o0).call(this,!1)}),X(this,zr,()=>{J(this,Qr,Il).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),kt(this,Ro,new MutationObserver(q(this,Bc)))}static get observedAttributes(){return[Ya.DISABLED,Ya.HIDDEN,Ya.STYLE,Ya.ANCHOR,Q.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":J(this,Bp,G_).call(this,e);break;case"invoke":J(this,Fp,Y_).call(this,e);break;case"click":J(this,Gp,z_).call(this,e);break;case"toggle":J(this,Yp,X_).call(this,e);break;case"focusout":J(this,qp,j_).call(this,e);break;case"keydown":J(this,Zp,eA).call(this,e);break}}connectedCallback(){var e,i;q(this,Ro).observe(this.defaultSlot,{childList:!0}),kt(this,Sl,fE(this.shadowRoot,":host")),J(this,Bu,Wp).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),kt(this,yi,dp(this)),(i=(e=q(this,yi))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(rs(Ml(this),q(this,Zr)),rs(this,q(this,zr))),J(this,Hc,s0).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var e,i;q(this,Ro).disconnect(),ss(Ml(this),q(this,Zr)),ss(this,q(this,zr)),this.disable(),(i=(e=q(this,yi))==null?void 0:e.unassociateElement)==null||i.call(e,this),kt(this,yi,null),kt(this,Da,null),kt(this,ea,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(e,i,a){var n,r,s,o;e===Ya.HIDDEN&&a!==i?(q(this,In)||kt(this,In,!0),this.hidden?J(this,Kp,Z_).call(this):J(this,Vp,q_).call(this),this.dispatchEvent(new pL({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===Q.MEDIA_CONTROLLER?(i&&((r=(n=q(this,yi))==null?void 0:n.unassociateElement)==null||r.call(n,this),kt(this,yi,null)),a&&this.isConnected&&(kt(this,yi,dp(this)),(o=(s=q(this,yi))==null?void 0:s.associateElement)==null||o.call(s,this))):e===Ya.DISABLED&&a!==i?a==null?this.enable():this.disable():e===Ya.STYLE&&a!==i&&J(this,Bu,Wp).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=ch(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(EL)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&J(this,Wu,Qp).call(this,i)}focus(){if(kt(this,Da,gE()),this.items.length){J(this,Qo,Vc).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=J(this,zo,Fc).call(this,e);a&&(J(this,Wu,Qp).call(this,a,a.type==="checkbox"),q(this,ea)&&!this.hidden&&((i=q(this,Da))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:n}=e,r=this.items,s=(a=(i=J(this,zo,Fc).call(this,e))!=null?i:J(this,zp,tA).call(this))!=null?a:r[0],o=r.indexOf(s);let d=Math.max(0,o);n==="ArrowDown"?d++:n==="ArrowUp"?d--:e.key==="Home"?d=0:e.key==="End"&&(d=r.length-1),d<0&&(d=r.length-1),d>r.length-1&&(d=0),J(this,Qo,Vc).call(this,r[d]),r[d].focus()}}yi=new WeakMap;Da=new WeakMap;ea=new WeakMap;Hu=new WeakMap;Ro=new WeakMap;In=new WeakMap;Sl=new WeakMap;Bp=new WeakSet;G_=function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&J(this,Hc,s0).call(this),e.name||q(this,Bc).call(this)};Hc=new WeakSet;s0=function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0};Bc=new WeakMap;Bu=new WeakSet;Wp=function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};Fp=new WeakSet;Y_=function(t){kt(this,ea,t.relatedTarget),ia(this,t.relatedTarget)||(this.hidden=!this.hidden)};Vp=new WeakSet;q_=function(){var t;(t=q(this,ea))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),rs(Ml(this),q(this,Zr)),rs(this,q(this,zr))};Kp=new WeakSet;Z_=function(){var t;(t=q(this,ea))==null||t.setAttribute("aria-expanded","false"),ss(Ml(this),q(this,Zr)),ss(this,q(this,zr))};Zr=new WeakMap;zr=new WeakMap;Qr=new WeakSet;Il=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=dL({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const n=Ml(this).getBoundingClientRect(),r=n.width-e-t,s=n.height-i-this.offsetHeight,{style:o}=q(this,Sl);o.setProperty("position","absolute"),o.setProperty("right",`${Math.max(0,r)}px`),o.setProperty("--_menu-bottom",`${s}px`);const d=getComputedStyle(this),b=o.getPropertyValue("--_menu-bottom")===d.bottom?s:parseFloat(d.bottom),g=n.height-b-parseFloat(d.marginBottom);this.style.setProperty("--_menu-max-height",`${g}px`)};Wc=new WeakSet;o0=function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=q(this,Sl);if(t||a.setProperty("--media-menu-transition-in","none"),i){const n=i.offsetHeight,r=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${r}px`),this.style.setProperty("min-height",`${n}px`),J(this,Qr,Il).call(this,r)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),J(this,Qr,Il).call(this);a.removeProperty("--media-menu-transition-in")};Gp=new WeakSet;z_=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(q(this,l0,Q_))){(e=q(this,Da))==null||e.focus(),this.hidden=!0;return}const i=J(this,zo,Fc).call(this,t);!i||i.hasAttribute("disabled")||(J(this,Qo,Vc).call(this,i),this.handleSelect(t))};l0=new WeakSet;Q_=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};Yp=new WeakSet;X_=function(t){if(t.target===this)return;J(this,d0,J_).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new n0({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);J(this,Wc,o0).call(this,!0)};d0=new WeakSet;J_=function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};qp=new WeakSet;j_=function(t){var e;ia(this,t.relatedTarget)||(q(this,In)&&((e=q(this,Da))==null||e.focus()),q(this,ea)&&q(this,ea)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};Zp=new WeakSet;eA=function(t){var e,i,a,n,r;const{key:s,ctrlKey:o,altKey:d,metaKey:h}=t;if(!(o||d||h)&&this.keysUsed.includes(s))if(t.preventDefault(),t.stopPropagation(),s==="Tab"){if(q(this,In)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(n=(a=this.nextElementSibling)==null?void 0:a.focus)==null||n.call(a),this.blur()}else s==="Escape"?((r=q(this,Da))==null||r.focus(),q(this,In)&&(this.hidden=!0)):s==="Enter"||s===" "?this.handleSelect(t):this.handleMove(t)};zo=new WeakSet;Fc=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};zp=new WeakSet;tA=function(){return this.items.find(t=>t.tabIndex===0)};Qo=new WeakSet;Vc=function(t){for(const e of this.items)e.tabIndex=e===t?0:-1};Wu=new WeakSet;Qp=function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,n)=>a!=i[n])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};wt.shadowRootOptions={mode:"open"};wt.getTemplateHTML=vL;function EL(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}function Ml(t){var e;return(e=t.getAttribute("bounds")?vs(t,`#${t.getAttribute("bounds")}`):nt(t)||t.parentElement)!=null?e:t}c.customElements.get("media-chrome-menu")||c.customElements.define("media-chrome-menu",wt);var u0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},je=(t,e,i)=>(u0(t,e,"read from private field"),i?i.call(t):e.get(t)),Fi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},im=(t,e,i,a)=>(u0(t,e,"write to private field"),e.set(t,i),i),Pr=(t,e,i)=>(u0(t,e,"access private method"),i),Fu,Xo,Xp,iA,Kc,c0,h0,aA,Di,yr,Jp,Vu,jp;function bL(t){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(t)}
    </slot>
    <slot name="submenu"></slot>
  `}function gL(t){return""}const At={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class Ua extends c.HTMLElement{constructor(){if(super(),Fi(this,Xp),Fi(this,Kc),Fi(this,h0),Fi(this,Vu),Fi(this,Fu,!1),Fi(this,Xo,void 0),Fi(this,Di,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),n=(e=this.submenuElement.checkedItems)==null?void 0:e[0],r=(i=n?.dataset.description)!=null?i:n?.text,s=Ie.createElement("span");s.textContent=r??"",a.replaceChildren(s)}),Fi(this,yr,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",je(this,yr));return}this.handleClick(e)}),Fi(this,Jp,e=>{const{metaKey:i,altKey:a,key:n}=e;if(i||a||!this.keysUsed.includes(n)){this.removeEventListener("keyup",je(this,yr));return}this.addEventListener("keyup",je(this,yr),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Et(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[At.TYPE,At.DISABLED,At.CHECKED,At.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),zs(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Pr(this,Xp,iA).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":je(this,Jp).call(this,e);break;case"keyup":je(this,yr).call(this,e);break}}attributeChangedCallback(e,i,a){e===At.CHECKED&&zs(this)&&!je(this,Fu)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===At.TYPE&&a!==i?this.role="menuitem"+a:e===At.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(At.DISABLED)||this.enable(),this.role="menuitem"+this.type,im(this,Xo,ev(this,this.parentNode)),Pr(this,Vu,jp).call(this),this.submenuElement&&Pr(this,Kc,c0).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),Pr(this,Vu,jp).call(this),im(this,Xo,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=ch(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(At.TYPE))!=null?e:""}set type(e){this.setAttribute(At.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(At.VALUE))!=null?e:this.text}set value(e){this.setAttribute(At.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(zs(this))return this.getAttribute("aria-checked")==="true"}set checked(e){zs(this)&&(im(this,Fu,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){zs(this)||this.invokeTargetElement&&ia(this,e.target)&&this.invokeTargetElement.dispatchEvent(new n0({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}Fu=new WeakMap;Xo=new WeakMap;Xp=new WeakSet;iA=function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Pr(this,Kc,c0).call(this):Pr(this,h0,aA).call(this))};Kc=new WeakSet;c0=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",je(this,Di)),this.submenuElement.addEventListener("addmenuitem",je(this,Di)),this.submenuElement.addEventListener("removemenuitem",je(this,Di)),je(this,Di).call(this)};h0=new WeakSet;aA=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",je(this,Di)),this.submenuElement.removeEventListener("addmenuitem",je(this,Di)),this.submenuElement.removeEventListener("removemenuitem",je(this,Di)),je(this,Di).call(this)};Di=new WeakMap;yr=new WeakMap;Jp=new WeakMap;Vu=new WeakSet;jp=function(){var t;const e=(t=je(this,Xo))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")};Ua.shadowRootOptions={mode:"open"};Ua.getTemplateHTML=bL;Ua.getSuffixSlotInnerHTML=gL;function zs(t){return t.type==="radio"||t.type==="checkbox"}function ev(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?ev(t,i):e?.items?e:ev(e,e?.parentNode)}c.customElements.get("media-chrome-menu-item")||c.customElements.define("media-chrome-menu-item",Ua);function fL(t){return`
    ${wt.getTemplateHTML(t)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `}class nA extends wt{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:nt(this).querySelector("media-settings-menu-button")}}nA.getTemplateHTML=fL;c.customElements.get("media-settings-menu")||c.customElements.define("media-settings-menu",nA);function _L(t){return`
    ${Ua.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function AL(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}class Sh extends Ua{}Sh.shadowRootOptions={mode:"open"};Sh.getTemplateHTML=_L;Sh.getSuffixSlotInnerHTML=AL;c.customElements.get("media-settings-menu-item")||c.customElements.define("media-settings-menu-item",Sh);class fs extends Ue{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=ch(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new n0({relatedTarget:this}))}}c.customElements.get("media-chrome-menu-button")||c.customElements.define("media-chrome-menu-button",fs);function TL(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `}function yL(){return k("Settings")}class m0 extends fs{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",k("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:nt(this).querySelector("media-settings-menu")}}m0.getSlotTemplateHTML=TL;m0.getTooltipContentHTML=yL;c.customElements.get("media-settings-menu-button")||c.customElements.define("media-settings-menu-button",m0);var p0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},rA=(t,e,i)=>(p0(t,e,"read from private field"),i?i.call(t):e.get(t)),od=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},tv=(t,e,i,a)=>(p0(t,e,"write to private field"),e.set(t,i),i),ld=(t,e,i)=>(p0(t,e,"access private method"),i),Do,Gc,Ku,iv,Gu,av;class kL extends wt{constructor(){super(...arguments),od(this,Ku),od(this,Gu),od(this,Do,[]),od(this,Gc,void 0)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_AUDIO_TRACK_LIST,l.MEDIA_AUDIO_TRACK_ENABLED,l.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===l.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(tv(this,Do,rS(a??"")),ld(this,Ku,iv).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ld(this,Gu,av))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ld(this,Gu,av))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=nt(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return rA(this,Do)}set mediaAudioTrackList(e){tv(this,Do,e),ld(this,Ku,iv).call(this)}get mediaAudioTrackEnabled(){var e;return(e=ce(this,l.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){le(this,l.MEDIA_AUDIO_TRACK_ENABLED,e)}}Do=new WeakMap;Gc=new WeakMap;Ku=new WeakSet;iv=function(){if(rA(this,Gc)===JSON.stringify(this.mediaAudioTrackList))return;tv(this,Gc,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=ds({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(Mn(this,"checked-indicator")),this.defaultSlot.append(a)}};Gu=new WeakSet;av=function(){if(this.value==null)return;const t=new c.CustomEvent(S.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};c.customElements.get("media-audio-track-menu")||c.customElements.define("media-audio-track-menu",kL);const SL=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function IL(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${SL}</slot>
  `}function ML(){return k("Audio")}const sb=t=>{const e=k("Audio");t.setAttribute("aria-label",e)};class v0 extends fs{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_AUDIO_TRACK_ENABLED,l.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),sb(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_LANG&&sb(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=nt(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=ce(this,l.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){le(this,l.MEDIA_AUDIO_TRACK_ENABLED,e)}}v0.getSlotTemplateHTML=IL;v0.getTooltipContentHTML=ML;c.customElements.get("media-audio-track-menu-button")||c.customElements.define("media-audio-track-menu-button",v0);var E0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},LL=(t,e,i)=>(E0(t,e,"read from private field"),e.get(t)),am=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wL=(t,e,i,a)=>(E0(t,e,"write to private field"),e.set(t,i),i),dd=(t,e,i)=>(E0(t,e,"access private method"),i),Yc,Yu,nv,qu,rv;const CL=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function RL(t){return`
    ${wt.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${CL}</slot>
  `}class sA extends wt{constructor(){super(...arguments),am(this,Yu),am(this,qu),am(this,Yc,void 0)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_SUBTITLES_LIST,l.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_SUBTITLES_LIST&&i!==a?dd(this,Yu,nv).call(this):e===l.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",dd(this,Yu,nv).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",dd(this,qu,rv))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",dd(this,qu,rv))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:nt(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return ob(this,l.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){lb(this,l.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return ob(this,l.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){lb(this,l.MEDIA_SUBTITLES_SHOWING,e)}}Yc=new WeakMap;Yu=new WeakSet;nv=function(){var t;const e=LL(this,Yc)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(l.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;wL(this,Yc,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,n=ds({type:"radio",text:this.formatMenuItemText(k("Off")),value:"off",checked:a});n.prepend(Mn(this,"checked-indicator")),this.defaultSlot.append(n);const r=this.mediaSubtitlesList;for(const s of r){const o=ds({type:"radio",text:this.formatMenuItemText(s.label,s),value:mp(s),checked:this.value==mp(s)});o.prepend(Mn(this,"checked-indicator")),((t=s.kind)!=null?t:"subs")==="captions"&&o.append(Mn(this,"captions-indicator")),this.defaultSlot.append(o)}};qu=new WeakSet;rv=function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(l.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new c.CustomEvent(S.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new c.CustomEvent(S.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};sA.getTemplateHTML=RL;const ob=(t,e)=>{const i=t.getAttribute(e);return i?Eh(i):[]},lb=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=_l(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};c.customElements.get("media-captions-menu")||c.customElements.define("media-captions-menu",sA);const DL=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,xL=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function OL(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${DL}</slot>
      <slot name="off">${xL}</slot>
    </slot>
  `}function $L(){return k("Captions")}const db=t=>{t.setAttribute("data-captions-enabled",Gf(t).toString())},ub=t=>{t.setAttribute("aria-label",k("closed captions"))};class b0 extends fs{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_SUBTITLES_LIST,l.MEDIA_SUBTITLES_SHOWING,l.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),ub(this),db(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_SUBTITLES_SHOWING?db(this):e===l.MEDIA_LANG&&ub(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=nt(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return cb(this,l.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){hb(this,l.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return cb(this,l.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){hb(this,l.MEDIA_SUBTITLES_SHOWING,e)}}b0.getSlotTemplateHTML=OL;b0.getTooltipContentHTML=$L;const cb=(t,e)=>{const i=t.getAttribute(e);return i?Eh(i):[]},hb=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=_l(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};c.customElements.get("media-captions-menu-button")||c.customElements.define("media-captions-menu-button",b0);var oA=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},kr=(t,e,i)=>(oA(t,e,"read from private field"),i?i.call(t):e.get(t)),nm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Vn=(t,e,i)=>(oA(t,e,"access private method"),i),Ma,Sr,xo,Zu,sv;const rm={RATES:"rates"};class PL extends wt{constructor(){super(),nm(this,Sr),nm(this,Zu),nm(this,Ma,new TE(this,rm.RATES,{defaultValue:y_})),Vn(this,Sr,xo).call(this)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PLAYBACK_RATE,rm.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,Vn(this,Sr,xo).call(this)):e===rm.RATES&&i!=a&&(kr(this,Ma).value=a,Vn(this,Sr,xo).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Vn(this,Zu,sv))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Vn(this,Zu,sv))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:nt(this).querySelector("media-playback-rate-menu-button")}get rates(){return kr(this,Ma)}set rates(e){e?Array.isArray(e)?kr(this,Ma).value=e.join(" "):typeof e=="string"&&(kr(this,Ma).value=e):kr(this,Ma).value="",Vn(this,Sr,xo).call(this)}get mediaPlaybackRate(){return re(this,l.MEDIA_PLAYBACK_RATE,$r)}set mediaPlaybackRate(e){ge(this,l.MEDIA_PLAYBACK_RATE,e)}}Ma=new WeakMap;Sr=new WeakSet;xo=function(){this.defaultSlot.textContent="";const t=this.mediaPlaybackRate,e=new Set(Array.from(kr(this,Ma)).map(a=>Number(a)));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,n)=>a-n);for(const a of i){const n=ds({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});n.prepend(Mn(this,"checked-indicator")),this.defaultSlot.append(n)}};Zu=new WeakSet;sv=function(){if(!this.value)return;const t=new c.CustomEvent(S.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};c.customElements.get("media-playback-rate-menu")||c.customElements.define("media-playback-rate-menu",PL);const zu=1;function NL(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||zu}x</slot>
  `}function UL(){return k("Playback rate")}class g0 extends fs{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:zu}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===l.MEDIA_PLAYBACK_RATE){const n=a?+a:Number.NaN,r=Number.isNaN(n)?zu:n;this.container.innerHTML=`${r}x`,this.setAttribute("aria-label",k("Playback rate {playbackRate}",{playbackRate:r}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:nt(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return re(this,l.MEDIA_PLAYBACK_RATE,zu)}set mediaPlaybackRate(e){ge(this,l.MEDIA_PLAYBACK_RATE,e)}}g0.getSlotTemplateHTML=NL;g0.getTooltipContentHTML=UL;c.customElements.get("media-playback-rate-menu-button")||c.customElements.define("media-playback-rate-menu-button",g0);var f0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Oo=(t,e,i)=>(f0(t,e,"read from private field"),i?i.call(t):e.get(t)),ud=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},mb=(t,e,i,a)=>(f0(t,e,"write to private field"),e.set(t,i),i),Kn=(t,e,i)=>(f0(t,e,"access private method"),i),$o,Nr,Ir,Po,Qu,ov;class HL extends wt{constructor(){super(...arguments),ud(this,Ir),ud(this,Qu),ud(this,$o,[]),ud(this,Nr,{})}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_RENDITION_LIST,l.MEDIA_RENDITION_SELECTED,l.MEDIA_RENDITION_UNAVAILABLE,l.MEDIA_HEIGHT]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const n=e.bitrate/1e6,r=`${n.toFixed(n<1?1:0)} Mbps`;return`${a} (${r})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,n;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((n=e.bitrate)!=null?n:0):i.height-e.height}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===l.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a??"auto",Kn(this,Ir,Po).call(this)):e===l.MEDIA_RENDITION_LIST&&i!==a?(mb(this,$o,tS(a)),Kn(this,Ir,Po).call(this)):e===l.MEDIA_HEIGHT&&i!==a&&Kn(this,Ir,Po).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Kn(this,Qu,ov))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Kn(this,Qu,ov))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:nt(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return Oo(this,$o)}set mediaRenditionList(e){mb(this,$o,e),Kn(this,Ir,Po).call(this)}get mediaRenditionSelected(){return ce(this,l.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){le(this,l.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return re(this,l.MEDIA_HEIGHT)}set mediaHeight(e){ge(this,l.MEDIA_HEIGHT,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}}$o=new WeakMap;Nr=new WeakMap;Ir=new WeakSet;Po=function(){if(Oo(this,Nr).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&Oo(this,Nr).mediaHeight===this.mediaHeight)return;Oo(this,Nr).mediaRenditionList=JSON.stringify(this.mediaRenditionList),Oo(this,Nr).mediaHeight=this.mediaHeight;const t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),e=t.find(s=>s.id===this.mediaRenditionSelected);for(const s of t)s.selected=s===e;this.defaultSlot.textContent="";const i=!this.mediaRenditionSelected;for(const s of t){const o=this.formatRendition(s,{showBitrate:this.showRenditionBitrate(s)}),d=ds({type:"radio",text:o,value:`${s.id}`,checked:s.selected&&!i});d.prepend(Mn(this,"checked-indicator")),this.defaultSlot.append(d)}const a=e&&this.showRenditionBitrate(e),n=i?e?this.formatMenuItemText(`${k("Auto")} • ${this.formatRendition(e,{showBitrate:a})}`,e):this.formatMenuItemText(`${k("Auto")} (${this.mediaHeight}p)`):this.formatMenuItemText(k("Auto")),r=ds({type:"radio",text:n,value:"auto",checked:i});r.dataset.description=n,r.prepend(Mn(this,"checked-indicator")),this.defaultSlot.append(r)};Qu=new WeakSet;ov=function(){if(this.value==null)return;const t=new c.CustomEvent(S.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};c.customElements.get("media-rendition-menu")||c.customElements.define("media-rendition-menu",HL);const BL=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function WL(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${BL}</slot>
  `}function FL(){return k("Quality")}class _0 extends fs{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_RENDITION_SELECTED,l.MEDIA_RENDITION_UNAVAILABLE,l.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",k("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:nt(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return ce(this,l.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){le(this,l.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return re(this,l.MEDIA_HEIGHT)}set mediaHeight(e){ge(this,l.MEDIA_HEIGHT,e)}}_0.getSlotTemplateHTML=WL;_0.getTooltipContentHTML=FL;c.customElements.get("media-rendition-menu-button")||c.customElements.define("media-rendition-menu-button",_0);var A0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ki=(t,e,i)=>(A0(t,e,"read from private field"),i?i.call(t):e.get(t)),ni=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},lA=(t,e,i,a)=>(A0(t,e,"write to private field"),e.set(t,i),i),St=(t,e,i)=>(A0(t,e,"access private method"),i),us,Ll,Ih,ln,Ur,T0,dA,Xu,lv,Ju,dv,uA,qc,Zc,ju;function VL(t){return`
      ${wt.getTemplateHTML(t)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `}class cA extends wt{constructor(){super(),ni(this,Ll),ni(this,ln),ni(this,T0),ni(this,Xu),ni(this,dv),ni(this,us,!1),ni(this,Ju,e=>{const i=e.target,a=i?.nodeName==="VIDEO",n=St(this,Xu,lv).call(this,i);(a||n)&&(ki(this,us)?St(this,ln,Ur).call(this):St(this,dv,uA).call(this,e))}),ni(this,qc,e=>{const i=e.target,a=this.contains(i),n=e.button===2,r=i?.nodeName==="VIDEO",s=St(this,Xu,lv).call(this,i);a||n&&(r||s)||St(this,ln,Ur).call(this)}),ni(this,Zc,e=>{e.key==="Escape"&&St(this,ln,Ur).call(this)}),ni(this,ju,e=>{var i,a;const n=e.target;if((i=n.matches)!=null&&i.call(n,'button[invoke="copy"]')){const r=(a=n.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');r&&navigator.clipboard.writeText(r.value)}St(this,ln,Ur).call(this)}),this.setAttribute("noautohide",""),St(this,Ll,Ih).call(this)}connectedCallback(){super.connectedCallback(),nt(this).addEventListener("contextmenu",ki(this,Ju)),this.addEventListener("click",ki(this,ju))}disconnectedCallback(){super.disconnectedCallback(),nt(this).removeEventListener("contextmenu",ki(this,Ju)),this.removeEventListener("click",ki(this,ju)),document.removeEventListener("mousedown",ki(this,qc)),document.removeEventListener("keydown",ki(this,Zc))}}us=new WeakMap;Ll=new WeakSet;Ih=function(){this.hidden=!ki(this,us)};ln=new WeakSet;Ur=function(){lA(this,us,!1),St(this,Ll,Ih).call(this)};T0=new WeakSet;dA=function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&St(i=e,ln,Ur).call(i)})};Xu=new WeakSet;lv=function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1};Ju=new WeakMap;dv=new WeakSet;uA=function(t){t.preventDefault(),St(this,T0,dA).call(this),lA(this,us,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,St(this,Ll,Ih).call(this),document.addEventListener("mousedown",ki(this,qc),{once:!0}),document.addEventListener("keydown",ki(this,Zc),{once:!0})};qc=new WeakMap;Zc=new WeakMap;ju=new WeakMap;cA.getTemplateHTML=VL;c.customElements.get("media-context-menu")||c.customElements.define("media-context-menu",cA);function KL(t){return`
    ${Ua.getTemplateHTML.call(this,t)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `}class y0 extends Ua{}y0.shadowRootOptions={mode:"open"};y0.getTemplateHTML=KL;c.customElements.get("media-context-menu-item")||c.customElements.define("media-context-menu-item",y0);var hA=t=>{throw TypeError(t)},k0=(t,e,i)=>e.has(t)||hA("Cannot "+i),$=(t,e,i)=>(k0(t,e,"read from private field"),i?i.call(t):e.get(t)),Ge=(t,e,i)=>e.has(t)?hA("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),at=(t,e,i,a)=>(k0(t,e,"write to private field"),e.set(t,i),i),Ae=(t,e,i)=>(k0(t,e,"access private method"),i),Mh=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends Mh{}globalThis.DocumentFragment=t}var S0=class extends Mh{},GL=class extends Mh{},YL={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(S0)}},ec,qL=class{constructor(t,e={}){Ge(this,ec),at(this,ec,e?.detail)}get detail(){return $(this,ec)}initCustomEvent(){}};ec=new WeakMap;function ZL(t,e){return new S0}var mA={document:{createElement:ZL},DocumentFragment,customElements:YL,CustomEvent:qL,EventTarget:Mh,HTMLElement:S0,HTMLVideoElement:GL},pA=typeof window>"u"||typeof globalThis.customElements>"u",Li=pA?mA:globalThis,zc=pA?mA.document:globalThis.document;function zL(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${uv(i)}: ${a}; `)}),e?e.trim():void 0}function uv(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function vA(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function ct(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}function EA(t){let e=QL(t).toString();return e?"?"+e:""}function QL(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}var bA=(t,e)=>!t||!e?!1:t.contains(e)?!0:bA(t,e.getRootNode().host),gA="mux.com",XL=()=>{try{return"3.11.7"}catch{}return"UNKNOWN"},JL=XL(),fA=()=>JL,jL=(t,{token:e,customDomain:i=gA,thumbnailTime:a,programTime:n}={})=>{var r;let s=e==null?a:void 0,{aud:o}=(r=No(e))!=null?r:{};if(!(e&&o!=="t"))return`https://image.${i}/${t}/thumbnail.webp${EA({token:e,time:s,program_time:n})}`},e3=(t,{token:e,customDomain:i=gA,programStartTime:a,programEndTime:n}={})=>{var r;let{aud:s}=(r=No(e))!=null?r:{};if(!(e&&s!=="s"))return`https://image.${i}/${t}/storyboard.vtt${EA({token:e,format:"webp",program_start_time:a,program_end_time:n})}`},I0=t=>{if(t){if([it.LIVE,it.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return it.LIVE}},t3={crossorigin:"crossOrigin",playsinline:"playsInline"};function i3(t){var e;return(e=t3[t])!=null?e:vA(t)}var Mr,Lr,tt,a3=class{constructor(t,e){Ge(this,Mr),Ge(this,Lr),Ge(this,tt,[]),at(this,Mr,t),at(this,Lr,e)}[Symbol.iterator](){return $(this,tt).values()}get length(){return $(this,tt).length}get value(){var t;return(t=$(this,tt).join(" "))!=null?t:""}set value(t){var e;t!==this.value&&(at(this,tt,[]),this.add(...(e=t?.split(" "))!=null?e:[]))}toString(){return this.value}item(t){return $(this,tt)[t]}values(){return $(this,tt).values()}keys(){return $(this,tt).keys()}forEach(t){$(this,tt).forEach(t)}add(...t){var e,i;t.forEach(a=>{this.contains(a)||$(this,tt).push(a)}),!(this.value===""&&!((e=$(this,Mr))!=null&&e.hasAttribute(`${$(this,Lr)}`)))&&((i=$(this,Mr))==null||i.setAttribute(`${$(this,Lr)}`,`${this.value}`))}remove(...t){var e;t.forEach(i=>{$(this,tt).splice($(this,tt).indexOf(i),1)}),(e=$(this,Mr))==null||e.setAttribute(`${$(this,Lr)}`,`${this.value}`)}contains(t){return $(this,tt).includes(t)}toggle(t,e){return typeof e<"u"?e?(this.add(t),!0):(this.remove(t),!1):this.contains(t)?(this.remove(t),!1):(this.add(t),!0)}replace(t,e){this.remove(t),this.add(e)}};Mr=new WeakMap,Lr=new WeakMap,tt=new WeakMap;var _A=`[mux-player ${fA()}]`;function Gi(...t){console.warn(_A,...t)}function mt(...t){console.error(_A,...t)}function pb(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${he("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),Gi(i)}var ze={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},sn={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},vb=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),n3=Object.values(ze).filter(t=>ze.PLAYSINLINE!==t),r3=Object.values(sn),s3=[...n3,...r3],o3=class extends Li.HTMLElement{static get observedAttributes(){return s3}constructor(){super()}attributeChangedCallback(t,e,i){var a,n;switch(t){case sn.MUTED:{this.media&&(this.media.muted=i!=null,this.media.defaultMuted=i!=null);return}case sn.VOLUME:{let r=(a=ct(i))!=null?a:1;this.media&&(this.media.volume=r);return}case sn.PLAYBACKRATE:{let r=(n=ct(i))!=null?n:1;this.media&&(this.media.playbackRate=r,this.media.defaultPlaybackRate=r);return}}}play(){var t,e;return(e=(t=this.media)==null?void 0:t.play())!=null?e:Promise.reject()}pause(){var t;(t=this.media)==null||t.pause()}load(){var t;(t=this.media)==null||t.load()}get media(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var t,e;return(e=(t=this.media)==null?void 0:t.paused)!=null?e:!0}get duration(){var t,e;return(e=(t=this.media)==null?void 0:t.duration)!=null?e:NaN}get ended(){var t,e;return(e=(t=this.media)==null?void 0:t.ended)!=null?e:!1}get buffered(){var t,e;return(e=(t=this.media)==null?void 0:t.buffered)!=null?e:vb}get seekable(){var t,e;return(e=(t=this.media)==null?void 0:t.seekable)!=null?e:vb}get readyState(){var t,e;return(e=(t=this.media)==null?void 0:t.readyState)!=null?e:0}get videoWidth(){var t,e;return(e=(t=this.media)==null?void 0:t.videoWidth)!=null?e:0}get videoHeight(){var t,e;return(e=(t=this.media)==null?void 0:t.videoHeight)!=null?e:0}get currentSrc(){var t,e;return(e=(t=this.media)==null?void 0:t.currentSrc)!=null?e:""}get currentTime(){var t,e;return(e=(t=this.media)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.media&&(this.media.currentTime=Number(t))}get volume(){var t,e;return(e=(t=this.media)==null?void 0:t.volume)!=null?e:1}set volume(t){this.media&&(this.media.volume=Number(t))}get playbackRate(){var t,e;return(e=(t=this.media)==null?void 0:t.playbackRate)!=null?e:1}set playbackRate(t){this.media&&(this.media.playbackRate=Number(t))}get defaultPlaybackRate(){var t;return(t=ct(this.getAttribute(sn.PLAYBACKRATE)))!=null?t:1}set defaultPlaybackRate(t){t!=null?this.setAttribute(sn.PLAYBACKRATE,`${t}`):this.removeAttribute(sn.PLAYBACKRATE)}get crossOrigin(){return Qs(this,ze.CROSSORIGIN)}set crossOrigin(t){this.setAttribute(ze.CROSSORIGIN,`${t}`)}get autoplay(){return Qs(this,ze.AUTOPLAY)!=null}set autoplay(t){t?this.setAttribute(ze.AUTOPLAY,typeof t=="string"?t:""):this.removeAttribute(ze.AUTOPLAY)}get loop(){return Qs(this,ze.LOOP)!=null}set loop(t){t?this.setAttribute(ze.LOOP,""):this.removeAttribute(ze.LOOP)}get muted(){var t,e;return(e=(t=this.media)==null?void 0:t.muted)!=null?e:!1}set muted(t){this.media&&(this.media.muted=!!t)}get defaultMuted(){return Qs(this,ze.MUTED)!=null}set defaultMuted(t){t?this.setAttribute(ze.MUTED,""):this.removeAttribute(ze.MUTED)}get playsInline(){return Qs(this,ze.PLAYSINLINE)!=null}set playsInline(t){mt("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(t){["","none","metadata","auto"].includes(t)?this.setAttribute(ze.PRELOAD,t):this.removeAttribute(ze.PRELOAD)}};function Qs(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}var Eb=o3,l3=`:host {
  --media-control-display: var(--controls);
  --media-loading-indicator-display: var(--loading-indicator);
  --media-dialog-display: var(--dialog);
  --media-play-button-display: var(--play-button);
  --media-live-button-display: var(--live-button);
  --media-seek-backward-button-display: var(--seek-backward-button);
  --media-seek-forward-button-display: var(--seek-forward-button);
  --media-mute-button-display: var(--mute-button);
  --media-captions-button-display: var(--captions-button);
  --media-captions-menu-button-display: var(--captions-menu-button, var(--media-captions-button-display));
  --media-rendition-menu-button-display: var(--rendition-menu-button);
  --media-audio-track-menu-button-display: var(--audio-track-menu-button);
  --media-airplay-button-display: var(--airplay-button);
  --media-pip-button-display: var(--pip-button);
  --media-fullscreen-button-display: var(--fullscreen-button);
  --media-cast-button-display: var(--cast-button, var(--_cast-button-drm-display));
  --media-playback-rate-button-display: var(--playback-rate-button);
  --media-playback-rate-menu-button-display: var(--playback-rate-menu-button);
  --media-volume-range-display: var(--volume-range);
  --media-time-range-display: var(--time-range);
  --media-time-display-display: var(--time-display);
  --media-duration-display-display: var(--duration-display);
  --media-title-display-display: var(--title-display);

  display: inline-block;
  line-height: 0;
  width: 100%;
}

a {
  color: #fff;
  font-size: 0.9em;
  text-decoration: underline;
}

media-theme {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

media-poster-image {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
}

media-poster-image:not([src]):not([placeholdersrc]) {
  display: none;
}

::part(top),
[part~='top'] {
  --media-control-display: var(--controls, var(--top-controls));
  --media-play-button-display: var(--play-button, var(--top-play-button));
  --media-live-button-display: var(--live-button, var(--top-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--top-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--top-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--top-mute-button));
  --media-captions-button-display: var(--captions-button, var(--top-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--top-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--top-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--top-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--top-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--top-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--top-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--top-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--top-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --captions-menu-button,
    var(--media-playback-rate-button-display, var(--top-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--top-volume-range));
  --media-time-range-display: var(--time-range, var(--top-time-range));
  --media-time-display-display: var(--time-display, var(--top-time-display));
  --media-duration-display-display: var(--duration-display, var(--top-duration-display));
  --media-title-display-display: var(--title-display, var(--top-title-display));
}

::part(center),
[part~='center'] {
  --media-control-display: var(--controls, var(--center-controls));
  --media-play-button-display: var(--play-button, var(--center-play-button));
  --media-live-button-display: var(--live-button, var(--center-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--center-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--center-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--center-mute-button));
  --media-captions-button-display: var(--captions-button, var(--center-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--center-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--center-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--center-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--center-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--center-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--center-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--center-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--center-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--center-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--center-volume-range));
  --media-time-range-display: var(--time-range, var(--center-time-range));
  --media-time-display-display: var(--time-display, var(--center-time-display));
  --media-duration-display-display: var(--duration-display, var(--center-duration-display));
}

::part(bottom),
[part~='bottom'] {
  --media-control-display: var(--controls, var(--bottom-controls));
  --media-play-button-display: var(--play-button, var(--bottom-play-button));
  --media-live-button-display: var(--live-button, var(--bottom-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--bottom-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--bottom-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--bottom-mute-button));
  --media-captions-button-display: var(--captions-button, var(--bottom-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--bottom-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--bottom-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--bottom-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--bottom-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--bottom-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--bottom-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--bottom-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--bottom-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--bottom-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--bottom-volume-range));
  --media-time-range-display: var(--time-range, var(--bottom-time-range));
  --media-time-display-display: var(--time-display, var(--bottom-time-display));
  --media-duration-display-display: var(--duration-display, var(--bottom-duration-display));
  --media-title-display-display: var(--title-display, var(--bottom-title-display));
}

:host([no-tooltips]) {
  --media-tooltip-display: none;
}
`,Xs=new WeakMap,d3=class AA{constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=Xs.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=Xs.get(this.element);i&&i.delete(this.type)}}static for(e){Xs.has(e.element)||Xs.set(e.element,new Map);let i=e.attributeName.slice(2),a=Xs.get(e.element);return a&&a.has(i)?a.get(i):new AA(e.element,i)}};function u3(t,e){return t instanceof Vt&&t.attributeName.startsWith("on")?(d3.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}function c3(t,e){return e instanceof TA&&t instanceof gs?(e.renderInto(t),!0):!1}function h3(t,e){return e instanceof DocumentFragment&&t instanceof gs?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}function m3(t,e){if(t instanceof Vt){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}function p3(t,e){if(t instanceof Vt&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}function v3(t,e){if(typeof e=="boolean"&&t instanceof Vt){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}function E3(t,e){return e===!1&&t instanceof gs?(t.replace(""),!0):!1}function b3(t,e){p3(t,e)||v3(t,e)||u3(t,e)||E3(t,e)||c3(t,e)||h3(t,e)||m3(t,e)}var sm=new Map,bb=new WeakMap,gb=new WeakMap,TA=class{constructor(t,e,i){this.strings=t,this.values=e,this.processor=i,this.stringsKey=this.strings.join("")}get template(){if(sm.has(this.stringsKey))return sm.get(this.stringsKey);{let t=zc.createElement("template"),e=this.strings.length-1;return t.innerHTML=this.strings.reduce((i,a,n)=>i+a+(n<e?`{{ ${n} }}`:""),""),sm.set(this.stringsKey,t),t}}renderInto(t){var e;let i=this.template;if(bb.get(t)!==i){bb.set(t,i);let n=new yh(i,this.values,this.processor);gb.set(t,n),t instanceof gs?t.replace(...n.children):t.appendChild(n);return}let a=gb.get(t);(e=a?.update)==null||e.call(a,this.values)}},g3={processCallback(t,e,i){var a;if(i){for(let[n,r]of e)if(n in i){let s=(a=i[n])!=null?a:"";b3(r,s)}}}};function tc(t,...e){return new TA(t,e,g3)}function f3(t,e){t.renderInto(e)}var _3=t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},A3=t=>tc`
  <style>
    ${_3(t)}
    ${l3}
  </style>
  ${S3(t)}
`,T3=t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return I0(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},y3={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},k3=Object.values(y3).join(", "),S3=t=>{var e,i,a,n,r,s,o,d,h,b,g,v,E,T,f,y,I,V,fe,qe,Re,He,Be,rt,Xe,Kt,Gt,Yt,qt,Zt,zt,Qt,aa,De,Xt,Jt,jt,We,Ze;return tc`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${T3(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(it.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(n=zL({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?n:!1}"
    defaultsubtitles="${!t.defaultHiddenCaptions}"
    forwardseekoffset="${(r=t.forwardSeekOffset)!=null?r:!1}"
    backwardseekoffset="${(s=t.backwardSeekOffset)!=null?s:!1}"
    playbackrates="${(o=t.playbackRates)!=null?o:!1}"
    defaultshowremainingtime="${(d=t.defaultShowRemainingTime)!=null?d:!1}"
    defaultduration="${(h=t.defaultDuration)!=null?h:!1}"
    hideduration="${(b=t.hideDuration)!=null?b:!1}"
    title="${(g=t.title)!=null?g:!1}"
    videotitle="${(v=t.videoTitle)!=null?v:!1}"
    proudlydisplaymuxbadge="${(E=t.proudlyDisplayMuxBadge)!=null?E:!1}"
    exportparts="${k3}"
    onclose="${t.onCloseErrorDialog}"
    onfocusin="${t.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${(T=t.noHotKeys)!=null?T:!1}"
      target-live-window="${(f=t.targetLiveWindow)!=null?f:!1}"
      stream-type="${(y=I0(t.streamType))!=null?y:!1}"
      crossorigin="${(I=t.crossOrigin)!=null?I:""}"
      playsinline
      autoplay="${(V=t.autoplay)!=null?V:!1}"
      muted="${(fe=t.muted)!=null?fe:!1}"
      loop="${(qe=t.loop)!=null?qe:!1}"
      preload="${(Re=t.preload)!=null?Re:!1}"
      debug="${(He=t.debug)!=null?He:!1}"
      prefer-cmcd="${(Be=t.preferCmcd)!=null?Be:!1}"
      disable-tracking="${(rt=t.disableTracking)!=null?rt:!1}"
      disable-cookies="${(Xe=t.disableCookies)!=null?Xe:!1}"
      prefer-playback="${(Kt=t.preferPlayback)!=null?Kt:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      beacon-collection-domain="${(Gt=t.beaconCollectionDomain)!=null?Gt:!1}"
      player-init-time="${(Yt=t.playerInitTime)!=null?Yt:!1}"
      player-software-name="${(qt=t.playerSoftwareName)!=null?qt:!1}"
      player-software-version="${(Zt=t.playerSoftwareVersion)!=null?Zt:!1}"
      env-key="${(zt=t.envKey)!=null?zt:!1}"
      custom-domain="${(Qt=t.customDomain)!=null?Qt:!1}"
      src="${t.src?t.src:t.playbackId?lm(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?lm(t):!1}"
      cast-receiver="${(aa=t.castReceiver)!=null?aa:!1}"
      drm-token="${(Xt=(De=t.tokens)==null?void 0:De.drm)!=null?Xt:!1}"
      exportparts="video"
      disable-pseudo-ended="${(Jt=t.disablePseudoEnded)!=null?Jt:!1}"
      max-auto-resolution="${(jt=t.maxAutoResolution)!=null?jt:!1}"
      cap-rendition-to-player-size="${(We=t.capRenditionToPlayerSize)!=null?We:!1}"
    >
      ${t.storyboard?tc`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:tc``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(Ze=t.placeholder)!=null?Ze:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},yA=t=>t.charAt(0).toUpperCase()+t.slice(1),I3=(t,e=!1)=>{var i,a;if(t.muxCode){let n=yA((i=t.errorCategory)!=null?i:"video"),r=Db((a=t.errorCategory)!=null?a:xb.VIDEO);if(t.muxCode===ae.NETWORK_OFFLINE)return he("Your device appears to be offline",e);if(t.muxCode===ae.NETWORK_TOKEN_EXPIRED)return he("{category} URL has expired",e).format({category:n});if([ae.NETWORK_TOKEN_SUB_MISMATCH,ae.NETWORK_TOKEN_AUD_MISMATCH,ae.NETWORK_TOKEN_AUD_MISSING,ae.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return he("{category} URL is formatted incorrectly",e).format({category:n});if(t.muxCode===ae.NETWORK_TOKEN_MISSING)return he("Invalid {categoryName} URL",e).format({categoryName:r});if(t.muxCode===ae.NETWORK_NOT_FOUND)return he("{category} does not exist",e).format({category:n});if(t.muxCode===ae.NETWORK_NOT_READY){let s=t.streamType==="live"?"Live stream":"Video";return he("{mediaType} is not currently available",e).format({mediaType:s})}}if(t.code){if(t.code===pt.MEDIA_ERR_NETWORK)return he("Network Error",e);if(t.code===pt.MEDIA_ERR_DECODE)return he("Media Error",e);if(t.code===pt.MEDIA_ERR_SRC_NOT_SUPPORTED)return he("Source Not Supported",e)}return he("Error",e)},M3=(t,e=!1)=>{var i,a;if(t.muxCode){let n=yA((i=t.errorCategory)!=null?i:"video"),r=Db((a=t.errorCategory)!=null?a:xb.VIDEO);return t.muxCode===ae.NETWORK_OFFLINE?he("Check your internet connection and try reloading this video.",e):t.muxCode===ae.NETWORK_TOKEN_EXPIRED?he("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:r}):t.muxCode===ae.NETWORK_TOKEN_SUB_MISMATCH?he("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:r}):t.muxCode===ae.NETWORK_TOKEN_MALFORMED?he("{category} URL is formatted incorrectly",e).format({category:n}):[ae.NETWORK_TOKEN_AUD_MISMATCH,ae.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?he("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:r}):[ae.NETWORK_TOKEN_MISSING,ae.NETWORK_INVALID_URL].includes(t.muxCode)?he("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:r}):t.muxCode===ae.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===pt.MEDIA_ERR_NETWORK||t.code===pt.MEDIA_ERR_DECODE||(t.code,pt.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},L3=(t,e=!1)=>{let i=I3(t,e).toString(),a=M3(t,e).toString();return{title:i,message:a}},w3=t=>{if(t.muxCode){if(t.muxCode===ae.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===ae.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([ae.NETWORK_TOKEN_AUD_MISMATCH,ae.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===ae.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===ae.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===ae.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===ae.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===pt.MEDIA_ERR_NETWORK)return"";if(t.code===pt.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===pt.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},kA=(t,e)=>{let i=w3(t);return{message:t.message,context:t.context,file:i}},C3=`<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    media-rendition-menu {
      min-width: 140px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]) media-control-bar[slot='top-chrome']::before,
    :host([videotitle]) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}" exportparts="thumb">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            opacity: 0;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>

    <template if="!audio">
      <media-error-dialog slot="dialog" noautohide></media-error-dialog>
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`,cv=zc.createElement("template");"innerHTML"in cv&&(cv.innerHTML=C3);var fb,_b,SA=class extends kh{};SA.template=(_b=(fb=cv.content)==null?void 0:fb.children)==null?void 0:_b[0];Li.customElements.get("media-theme-gerwig")||Li.customElements.define("media-theme-gerwig",SA);var R3="gerwig",Yi={SRC:"src",POSTER:"poster"},_={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},hv=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function D3(t,e){var i,a,n;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:((i=t.media)==null?void 0:i.currentSrc)&&t.storyboard,storyboardSrc:t.getAttribute(_.STORYBOARD_SRC),fullscreenElement:t.getAttribute(_.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:O3(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(_.NOHOTKEYS),hotKeys:t.getAttribute(_.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,maxAutoResolution:t.maxAutoResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(m.TARGET_LIVE_WINDOW),streamType:I0(t.getAttribute(m.STREAM_TYPE)),primaryColor:t.getAttribute(_.PRIMARY_COLOR),secondaryColor:t.getAttribute(_.SECONDARY_COLOR),accentColor:t.getAttribute(_.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:$3(t),playbackRates:t.getAttribute(_.PLAYBACK_RATES),customDomain:(a=t.getAttribute(m.CUSTOM_DOMAIN))!=null?a:void 0,title:t.getAttribute(_.TITLE),videoTitle:(n=t.getAttribute(_.VIDEO_TITLE))!=null?n:t.getAttribute(_.TITLE),novolumepref:t.hasAttribute(_.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(_.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(_.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(_.DISABLE_PSEUDO_ENDED),capRenditionToPlayerSize:t.capRenditionToPlayerSize,...e,extraSourceParams:t.extraSourceParams}}var x3=b_.formatErrorMessage;b_.formatErrorMessage=t=>{var e,i;if(t instanceof pt){let a=L3(t,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a?.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${he("(opens in a new window)")}"
              >${(i=a.linkText)!=null?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return x3(t)};function O3(t){var e,i;let a=t.theme;if(a){let n=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(n&&n instanceof HTMLTemplateElement)return n;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let r=Li.customElements.get(a);if(r!=null&&r.template)return r.template}}function $3(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}function Ab(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let n=t.getAttribute(a);return n!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=n),i},e)}var P3=Object.values(m),N3=Object.values(Yi),U3=Object.values(_),Tb=fA(),yb="mux-player",kb={isDialogOpen:!1},H3={redundant_streams:!0},ic,Jo,ac,on,nc,jo,Qc,Xc,Xr,el,Jr,Jc,Ee,qi,IA,mv,bn,Sb,Ib,Mb,Lb,B3=class extends Eb{constructor(){super(),Ge(this,Ee),Ge(this,ic),Ge(this,Jo,!1),Ge(this,ac,{}),Ge(this,on,!0),Ge(this,nc,new a3(this,"hotkeys")),Ge(this,jo),Ge(this,Qc,()=>Ae(this,Ee,bn).call(this)),Ge(this,Xc,()=>Ae(this,Ee,bn).call(this)),Ge(this,Xr,()=>Ae(this,Ee,bn).call(this)),Ge(this,el),Ge(this,Jr,{...kb,onCloseErrorDialog:t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&Ae(this,Ee,mv).call(this,{isDialogOpen:!1})},onFocusInErrorDialog:t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&(bA(this,zc.activeElement)||t.preventDefault())}}),Ge(this,Jc,t=>{var e;let i=(e=this.media)==null?void 0:e.error;if(!(i instanceof pt)){let{message:n,code:r}=i??{};i=new pt(n,r)}if(!(i!=null&&i.fatal)){Gi(i),i.data&&Gi(`${i.name} data:`,i.data);return}let a=kA(i);a.message&&pb(a),mt(i),i.data&&mt(`${i.name} data:`,i.data),Ae(this,Ee,mv).call(this,{isDialogOpen:!0})}),at(this,ic,pv()),this.attachShadow({mode:"open"}),Ae(this,Ee,IA).call(this),this.isConnected&&Ae(this,Ee,qi).call(this)}static get NAME(){return yb}static get VERSION(){return Tb}static get observedAttributes(){var t;return[...(t=Eb.observedAttributes)!=null?t:[],...N3,...P3,...U3]}get mediaTheme(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("media-theme")}get mediaController(){var t,e;return(e=(t=this.mediaTheme)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("media-controller")}connectedCallback(){Ae(this,Ee,qi).call(this);let t=this.media;t&&(t.metadata=Ab(this))}disconnectedCallback(){var t,e,i,a,n,r,s,o;(t=$(this,jo))==null||t.disconnect(),(e=this.media)==null||e.removeEventListener("streamtypechange",$(this,Qc)),(i=this.media)==null||i.removeEventListener("loadstart",$(this,Xc)),this.removeEventListener("error",$(this,Jc)),this.media&&(this.media.errorTranslator=void 0),(n=(a=this.media)==null?void 0:a.textTracks)==null||n.removeEventListener("addtrack",$(this,Xr)),(s=(r=this.media)==null?void 0:r.textTracks)==null||s.removeEventListener("removetrack",$(this,Xr)),(o=$(this,el))==null||o.call(this),at(this,el,void 0),at(this,Jo,!1)}attributeChangedCallback(t,e,i){switch(Ae(this,Ee,qi).call(this),super.attributeChangedCallback(t,e,i),t){case _.HOTKEYS:$(this,nc).value=i;break;case _.THUMBNAIL_TIME:{i!=null&&this.tokens.thumbnail&&Gi(he("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case _.THUMBNAIL_TOKEN:{if(i){let a=No(i);if(a){let{aud:n}=a,r=$h.THUMBNAIL;n!==r&&Gi(he("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:n,expectedAud:r,tokenNamePrefix:"thumbnail"}))}}break}case _.STORYBOARD_TOKEN:{if(i){let a=No(i);if(a){let{aud:n}=a,r=$h.STORYBOARD;n!==r&&Gi(he("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:n,expectedAud:r,tokenNamePrefix:"storyboard"}))}}break}case _.DRM_TOKEN:{if(i){let a=No(i);if(a){let{aud:n}=a,r=$h.DRM;n!==r&&Gi(he("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:n,expectedAud:r,tokenNamePrefix:"drm"}))}}break}case m.PLAYBACK_ID:{i!=null&&i.includes("?token")&&mt(he("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:i}));break}case m.STREAM_TYPE:{i&&![it.LIVE,it.ON_DEMAND,it.UNKNOWN].includes(i)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=i.includes("dvr")?Number.POSITIVE_INFINITY:0:pb({file:"invalid-stream-type.md",message:he("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):i===it.LIVE?this.getAttribute(_.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case _.FULLSCREEN_ELEMENT:{if(i!=null||i!==e){let a=zc.getElementById(i),n=a?.querySelector("mux-player");this.mediaController&&a&&n&&(this.mediaController.fullscreenElement=a)}break}case m.CAP_RENDITION_TO_PLAYER_SIZE:{(i==null||i!==e)&&(this.capRenditionToPlayerSize=i!=null?!0:void 0);break}}[m.PLAYBACK_ID,Yi.SRC,_.PLAYBACK_TOKEN].includes(t)&&e!==i&&at(this,Jr,{...$(this,Jr),...kb}),Ae(this,Ee,bn).call(this,{[i3(t)]:i})}async requestFullscreen(t){var e;if(!(!this.mediaController||this.mediaController.hasAttribute(l.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new Li.CustomEvent(S.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var n;(n=this.mediaController)==null||n.addEventListener(Pi.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}async exitFullscreen(){var t;if(!(!this.mediaController||!this.mediaController.hasAttribute(l.MEDIA_IS_FULLSCREEN)))return(t=this.mediaController)==null||t.dispatchEvent(new Li.CustomEvent(S.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,i)=>{var a;(a=this.mediaController)==null||a.addEventListener(Pi.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}get preferCmcd(){var t;return(t=this.getAttribute(m.PREFER_CMCD))!=null?t:void 0}set preferCmcd(t){t!==this.preferCmcd&&(t?rc.includes(t)?this.setAttribute(m.PREFER_CMCD,t):Gi(`Invalid value for preferCmcd. Must be one of ${rc.join()}`):this.removeAttribute(m.PREFER_CMCD))}get hasPlayed(){var t,e;return(e=(t=this.mediaController)==null?void 0:t.hasAttribute(l.MEDIA_HAS_PLAYED))!=null?e:!1}get inLiveWindow(){var t;return(t=this.mediaController)==null?void 0:t.hasAttribute(l.MEDIA_TIME_IS_LIVE)}get _hls(){var t;return(t=this.media)==null?void 0:t._hls}get mux(){var t;return(t=this.media)==null?void 0:t.mux}get theme(){var t;return(t=this.getAttribute(_.THEME))!=null?t:R3}set theme(t){this.setAttribute(_.THEME,`${t}`)}get themeProps(){let t=this.mediaTheme;if(!t)return;let e={};for(let i of t.getAttributeNames()){if(hv.includes(i))continue;let a=t.getAttribute(i);e[vA(i)]=a===""?!0:a}return e}set themeProps(t){var e,i;Ae(this,Ee,qi).call(this);let a={...this.themeProps,...t};for(let n in a){if(hv.includes(n))continue;let r=t?.[n];typeof r=="boolean"||r==null?(e=this.mediaTheme)==null||e.toggleAttribute(uv(n),!!r):(i=this.mediaTheme)==null||i.setAttribute(uv(n),r)}}get playbackId(){var t;return(t=this.getAttribute(m.PLAYBACK_ID))!=null?t:void 0}set playbackId(t){t?this.setAttribute(m.PLAYBACK_ID,t):this.removeAttribute(m.PLAYBACK_ID)}get src(){var t,e;return this.playbackId?(t=qa(this,Yi.SRC))!=null?t:void 0:(e=this.getAttribute(Yi.SRC))!=null?e:void 0}set src(t){t?this.setAttribute(Yi.SRC,t):this.removeAttribute(Yi.SRC)}get poster(){var t;let e=this.getAttribute(Yi.POSTER);if(e!=null)return e;let{tokens:i}=this;if(i.playback&&!i.thumbnail){Gi("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return jL(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(t=this.thumbnailTime)!=null?t:this.startTime,programTime:this.programStartTime,token:i.thumbnail})}set poster(t){t||t===""?this.setAttribute(Yi.POSTER,t):this.removeAttribute(Yi.POSTER)}get storyboardSrc(){var t;return(t=this.getAttribute(_.STORYBOARD_SRC))!=null?t:void 0}set storyboardSrc(t){t?this.setAttribute(_.STORYBOARD_SRC,t):this.removeAttribute(_.STORYBOARD_SRC)}get storyboard(){let{tokens:t}=this;if(this.storyboardSrc&&!t.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[it.LIVE,it.UNKNOWN].includes(this.streamType)||t.playback&&!t.storyboard))return e3(this.playbackId,{customDomain:this.customDomain,token:t.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(_.AUDIO)}set audio(t){if(!t){this.removeAttribute(_.AUDIO);return}this.setAttribute(_.AUDIO,"")}get hotkeys(){return $(this,nc)}get nohotkeys(){return this.hasAttribute(_.NOHOTKEYS)}set nohotkeys(t){if(!t){this.removeAttribute(_.NOHOTKEYS);return}this.setAttribute(_.NOHOTKEYS,"")}get thumbnailTime(){return ct(this.getAttribute(_.THUMBNAIL_TIME))}set thumbnailTime(t){this.setAttribute(_.THUMBNAIL_TIME,`${t}`)}get videoTitle(){var t,e;return(e=(t=this.getAttribute(_.VIDEO_TITLE))!=null?t:this.getAttribute(_.TITLE))!=null?e:""}set videoTitle(t){t!==this.videoTitle&&(t?this.setAttribute(_.VIDEO_TITLE,t):this.removeAttribute(_.VIDEO_TITLE))}get placeholder(){var t;return(t=qa(this,_.PLACEHOLDER))!=null?t:""}set placeholder(t){this.setAttribute(_.PLACEHOLDER,`${t}`)}get primaryColor(){var t,e;let i=this.getAttribute(_.PRIMARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Li.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_primary-color"))==null?void 0:e.trim(),i))return i}set primaryColor(t){this.setAttribute(_.PRIMARY_COLOR,`${t}`)}get secondaryColor(){var t,e;let i=this.getAttribute(_.SECONDARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Li.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_secondary-color"))==null?void 0:e.trim(),i))return i}set secondaryColor(t){this.setAttribute(_.SECONDARY_COLOR,`${t}`)}get accentColor(){var t,e;let i=this.getAttribute(_.ACCENT_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Li.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_accent-color"))==null?void 0:e.trim(),i))return i}set accentColor(t){this.setAttribute(_.ACCENT_COLOR,`${t}`)}get defaultShowRemainingTime(){return this.hasAttribute(_.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(t){t?this.setAttribute(_.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(_.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(_.PLAYBACK_RATES))return this.getAttribute(_.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(t=>Number(t)).filter(t=>!Number.isNaN(t)).sort((t,e)=>t-e)}set playbackRates(t){if(!t){this.removeAttribute(_.PLAYBACK_RATES);return}this.setAttribute(_.PLAYBACK_RATES,t.join(" "))}get forwardSeekOffset(){var t;return(t=ct(this.getAttribute(_.FORWARD_SEEK_OFFSET)))!=null?t:10}set forwardSeekOffset(t){this.setAttribute(_.FORWARD_SEEK_OFFSET,`${t}`)}get backwardSeekOffset(){var t;return(t=ct(this.getAttribute(_.BACKWARD_SEEK_OFFSET)))!=null?t:10}set backwardSeekOffset(t){this.setAttribute(_.BACKWARD_SEEK_OFFSET,`${t}`)}get defaultHiddenCaptions(){return this.hasAttribute(_.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(t){t?this.setAttribute(_.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(_.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return ct(this.getAttribute(_.DEFAULT_DURATION))}set defaultDuration(t){t==null?this.removeAttribute(_.DEFAULT_DURATION):this.setAttribute(_.DEFAULT_DURATION,`${t}`)}get playerInitTime(){return this.hasAttribute(m.PLAYER_INIT_TIME)?ct(this.getAttribute(m.PLAYER_INIT_TIME)):$(this,ic)}set playerInitTime(t){t!=this.playerInitTime&&(t==null?this.removeAttribute(m.PLAYER_INIT_TIME):this.setAttribute(m.PLAYER_INIT_TIME,`${+t}`))}get playerSoftwareName(){var t;return(t=this.getAttribute(m.PLAYER_SOFTWARE_NAME))!=null?t:yb}get playerSoftwareVersion(){var t;return(t=this.getAttribute(m.PLAYER_SOFTWARE_VERSION))!=null?t:Tb}get beaconCollectionDomain(){var t;return(t=this.getAttribute(m.BEACON_COLLECTION_DOMAIN))!=null?t:void 0}set beaconCollectionDomain(t){t!==this.beaconCollectionDomain&&(t?this.setAttribute(m.BEACON_COLLECTION_DOMAIN,t):this.removeAttribute(m.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var t;return(t=this.getAttribute(m.MAX_RESOLUTION))!=null?t:void 0}set maxResolution(t){t!==this.maxResolution&&(t?this.setAttribute(m.MAX_RESOLUTION,t):this.removeAttribute(m.MAX_RESOLUTION))}get minResolution(){var t;return(t=this.getAttribute(m.MIN_RESOLUTION))!=null?t:void 0}set minResolution(t){t!==this.minResolution&&(t?this.setAttribute(m.MIN_RESOLUTION,t):this.removeAttribute(m.MIN_RESOLUTION))}get maxAutoResolution(){var t;return(t=this.getAttribute(m.MAX_AUTO_RESOLUTION))!=null?t:void 0}set maxAutoResolution(t){t==null?this.removeAttribute(m.MAX_AUTO_RESOLUTION):this.setAttribute(m.MAX_AUTO_RESOLUTION,t)}get renditionOrder(){var t;return(t=this.getAttribute(m.RENDITION_ORDER))!=null?t:void 0}set renditionOrder(t){t!==this.renditionOrder&&(t?this.setAttribute(m.RENDITION_ORDER,t):this.removeAttribute(m.RENDITION_ORDER))}get programStartTime(){return ct(this.getAttribute(m.PROGRAM_START_TIME))}set programStartTime(t){t==null?this.removeAttribute(m.PROGRAM_START_TIME):this.setAttribute(m.PROGRAM_START_TIME,`${t}`)}get programEndTime(){return ct(this.getAttribute(m.PROGRAM_END_TIME))}set programEndTime(t){t==null?this.removeAttribute(m.PROGRAM_END_TIME):this.setAttribute(m.PROGRAM_END_TIME,`${t}`)}get assetStartTime(){return ct(this.getAttribute(m.ASSET_START_TIME))}set assetStartTime(t){t==null?this.removeAttribute(m.ASSET_START_TIME):this.setAttribute(m.ASSET_START_TIME,`${t}`)}get assetEndTime(){return ct(this.getAttribute(m.ASSET_END_TIME))}set assetEndTime(t){t==null?this.removeAttribute(m.ASSET_END_TIME):this.setAttribute(m.ASSET_END_TIME,`${t}`)}get extraSourceParams(){return this.hasAttribute(_.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(_.EXTRA_SOURCE_PARAMS)).entries()].reduce((t,[e,i])=>(t[e]=i,t),{}):H3}set extraSourceParams(t){t==null?this.removeAttribute(_.EXTRA_SOURCE_PARAMS):this.setAttribute(_.EXTRA_SOURCE_PARAMS,new URLSearchParams(t).toString())}get customDomain(){var t;return(t=this.getAttribute(m.CUSTOM_DOMAIN))!=null?t:void 0}set customDomain(t){t!==this.customDomain&&(t?this.setAttribute(m.CUSTOM_DOMAIN,t):this.removeAttribute(m.CUSTOM_DOMAIN))}get envKey(){var t;return(t=qa(this,m.ENV_KEY))!=null?t:void 0}set envKey(t){this.setAttribute(m.ENV_KEY,`${t}`)}get noVolumePref(){return this.hasAttribute(_.NO_VOLUME_PREF)}set noVolumePref(t){t?this.setAttribute(_.NO_VOLUME_PREF,""):this.removeAttribute(_.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(_.NO_MUTED_PREF)}set noMutedPref(t){t?this.setAttribute(_.NO_MUTED_PREF,""):this.removeAttribute(_.NO_MUTED_PREF)}get debug(){return qa(this,m.DEBUG)!=null}set debug(t){t?this.setAttribute(m.DEBUG,""):this.removeAttribute(m.DEBUG)}get disableTracking(){return qa(this,m.DISABLE_TRACKING)!=null}set disableTracking(t){this.toggleAttribute(m.DISABLE_TRACKING,!!t)}get disableCookies(){return qa(this,m.DISABLE_COOKIES)!=null}set disableCookies(t){t?this.setAttribute(m.DISABLE_COOKIES,""):this.removeAttribute(m.DISABLE_COOKIES)}get streamType(){var t,e,i;return(i=(e=this.getAttribute(m.STREAM_TYPE))!=null?e:(t=this.media)==null?void 0:t.streamType)!=null?i:it.UNKNOWN}set streamType(t){this.setAttribute(m.STREAM_TYPE,`${t}`)}get defaultStreamType(){var t,e,i;return(i=(e=this.getAttribute(_.DEFAULT_STREAM_TYPE))!=null?e:(t=this.mediaController)==null?void 0:t.getAttribute(_.DEFAULT_STREAM_TYPE))!=null?i:it.ON_DEMAND}set defaultStreamType(t){t?this.setAttribute(_.DEFAULT_STREAM_TYPE,t):this.removeAttribute(_.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var t,e;return this.hasAttribute(_.TARGET_LIVE_WINDOW)?+this.getAttribute(_.TARGET_LIVE_WINDOW):(e=(t=this.media)==null?void 0:t.targetLiveWindow)!=null?e:Number.NaN}set targetLiveWindow(t){t==this.targetLiveWindow||Number.isNaN(t)&&Number.isNaN(this.targetLiveWindow)||(t==null?this.removeAttribute(_.TARGET_LIVE_WINDOW):this.setAttribute(_.TARGET_LIVE_WINDOW,`${+t}`))}get liveEdgeStart(){var t;return(t=this.media)==null?void 0:t.liveEdgeStart}get startTime(){return ct(qa(this,m.START_TIME))}set startTime(t){this.setAttribute(m.START_TIME,`${t}`)}get preferPlayback(){let t=this.getAttribute(m.PREFER_PLAYBACK);if(t===Ra.MSE||t===Ra.NATIVE)return t}set preferPlayback(t){t!==this.preferPlayback&&(t===Ra.MSE||t===Ra.NATIVE?this.setAttribute(m.PREFER_PLAYBACK,t):this.removeAttribute(m.PREFER_PLAYBACK))}get metadata(){var t;return(t=this.media)==null?void 0:t.metadata}set metadata(t){if(Ae(this,Ee,qi).call(this),!this.media){mt("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...Ab(this),...t}}get _hlsConfig(){var t;return(t=this.media)==null?void 0:t._hlsConfig}set _hlsConfig(t){if(Ae(this,Ee,qi).call(this),!this.media){mt("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=t}async addCuePoints(t){var e;if(Ae(this,Ee,qi).call(this),!this.media){mt("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(e=this.media)==null?void 0:e.addCuePoints(t)}get activeCuePoint(){var t;return(t=this.media)==null?void 0:t.activeCuePoint}get cuePoints(){var t,e;return(e=(t=this.media)==null?void 0:t.cuePoints)!=null?e:[]}addChapters(t){var e;if(Ae(this,Ee,qi).call(this),!this.media){mt("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(e=this.media)==null?void 0:e.addChapters(t)}get activeChapter(){var t;return(t=this.media)==null?void 0:t.activeChapter}get chapters(){var t,e;return(e=(t=this.media)==null?void 0:t.chapters)!=null?e:[]}getStartDate(){var t;return(t=this.media)==null?void 0:t.getStartDate()}get currentPdt(){var t;return(t=this.media)==null?void 0:t.currentPdt}get tokens(){let t=this.getAttribute(_.PLAYBACK_TOKEN),e=this.getAttribute(_.DRM_TOKEN),i=this.getAttribute(_.THUMBNAIL_TOKEN),a=this.getAttribute(_.STORYBOARD_TOKEN);return{...$(this,ac),...t!=null?{playback:t}:{},...e!=null?{drm:e}:{},...i!=null?{thumbnail:i}:{},...a!=null?{storyboard:a}:{}}}set tokens(t){at(this,ac,t??{})}get playbackToken(){var t;return(t=this.getAttribute(_.PLAYBACK_TOKEN))!=null?t:void 0}set playbackToken(t){this.setAttribute(_.PLAYBACK_TOKEN,`${t}`)}get drmToken(){var t;return(t=this.getAttribute(_.DRM_TOKEN))!=null?t:void 0}set drmToken(t){this.setAttribute(_.DRM_TOKEN,`${t}`)}get thumbnailToken(){var t;return(t=this.getAttribute(_.THUMBNAIL_TOKEN))!=null?t:void 0}set thumbnailToken(t){this.setAttribute(_.THUMBNAIL_TOKEN,`${t}`)}get storyboardToken(){var t;return(t=this.getAttribute(_.STORYBOARD_TOKEN))!=null?t:void 0}set storyboardToken(t){this.setAttribute(_.STORYBOARD_TOKEN,`${t}`)}addTextTrack(t,e,i,a){var n;let r=(n=this.media)==null?void 0:n.nativeEl;if(r)return eT(r,t,e,i,a)}removeTextTrack(t){var e;let i=(e=this.media)==null?void 0:e.nativeEl;if(i)return tT(i,t)}get textTracks(){var t;return(t=this.media)==null?void 0:t.textTracks}get castReceiver(){var t;return(t=this.getAttribute(_.CAST_RECEIVER))!=null?t:void 0}set castReceiver(t){t!==this.castReceiver&&(t?this.setAttribute(_.CAST_RECEIVER,t):this.removeAttribute(_.CAST_RECEIVER))}get castCustomData(){var t;return(t=this.media)==null?void 0:t.castCustomData}set castCustomData(t){if(!this.media){mt("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=t}get noTooltips(){return this.hasAttribute(_.NO_TOOLTIPS)}set noTooltips(t){if(!t){this.removeAttribute(_.NO_TOOLTIPS);return}this.setAttribute(_.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(_.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(t){t?this.setAttribute(_.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(_.PROUDLY_DISPLAY_MUX_BADGE)}get capRenditionToPlayerSize(){var t;return(t=this.media)==null?void 0:t.capRenditionToPlayerSize}set capRenditionToPlayerSize(t){if(!this.media){mt("underlying media element missing when trying to set capRenditionToPlayerSize");return}this.media.capRenditionToPlayerSize=t}};ic=new WeakMap,Jo=new WeakMap,ac=new WeakMap,on=new WeakMap,nc=new WeakMap,jo=new WeakMap,Qc=new WeakMap,Xc=new WeakMap,Xr=new WeakMap,el=new WeakMap,Jr=new WeakMap,Jc=new WeakMap,Ee=new WeakSet,qi=function(){var t,e,i,a;if(!$(this,Jo)){at(this,Jo,!0),Ae(this,Ee,bn).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof Li.HTMLElement))throw""}catch{mt("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{mt("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof nI))throw""}catch{mt("<media-controller> failed to upgrade!")}Ae(this,Ee,Sb).call(this),Ae(this,Ee,Ib).call(this),Ae(this,Ee,Mb).call(this),at(this,on,(e=(t=this.mediaController)==null?void 0:t.hasAttribute(D.USER_INACTIVE))!=null?e:!0),Ae(this,Ee,Lb).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",$(this,Qc)),(a=this.media)==null||a.addEventListener("loadstart",$(this,Xc))}},IA=function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},mv=function(t){Object.assign($(this,Jr),t),Ae(this,Ee,bn).call(this)},bn=function(t={}){f3(A3(D3(this,{...$(this,Jr),...t})),this.shadowRoot)},Sb=function(){let t=e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let n=e.replace(/^theme-/,"");if(hv.includes(n))return;let r=this.getAttribute(e);r!=null?(i=this.mediaTheme)==null||i.setAttribute(n,r):(a=this.mediaTheme)==null||a.removeAttribute(n)};at(this,jo,new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)})),$(this,jo).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},Ib=function(){this.addEventListener("error",$(this,Jc)),this.media&&(this.media.errorTranslator=(t={})=>{var e,i,a;if(!(((e=this.media)==null?void 0:e.error)instanceof pt))return t;let n=kA((i=this.media)==null?void 0:i.error);return{player_error_code:(a=this.media)==null?void 0:a.error.code,player_error_message:n.message?String(n.message):t.player_error_message,player_error_context:n.context?String(n.context):t.player_error_context}})},Mb=function(){var t,e,i,a;(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",$(this,Xr)),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",$(this,Xr))},Lb=function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,n=()=>this.streamType===it.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,r=(h,b,g=!1)=>{n()||Array.from(h&&h.activeCues||[]).forEach(v=>{if(!(!v.snapToLines||v.line<-5||v.line>=0&&v.line<10))if(!b||this.paused){let E=v.text.split(`
`).length,T=-3;this.streamType===it.LIVE&&(T=-2);let f=T-E;if(v.line===f&&!g)return;a.has(v)||a.set(v,v.line),v.line=f}else setTimeout(()=>{v.line=a.get(v)||"auto"},500)})},s=()=>{var h,b;r(i,(b=(h=this.mediaController)==null?void 0:h.hasAttribute(D.USER_INACTIVE))!=null?b:!1)},o=()=>{var h,b;let g=Array.from(((b=(h=this.mediaController)==null?void 0:h.media)==null?void 0:b.textTracks)||[]).filter(v=>["subtitles","captions"].includes(v.kind)&&v.mode==="showing")[0];g!==i&&i?.removeEventListener("cuechange",s),i=g,i?.addEventListener("cuechange",s),r(i,$(this,on))};o(),(t=this.textTracks)==null||t.addEventListener("change",o),(e=this.textTracks)==null||e.addEventListener("addtrack",o);let d=()=>{var h,b;let g=(b=(h=this.mediaController)==null?void 0:h.hasAttribute(D.USER_INACTIVE))!=null?b:!0;$(this,on)!==g&&(at(this,on,g),r(i,$(this,on)))};this.addEventListener("userinactivechange",d),at(this,el,()=>{var h,b;i?.removeEventListener("cuechange",s),(h=this.textTracks)==null||h.removeEventListener("change",o),(b=this.textTracks)==null||b.removeEventListener("addtrack",o),this.removeEventListener("userinactivechange",d)})};function qa(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}var wb=B3,MA=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends MA{}globalThis.DocumentFragment=t}var W3=class extends MA{},F3={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(W3)}},V3={customElements:F3},K3=typeof window>"u"||typeof globalThis.customElements>"u",om=K3?V3:globalThis;om.customElements.get("mux-player")||(om.customElements.define("mux-player",wb),om.MuxPlayerElement=wb);var LA=parseInt(tl.version)>=19,Cb={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},G3=t=>t==null,Y3=(t,e)=>G3(e)?!1:t in e,q3=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),Z3=(t,e)=>{if(!(!LA&&typeof e=="boolean"&&!e)){if(Y3(t,Cb))return Cb[t];if(typeof e<"u")return/[A-Z]/.test(t)?q3(t):t}},z3=(t,e)=>!LA&&typeof t=="boolean"?"":t,Q3=(t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[n,r])=>{let s=Z3(n,r);if(!s)return a;let o=z3(r);return a[s]=o,a},{})};function Rb(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}function X3(...t){return e=>{let i=!1,a=t.map(n=>{let r=Rb(n,e);return!i&&typeof r=="function"&&(i=!0),r});if(i)return()=>{for(let n=0;n<a.length;n++){let r=a[n];typeof r=="function"?r():Rb(t[n],null)}}}}function J3(...t){return il.useCallback(X3(...t),t)}var j3=Object.prototype.hasOwnProperty,ew=(t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((n,r)=>e[r]===n);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let n=0;n<i.length;n++)if(!j3.call(e,i[n])||!Object.is(t[i[n]],e[i[n]]))return!1;return!0},wA=(t,e,i)=>!ew(e,t[i]),tw=(t,e,i)=>{t[i]=e},iw=(t,e,i,a=tw,n=wA)=>il.useEffect(()=>{let r=i?.current;r&&n(r,e,t)&&a(r,e,t)},[i?.current,e]),ri=iw,aw=()=>{try{return"3.11.7"}catch{}return"UNKNOWN"},nw=aw(),rw=()=>nw,de=(t,e,i)=>il.useEffect(()=>{let a=e?.current;if(!a||!i)return;let n=t,r=i;return a.addEventListener(n,r),()=>{a.removeEventListener(n,r)}},[e?.current,i,t]),sw=tl.forwardRef(({children:t,...e},i)=>tl.createElement("mux-player",{suppressHydrationWarning:!0,...Q3(e),ref:i},t)),ow=(t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:n,onEmptied:r,onLoadStart:s,onLoadedData:o,onLoadedMetadata:d,onProgress:h,onDurationChange:b,onVolumeChange:g,onRateChange:v,onResize:E,onWaiting:T,onPlay:f,onPlaying:y,onTimeUpdate:I,onPause:V,onSeeking:fe,onSeeked:qe,onStalled:Re,onSuspend:He,onEnded:Be,onError:rt,onCuePointChange:Xe,onChapterChange:Kt,metadata:Gt,tokens:Yt,paused:qt,playbackId:Zt,playbackRates:zt,currentTime:Qt,themeProps:aa,extraSourceParams:De,castCustomData:Xt,_hlsConfig:Jt,...jt}=e;return ri("tokens",Yt,t),ri("playbackId",Zt,t),ri("playbackRates",zt,t),ri("metadata",Gt,t),ri("extraSourceParams",De,t),ri("_hlsConfig",Jt,t),ri("themeProps",aa,t),ri("castCustomData",Xt,t),ri("paused",qt,t,(We,Ze)=>{Ze!=null&&(Ze?We.pause():We.play())},(We,Ze,Ha)=>We.hasAttribute("autoplay")&&!We.hasPlayed?!1:wA(We,Ze,Ha)),ri("currentTime",Qt,t,(We,Ze)=>{Ze!=null&&(We.currentTime=Ze)}),de("abort",t,i),de("canplay",t,a),de("canplaythrough",t,n),de("emptied",t,r),de("loadstart",t,s),de("loadeddata",t,o),de("loadedmetadata",t,d),de("progress",t,h),de("durationchange",t,b),de("volumechange",t,g),de("ratechange",t,v),de("resize",t,E),de("waiting",t,T),de("play",t,f),de("playing",t,y),de("timeupdate",t,I),de("pause",t,V),de("seeking",t,fe),de("seeked",t,qe),de("stalled",t,Re),de("suspend",t,He),de("ended",t,Be),de("error",t,rt),de("cuepointchange",t,Xe),de("chapterchange",t,Kt),[jt]},lw=rw(),dw="mux-player-react",uw=tl.forwardRef((t,e)=>{var i;let a=il.useRef(null),n=J3(a,e),[r]=ow(a,t),[s]=il.useState((i=t.playerInitTime)!=null?i:pv());return tl.createElement(sw,{ref:n,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:dw,playerSoftwareVersion:lw,playerInitTime:s,...r})}),cw=uw;function DC(t){const e=RA.c(5),{customDomain:i,playbackId:a,tokens:n}=t;let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r={position:"absolute",inset:0},e[0]=r):r=e[0];let s;return e[1]!==i||e[2]!==a||e[3]!==n?(s=DA.jsx(cw,{customDomain:i,theme:"sutro",playbackId:a,tokens:n,autoPlay:!1,loop:!1,style:r}),e[1]=i,e[2]=a,e[3]=n,e[4]=s):s=e[4],s}export{DC as VideoPlayer};
