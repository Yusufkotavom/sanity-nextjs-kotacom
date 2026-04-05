import{R as kr,r as Sr}from"./sanity-hzCFaQqv.js";import{T as Cl,i as ms,F as Nm,q as Pm,B as Um,a as $m,K as Hm,g as Bm,M as Wm,G as Fm,L as Km,_ as Vm,p as Gm,S as Ym,I as qm,f as Zm,y as zm,b as Qm,Q as qt,j as Xm,J as Jm,m as To,E as jm,c as ep,C as tp,d as Ie,x as V,V as Ec,v as bc,e as U,h as be,r as mr,k as so,l as ip,n as ap}from"./castable-mixin-DhIkxqA0.js";import{o as q1,s as Z1,t as z1}from"./castable-mixin-DhIkxqA0.js";import{C as Br,M as rp}from"./mixin-BY5xW4uI.js";import"./hls-CplUDmW5.js";var gc=t=>{throw TypeError(t)},wl=(t,e,i)=>e.has(t)||gc("Cannot "+i),J=(t,e,i)=>(wl(t,e,"read from private field"),i?i.call(t):e.get(t)),Ce=(t,e,i)=>e.has(t)?gc("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Ge=(t,e,i,a)=>(wl(t,e,"write to private field"),e.set(t,i),i),Wr=(t,e,i)=>(wl(t,e,"access private method"),i),np=()=>{try{return"0.30.4"}catch{}return"UNKNOWN"},sp=np(),op=()=>sp,lp=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,u={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",MAX_AUTO_RESOLUTION:"max-auto-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo",CAP_RENDITION_TO_PLAYER_SIZE:"cap-rendition-to-player-size"},dp=Object.values(u),tu=op(),iu="mux-video",Va,sn,Ga,on,ln,dn,un,cn,Ya,hn,De,mi,mn,qa,up=class extends Br{constructor(){super(),Ce(this,De),Ce(this,Va),Ce(this,sn),Ce(this,Ga,{}),Ce(this,on,{}),Ce(this,ln),Ce(this,dn),Ce(this,un),Ce(this,cn),Ce(this,Ya,""),Ce(this,hn,e=>{var i;let a=jm(this.nativeEl),r=(i=this.metadata)!=null?i:{};this.metadata={...a,...r},a?.["com.mux.video.branding"]==="mux-free-plan"&&(Ge(this,Ya,"default"),this.updateLogo())}),Ce(this,mn),Ge(this,sn,Cl())}static get NAME(){return iu}static get VERSION(){return tu}static get observedAttributes(){var e;return[...dp,...(e=Br.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?lp:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${Br.getTemplateHTML(e)}
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
        ${this.getLogoHTML((i=e[u.LOGO])!=null?i:"")}
      </slot>
    `}get preferCmcd(){var e;return(e=this.getAttribute(u.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?ms.includes(e)?this.setAttribute(u.PREFER_CMCD,e):console.warn(`Invalid value for preferCmcd. Must be one of ${ms.join()}`):this.removeAttribute(u.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(u.PLAYER_INIT_TIME)?+this.getAttribute(u.PLAYER_INIT_TIME):J(this,sn)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(u.PLAYER_INIT_TIME):this.setAttribute(u.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=J(this,un))!=null?e:iu}set playerSoftwareName(e){Ge(this,un,e)}get playerSoftwareVersion(){var e;return(e=J(this,dn))!=null?e:tu}set playerSoftwareVersion(e){Ge(this,dn,e)}get _hls(){var e;return(e=J(this,De,mi))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=Nm(this.nativeEl))!=null?e:null}get errorTranslator(){return J(this,cn)}set errorTranslator(e){Ge(this,cn,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(u.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(u.TYPE,e):this.removeAttribute(u.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(u.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(u.DEBUG,""):this.removeAttribute(u.DEBUG))}get disableTracking(){return this.hasAttribute(u.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(u.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(u.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(u.DISABLE_COOKIES,""):this.removeAttribute(u.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(u.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(u.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(u.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(u.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(u.START_TIME):this.setAttribute(u.START_TIME,`${e}`))}get playbackId(){var e;return this.hasAttribute(u.PLAYBACK_ID)?this.getAttribute(u.PLAYBACK_ID):(e=Pm(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(u.PLAYBACK_ID,e):this.removeAttribute(u.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(u.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(u.MAX_RESOLUTION,e):this.removeAttribute(u.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(u.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(u.MIN_RESOLUTION,e):this.removeAttribute(u.MIN_RESOLUTION))}get maxAutoResolution(){var e;return(e=this.getAttribute(u.MAX_AUTO_RESOLUTION))!=null?e:void 0}set maxAutoResolution(e){e==null?this.removeAttribute(u.MAX_AUTO_RESOLUTION):this.setAttribute(u.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return(e=this.getAttribute(u.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(u.RENDITION_ORDER,e):this.removeAttribute(u.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(u.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(u.PROGRAM_START_TIME):this.setAttribute(u.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(u.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(u.PROGRAM_END_TIME):this.setAttribute(u.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(u.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(u.ASSET_START_TIME):this.setAttribute(u.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(u.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(u.ASSET_END_TIME):this.setAttribute(u.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(u.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(u.CUSTOM_DOMAIN,e):this.removeAttribute(u.CUSTOM_DOMAIN))}get capRenditionToPlayerSize(){var e;return((e=this._hlsConfig)==null?void 0:e.capLevelToPlayerSize)!=null?this._hlsConfig.capLevelToPlayerSize:J(this,mn)}set capRenditionToPlayerSize(e){Ge(this,mn,e)}get drmToken(){var e;return(e=this.getAttribute(u.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(u.DRM_TOKEN,e):this.removeAttribute(u.DRM_TOKEN))}get playbackToken(){var e,i,a,r;if(this.hasAttribute(u.PLAYBACK_TOKEN))return(e=this.getAttribute(u.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(u.PLAYBACK_ID)){let[,n]=Um((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(n).get("token"))!=null?a:void 0}if(this.src)return(r=new URLSearchParams(this.src).get("token"))!=null?r:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(u.PLAYBACK_TOKEN,e):this.removeAttribute(u.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(u.PLAYBACK_TOKEN),i=this.getAttribute(u.DRM_TOKEN);return{...J(this,on),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){Ge(this,on,e??{})}get ended(){return $m(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(u.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(u.ENV_KEY,e):this.removeAttribute(u.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(u.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(u.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(u.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(u.STREAM_TYPE))!=null?e:Hm(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(u.STREAM_TYPE,e):this.removeAttribute(u.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(u.TARGET_LIVE_WINDOW)?+this.getAttribute(u.TARGET_LIVE_WINDOW):Bm(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(u.TARGET_LIVE_WINDOW):this.setAttribute(u.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(u.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,r=(e=this.nativeEl.seekable.end(0))!=null?e:0,n=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(n,r-a)}return Wm(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(u.LIVE_EDGE_OFFSET))return+this.getAttribute(u.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(u.LIVE_EDGE_OFFSET):this.setAttribute(u.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return Fm(this.nativeEl)}async addCuePoints(e){return Km(this.nativeEl,e)}get activeCuePoint(){return Vm(this.nativeEl)}get cuePoints(){return Gm(this.nativeEl)}async addChapters(e){return Ym(this.nativeEl,e)}get activeChapter(){return qm(this.nativeEl)}get chapters(){return Zm(this.nativeEl)}getStartDate(){return zm(this.nativeEl,this._hls)}get currentPdt(){return Qm(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(u.PREFER_PLAYBACK);if(e===qt.MSE||e===qt.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===qt.MSE||e===qt.NATIVE?this.setAttribute(u.PREFER_PLAYBACK,e):this.removeAttribute(u.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![u.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...J(this,Ga)}}set metadata(e){Ge(this,Ga,e??{}),this.mux&&this.mux.emit("hb",J(this,Ga))}get _hlsConfig(){return J(this,ln)}set _hlsConfig(e){Ge(this,ln,e)}get logo(){var e;return(e=this.getAttribute(u.LOGO))!=null?e:J(this,Ya)}set logo(e){e?this.setAttribute(u.LOGO,e):this.removeAttribute(u.LOGO)}load(){Xm(this,this.nativeEl,J(this,De,mi))}unload(){Jm(this.nativeEl,J(this,De,mi),this)}attributeChangedCallback(e,i,a){var r,n;switch(Br.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case u.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case u.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let s=!!i,l=!!a;!s&&l?Wr(this,De,qa).call(this):s&&!l?this.unload():s&&l&&(this.unload(),Wr(this,De,qa).call(this));break}case"autoplay":if(a===i)break;(r=J(this,De,mi))==null||r.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(n=J(this,De,mi))==null||n.setPreload(a);break;case u.PLAYBACK_ID:this.src=To(this);break;case u.DEBUG:{let s=this.debug;this.mux&&console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."),this._hls&&(this._hls.config.debug=s);break}case u.METADATA_URL:a&&fetch(a).then(s=>s.json()).then(s=>this.metadata=s).catch(()=>console.error(`Unable to load or parse metadata JSON from metadata-url ${a}!`));break;case u.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case u.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case u.LOGO:(a==null||a!==i)&&this.updateLogo();break;case u.DISABLE_TRACKING:{if(a==null||a!==i){let s=this.currentTime,l=this.paused;this.unload(),Wr(this,De,qa).call(this).then(()=>{this.currentTime=s,l||this.play()})}break}case u.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(s=>{s.trim().startsWith("muxData")&&(document.cookie=s.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}case u.CAP_RENDITION_TO_PLAYER_SIZE:(a==null||a!==i)&&(this.capRenditionToPlayerSize=a!=null?!0:void 0)}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(J(this,Ya)||this.logo);e.innerHTML=i}connectedCallback(){var e,i;(e=super.connectedCallback)==null||e.call(this),(i=this.nativeEl)==null||i.addEventListener("muxmetadata",J(this,hn)),this.nativeEl&&this.src&&!J(this,De,mi)&&Wr(this,De,qa).call(this)}disconnectedCallback(){var e,i;(e=this.nativeEl)==null||e.removeEventListener("muxmetadata",J(this,hn)),this.unload(),(i=super.disconnectedCallback)==null||i.call(this)}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}};Va=new WeakMap,sn=new WeakMap,Ga=new WeakMap,on=new WeakMap,ln=new WeakMap,dn=new WeakMap,un=new WeakMap,cn=new WeakMap,Ya=new WeakMap,hn=new WeakMap,De=new WeakSet,mi=function(){return ep(this.nativeEl)},mn=new WeakMap,qa=async function(){J(this,Va)||(await Ge(this,Va,Promise.resolve()),Ge(this,Va,null),this.load())};var fc=t=>{throw TypeError(t)},_c=(t,e,i)=>e.has(t)||fc("Cannot "+i),cp=(t,e,i)=>(_c(t,e,"read from private field"),i?i.call(t):e.get(t)),hp=(t,e,i)=>e.has(t)?fc("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),mp=(t,e,i,a)=>(_c(t,e,"write to private field"),e.set(t,i),i),Ac=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment>"u"){class t extends Ac{}globalThis.DocumentFragment=t}var pp=class extends Ac{},vp={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(pp)}},Ep={customElements:vp},bp=typeof window>"u"||typeof globalThis.customElements>"u",oo=bp?Ep:globalThis,pn,au=class extends tp(rp(up)){constructor(){super(...arguments),hp(this,pn)}get autoplay(){let t=this.getAttribute("autoplay");return t===null?!1:t===""?!0:t}set autoplay(t){let e=this.autoplay;t!==e&&(t?this.setAttribute("autoplay",typeof t=="string"?t:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var t;return(t=cp(this,pn))!=null?t:this.muxCastCustomData}set castCustomData(t){mp(this,pn,t)}};pn=new WeakMap;oo.customElements.get("mux-video")||(oo.customElements.define("mux-video",au),oo.MuxVideoElement=au);const g={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},O={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Tc={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},yc=Object.entries(Tc),o=yc.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),gp={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},ft=yc.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...gp});Object.entries(ft).reduce((t,[e,i])=>{const a=o[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const fp=Object.entries(o).reduce((t,[e,i])=>{const a=ft[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),bt={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},pa={DISABLED:"disabled",SHOWING:"showing"},lo={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Te={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},It={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},_p={FULLSCREEN:"fullscreen"};function Ap(t){return t?.map(yp).join(" ")}function Tp(t){return t?.split(/\s+/).map(kp)}function yp(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}function kp(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function Sp(t){return t?.map(Lp).join(" ")}function Ip(t){return t?.split(/\s+/).map(Mp)}function Lp(t){if(t){const{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(n=>n!=null).join(":")}}function Mp(t){if(t){const[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}function Cp(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function Rl(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}function kc(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}const Sc=t=>new Promise(e=>setTimeout(e,t)),wp={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var ru;const uo={en:wp};let yo=((ru=globalThis.navigator)==null?void 0:ru.language)||"en";const Rp=t=>{yo=t},Dp=t=>{var e,i,a;const[r]=yo.split("-");return((e=uo[yo])==null?void 0:e[t])||((i=uo[r])==null?void 0:i[t])||((a=uo.en)==null?void 0:a[t])||t},b=(t,e={})=>Dp(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),nu=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Op=(t,e)=>{const i=b(t===1?nu[e].singular:nu[e].plural);return`${t} ${i}`},pr=t=>{if(!Rl(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),n=[a.getHours(),a.getMinutes(),a.getSeconds()].map((s,l)=>s&&Op(s,l)).filter(s=>s).join(", ");return i?b("{time} remaining",{time:n}):n};function zt(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),n=Math.floor(t/3600);const s=Math.floor(e/60%60),l=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(n=r=a="0"),n=n>0||l>0?n+":":"",r=((n||s>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+n+r+a}class Ic{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class Lc extends Ic{}let su=class extends Lc{constructor(){super(...arguments),this.role=null}};class xp{observe(){}unobserve(){}disconnect(){}}const Mc={createElement:function(){return new Ir.HTMLElement},createElementNS:function(){return new Ir.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Ir={ResizeObserver:xp,document:Mc,Node:Lc,Element:su,HTMLElement:class extends su{constructor(){super(...arguments),this.innerHTML=""}get content(){return new Ir.DocumentFragment}},DocumentFragment:class extends Ic{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{parseFromString(e,i){return{body:{textContent:e}}}}},Cc="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",wc=Object.keys(Ir).every(t=>t in globalThis),d=Cc&&!wc?Ir:globalThis,ee=Cc&&!wc?Mc:globalThis.document,ou=new WeakMap,Dl=t=>{let e=ou.get(t);return e||ou.set(t,e=new Set),e},Rc=new d.ResizeObserver(t=>{for(const e of t)for(const i of Dl(e.target))i(e)});function Ta(t,e){Dl(t).add(e),Rc.observe(t)}function ya(t,e){const i=Dl(t);i.delete(e),i.size||Rc.unobserve(t)}function Le(t){const e={};for(const i of t)e[i.name]=i.value;return e}function fe(t){var e;return(e=ko(t))!=null?e:Ma(t,"media-controller")}function ko(t){var e;const{MEDIA_CONTROLLER:i}=O,a=t.getAttribute(i);if(a)return(e=Fs(t))==null?void 0:e.getElementById(a)}const Dc=(t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},Np=(t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Oc=(t,e)=>Np(t,e)[0],Rt=(t,e)=>!t||!e?!1:t?.contains(e)?!0:Rt(t,e.getRootNode().host),Ma=(t,e)=>{if(!t)return null;const i=t.closest(e);return i||Ma(t.getRootNode().host,e)};function Ol(t=document){var e;const i=t?.activeElement;return i?(e=Ol(i.shadowRoot))!=null?e:i:null}function Fs(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function xc(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){const n=getComputedStyle(r);if(i&&n.opacity==="0"||a&&n.visibility==="hidden"||n.display==="none")return!1;r=r.parentElement,e--}return!0}function Pp(t,e,i,a){const r=a.x-i.x,n=a.y-i.y,s=r*r+n*n;if(s===0)return 0;const l=((t-i.x)*r+(e-i.y)*n)/s;return Math.max(0,Math.min(1,l))}function ie(t,e){const i=Up(t,a=>a===e);return i||xl(t,e)}function Up(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let n;try{n=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(const s of n??[])if(e(s.selectorText))return s}}function xl(t,e){var i,a;const r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],n=r?.[r.length-1];if(!n?.sheet)return console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};const s=n?.sheet.insertRule(`${e}{}`,n.sheet.cssRules.length);return(a=n.sheet.cssRules)==null?void 0:a[s]}function $(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}function q(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}$(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function w(t,e){return t.hasAttribute(e)}function R(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}w(t,e)!=i&&t.toggleAttribute(e,i)}function F(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function H(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;F(t,e,void 0)!==a&&t.setAttribute(e,a)}var Nc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},We=(t,e,i)=>(Nc(t,e,"read from private field"),i?i.call(t):e.get(t)),$p=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Fr=(t,e,i,a)=>(Nc(t,e,"write to private field"),e.set(t,i),i),le;function Hp(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}class Ks extends d.HTMLElement{constructor(){if(super(),$p(this,le,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[O.MEDIA_CONTROLLER,o.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,n,s,l,c;e===O.MEDIA_CONTROLLER&&(i&&((n=(r=We(this,le))==null?void 0:r.unassociateElement)==null||n.call(r,this),Fr(this,le,null)),a&&this.isConnected&&(Fr(this,le,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=We(this,le))==null?void 0:l.associateElement)==null||c.call(l,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Fr(this,le,Bp(this)),this.getAttribute(O.MEDIA_CONTROLLER)&&((i=(e=We(this,le))==null?void 0:e.associateElement)==null||i.call(e,this)),We(this,le)&&(We(this,le).addEventListener("pointerdown",this),We(this,le).addEventListener("click",this),We(this,le).hasAttribute("tabindex")||(We(this,le).tabIndex=0))}disconnectedCallback(){var e,i,a,r;this.getAttribute(O.MEDIA_CONTROLLER)&&((i=(e=We(this,le))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=We(this,le))==null||a.removeEventListener("pointerdown",this),(r=We(this,le))==null||r.removeEventListener("click",this),Fr(this,le,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:n,clientY:s}=e,{left:l,top:c,width:m,height:f}=this.getBoundingClientRect(),A=n-l,v=s-c;if(A<0||v<0||A>m||v>f||m===0&&f===0)return;const E=this._pointerType||"mouse";if(this._pointerType=void 0,E===lo.TOUCH){this.handleTap(e);return}else if(E===lo.MOUSE||E===lo.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return w(this,o.MEDIA_PAUSED)}set mediaPaused(e){R(this,o.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?g.MEDIA_PLAY_REQUEST:g.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new d.CustomEvent(i,{composed:!0,bubbles:!0}))}}le=new WeakMap;Ks.shadowRootOptions={mode:"open"};Ks.getTemplateHTML=Hp;function Bp(t){var e;const i=t.getAttribute(O.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):Ma(t,"media-controller")}d.customElements.get("media-gesture-receiver")||d.customElements.define("media-gesture-receiver",Ks);var lu=Ks,Nl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Z=(t,e,i)=>(Nl(t,e,"read from private field"),i?i.call(t):e.get(t)),ce=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Fe=(t,e,i,a)=>(Nl(t,e,"write to private field"),e.set(t,i),i),ze=(t,e,i)=>(Nl(t,e,"access private method"),i),Za,ps,Hi,ka,la,So,Bi,vn,Io,Pc,Lo,Uc,Lr,Vs,Gs,Pl,Sa,Mr,xt,En;const k={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function Wp(t){return`
    <style>
      
      :host([${o.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
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

      :host(:not([${k.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

      
      :host([${k.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${k.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${k.AUDIO}])[${k.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${k.AUDIO}])[${k.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${k.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${k.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${k.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

      
      :host(:not([${k.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${k.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${k.USER_INACTIVE}]:not([${o.MEDIA_PAUSED}]):not([${o.MEDIA_IS_AIRPLAYING}]):not([${o.MEDIA_IS_CASTING}]):not([${k.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${k.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${k.USER_INACTIVE}]:not([${k.NO_AUTOHIDE}]):not([${o.MEDIA_PAUSED}]):not([${o.MEDIA_IS_CASTING}]):not([${k.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${k.USER_INACTIVE}][${k.AUTOHIDE_OVER_CONTROLS}]:not([${k.NO_AUTOHIDE}]):not([${o.MEDIA_PAUSED}]):not([${o.MEDIA_IS_CASTING}]):not([${k.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${k.AUDIO}])[${o.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
        <template shadowrootmode="${lu.shadowRootOptions.mode}">
          ${lu.getTemplateHTML({})}
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
  `}const Fp=Object.values(o),Kp="sm:384 md:576 lg:768 xl:960";function Vp(t){$c(t.target,t.contentRect.width)}function $c(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(k.BREAKPOINTS))!=null?i:Kp,r=Gp(a),n=Yp(r,e);let s=!1;if(Object.keys(r).forEach(l=>{if(n.includes(l)){t.hasAttribute(`breakpoint${l}`)||(t.setAttribute(`breakpoint${l}`,""),s=!0);return}t.hasAttribute(`breakpoint${l}`)&&(t.removeAttribute(`breakpoint${l}`),s=!0)}),s){const l=new CustomEvent(ft.BREAKPOINTS_CHANGE,{detail:n});t.dispatchEvent(l)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(ft.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Gp(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function Yp(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}class Ys extends d.HTMLElement{constructor(){if(super(),ce(this,Io),ce(this,Lo),ce(this,Lr),ce(this,Gs),ce(this,Sa),ce(this,Za,void 0),ce(this,ps,0),ce(this,Hi,null),ce(this,ka,null),ce(this,la,void 0),this.breakpointsComputed=!1,ce(this,So,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const r=a.removedNodes;for(const n of r){if(n.slot!="media"||a.target!=this)continue;let s=a.previousSibling&&a.previousSibling.previousElementSibling;if(!s||!i)this.mediaUnsetCallback(n);else{let l=s.slot!=="media";for(;(s=s.previousSibling)!==null;)s.slot=="media"&&(l=!1);l&&this.mediaUnsetCallback(n)}}if(i)for(const n of a.addedNodes)n===i&&this.handleMediaUpdated(i)}}),ce(this,Bi,!1),ce(this,vn,e=>{Z(this,Bi)||(setTimeout(()=>{Vp(e),Fe(this,Bi,!1)},0),Fe(this,Bi,!0))}),ce(this,xt,void 0),ce(this,En,()=>{if(!Z(this,xt).assignedElements({flatten:!0}).length){Z(this,Hi)&&this.mediaUnsetCallback(Z(this,Hi));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}Fe(this,Za,new MutationObserver(Z(this,So)))}static get observedAttributes(){return[k.AUTOHIDE,k.GESTURES_DISABLED].concat(Fp).filter(e=>![o.MEDIA_RENDITION_LIST,o.MEDIA_AUDIO_TRACK_LIST,o.MEDIA_CHAPTERS_CUES,o.MEDIA_WIDTH,o.MEDIA_HEIGHT,o.MEDIA_ERROR,o.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==k.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Fe(this,Hi,e),e.localName.includes("-")&&await d.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;Z(this,Za).observe(this,{childList:!0,subtree:!0}),Ta(this,Z(this,vn));const i=this.getAttribute(k.AUDIO)!=null,a=b(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(k.USER_INACTIVE,""),$c(this,this.getBoundingClientRect().width);const r=this.querySelector(":scope > slot[slot=media]");r&&(Fe(this,xt,r),Z(this,xt).addEventListener("slotchange",Z(this,En))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=d.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;ya(this,Z(this,vn)),clearTimeout(Z(this,ka)),Z(this,Za).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=d.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),Z(this,xt)&&(Z(this,xt).removeEventListener("slotchange",Z(this,En)),Fe(this,xt,null)),Fe(this,Bi,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){Fe(this,Hi,null)}handleEvent(e){switch(e.type){case"pointerdown":Fe(this,ps,e.timeStamp);break;case"pointermove":ze(this,Io,Pc).call(this,e);break;case"pointerup":ze(this,Lo,Uc).call(this,e);break;case"mouseleave":ze(this,Lr,Vs).call(this);break;case"mouseup":this.removeAttribute(k.KEYBOARD_CONTROL);break;case"keyup":ze(this,Sa,Mr).call(this),this.setAttribute(k.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);Fe(this,la,isNaN(i)?0:i)}get autohide(){return(Z(this,la)===void 0?2:Z(this,la)).toString()}get breakpoints(){return F(this,k.BREAKPOINTS)}set breakpoints(e){H(this,k.BREAKPOINTS,e)}get audio(){return w(this,k.AUDIO)}set audio(e){R(this,k.AUDIO,e)}get gesturesDisabled(){return w(this,k.GESTURES_DISABLED)}set gesturesDisabled(e){R(this,k.GESTURES_DISABLED,e)}get keyboardControl(){return w(this,k.KEYBOARD_CONTROL)}set keyboardControl(e){R(this,k.KEYBOARD_CONTROL,e)}get noAutohide(){return w(this,k.NO_AUTOHIDE)}set noAutohide(e){R(this,k.NO_AUTOHIDE,e)}get autohideOverControls(){return w(this,k.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){R(this,k.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return w(this,k.USER_INACTIVE)}set userInteractive(e){R(this,k.USER_INACTIVE,e)}}Za=new WeakMap;ps=new WeakMap;Hi=new WeakMap;ka=new WeakMap;la=new WeakMap;So=new WeakMap;Bi=new WeakMap;vn=new WeakMap;Io=new WeakSet;Pc=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-Z(this,ps)<250)return;ze(this,Gs,Pl).call(this),clearTimeout(Z(this,ka));const e=this.hasAttribute(k.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&ze(this,Sa,Mr).call(this)};Lo=new WeakSet;Uc=function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(k.USER_INACTIVE);[this,this.media].includes(t.target)&&e?ze(this,Lr,Vs).call(this):ze(this,Sa,Mr).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&ze(this,Sa,Mr).call(this)};Lr=new WeakSet;Vs=function(){if(Z(this,la)<0||this.hasAttribute(k.USER_INACTIVE))return;this.setAttribute(k.USER_INACTIVE,"");const t=new d.CustomEvent(ft.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};Gs=new WeakSet;Pl=function(){if(!this.hasAttribute(k.USER_INACTIVE))return;this.removeAttribute(k.USER_INACTIVE);const t=new d.CustomEvent(ft.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};Sa=new WeakSet;Mr=function(){ze(this,Gs,Pl).call(this),clearTimeout(Z(this,ka));const t=parseInt(this.autohide);t<0||Fe(this,ka,setTimeout(()=>{ze(this,Lr,Vs).call(this)},t*1e3))};xt=new WeakMap;En=new WeakMap;Ys.shadowRootOptions={mode:"open"};Ys.getTemplateHTML=Wp;d.customElements.get("media-container")||d.customElements.define("media-container",Ys);var Hc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ne=(t,e,i)=>(Hc(t,e,"read from private field"),i?i.call(t):e.get(t)),xa=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Kr=(t,e,i,a)=>(Hc(t,e,"write to private field"),e.set(t,i),i),Wi,Fi,vs,Ai,Tt,Nt;class Ul{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){xa(this,Tt),xa(this,Wi,void 0),xa(this,Fi,void 0),xa(this,vs,void 0),xa(this,Ai,new Set),Kr(this,Wi,e),Kr(this,Fi,i),Kr(this,vs,new Set(a))}[Symbol.iterator](){return ne(this,Tt,Nt).values()}get length(){return ne(this,Tt,Nt).size}get value(){var e;return(e=[...ne(this,Tt,Nt)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Kr(this,Ai,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...ne(this,Tt,Nt)][e]}values(){return ne(this,Tt,Nt).values()}forEach(e,i){ne(this,Tt,Nt).forEach(e,i)}add(...e){var i,a;e.forEach(r=>ne(this,Ai).add(r)),!(this.value===""&&!((i=ne(this,Wi))!=null&&i.hasAttribute(`${ne(this,Fi)}`)))&&((a=ne(this,Wi))==null||a.setAttribute(`${ne(this,Fi)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>ne(this,Ai).delete(a)),(i=ne(this,Wi))==null||i.setAttribute(`${ne(this,Fi)}`,`${this.value}`)}contains(e){return ne(this,Tt,Nt).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}Wi=new WeakMap;Fi=new WeakMap;vs=new WeakMap;Ai=new WeakMap;Tt=new WeakSet;Nt=function(){return ne(this,Ai).size?ne(this,Ai):ne(this,vs)};const qp=(t="")=>t.split(/\s+/),Bc=(t="")=>{const[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?bt.CAPTIONS:bt.SUBTITLES,language:i,label:r}},qs=(t="",e={})=>qp(t).map(i=>{const a=Bc(i);return{...e,...a}}),Wc=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Bc(e):e):typeof t=="string"?qs(t):[t]:[],Mo=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,Cr=(t=[])=>Array.prototype.map.call(t,Mo).join(" "),Zp=(t,e)=>i=>i[t]===e,Fc=t=>{const e=Object.entries(t).map(([i,a])=>Zp(i,a));return i=>e.every(a=>a(i))},vr=(t,e=[],i=[])=>{const a=Wc(i).map(Fc),r=n=>a.some(s=>s(n));Array.from(e).filter(r).forEach(n=>{n.mode=t})},Zs=(t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Fc(e);return Array.from(t.textTracks).filter(i)},Kc=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(o.MEDIA_SUBTITLES_SHOWING)},zp=t=>{var e;const{media:i,fullscreenElement:a}=t;try{const r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){const n=(e=a[r])==null?void 0:e.call(a);if(n instanceof Promise)return n.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},du="exitFullscreen"in ee?"exitFullscreen":"webkitExitFullscreen"in ee?"webkitExitFullscreen":"webkitCancelFullScreen"in ee?"webkitCancelFullScreen":void 0,Qp=t=>{var e;const{documentElement:i}=t;if(du){const a=(e=i?.[du])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},za="fullscreenElement"in ee?"fullscreenElement":"webkitFullscreenElement"in ee?"webkitFullscreenElement":void 0,Xp=t=>{const{documentElement:e,media:i}=t,a=e?.[za];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===_p.FULLSCREEN?i:a},Jp=t=>{var e;const{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;const n=Xp(t);if(!n)return!1;if(n===r||n===i)return!0;if(n.localName.includes("-")){let s=n.shadowRoot;if(!(za in s))return Rt(n,r);for(;s?.[za];){if(s[za]===r)return!0;s=(e=s[za])==null?void 0:e.shadowRoot}}return!1},jp="fullscreenEnabled"in ee?"fullscreenEnabled":"webkitFullscreenEnabled"in ee?"webkitFullscreenEnabled":void 0,ev=t=>{const{documentElement:e,media:i}=t;return!!e?.[jp]||i&&"webkitSupportsFullscreen"in i};let Vr;const $l=()=>{var t,e;return Vr||(Vr=(e=(t=ee)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Vr)},tv=async(t=$l())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([iv(t,i.signal),av(t,e)]);return i.abort(),a},iv=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),av=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Sc(10)}return t.volume!==e},rv=/.*Version\/.*Safari\/.*/.test(d.navigator.userAgent),Vc=(t=$l())=>d.matchMedia("(display-mode: standalone)").matches&&rv?!1:typeof t?.requestPictureInPicture=="function",Gc=(t=$l())=>ev({documentElement:ee,media:t}),nv=Gc(),sv=Vc(),ov=!!d.WebKitPlaybackTargetAvailabilityEvent,lv=!!d.chrome,Es=t=>Zs(t.media,e=>[bt.SUBTITLES,bt.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),Yc=t=>Zs(t.media,e=>e.mode===pa.SHOWING&&[bt.SUBTITLES,bt.CAPTIONS].includes(e.kind)),qc=(t,e)=>{const i=Es(t),a=Yc(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)vr(pa.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let n=i[0];const{options:s}=t;if(!s?.noSubtitlesLangPref){const f=d.localStorage.getItem("media-chrome-pref-subtitles-lang"),A=f?[f,...d.navigator.languages]:d.navigator.languages,v=i.filter(E=>A.some(y=>E.language.toLowerCase().startsWith(y.split("-")[0]))).sort((E,y)=>{const _=A.findIndex(S=>E.language.toLowerCase().startsWith(S.split("-")[0])),I=A.findIndex(S=>y.language.toLowerCase().startsWith(S.split("-")[0]));return _-I});v[0]&&(n=v[0])}const{language:l,label:c,kind:m}=n;vr(pa.DISABLED,i,a),vr(pa.SHOWING,i,[{language:l,label:c,kind:m}])}}},Hl=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?dv(t,e):Object.entries(t).every(([i,a])=>i in e&&Hl(a,e[i])),dv=(t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,n)=>Hl(r,e[n])):!0},uv=Object.values(It);let bs;const cv=tv().then(t=>(bs=t,bs)),hv=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof d.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=d.customElements.get(i);a&&e instanceof a||(await d.customElements.whenDefined(i),d.customElements.upgrade(e))}))},mv=new d.DOMParser,pv=t=>t&&(mv.parseFromString(t,"text/html").body.textContent||t),Qa={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:r}=t;if(e?.type!=="playing")return(a=(i=r?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const r=d.localStorage.getItem("media-chrome-pref-muted")!==null,n=i.hasAttribute("muted");if(a){r&&d.localStorage.removeItem("media-chrome-pref-muted");return}if(n&&!r)return;d.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(r){console.debug("Error setting muted pref",r)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const r=d.localStorage.getItem("media-chrome-pref-muted")==="true";Qa.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?d.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&d.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(r){console.debug("Error setting volume pref",r)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const r=d.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Qa.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!Rl(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((r,n)=>[Number(a.start(n).toFixed(3)),Number(a.end(n).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[It.LIVE,It.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:r}=e;if(uv.includes(r))return r===It.UNKNOWN?a:r;const n=e.duration;return n===1/0?It.LIVE:Number.isFinite(n)?It.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Qa.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===It.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Qa.mediaStreamType.get(t)===It.LIVE))return!1;const r=e.seekable;if(!r)return!0;if(!r.length)return!1;const n=r.end(r.length-1)-i;return e.currentTime>=n},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Es(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return Yc(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:r,options:n}=e;if(!r)return;const s=l=>{var c;!n.defaultSubtitles||l&&![bt.CAPTIONS,bt.SUBTITLES].includes((c=l?.track)==null?void 0:c.kind)||qc(e,!0)};return r.addEventListener("loadstart",s),(i=r.textTracks)==null||i.addEventListener("addtrack",s),(a=r.textTracks)==null||a.addEventListener("removetrack",s),()=>{var l,c;r.removeEventListener("loadstart",s),(l=r.textTracks)==null||l.removeEventListener("addtrack",s),(c=r.textTracks)==null||c.removeEventListener("removetrack",s)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=Zs(i,{kind:bt.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:r,startTime:n,endTime:s})=>({text:pv(r),startTime:n,endTime:s}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const r=a.querySelector('track[kind="chapters"][default][src]'),n=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r?.addEventListener("load",t),n?.addEventListener("load",t),()=>{r?.removeEventListener("load",t),n?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?Rt(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let n=r.pictureInPictureElement.shadowRoot;for(;n?.pictureInPictureElement;){if(n.pictureInPictureElement===a)return!0;n=(i=n.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!ee.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const n=()=>{i.removeEventListener("loadedmetadata",s),i.preload="none"},s=()=>{i.requestPictureInPicture().catch(a),n()};i.addEventListener("loadedmetadata",s),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),n()},1e3)}else throw r}else throw r})}else ee.pictureInPictureElement&&ee.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:r}=t;return(a=(i=r?.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,r=Array.prototype.findIndex.call(i.videoRenditions,n=>n.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return Jp(t)},set(t,e,i){var a,r;t?(zp(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((r=e.media)==null||r.focus())):Qp(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&d.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!nv||!Gc(e))return Te.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!sv||!Vc(e))return Te.UNSUPPORTED;if(e?.disablePictureInPicture)return Te.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(bs===!1||e?.volume==null)return Te.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{bs==null&&cv.then(e=>t(e?void 0:Te.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!lv||!((i=a?.remote)!=null&&i.state))return Te.UNSUPPORTED;if(!(e==null||e==="available"))return Te.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(n=>{t({availability:n?"available":"not-available"})}).catch(n=>{n.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var n;(n=a?.remote)==null||n.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!ov)return Te.UNSUPPORTED;if(e?.availability==="not-available")return Te.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(n=>{t({availability:n?"available":"not-available"})}).catch(n=>{n.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var n;(n=a?.remote)==null||n.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return Te.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return Te.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return Te.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return Te.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},vv={[g.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,n;const{media:s}=e,l=i??void 0;let c,m;if(s&&l!=null){const[E]=Zs(s,{kind:bt.METADATA,label:"thumbnails"}),y=Array.prototype.find.call((a=E?.cues)!=null?a:[],(_,I,S)=>I===0?_.endTime>l:I===S.length-1?_.startTime<=l:_.startTime<=l&&_.endTime>l);if(y){const _=/'^(?:[a-z]+:)?\/\//i.test(y.text)||(r=s?.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,I=new URL(y.text,_);m=new URLSearchParams(I.hash).get("#xywh").split(",").map(Q=>+Q),c=I.href}}const f=t.mediaDuration.get(e);let v=(n=t.mediaChaptersCues.get(e).find((E,y,_)=>y===_.length-1&&f===E.endTime?E.startTime<=l&&E.endTime>=l:E.startTime<=l&&E.endTime>l))==null?void 0:n.text;return i!=null&&v==null&&(v=""),{mediaPreviewTime:l,mediaPreviewImage:c,mediaPreviewCoords:m,mediaPreviewChapter:v}},[g.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[g.MEDIA_PLAY_REQUEST](t,e){var i,a,r,n;const s="mediaPaused",c=t.mediaStreamType.get(e)===It.LIVE,m=!((i=e.options)!=null&&i.noAutoSeekToLive),f=t.mediaTargetLiveWindow.get(e)>0;if(c&&m&&!f){const A=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(A){const v=(n=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?n:0,E=A-v;t.mediaCurrentTime.set(E,e)}}t[s].set(!1,e)},[g.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",r=i;t[a].set(r,e)},[g.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[g.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[g.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[g.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[g.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",r=i;t[a].set(r,e)},[g.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;const n="mediaCurrentTime",s=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(s)))return;const l=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,c=s-l;t[n].set(c,e)},[g.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:r}=e,n=Es(e),s=Wc(i),l=(a=s[0])==null?void 0:a.language;l&&!r.noSubtitlesLangPref&&d.localStorage.setItem("media-chrome-pref-subtitles-lang",l),vr(pa.SHOWING,n,s)},[g.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=Es(e),r=i??[];vr(pa.DISABLED,a,r)},[g.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){qc(e,i)},[g.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",r=i;t[a].set(r,e)},[g.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[g.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[g.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[g.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[g.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[g.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[g.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[g.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},Ev=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Qa,requestMap:r=vv,options:n={},monitorStateOwnersOnlyWithSubscriptions:s=!0})=>{const l=[],c={options:{...n}};let m=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const f=_=>{_!=null&&(Hl(_,m)||(m=Object.freeze({...m,..._}),l.forEach(I=>I(m))))},A=()=>{const _=Object.entries(a).reduce((I,[S,{get:Q}])=>(I[S]=Q(c),I),{});f(_)},v={};let E;const y=async(_,I)=>{var S,Q,Xe,Je,$e,me,pe,je,Me,Jt,jt,ei,ti,ii,ai,ri;const wi=!!E;if(E={...c,...E??{},..._},wi)return;await hv(...Object.values(_));const He=l.length>0&&I===0&&s,ni=c.media!==E.media,si=((S=c.media)==null?void 0:S.textTracks)!==((Q=E.media)==null?void 0:Q.textTracks),oi=((Xe=c.media)==null?void 0:Xe.videoRenditions)!==((Je=E.media)==null?void 0:Je.videoRenditions),ve=(($e=c.media)==null?void 0:$e.audioTracks)!==((me=E.media)==null?void 0:me.audioTracks),_e=((pe=c.media)==null?void 0:pe.remote)!==((je=E.media)==null?void 0:je.remote),$r=c.documentElement!==E.documentElement,Fd=!!c.media&&(ni||He),Kd=!!((Me=c.media)!=null&&Me.textTracks)&&(si||He),Vd=!!((Jt=c.media)!=null&&Jt.videoRenditions)&&(oi||He),Gd=!!((jt=c.media)!=null&&jt.audioTracks)&&(ve||He),Yd=!!((ei=c.media)!=null&&ei.remote)&&(_e||He),qd=!!c.documentElement&&($r||He),no=Fd||Kd||Vd||Gd||Yd||qd,Ri=l.length===0&&I===1&&s,Zd=!!E.media&&(ni||Ri),zd=!!((ti=E.media)!=null&&ti.textTracks)&&(si||Ri),Qd=!!((ii=E.media)!=null&&ii.videoRenditions)&&(oi||Ri),Xd=!!((ai=E.media)!=null&&ai.audioTracks)&&(ve||Ri),Jd=!!((ri=E.media)!=null&&ri.remote)&&(_e||Ri),jd=!!E.documentElement&&($r||Ri),eu=Zd||zd||Qd||Xd||Jd||jd;if(!(no||eu)){Object.entries(E).forEach(([x,Oa])=>{c[x]=Oa}),A(),E=void 0;return}Object.entries(a).forEach(([x,{get:Oa,mediaEvents:Mm=[],textTracksEvents:Cm=[],videoRenditionsEvents:wm=[],audioTracksEvents:Rm=[],remoteEvents:Dm=[],rootEvents:Om=[],stateOwnersUpdateHandlers:xm=[]}])=>{v[x]||(v[x]={});const Ae=K=>{const X=Oa(c,K);f({[x]:X})};let ae;ae=v[x].mediaEvents,Mm.forEach(K=>{ae&&Fd&&(c.media.removeEventListener(K,ae),v[x].mediaEvents=void 0),Zd&&(E.media.addEventListener(K,Ae),v[x].mediaEvents=Ae)}),ae=v[x].textTracksEvents,Cm.forEach(K=>{var X,Be;ae&&Kd&&((X=c.media.textTracks)==null||X.removeEventListener(K,ae),v[x].textTracksEvents=void 0),zd&&((Be=E.media.textTracks)==null||Be.addEventListener(K,Ae),v[x].textTracksEvents=Ae)}),ae=v[x].videoRenditionsEvents,wm.forEach(K=>{var X,Be;ae&&Vd&&((X=c.media.videoRenditions)==null||X.removeEventListener(K,ae),v[x].videoRenditionsEvents=void 0),Qd&&((Be=E.media.videoRenditions)==null||Be.addEventListener(K,Ae),v[x].videoRenditionsEvents=Ae)}),ae=v[x].audioTracksEvents,Rm.forEach(K=>{var X,Be;ae&&Gd&&((X=c.media.audioTracks)==null||X.removeEventListener(K,ae),v[x].audioTracksEvents=void 0),Xd&&((Be=E.media.audioTracks)==null||Be.addEventListener(K,Ae),v[x].audioTracksEvents=Ae)}),ae=v[x].remoteEvents,Dm.forEach(K=>{var X,Be;ae&&Yd&&((X=c.media.remote)==null||X.removeEventListener(K,ae),v[x].remoteEvents=void 0),Jd&&((Be=E.media.remote)==null||Be.addEventListener(K,Ae),v[x].remoteEvents=Ae)}),ae=v[x].rootEvents,Om.forEach(K=>{ae&&qd&&(c.documentElement.removeEventListener(K,ae),v[x].rootEvents=void 0),jd&&(E.documentElement.addEventListener(K,Ae),v[x].rootEvents=Ae)});const Hr=v[x].stateOwnersUpdateHandlers;if(Hr&&no&&(Array.isArray(Hr)?Hr:[Hr]).forEach(X=>{typeof X=="function"&&X()}),eu){const K=xm.map(X=>X(Ae,E)).filter(X=>typeof X=="function");v[x].stateOwnersUpdateHandlers=K.length===1?K[0]:K}else no&&(v[x].stateOwnersUpdateHandlers=void 0)}),Object.entries(E).forEach(([x,Oa])=>{c[x]=Oa}),A(),E=void 0};return y({media:t,fullscreenElement:e,documentElement:i,options:n}),{dispatch(_){const{type:I,detail:S}=_;if(r[I]&&m.mediaErrorCode==null){f(r[I](a,c,_));return}I==="mediaelementchangerequest"?y({media:S}):I==="fullscreenelementchangerequest"?y({fullscreenElement:S}):I==="documentelementchangerequest"?y({documentElement:S}):I==="optionschangerequest"&&(Object.entries(S??{}).forEach(([Q,Xe])=>{c.options[Q]=Xe}),A())},getState(){return m},subscribe(_){return y({},l.length+1),l.push(_),_(m),()=>{const I=l.indexOf(_);I>=0&&(y({},l.length-1),l.splice(I,1))}}}};var Bl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},T=(t,e,i)=>(Bl(t,e,"read from private field"),i?i.call(t):e.get(t)),we=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ke=(t,e,i,a)=>(Bl(t,e,"write to private field"),e.set(t,i),i),Na=(t,e,i)=>(Bl(t,e,"access private method"),i),Lt,Xa,C,vt,Ja,rt,bn,ja,gn,Co,Si,fn,wo,Ro,Zc;const zc=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],uu=10,cu=.025,hu=.25,bv=.25,gv=2,p={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class Qc extends Ys{constructor(){super(),we(this,gn),we(this,fn),we(this,Ro),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,we(this,Lt,new Ul(this,p.HOTKEYS)),we(this,Xa,void 0),we(this,C,void 0),we(this,vt,null),we(this,Ja,void 0),we(this,rt,void 0),we(this,bn,i=>{var a;(a=T(this,C))==null||a.dispatch(i)}),we(this,ja,void 0),we(this,Si,i=>{const{key:a,shiftKey:r}=i;if(!(r&&(a==="/"||a==="?")||zc.includes(a))){this.removeEventListener("keyup",T(this,Si));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};Ke(this,Ja,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);const n=a.toLowerCase(),s=new d.CustomEvent(fp[n],{composed:!0,detail:r});this.dispatchEvent(s)}),e=i}),this.hasAttribute(p.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(p.NO_HOTKEYS,p.HOTKEYS,p.DEFAULT_STREAM_TYPE,p.DEFAULT_SUBTITLES,p.DEFAULT_DURATION,p.NO_MUTED_PREF,p.NO_VOLUME_PREF,p.LANG,p.LOOP,p.LIVE_EDGE_OFFSET,p.SEEK_TO_LIVE_OFFSET,p.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return T(this,C)}set mediaStore(e){var i,a;if(T(this,C)&&((i=T(this,rt))==null||i.call(this),Ke(this,rt,void 0)),Ke(this,C,e),!T(this,C)&&!this.hasAttribute(p.NO_DEFAULT_STORE)){Na(this,gn,Co).call(this);return}Ke(this,rt,(a=T(this,C))==null?void 0:a.subscribe(T(this,Ja)))}get fullscreenElement(){var e;return(e=T(this,Xa))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(p.FULLSCREEN_ELEMENT)&&this.removeAttribute(p.FULLSCREEN_ELEMENT),Ke(this,Xa,e),(i=T(this,C))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return w(this,p.DEFAULT_SUBTITLES)}set defaultSubtitles(e){R(this,p.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return F(this,p.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){H(this,p.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return $(this,p.DEFAULT_DURATION)}set defaultDuration(e){q(this,p.DEFAULT_DURATION,e)}get noHotkeys(){return w(this,p.NO_HOTKEYS)}set noHotkeys(e){R(this,p.NO_HOTKEYS,e)}get keysUsed(){return F(this,p.KEYS_USED)}set keysUsed(e){H(this,p.KEYS_USED,e)}get liveEdgeOffset(){return $(this,p.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){q(this,p.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return w(this,p.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){R(this,p.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return w(this,p.NO_VOLUME_PREF)}set noVolumePref(e){R(this,p.NO_VOLUME_PREF,e)}get noMutedPref(){return w(this,p.NO_MUTED_PREF)}set noMutedPref(e){R(this,p.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return w(this,p.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){R(this,p.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return w(this,p.NO_DEFAULT_STORE)}set noDefaultStore(e){R(this,p.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,n,s,l,c,m,f,A,v,E,y,_;if(super.attributeChangedCallback(e,i,a),e===p.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(p.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===p.HOTKEYS)T(this,Lt).value=a;else if(e===p.DEFAULT_SUBTITLES&&a!==i)(r=T(this,C))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES)}});else if(e===p.DEFAULT_STREAM_TYPE)(s=T(this,C))==null||s.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(n=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?n:void 0}});else if(e===p.LIVE_EDGE_OFFSET&&a!==i)(l=T(this,C))==null||l.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0}});else if(e===p.SEEK_TO_LIVE_OFFSET&&a!==i)(c=T(this,C))==null||c.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0}});else if(e===p.NO_AUTO_SEEK_TO_LIVE)(m=T(this,C))==null||m.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE)}});else if(e===p.FULLSCREEN_ELEMENT){const I=a?(f=this.getRootNode())==null?void 0:f.getElementById(a):void 0;Ke(this,Xa,I),(A=T(this,C))==null||A.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===p.LANG&&a!==i?(Rp(a),(v=T(this,C))==null||v.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===p.LOOP&&a!==i?(E=T(this,C))==null||E.dispatch({type:g.MEDIA_LOOP_REQUEST,detail:a!=null}):e===p.NO_VOLUME_PREF&&a!==i?(y=T(this,C))==null||y.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(p.NO_VOLUME_PREF)}}):e===p.NO_MUTED_PREF&&a!==i&&((_=T(this,C))==null||_.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(p.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;!T(this,C)&&!this.hasAttribute(p.NO_DEFAULT_STORE)&&Na(this,gn,Co).call(this),(e=T(this,C))==null||e.dispatch({type:"documentelementchangerequest",detail:ee}),(i=T(this,C))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),T(this,C)&&!T(this,rt)&&Ke(this,rt,(a=T(this,C))==null?void 0:a.subscribe(T(this,Ja))),T(this,ja)!==void 0&&T(this,C)&&this.media&&setTimeout(()=>{var r,n,s;(n=(r=this.media)==null?void 0:r.textTracks)!=null&&n.length&&((s=T(this,C))==null||s.dispatch({type:g.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:T(this,ja)}))},0),this.hasAttribute(p.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r,n,s;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),T(this,C)){const l=T(this,C).getState();Ke(this,ja,!!((i=l.mediaSubtitlesShowing)!=null&&i.length)),(a=T(this,C))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(r=T(this,C))==null||r.dispatch({type:"documentelementchangerequest",detail:void 0}),(n=T(this,C))==null||n.dispatch({type:g.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}T(this,rt)&&((s=T(this,rt))==null||s.call(this),Ke(this,rt,void 0)),this.unassociateElement(this),T(this,vt)&&(T(this,vt).remove(),Ke(this,vt,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=T(this,C))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=T(this,C))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){vu(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),n=kv(e,a,r);Object.values(g).forEach(s=>{e.addEventListener(s,T(this,bn))}),i.set(e,n)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(g).forEach(r=>{e.removeEventListener(r,T(this,bn))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),T(this,C)&&Object.entries(T(this,C).getState()).forEach(([r,n])=>{vu([e],r,n)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Na(this,fn,wo))}disableHotkeys(){this.removeEventListener("keydown",Na(this,fn,wo)),this.removeEventListener("keyup",T(this,Si))}get hotkeys(){return T(this,Lt)}set hotkeys(e){H(this,p.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,n,s,l,c,m,f;const A=e.target;if(((r=(a=(i=A.getAttribute(p.KEYS_USED))==null?void 0:i.split(" "))!=null?a:A?.keysUsed)!=null?r:[]).map(S=>S==="Space"?" ":S).filter(Boolean).includes(e.key))return;let E,y,_;if(!(T(this,Lt).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&T(this,Lt).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&T(this,Lt).contains("noshift+/")))switch(e.key){case" ":case"k":E=T(this,C).getState().mediaPaused?g.MEDIA_PLAY_REQUEST:g.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new d.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"m":E=this.mediaStore.getState().mediaVolumeLevel==="off"?g.MEDIA_UNMUTE_REQUEST:g.MEDIA_MUTE_REQUEST,this.dispatchEvent(new d.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"f":E=this.mediaStore.getState().mediaIsFullscreen?g.MEDIA_EXIT_FULLSCREEN_REQUEST:g.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new d.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new d.CustomEvent(g.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const S=this.hasAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET):uu;y=Math.max(((n=this.mediaStore.getState().mediaCurrentTime)!=null?n:0)-S,0),_=new d.CustomEvent(g.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:y}),this.dispatchEvent(_);break}case"ArrowRight":case"l":{const S=this.hasAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET):uu;y=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)+S,0),_=new d.CustomEvent(g.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:y}),this.dispatchEvent(_);break}case"ArrowUp":{const S=this.hasAttribute(p.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(p.KEYBOARD_UP_VOLUME_STEP):cu;y=Math.min(((l=this.mediaStore.getState().mediaVolume)!=null?l:1)+S,1),_=new d.CustomEvent(g.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:y}),this.dispatchEvent(_);break}case"ArrowDown":{const S=this.hasAttribute(p.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(p.KEYBOARD_DOWN_VOLUME_STEP):cu;y=Math.max(((c=this.mediaStore.getState().mediaVolume)!=null?c:1)-S,0),_=new d.CustomEvent(g.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:y}),this.dispatchEvent(_);break}case"<":{const S=(m=this.mediaStore.getState().mediaPlaybackRate)!=null?m:1;y=Math.max(S-hu,bv).toFixed(2),_=new d.CustomEvent(g.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:y}),this.dispatchEvent(_);break}case">":{const S=(f=this.mediaStore.getState().mediaPlaybackRate)!=null?f:1;y=Math.min(S+hu,gv).toFixed(2),_=new d.CustomEvent(g.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:y}),this.dispatchEvent(_);break}case"/":case"?":{e.shiftKey&&Na(this,Ro,Zc).call(this);break}case"p":{E=this.mediaStore.getState().mediaIsPip?g.MEDIA_EXIT_PIP_REQUEST:g.MEDIA_ENTER_PIP_REQUEST,_=new d.CustomEvent(E,{composed:!0,bubbles:!0}),this.dispatchEvent(_);break}}}}Lt=new WeakMap;Xa=new WeakMap;C=new WeakMap;vt=new WeakMap;Ja=new WeakMap;rt=new WeakMap;bn=new WeakMap;ja=new WeakMap;gn=new WeakSet;Co=function(){var t;this.mediaStore=Ev({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(p.DEFAULT_DURATION)?+this.getAttribute(p.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(p.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(p.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(p.NO_SUBTITLES_LANG_PREF)}})};Si=new WeakMap;fn=new WeakSet;wo=function(t){var e;const{metaKey:i,altKey:a,key:r,shiftKey:n}=t,s=n&&(r==="/"||r==="?");if(s&&((e=T(this,vt))!=null&&e.open)){this.removeEventListener("keyup",T(this,Si));return}if(i||a||!s&&!zc.includes(r)){this.removeEventListener("keyup",T(this,Si));return}const l=t.target,c=l instanceof HTMLElement&&(l.tagName.toLowerCase()==="media-volume-range"||l.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!(T(this,Lt).contains(`no${r.toLowerCase()}`)||r===" "&&T(this,Lt).contains("nospace"))&&!c&&t.preventDefault(),this.addEventListener("keyup",T(this,Si),{once:!0})};Ro=new WeakSet;Zc=function(){T(this,vt)||(Ke(this,vt,ee.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(T(this,vt))),T(this,vt).open=!0};const fv=Object.values(o),_v=Object.values(Tc),Xc=t=>{var e,i,a,r;let{observedAttributes:n}=t.constructor;!n&&((e=t.nodeName)!=null&&e.includes("-"))&&(d.customElements.upgrade(t),{observedAttributes:n}=t.constructor);const s=(r=(a=(i=t?.getAttribute)==null?void 0:i.call(t,O.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(n||s)?(n||s).filter(l=>fv.includes(l)):[]},Av=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&d.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof d.customElements.get(t.nodeName.toLowerCase()))&&d.customElements.upgrade(t),_v.some(a=>a in t)},Do=t=>Av(t)||!!Xc(t).length,mu=t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},pu={[o.MEDIA_SUBTITLES_LIST]:Cr,[o.MEDIA_SUBTITLES_SHOWING]:Cr,[o.MEDIA_SEEKABLE]:mu,[o.MEDIA_BUFFERED]:t=>t?.map(mu).join(" "),[o.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[o.MEDIA_RENDITION_LIST]:Ap,[o.MEDIA_AUDIO_TRACK_LIST]:Sp},Tv=async(t,e,i)=>{var a,r;if(t.isConnected||await Sc(0),typeof i=="boolean"||i==null)return R(t,e,i);if(typeof i=="number")return q(t,e,i);if(typeof i=="string")return H(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const n=(r=(a=pu[e])==null?void 0:a.call(pu,i))!=null?r:i;return t.setAttribute(e,n)},yv=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},pi=(t,e)=>{if(yv(t))return;const i=(r,n)=>{var s,l;Do(r)&&n(r);const{children:c=[]}=r??{},m=(l=(s=r?.shadowRoot)==null?void 0:s.children)!=null?l:[];[...c,...m].forEach(A=>pi(A,n))},a=t?.nodeName.toLowerCase();if(a.includes("-")&&!Do(t)){d.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},vu=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const r=Xc(a),n=e.toLowerCase();r.includes(n)&&Tv(a,n,i)})},kv=(t,e,i)=>{pi(t,e);const a=f=>{var A;const v=(A=f?.composedPath()[0])!=null?A:f.target;e(v)},r=f=>{var A;const v=(A=f?.composedPath()[0])!=null?A:f.target;i(v)};t.addEventListener(g.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(g.UNREGISTER_MEDIA_STATE_RECEIVER,r);const n=f=>{f.forEach(A=>{const{addedNodes:v=[],removedNodes:E=[],type:y,target:_,attributeName:I}=A;y==="childList"?(Array.prototype.forEach.call(v,S=>pi(S,e)),Array.prototype.forEach.call(E,S=>pi(S,i))):y==="attributes"&&I===O.MEDIA_CHROME_ATTRIBUTES&&(Do(_)?e(_):i(_))})};let s=[];const l=f=>{const A=f.target;A.name!=="media"&&(s.forEach(v=>pi(v,i)),s=[...A.assignedElements({flatten:!0})],s.forEach(v=>pi(v,e)))};t.addEventListener("slotchange",l);const c=new MutationObserver(n);return c.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{pi(t,i),t.removeEventListener("slotchange",l),c.disconnect(),t.removeEventListener(g.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(g.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};d.customElements.get("media-controller")||d.customElements.define("media-controller",Qc);var Sv=Qc;const Di={PLACEMENT:"placement",BOUNDS:"bounds"};function Iv(t){return`
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
  `}class zs extends d.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!xc(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),r=(e=Ma(this,"#"+this.bounds))!=null?e:fe(this);if(!r)return;const{x:n,width:s}=r.getBoundingClientRect(),{x:l,width:c}=this.getBoundingClientRect(),m=l+c,f=n+s,A=a.getPropertyValue("--media-tooltip-offset-x"),v=A?parseFloat(A.replace("px","")):0,E=a.getPropertyValue("--media-tooltip-container-margin"),y=E?parseFloat(E.replace("px","")):0,_=l-n+v-y,I=m-f+v+y;if(_<0){this.style.setProperty("--media-tooltip-offset-x",`${_}px`);return}if(I>0){this.style.setProperty("--media-tooltip-offset-x",`${I}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Di.PLACEMENT,Di.BOUNDS]}get placement(){return F(this,Di.PLACEMENT)}set placement(e){H(this,Di.PLACEMENT,e)}get bounds(){return F(this,Di.BOUNDS)}set bounds(e){H(this,Di.BOUNDS,e)}}zs.shadowRootOptions={mode:"open"};zs.getTemplateHTML=Iv;d.customElements.get("media-tooltip")||d.customElements.define("media-tooltip",zs);var Eu=zs,Wl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},j=(t,e,i)=>(Wl(t,e,"read from private field"),i?i.call(t):e.get(t)),Oi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Gr=(t,e,i,a)=>(Wl(t,e,"write to private field"),e.set(t,i),i),Lv=(t,e,i)=>(Wl(t,e,"access private method"),i),nt,da,Yt,Ki,_n,Oo,Jc;const Dt={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function Mv(t,e={}){return`
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
        <template shadowrootmode="${Eu.shadowRootOptions.mode}">
          ${Eu.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}function Cv(t,e){return`
    <slot></slot>
  `}function wv(){return""}class se extends d.HTMLElement{constructor(){if(super(),Oi(this,Oo),Oi(this,nt,void 0),this.preventClick=!1,this.tooltipEl=null,Oi(this,da,e=>{this.preventClick||this.handleClick(e),setTimeout(j(this,Yt),0)}),Oi(this,Yt,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),Oi(this,Ki,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",j(this,Ki));return}this.preventClick||this.handleClick(e)}),Oi(this,_n,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",j(this,Ki));return}this.addEventListener("keyup",j(this,Ki),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",Dt.TOOLTIP_PLACEMENT,O.MEDIA_CONTROLLER,o.MEDIA_LANG]}enable(){this.addEventListener("click",j(this,da)),this.addEventListener("keydown",j(this,_n)),this.tabIndex=0}disable(){this.removeEventListener("click",j(this,da)),this.removeEventListener("keydown",j(this,_n)),this.removeEventListener("keyup",j(this,Ki)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,n,s,l,c;e===O.MEDIA_CONTROLLER?(i&&((n=(r=j(this,nt))==null?void 0:r.unassociateElement)==null||n.call(r,this),Gr(this,nt,null)),a&&this.isConnected&&(Gr(this,nt,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=j(this,nt))==null?void 0:l.associateElement)==null||c.call(l,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===Dt.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===o.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),j(this,Yt).call(this)}connectedCallback(){var e,i,a;const{style:r}=ie(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const n=this.getAttribute(O.MEDIA_CONTROLLER);n&&(Gr(this,nt,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=j(this,nt))==null?void 0:i.associateElement)==null||a.call(i,this)),d.customElements.whenDefined("media-tooltip").then(()=>Lv(this,Oo,Jc).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=j(this,nt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Gr(this,nt,null),this.removeEventListener("mouseenter",j(this,Yt)),this.removeEventListener("focus",j(this,Yt)),this.removeEventListener("click",j(this,da))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return F(this,Dt.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){H(this,Dt.TOOLTIP_PLACEMENT,e)}get mediaController(){return F(this,O.MEDIA_CONTROLLER)}set mediaController(e){H(this,O.MEDIA_CONTROLLER,e)}get disabled(){return w(this,Dt.DISABLED)}set disabled(e){R(this,Dt.DISABLED,e)}get noTooltip(){return w(this,Dt.NO_TOOLTIP)}set noTooltip(e){R(this,Dt.NO_TOOLTIP,e)}handleClick(e){}}nt=new WeakMap;da=new WeakMap;Yt=new WeakMap;Ki=new WeakMap;_n=new WeakMap;Oo=new WeakSet;Jc=function(){this.addEventListener("mouseenter",j(this,Yt)),this.addEventListener("focus",j(this,Yt)),this.addEventListener("click",j(this,da));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};se.shadowRootOptions={mode:"open"};se.getTemplateHTML=Mv;se.getSlotTemplateHTML=Cv;se.getTooltipContentHTML=wv;d.customElements.get("media-chrome-button")||d.customElements.define("media-chrome-button",se);const bu=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function Rv(t){return`
    <style>
      :host([${o.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${o.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${o.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${o.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${bu}</slot>
      <slot name="exit">${bu}</slot>
    </slot>
  `}function Dv(){return`
    <slot name="tooltip-enter">${b("start airplay")}</slot>
    <slot name="tooltip-exit">${b("stop airplay")}</slot>
  `}const gu=t=>{const e=t.mediaIsAirplaying?b("stop airplay"):b("start airplay");t.setAttribute("aria-label",e)};class Fl extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_AIRPLAYING,o.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),gu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_IS_AIRPLAYING&&gu(this)}get mediaIsAirplaying(){return w(this,o.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){R(this,o.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return F(this,o.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){H(this,o.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new d.CustomEvent(g.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}Fl.getSlotTemplateHTML=Rv;Fl.getTooltipContentHTML=Dv;d.customElements.get("media-airplay-button")||d.customElements.define("media-airplay-button",Fl);const Ov=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,xv=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function Nv(t){return`
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
      <slot name="on">${Ov}</slot>
      <slot name="off">${xv}</slot>
    </slot>
  `}function Pv(){return`
    <slot name="tooltip-enable">${b("Enable captions")}</slot>
    <slot name="tooltip-disable">${b("Disable captions")}</slot>
  `}const fu=t=>{t.setAttribute("aria-checked",Kc(t).toString())};class Kl extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",b("closed captions")),fu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_SUBTITLES_SHOWING&&fu(this)}get mediaSubtitlesList(){return _u(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Au(this,o.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return _u(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Au(this,o.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new d.CustomEvent(g.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}Kl.getSlotTemplateHTML=Nv;Kl.getTooltipContentHTML=Pv;const _u=(t,e)=>{const i=t.getAttribute(e);return i?qs(i):[]},Au=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Cr(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};d.customElements.get("media-captions-button")||d.customElements.define("media-captions-button",Kl);const Uv='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',$v='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function Hv(t){return`
    <style>
      :host([${o.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${o.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${o.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${o.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Uv}</slot>
      <slot name="exit">${$v}</slot>
    </slot>
  `}function Bv(){return`
    <slot name="tooltip-enter">${b("Start casting")}</slot>
    <slot name="tooltip-exit">${b("Stop casting")}</slot>
  `}const Tu=t=>{const e=t.mediaIsCasting?b("stop casting"):b("start casting");t.setAttribute("aria-label",e)};class Vl extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_CASTING,o.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Tu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_IS_CASTING&&Tu(this)}get mediaIsCasting(){return w(this,o.MEDIA_IS_CASTING)}set mediaIsCasting(e){R(this,o.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return F(this,o.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){H(this,o.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?g.MEDIA_EXIT_CAST_REQUEST:g.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}}Vl.getSlotTemplateHTML=Hv;Vl.getTooltipContentHTML=Bv;d.customElements.get("media-cast-button")||d.customElements.define("media-cast-button",Vl);var Gl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ii=(t,e,i)=>(Gl(t,e,"read from private field"),e.get(t)),_t=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Yl=(t,e,i,a)=>(Gl(t,e,"write to private field"),e.set(t,i),i),li=(t,e,i)=>(Gl(t,e,"access private method"),i),gs,wr,Ci,An,xo,No,jc,Po,eh,Uo,th,$o,ih,Ho,ah;function Wv(t){return`
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
  `}function Fv(t){return`
    <slot id="content"></slot>
  `}const Pa={OPEN:"open",ANCHOR:"anchor"};class Ca extends d.HTMLElement{constructor(){super(),_t(this,An),_t(this,No),_t(this,Po),_t(this,Uo),_t(this,$o),_t(this,Ho),_t(this,gs,!1),_t(this,wr,null),_t(this,Ci,null)}static get observedAttributes(){return[Pa.OPEN,Pa.ANCHOR]}get open(){return w(this,Pa.OPEN)}set open(e){R(this,Pa.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":li(this,Uo,th).call(this,e);break;case"focusout":li(this,$o,ih).call(this,e);break;case"keydown":li(this,Ho,ah).call(this,e);break}}connectedCallback(){li(this,An,xo).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){li(this,An,xo).call(this),e===Pa.OPEN&&a!==i&&(this.open?li(this,No,jc).call(this):li(this,Po,eh).call(this))}focus(){Yl(this,wr,Ol());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}}gs=new WeakMap;wr=new WeakMap;Ci=new WeakMap;An=new WeakSet;xo=function(){if(!Ii(this,gs)&&(Yl(this,gs,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=ie(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};No=new WeakSet;jc=function(){var t;(t=Ii(this,Ci))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Po=new WeakSet;eh=function(){var t;(t=Ii(this,Ci))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};Uo=new WeakSet;th=function(t){Yl(this,Ci,t.relatedTarget),Rt(this,t.relatedTarget)||(this.open=!this.open)};$o=new WeakSet;ih=function(t){var e;Rt(this,t.relatedTarget)||((e=Ii(this,wr))==null||e.focus(),Ii(this,Ci)&&Ii(this,Ci)!==t.relatedTarget&&this.open&&(this.open=!1))};Ho=new WeakSet;ah=function(t){var e,i,a,r,n;const{key:s,ctrlKey:l,altKey:c,metaKey:m}=t;l||c||m||this.keysUsed.includes(s)&&(t.preventDefault(),t.stopPropagation(),s==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):s==="Escape"&&((n=Ii(this,wr))==null||n.focus(),this.open=!1))};Ca.shadowRootOptions={mode:"open"};Ca.getTemplateHTML=Wv;Ca.getSlotTemplateHTML=Fv;d.customElements.get("media-chrome-dialog")||d.customElements.define("media-chrome-dialog",Ca);var ql=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},G=(t,e,i)=>(ql(t,e,"read from private field"),i?i.call(t):e.get(t)),oe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Pt=(t,e,i,a)=>(ql(t,e,"write to private field"),e.set(t,i),i),Ye=(t,e,i)=>(ql(t,e,"access private method"),i),st,Qs,Tn,yn,qe,fs,kn,Sn,In,Zl,rh,Ln,Bo,Mn,Wo,_s,zl,Fo,nh,Ko,sh,Vo,oh,Go,lh;function Kv(t){return`
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
  `}function Vv(t){return""}class wa extends d.HTMLElement{constructor(){if(super(),oe(this,Zl),oe(this,Ln),oe(this,Mn),oe(this,_s),oe(this,Fo),oe(this,Ko),oe(this,Vo),oe(this,Go),oe(this,st,void 0),oe(this,Qs,void 0),oe(this,Tn,void 0),oe(this,yn,void 0),oe(this,qe,{}),oe(this,fs,[]),oe(this,kn,()=>{if(this.range.matches(":focus-visible")){const{style:e}=ie(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),oe(this,Sn,()=>{const{style:e}=ie(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),oe(this,In,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),Pt(this,Tn,this.shadowRoot.querySelector("#startpoint")),Pt(this,yn,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",O.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,n,s,l,c;e===O.MEDIA_CONTROLLER?(i&&((n=(r=G(this,st))==null?void 0:r.unassociateElement)==null||n.call(r,this),Pt(this,st,null)),a&&this.isConnected&&(Pt(this,st,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=G(this,st))==null?void 0:l.associateElement)==null||c.call(l,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Ye(this,Ln,Bo).call(this)):(this.range.setAttribute(e,a),Ye(this,Mn,Wo).call(this)))}connectedCallback(){var e,i,a;const{style:r}=ie(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),G(this,qe).pointer=ie(this.shadowRoot,"#pointer"),G(this,qe).progress=ie(this.shadowRoot,"#progress"),G(this,qe).thumb=ie(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),G(this,qe).activeSegment=ie(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const n=this.getAttribute(O.MEDIA_CONTROLLER);n&&(Pt(this,st,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=G(this,st))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",G(this,kn)),this.shadowRoot.addEventListener("focusout",G(this,Sn)),Ye(this,Ln,Bo).call(this),Ta(this.container,G(this,In))}disconnectedCallback(){var e,i;Ye(this,Mn,Wo).call(this),(i=(e=G(this,st))==null?void 0:e.unassociateElement)==null||i.call(e,this),Pt(this,st,null),this.shadowRoot.removeEventListener("focusin",G(this,kn)),this.shadowRoot.removeEventListener("focusout",G(this,Sn)),ya(this.container,G(this,In))}updatePointerBar(e){var i;(i=G(this,qe).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=G(this,qe).progress)==null||e.style.setProperty("width",`${a}%`),(i=G(this,qe).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(n=>[n.start,n.end]),+this.range.max])];Pt(this,fs,[...a]);const r=a.pop();for(const[n,s]of a.entries()){const[l,c]=[n===0,n===a.length-1],m=l?"calc(var(--segments-gap) / -1)":`${s*100}%`,A=`calc(${((c?r:a[n+1])-s)*100}%${l||c?"":" - var(--segments-gap)"})`,v=ee.createElementNS("http://www.w3.org/2000/svg","rect"),E=xl(this.shadowRoot,`#segments-clipping rect:nth-child(${n+1})`);E.style.setProperty("x",m),E.style.setProperty("width",A),i.append(v)}}getPointerRatio(e){return Pp(e.clientX,e.clientY,G(this,Tn).getBoundingClientRect(),G(this,yn).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Ye(this,Go,lh).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Ye(this,Fo,nh).call(this,e);break;case"pointerdown":Ye(this,_s,zl).call(this,e);break;case"pointerup":Ye(this,Ko,sh).call(this);break;case"pointerleave":Ye(this,Vo,oh).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}st=new WeakMap;Qs=new WeakMap;Tn=new WeakMap;yn=new WeakMap;qe=new WeakMap;fs=new WeakMap;kn=new WeakMap;Sn=new WeakMap;In=new WeakMap;Zl=new WeakSet;rh=function(t){const e=G(this,qe).activeSegment;if(!e)return;const i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${G(this,fs).findIndex((n,s,l)=>{const c=l[s+1];return c!=null&&i>=n&&i<=c})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};Ln=new WeakSet;Bo=function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};Mn=new WeakSet;Wo=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=d.window)==null||t.removeEventListener("pointerup",this),(e=d.window)==null||e.removeEventListener("pointermove",this)};_s=new WeakSet;zl=function(t){var e;Pt(this,Qs,t.composedPath().includes(this.range)),(e=d.window)==null||e.addEventListener("pointerup",this,{once:!0})};Fo=new WeakSet;nh=function(t){var e;t.pointerType!=="mouse"&&Ye(this,_s,zl).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=d.window)==null||e.addEventListener("pointermove",this)};Ko=new WeakSet;sh=function(){var t;(t=d.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};Vo=new WeakSet;oh=function(){var t,e;this.removeEventListener("pointerleave",this),(t=d.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=G(this,qe).activeSegment)==null||e.style.removeProperty("transform")};Go=new WeakSet;lh=function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Ye(this,Zl,rh).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!G(this,Qs))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))};wa.shadowRootOptions={mode:"open"};wa.getTemplateHTML=Kv;wa.getContainerTemplateHTML=Vv;d.customElements.get("media-chrome-range")||d.customElements.define("media-chrome-range",wa);var dh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Yr=(t,e,i)=>(dh(t,e,"read from private field"),i?i.call(t):e.get(t)),Gv=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},qr=(t,e,i,a)=>(dh(t,e,"write to private field"),e.set(t,i),i),ot;function Yv(t){return`
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
  `}class Ql extends d.HTMLElement{constructor(){if(super(),Gv(this,ot,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[O.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,n,s,l,c;e===O.MEDIA_CONTROLLER&&(i&&((n=(r=Yr(this,ot))==null?void 0:r.unassociateElement)==null||n.call(r,this),qr(this,ot,null)),a&&this.isConnected&&(qr(this,ot,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=Yr(this,ot))==null?void 0:l.associateElement)==null||c.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(O.MEDIA_CONTROLLER);r&&(qr(this,ot,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Yr(this,ot))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Yr(this,ot))==null?void 0:e.unassociateElement)==null||i.call(e,this),qr(this,ot,null)}}ot=new WeakMap;Ql.shadowRootOptions={mode:"open"};Ql.getTemplateHTML=Yv;d.customElements.get("media-control-bar")||d.customElements.define("media-control-bar",Ql);var uh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Zr=(t,e,i)=>(uh(t,e,"read from private field"),i?i.call(t):e.get(t)),qv=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},zr=(t,e,i,a)=>(uh(t,e,"write to private field"),e.set(t,i),i),lt;function Zv(t,e={}){return`
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
  `}function zv(t,e){return`
    <slot></slot>
  `}class Qt extends d.HTMLElement{constructor(){if(super(),qv(this,lt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[O.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,n,s,l,c;e===O.MEDIA_CONTROLLER&&(i&&((n=(r=Zr(this,lt))==null?void 0:r.unassociateElement)==null||n.call(r,this),zr(this,lt,null)),a&&this.isConnected&&(zr(this,lt,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=Zr(this,lt))==null?void 0:l.associateElement)==null||c.call(l,this)))}connectedCallback(){var e,i,a;const{style:r}=ie(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const n=this.getAttribute(O.MEDIA_CONTROLLER);n&&(zr(this,lt,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=Zr(this,lt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Zr(this,lt))==null?void 0:e.unassociateElement)==null||i.call(e,this),zr(this,lt,null)}}lt=new WeakMap;Qt.shadowRootOptions={mode:"open"};Qt.getTemplateHTML=Zv;Qt.getSlotTemplateHTML=zv;d.customElements.get("media-text-display")||d.customElements.define("media-text-display",Qt);var ch=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},yu=(t,e,i)=>(ch(t,e,"read from private field"),i?i.call(t):e.get(t)),Qv=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xv=(t,e,i,a)=>(ch(t,e,"write to private field"),e.set(t,i),i),er;function Jv(t,e){return`
    <slot>${zt(e.mediaDuration)}</slot>
  `}class hh extends Qt{constructor(){var e;super(),Qv(this,er,void 0),Xv(this,er,this.shadowRoot.querySelector("slot")),yu(this,er).textContent=zt((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===o.MEDIA_DURATION&&(yu(this,er).textContent=zt(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return $(this,o.MEDIA_DURATION)}set mediaDuration(e){q(this,o.MEDIA_DURATION,e)}}er=new WeakMap;hh.getSlotTemplateHTML=Jv;d.customElements.get("media-duration-display")||d.customElements.define("media-duration-display",hh);const jv={2:b("Network Error"),3:b("Decode Error"),4:b("Source Not Supported"),5:b("Encryption Error")},e0={2:b("A network error caused the media download to fail."),3:b("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:b("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:b("The media is encrypted and there are no keys to decrypt it.")},Xl=t=>{var e,i;return t.code===1?null:{title:(e=jv[t.code])!=null?e:`Error ${t.code}`,message:(i=e0[t.code])!=null?i:t.message}};var mh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},t0=(t,e,i)=>(mh(t,e,"read from private field"),i?i.call(t):e.get(t)),i0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},a0=(t,e,i,a)=>(mh(t,e,"write to private field"),e.set(t,i),i),Cn;function r0(t){return`
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
      ${ph({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function n0(t){return t.code&&Xl(t)!==null}function ph(t){var e;const{title:i,message:a}=(e=Xl(t))!=null?e:{};let r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}const ku=[o.MEDIA_ERROR_CODE,o.MEDIA_ERROR_MESSAGE];class Xs extends Ca{constructor(){super(...arguments),i0(this,Cn,null)}static get observedAttributes(){return[...super.observedAttributes,...ku]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!ku.includes(e))return;const n=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=n0(n),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(n),!this.hasAttribute("aria-label"))){const{title:s}=Xl(n);s&&this.setAttribute("aria-label",s)}}get mediaError(){return t0(this,Cn)}set mediaError(e){a0(this,Cn,e)}get mediaErrorCode(){return $(this,"mediaerrorcode")}set mediaErrorCode(e){q(this,"mediaerrorcode",e)}get mediaErrorMessage(){return F(this,"mediaerrormessage")}set mediaErrorMessage(e){H(this,"mediaerrormessage",e)}}Cn=new WeakMap;Xs.getSlotTemplateHTML=r0;Xs.formatErrorMessage=ph;d.customElements.get("media-error-dialog")||d.customElements.define("media-error-dialog",Xs);var vh=Xs,s0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ot=(t,e,i)=>(s0(t,e,"read from private field"),i?i.call(t):e.get(t)),Su=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Vi,Gi;function o0(t){return`
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
      ${l0()}
    </slot>
  `}function l0(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((n,s)=>s>0?`<span class="key-separator">or</span><span class="key">${n}</span>`:`<span class="key">${n}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}class Eh extends Ca{constructor(){super(...arguments),Su(this,Vi,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const r=e.composedPath(),n=r[0]===this||r.includes(this),s=r.includes(a);n&&!s&&(this.open=!1)}),Su(this,Gi,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",Ot(this,Vi)),document.addEventListener("keydown",Ot(this,Gi)))}disconnectedCallback(){this.removeEventListener("click",Ot(this,Vi)),document.removeEventListener("keydown",Ot(this,Gi))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",Ot(this,Vi)),document.addEventListener("keydown",Ot(this,Gi))):(this.removeEventListener("click",Ot(this,Vi)),document.removeEventListener("keydown",Ot(this,Gi))))}}Vi=new WeakMap;Gi=new WeakMap;Eh.getSlotTemplateHTML=o0;d.customElements.get("media-keyboard-shortcuts-dialog")||d.customElements.define("media-keyboard-shortcuts-dialog",Eh);var bh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},d0=(t,e,i)=>(bh(t,e,"read from private field"),e.get(t)),u0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},c0=(t,e,i,a)=>(bh(t,e,"write to private field"),e.set(t,i),i),wn;const h0=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,m0=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function p0(t){return`
    <style>
      :host([${o.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${o.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${o.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${o.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${h0}</slot>
      <slot name="exit">${m0}</slot>
    </slot>
  `}function v0(){return`
    <slot name="tooltip-enter">${b("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${b("Exit fullscreen mode")}</slot>
  `}const Iu=t=>{const e=t.mediaIsFullscreen?b("exit fullscreen mode"):b("enter fullscreen mode");t.setAttribute("aria-label",e)};class Jl extends se{constructor(){super(...arguments),u0(this,wn,null)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_FULLSCREEN,o.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Iu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_IS_FULLSCREEN&&Iu(this)}get mediaFullscreenUnavailable(){return F(this,o.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){H(this,o.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return w(this,o.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){R(this,o.MEDIA_IS_FULLSCREEN,e)}handleClick(e){c0(this,wn,e);const i=d0(this,wn)instanceof PointerEvent,a=this.mediaIsFullscreen?new d.CustomEvent(g.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new d.CustomEvent(g.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}}wn=new WeakMap;Jl.getSlotTemplateHTML=p0;Jl.getTooltipContentHTML=v0;d.customElements.get("media-fullscreen-button")||d.customElements.define("media-fullscreen-button",Jl);const{MEDIA_TIME_IS_LIVE:Rn,MEDIA_PAUSED:Er}=o,{MEDIA_SEEK_TO_LIVE_REQUEST:E0,MEDIA_PLAY_REQUEST:b0}=g,g0='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function f0(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Rn}]:not([${Er}])) slot[name=indicator] > *,
      :host([${Rn}]:not([${Er}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Rn}]:not([${Er}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${g0}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${b("live")}</slot>
  `}const Lu=t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=b(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=b("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")};class gh extends se{static get observedAttributes(){return[...super.observedAttributes,Rn,Er]}connectedCallback(){super.connectedCallback(),Lu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Lu(this)}get mediaPaused(){return w(this,o.MEDIA_PAUSED)}set mediaPaused(e){R(this,o.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return w(this,o.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){R(this,o.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new d.CustomEvent(E0,{composed:!0,bubbles:!0})),this.hasAttribute(Er)&&this.dispatchEvent(new d.CustomEvent(b0,{composed:!0,bubbles:!0})))}}gh.getSlotTemplateHTML=f0;d.customElements.get("media-live-button")||d.customElements.define("media-live-button",gh);var fh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ua=(t,e,i)=>(fh(t,e,"read from private field"),i?i.call(t):e.get(t)),Mu=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},$a=(t,e,i,a)=>(fh(t,e,"write to private field"),e.set(t,i),i),dt,Dn;const Qr={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},_h=500,_0=`
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
`;function A0(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${_h}ms);
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

      :host([${o.MEDIA_LOADING}]:not([${o.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${o.MEDIA_LOADING}]:not([${o.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${o.MEDIA_LOADING}]:not([${o.MEDIA_PAUSED}])) #status {
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

    <slot name="icon">${_0}</slot>
    <div id="status" role="status" aria-live="polite">${b("media loading")}</div>
  `}class jl extends d.HTMLElement{constructor(){if(super(),Mu(this,dt,void 0),Mu(this,Dn,_h),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[O.MEDIA_CONTROLLER,o.MEDIA_PAUSED,o.MEDIA_LOADING,Qr.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,n,s,l,c;e===Qr.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===O.MEDIA_CONTROLLER&&(i&&((n=(r=Ua(this,dt))==null?void 0:r.unassociateElement)==null||n.call(r,this),$a(this,dt,null)),a&&this.isConnected&&($a(this,dt,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=Ua(this,dt))==null?void 0:l.associateElement)==null||c.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(O.MEDIA_CONTROLLER);r&&($a(this,dt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Ua(this,dt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ua(this,dt))==null?void 0:e.unassociateElement)==null||i.call(e,this),$a(this,dt,null)}get loadingDelay(){return Ua(this,Dn)}set loadingDelay(e){$a(this,Dn,e);const{style:i}=ie(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return w(this,o.MEDIA_PAUSED)}set mediaPaused(e){R(this,o.MEDIA_PAUSED,e)}get mediaLoading(){return w(this,o.MEDIA_LOADING)}set mediaLoading(e){R(this,o.MEDIA_LOADING,e)}get mediaController(){return F(this,O.MEDIA_CONTROLLER)}set mediaController(e){H(this,O.MEDIA_CONTROLLER,e)}get noAutohide(){return w(this,Qr.NO_AUTOHIDE)}set noAutohide(e){R(this,Qr.NO_AUTOHIDE,e)}}dt=new WeakMap;Dn=new WeakMap;jl.shadowRootOptions={mode:"open"};jl.getTemplateHTML=A0;d.customElements.get("media-loading-indicator")||d.customElements.define("media-loading-indicator",jl);const T0=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Cu=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,y0=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function k0(t){return`
    <style>
      :host(:not([${o.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${o.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${o.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${o.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${o.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${o.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${o.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${T0}</slot>
      <slot name="low">${Cu}</slot>
      <slot name="medium">${Cu}</slot>
      <slot name="high">${y0}</slot>
    </slot>
  `}function S0(){return`
    <slot name="tooltip-mute">${b("Mute")}</slot>
    <slot name="tooltip-unmute">${b("Unmute")}</slot>
  `}const wu=t=>{const e=t.mediaVolumeLevel==="off",i=b(e?"unmute":"mute");t.setAttribute("aria-label",i)};class ed extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),wu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_VOLUME_LEVEL&&wu(this)}get mediaVolumeLevel(){return F(this,o.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){H(this,o.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?g.MEDIA_UNMUTE_REQUEST:g.MEDIA_MUTE_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}}ed.getSlotTemplateHTML=k0;ed.getTooltipContentHTML=S0;d.customElements.get("media-mute-button")||d.customElements.define("media-mute-button",ed);const Ru=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function I0(t){return`
    <style>
      :host([${o.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${o.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${o.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${o.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ru}</slot>
      <slot name="exit">${Ru}</slot>
    </slot>
  `}function L0(){return`
    <slot name="tooltip-enter">${b("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${b("Exit picture in picture mode")}</slot>
  `}const Du=t=>{const e=t.mediaIsPip?b("exit picture in picture mode"):b("enter picture in picture mode");t.setAttribute("aria-label",e)};class td extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_PIP,o.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Du(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_IS_PIP&&Du(this)}get mediaPipUnavailable(){return F(this,o.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){H(this,o.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return w(this,o.MEDIA_IS_PIP)}set mediaIsPip(e){R(this,o.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?g.MEDIA_EXIT_PIP_REQUEST:g.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}}td.getSlotTemplateHTML=I0;td.getTooltipContentHTML=L0;d.customElements.get("media-pip-button")||d.customElements.define("media-pip-button",td);var M0=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},xi=(t,e,i)=>(M0(t,e,"read from private field"),i?i.call(t):e.get(t)),C0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ut;const co={RATES:"rates"},Ah=[1,1.2,1.5,1.7,2],ua=1;function w0(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||ua}x</slot>
  `}function R0(){return b("Playback rate")}class id extends se{constructor(){var e;super(),C0(this,Ut,new Ul(this,co.RATES,{defaultValue:Ah})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:ua}x`}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,co.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===co.RATES&&(xi(this,Ut).value=a),e===o.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,n=Number.isNaN(r)?ua:r;this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",b("Playback rate {playbackRate}",{playbackRate:n}))}}get rates(){return xi(this,Ut)}set rates(e){e?Array.isArray(e)?xi(this,Ut).value=e.join(" "):typeof e=="string"&&(xi(this,Ut).value=e):xi(this,Ut).value=""}get mediaPlaybackRate(){return $(this,o.MEDIA_PLAYBACK_RATE,ua)}set mediaPlaybackRate(e){q(this,o.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(xi(this,Ut).values(),s=>+s).sort((s,l)=>s-l),r=(i=(e=a.find(s=>s>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:ua,n=new d.CustomEvent(g.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(n)}}Ut=new WeakMap;id.getSlotTemplateHTML=w0;id.getTooltipContentHTML=R0;d.customElements.get("media-playback-rate-button")||d.customElements.define("media-playback-rate-button",id);const D0=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,O0=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function x0(t){return`
    <style>
      :host([${o.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${o.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${o.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${o.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${D0}</slot>
      <slot name="pause">${O0}</slot>
    </slot>
  `}function N0(){return`
    <slot name="tooltip-play">${b("Play")}</slot>
    <slot name="tooltip-pause">${b("Pause")}</slot>
  `}const Ou=t=>{const e=t.mediaPaused?b("play"):b("pause");t.setAttribute("aria-label",e)};class ad extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PAUSED,o.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Ou(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===o.MEDIA_PAUSED||e===o.MEDIA_LANG)&&Ou(this)}get mediaPaused(){return w(this,o.MEDIA_PAUSED)}set mediaPaused(e){R(this,o.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?g.MEDIA_PLAY_REQUEST:g.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}}ad.getSlotTemplateHTML=x0;ad.getTooltipContentHTML=N0;d.customElements.get("media-play-button")||d.customElements.define("media-play-button",ad);const et={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function P0(t){return`
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
  `}const U0=t=>{t.style.removeProperty("background-image")},$0=(t,e)=>{t.style["background-image"]=`url('${e}')`};class rd extends d.HTMLElement{static get observedAttributes(){return[et.PLACEHOLDER_SRC,et.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===et.SRC&&(a==null?this.image.removeAttribute(et.SRC):this.image.setAttribute(et.SRC,a)),e===et.PLACEHOLDER_SRC&&(a==null?U0(this.image):$0(this.image,a))}get placeholderSrc(){return F(this,et.PLACEHOLDER_SRC)}set placeholderSrc(e){H(this,et.SRC,e)}get src(){return F(this,et.SRC)}set src(e){H(this,et.SRC,e)}}rd.shadowRootOptions={mode:"open"};rd.getTemplateHTML=P0;d.customElements.get("media-poster-image")||d.customElements.define("media-poster-image",rd);var Th=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},H0=(t,e,i)=>(Th(t,e,"read from private field"),i?i.call(t):e.get(t)),B0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},W0=(t,e,i,a)=>(Th(t,e,"write to private field"),e.set(t,i),i),On;class F0 extends Qt{constructor(){super(),B0(this,On,void 0),W0(this,On,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PREVIEW_CHAPTER,o.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===o.MEDIA_PREVIEW_CHAPTER||e===o.MEDIA_LANG)&&a!==i&&a!=null)if(H0(this,On).textContent=a,a!==""){const r=b("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return F(this,o.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){H(this,o.MEDIA_PREVIEW_CHAPTER,e)}}On=new WeakMap;d.customElements.get("media-preview-chapter-display")||d.customElements.define("media-preview-chapter-display",F0);var yh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Xr=(t,e,i)=>(yh(t,e,"read from private field"),i?i.call(t):e.get(t)),K0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Jr=(t,e,i,a)=>(yh(t,e,"write to private field"),e.set(t,i),i),ut;function V0(t){return`
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
  `}class Js extends d.HTMLElement{constructor(){if(super(),K0(this,ut,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[O.MEDIA_CONTROLLER,o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const r=this.getAttribute(O.MEDIA_CONTROLLER);r&&(Jr(this,ut,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Xr(this,ut))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Xr(this,ut))==null?void 0:e.unassociateElement)==null||i.call(e,this),Jr(this,ut,null)}attributeChangedCallback(e,i,a){var r,n,s,l,c;[o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===O.MEDIA_CONTROLLER&&(i&&((n=(r=Xr(this,ut))==null?void 0:r.unassociateElement)==null||n.call(r,this),Jr(this,ut,null)),a&&this.isConnected&&(Jr(this,ut,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(c=(l=Xr(this,ut))==null?void 0:l.associateElement)==null||c.call(l,this)))}get mediaPreviewImage(){return F(this,o.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){H(this,o.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(o.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(o.MEDIA_PREVIEW_COORDS);return}this.setAttribute(o.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,r,n,s]=e,l=i.split("#")[0],c=getComputedStyle(this),{maxWidth:m,maxHeight:f,minWidth:A,minHeight:v}=c,E=c.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let y,_;if(E==="fill"){const me=parseInt(m)/n,pe=parseInt(f)/s,je=parseInt(A)/n,Me=parseInt(v)/s;y=me<1?me:Math.max(me,je),_=pe<1?pe:Math.max(pe,Me)}else{const me=Math.min(parseInt(m)/n,parseInt(f)/s),pe=Math.max(parseInt(A)/n,parseInt(v)/s),Me=me<1?me:pe>1?pe:1;y=Me,_=Me}const{style:I}=ie(this.shadowRoot,":host"),S=ie(this.shadowRoot,"img").style,Q=this.shadowRoot.querySelector("img"),Je=Math.min(y,_)<1?"min":"max";I.setProperty(`${Je}-width`,"initial","important"),I.setProperty(`${Je}-height`,"initial","important"),I.width=`${n*y}px`,I.height=`${s*_}px`;const $e=()=>{S.width=`${this.imgWidth*y}px`,S.height=`${this.imgHeight*_}px`,S.display="block"};Q.src!==l&&(Q.onload=()=>{this.imgWidth=Q.naturalWidth,this.imgHeight=Q.naturalHeight,$e(),Q.onload=null},Q.src=l,$e()),$e(),S.transform=`translate(-${a*y}px, -${r*_}px)`}}ut=new WeakMap;Js.shadowRootOptions={mode:"open"};Js.getTemplateHTML=V0;d.customElements.get("media-preview-thumbnail")||d.customElements.define("media-preview-thumbnail",Js);var xu=Js,kh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Nu=(t,e,i)=>(kh(t,e,"read from private field"),i?i.call(t):e.get(t)),G0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Y0=(t,e,i,a)=>(kh(t,e,"write to private field"),e.set(t,i),i),tr;class q0 extends Qt{constructor(){super(),G0(this,tr,void 0),Y0(this,tr,this.shadowRoot.querySelector("slot")),Nu(this,tr).textContent=zt(0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_PREVIEW_TIME&&a!=null&&(Nu(this,tr).textContent=zt(parseFloat(a)))}get mediaPreviewTime(){return $(this,o.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){q(this,o.MEDIA_PREVIEW_TIME,e)}}tr=new WeakMap;d.customElements.get("media-preview-time-display")||d.customElements.define("media-preview-time-display",q0);const Ni={SEEK_OFFSET:"seekoffset"},ho=30,Z0=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function z0(t,e){return`
    <slot name="icon">${Z0(e.seekOffset)}</slot>
  `}const Q0=(t,e)=>{t.setAttribute("aria-label",b("seek back {seekOffset} seconds",{seekOffset:e}))};function X0(){return b("Seek backward")}const J0=0;class nd extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_CURRENT_TIME,Ni.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=$(this,Ni.SEEK_OFFSET,ho)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Q0(this,this.seekOffset),e===Ni.SEEK_OFFSET&&(this.seekOffset=$(this,Ni.SEEK_OFFSET,ho))}get seekOffset(){return $(this,Ni.SEEK_OFFSET,ho)}set seekOffset(e){q(this,Ni.SEEK_OFFSET,e),this.setAttribute("aria-label",b("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Dc(Oc(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return $(this,o.MEDIA_CURRENT_TIME,J0)}set mediaCurrentTime(e){q(this,o.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new d.CustomEvent(g.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}nd.getSlotTemplateHTML=z0;nd.getTooltipContentHTML=X0;d.customElements.get("media-seek-backward-button")||d.customElements.define("media-seek-backward-button",nd);const Pi={SEEK_OFFSET:"seekoffset"},mo=30,j0=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function eE(t,e){return`
    <slot name="icon">${j0(e.seekOffset)}</slot>
  `}const tE=(t,e)=>{t.setAttribute("aria-label",b("seek forward {seekOffset} seconds",{seekOffset:e}))};function iE(){return b("Seek forward")}const aE=0;class sd extends se{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_CURRENT_TIME,Pi.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=$(this,Pi.SEEK_OFFSET,mo)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),tE(this,this.seekOffset),e===Pi.SEEK_OFFSET&&(this.seekOffset=$(this,Pi.SEEK_OFFSET,mo))}get seekOffset(){return $(this,Pi.SEEK_OFFSET,mo)}set seekOffset(e){q(this,Pi.SEEK_OFFSET,e),this.setAttribute("aria-label",b("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Dc(Oc(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return $(this,o.MEDIA_CURRENT_TIME,aE)}set mediaCurrentTime(e){q(this,o.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new d.CustomEvent(g.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}sd.getSlotTemplateHTML=eE;sd.getTooltipContentHTML=iE;d.customElements.get("media-seek-forward-button")||d.customElements.define("media-seek-forward-button",sd);var od=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ze=(t,e,i)=>(od(t,e,"read from private field"),i?i.call(t):e.get(t)),di=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ld=(t,e,i,a)=>(od(t,e,"write to private field"),e.set(t,i),i),Kt=(t,e,i)=>(od(t,e,"access private method"),i),Yi,gt,js,dd,Sh,As,ud,ir,xn,Nn,Yo;const $t={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},Pu=[...Object.values($t),o.MEDIA_CURRENT_TIME,o.MEDIA_DURATION,o.MEDIA_SEEKABLE],Ih=["Enter"," "],rE="&nbsp;/&nbsp;",qo=(t,{timesSep:e=rE}={})=>{var i,a;const r=(i=t.mediaCurrentTime)!=null?i:0,[,n]=(a=t.mediaSeekable)!=null?a:[];let s=0;Number.isFinite(t.mediaDuration)?s=t.mediaDuration:Number.isFinite(n)&&(s=n);const l=t.remaining?zt(0-(s-r)):zt(r);return t.showDuration?`${l}${e}${zt(s)}`:l},nE=t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-valuetext",b("video not loaded, unknown time."));return}const n=t.remaining?pr(0-(r-i)):pr(i);if(!t.showDuration){t.setAttribute("aria-valuetext",n);return}const s=pr(r),l=b("{currentTime} of {totalTime}",{currentTime:n,totalTime:s});t.setAttribute("aria-valuetext",l)};function sE(t,e){return`
    <slot>${qo(e)}</slot>
  `}const oE=t=>{t.setAttribute("aria-label",b("playback time"))};class Lh extends Qt{constructor(){super(),di(this,dd),di(this,As),di(this,ir),di(this,Nn),di(this,Yi,void 0),di(this,gt,null),di(this,js,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!Ih.includes(r)){this.removeEventListener("keyup",Ze(this,gt));return}this.addEventListener("keyup",Ze(this,gt))}),ld(this,Yi,this.shadowRoot.querySelector("slot")),Ze(this,Yi).innerHTML=`${qo(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Pu,"disabled"]}connectedCallback(){const{style:e}=ie(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",b("playback time")),Kt(this,ir,xn).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),Kt(this,As,ud).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){oE(this),Pu.includes(e)?this.update():e==="disabled"&&a!==i?a==null?Kt(this,ir,xn).call(this):Kt(this,Nn,Yo).call(this):e===$t.NO_TOGGLE&&a!==i&&(this.noToggle?Kt(this,Nn,Yo).call(this):Kt(this,ir,xn).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return w(this,$t.REMAINING)}set remaining(e){R(this,$t.REMAINING,e)}get showDuration(){return w(this,$t.SHOW_DURATION)}set showDuration(e){R(this,$t.SHOW_DURATION,e)}get noToggle(){return w(this,$t.NO_TOGGLE)}set noToggle(e){R(this,$t.NO_TOGGLE,e)}get mediaDuration(){return $(this,o.MEDIA_DURATION)}set mediaDuration(e){q(this,o.MEDIA_DURATION,e)}get mediaCurrentTime(){return $(this,o.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){q(this,o.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(o.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(o.MEDIA_SEEKABLE);return}this.setAttribute(o.MEDIA_SEEKABLE,e.join(":"))}update(){const e=qo(this);nE(this),e!==Ze(this,Yi).innerHTML&&(Ze(this,Yi).innerHTML=e)}}Yi=new WeakMap;gt=new WeakMap;js=new WeakMap;dd=new WeakSet;Sh=function(){Ze(this,gt)||(ld(this,gt,t=>{const{key:e}=t;if(!Ih.includes(e)){this.removeEventListener("keyup",Ze(this,gt));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",Ze(this,js)),this.addEventListener("click",this.toggleTimeDisplay))};As=new WeakSet;ud=function(){Ze(this,gt)&&(this.removeEventListener("keyup",Ze(this,gt)),this.removeEventListener("keydown",Ze(this,js)),this.removeEventListener("click",this.toggleTimeDisplay),ld(this,gt,null))};ir=new WeakSet;xn=function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),Kt(this,dd,Sh).call(this))};Nn=new WeakSet;Yo=function(){this.removeAttribute("role"),this.disable(),Kt(this,As,ud).call(this)};Lh.getSlotTemplateHTML=sE;d.customElements.get("media-time-display")||d.customElements.define("media-time-display",Lh);var Mh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},re=(t,e,i)=>(Mh(t,e,"read from private field"),e.get(t)),tt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ye=(t,e,i,a)=>(Mh(t,e,"write to private field"),e.set(t,i),i),lE=(t,e,i,a)=>({set _(r){ye(t,e,r)},get _(){return re(t,e)}}),qi,Pn,Zi,ar,Un,$n,Hn,zi,vi,Bn;class dE{constructor(e,i,a){tt(this,qi,void 0),tt(this,Pn,void 0),tt(this,Zi,void 0),tt(this,ar,void 0),tt(this,Un,void 0),tt(this,$n,void 0),tt(this,Hn,void 0),tt(this,zi,void 0),tt(this,vi,0),tt(this,Bn,(r=performance.now())=>{ye(this,vi,requestAnimationFrame(re(this,Bn))),ye(this,ar,performance.now()-re(this,Zi));const n=1e3/this.fps;if(re(this,ar)>n){ye(this,Zi,r-re(this,ar)%n);const s=1e3/((r-re(this,Pn))/++lE(this,Un)._),l=(r-re(this,$n))/1e3/this.duration;let c=re(this,Hn)+l*this.playbackRate;c-re(this,qi).valueAsNumber>0?ye(this,zi,this.playbackRate/this.duration/s):(ye(this,zi,.995*re(this,zi)),c=re(this,qi).valueAsNumber+re(this,zi)),this.callback(c)}}),ye(this,qi,e),this.callback=i,this.fps=a}start(){re(this,vi)===0&&(ye(this,Zi,performance.now()),ye(this,Pn,re(this,Zi)),ye(this,Un,0),re(this,Bn).call(this))}stop(){re(this,vi)!==0&&(cancelAnimationFrame(re(this,vi)),ye(this,vi,0))}update({start:e,duration:i,playbackRate:a}){const r=e-re(this,qi).valueAsNumber,n=Math.abs(i-this.duration);(r>0||r<-.03||n>=.5)&&this.callback(e),ye(this,Hn,e),ye(this,$n,performance.now()),this.duration=i,this.playbackRate=a}}qi=new WeakMap;Pn=new WeakMap;Zi=new WeakMap;ar=new WeakMap;Un=new WeakMap;$n=new WeakMap;Hn=new WeakMap;zi=new WeakMap;vi=new WeakMap;Bn=new WeakMap;var cd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},W=(t,e,i)=>(cd(t,e,"read from private field"),i?i.call(t):e.get(t)),te=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Oe=(t,e,i,a)=>(cd(t,e,"write to private field"),e.set(t,i),i),Pe=(t,e,i)=>(cd(t,e,"access private method"),i),Qi,Vt,Ts,br,ys,Wn,Rr,Dr,Xi,Ji,rr,Zo,Ch,zo,ks,hd,Ss,md,Is,pd,Qo,wh,Or,Ls,Xo,Rh;const uE=t=>{const e=t.range,i=pr(+Dh(t)),a=pr(+t.mediaSeekableEnd),r=i&&a?b("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):b("video not loaded, unknown time.");e.setAttribute("aria-valuetext",r)};function cE(t){return`
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

      :host(:is([${o.MEDIA_PREVIEW_IMAGE}], [${o.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${o.MEDIA_PREVIEW_IMAGE}], [${o.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
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

      :host([${o.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${o.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${o.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${o.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${o.MEDIA_PREVIEW_TIME}]:hover) {
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

      :host([${o.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${o.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${o.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${o.MEDIA_PREVIEW_CHAPTER}]) {
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

      :host([${o.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${o.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${o.MEDIA_PREVIEW_TIME}]:hover) {
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
          <template shadowrootmode="${xu.shadowRootOptions.mode}">
            ${xu.getTemplateHTML({})}
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
  `}const jr=(t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},Dh=(t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i};class vd extends wa{constructor(){super(),te(this,Zo),te(this,ks),te(this,Ss),te(this,Is),te(this,Qo),te(this,Or),te(this,Xo),te(this,Qi,null),te(this,Vt,void 0),te(this,Ts,void 0),te(this,br,void 0),te(this,ys,void 0),te(this,Wn,void 0),te(this,Rr,void 0),te(this,Dr,void 0),te(this,Xi,void 0),te(this,Ji,void 0),te(this,rr,()=>{Pe(this,Zo,Ch).call(this)?W(this,Vt).start():W(this,Vt).stop()}),te(this,zo,a=>{this.dragging||(Rl(a)&&(this.range.valueAsNumber=a),W(this,Ji)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),Oe(this,Ts,this.shadowRoot.querySelectorAll('[part~="box"]')),Oe(this,ys,this.shadowRoot.querySelector('[part~="preview-box"]')),Oe(this,Wn,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);Oe(this,Rr,parseInt(i.getPropertyValue("--media-box-padding-left"))),Oe(this,Dr,parseInt(i.getPropertyValue("--media-box-padding-right"))),Oe(this,Vt,new dE(this.range,W(this,zo),60))}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PAUSED,o.MEDIA_DURATION,o.MEDIA_SEEKABLE,o.MEDIA_CURRENT_TIME,o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_TIME,o.MEDIA_PREVIEW_CHAPTER,o.MEDIA_BUFFERED,o.MEDIA_PLAYBACK_RATE,o.MEDIA_LOADING,o.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",b("seek")),W(this,rr).call(this),Oe(this,Qi,this.getRootNode()),(e=W(this,Qi))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),W(this,Vt).stop(),(e=W(this,Qi))==null||e.removeEventListener("transitionstart",this),Oe(this,Qi,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===o.MEDIA_CURRENT_TIME||e===o.MEDIA_PAUSED||e===o.MEDIA_ENDED||e===o.MEDIA_LOADING||e===o.MEDIA_DURATION||e===o.MEDIA_SEEKABLE?(W(this,Vt).update({start:jr(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),W(this,rr).call(this),uE(this)):e===o.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===o.MEDIA_DURATION||e===o.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=W(this,Xi),this.updateBar()))}get mediaChaptersCues(){return W(this,Xi)}set mediaChaptersCues(e){var i;Oe(this,Xi,e),this.updateSegments((i=W(this,Xi))==null?void 0:i.map(a=>({start:jr(this,a.startTime),end:jr(this,a.endTime)})))}get mediaPaused(){return w(this,o.MEDIA_PAUSED)}set mediaPaused(e){R(this,o.MEDIA_PAUSED,e)}get mediaLoading(){return w(this,o.MEDIA_LOADING)}set mediaLoading(e){R(this,o.MEDIA_LOADING,e)}get mediaDuration(){return $(this,o.MEDIA_DURATION)}set mediaDuration(e){q(this,o.MEDIA_DURATION,e)}get mediaCurrentTime(){return $(this,o.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){q(this,o.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return $(this,o.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){q(this,o.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(o.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(o.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(o.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(o.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(o.MEDIA_SEEKABLE);return}this.setAttribute(o.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return F(this,o.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){H(this,o.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return $(this,o.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){q(this,o.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return w(this,o.MEDIA_ENDED)}set mediaEnded(e){R(this,o.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const n=this.mediaCurrentTime,[,s=this.mediaSeekableStart]=(e=i.find(([l,c])=>l<=n&&n<=c))!=null?e:[];a=jr(this,s)}const{style:r}=ie(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=ie(this.shadowRoot,"#current-rail"),a=ie(this.shadowRoot,'[part~="current-box"]'),r=Pe(this,ks,hd).call(this,W(this,Wn)),n=Pe(this,Ss,md).call(this,r,this.range.valueAsNumber),s=Pe(this,Is,pd).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${n})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${s}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":Pe(this,Xo,Rh).call(this);break;case"pointermove":Pe(this,Qo,wh).call(this,e);break;case"pointerup":W(this,Ji)&&Oe(this,Ji,!1);break;case"pointerdown":Oe(this,Ji,!0);break;case"pointerleave":Pe(this,Or,Ls).call(this,null);break;case"transitionstart":Rt(e.target,this)&&setTimeout(()=>W(this,rr).call(this),0);break}}}Qi=new WeakMap;Vt=new WeakMap;Ts=new WeakMap;br=new WeakMap;ys=new WeakMap;Wn=new WeakMap;Rr=new WeakMap;Dr=new WeakMap;Xi=new WeakMap;Ji=new WeakMap;rr=new WeakMap;Zo=new WeakSet;Ch=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&xc(this)};zo=new WeakMap;ks=new WeakSet;hd=function(t){var e;const a=((e=this.getAttribute("bounds")?Ma(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),n=t.offsetWidth,s=-(r.left-a.left-n/2),l=a.right-r.left-n/2;return{box:{width:n,min:s,max:l},bounds:a,range:r}};Ss=new WeakSet;md=function(t,e){let i=`${e*100}%`;const{width:a,min:r,max:n}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(n)){const l=`calc(1 / var(--_range-width) * 100 * ${n}% - var(--media-box-padding-right))`;i=`min(${i}, ${l})`}return i};Is=new WeakSet;pd=function(t,e){const{width:i,min:a,max:r}=t.box,n=e*t.range.width;if(n<a+W(this,Rr)){const s=t.range.left-t.bounds.left-W(this,Rr);return`${n-i/2+s}px`}if(n>r-W(this,Dr)){const s=t.bounds.right-t.range.right-W(this,Dr);return`${n+i/2-s-t.range.width}px`}return 0};Qo=new WeakSet;wh=function(t){const e=[...W(this,Ts)].some(f=>t.composedPath().includes(f));if(!this.dragging&&(e||!t.composedPath().includes(this))){Pe(this,Or,Ls).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=ie(this.shadowRoot,"#preview-rail"),r=ie(this.shadowRoot,'[part~="preview-box"]'),n=Pe(this,ks,hd).call(this,W(this,ys));let s=(t.clientX-n.range.left)/n.range.width;s=Math.max(0,Math.min(1,s));const l=Pe(this,Ss,md).call(this,n,s),c=Pe(this,Is,pd).call(this,n,s);a.style.transform=`translateX(${l})`,a.style.setProperty("--_range-width",`${n.range.width}`),r.style.setProperty("--_box-shift",`${c}`),r.style.setProperty("--_box-width",`${n.box.width}px`);const m=Math.round(W(this,br))-Math.round(s*i);Math.abs(m)<1&&s>.01&&s<.99||(Oe(this,br,s*i),Pe(this,Or,Ls).call(this,W(this,br)))};Or=new WeakSet;Ls=function(t){this.dispatchEvent(new d.CustomEvent(g.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Xo=new WeakSet;Rh=function(){W(this,Vt).stop();const t=Dh(this);this.dispatchEvent(new d.CustomEvent(g.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};vd.shadowRootOptions={mode:"open"};vd.getContainerTemplateHTML=cE;d.customElements.get("media-time-range")||d.customElements.define("media-time-range",vd);var hE=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Uu=(t,e,i)=>(hE(t,e,"read from private field"),i?i.call(t):e.get(t)),mE=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Fn;const pE=1,vE=t=>t.mediaMuted?0:t.mediaVolume,EE=t=>`${Math.round(t*100)}%`;class bE extends wa{constructor(){super(...arguments),mE(this,Fn,()=>{const e=this.range.value,i=new d.CustomEvent(g.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_VOLUME,o.MEDIA_MUTED,o.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",b("volume")),this.range.addEventListener("input",Uu(this,Fn))}disconnectedCallback(){this.range.removeEventListener("input",Uu(this,Fn)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===o.MEDIA_VOLUME||e===o.MEDIA_MUTED)&&(this.range.valueAsNumber=vE(this),this.range.setAttribute("aria-valuetext",EE(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return $(this,o.MEDIA_VOLUME,pE)}set mediaVolume(e){q(this,o.MEDIA_VOLUME,e)}get mediaMuted(){return w(this,o.MEDIA_MUTED)}set mediaMuted(e){R(this,o.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return F(this,o.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){H(this,o.MEDIA_VOLUME_UNAVAILABLE,e)}}Fn=new WeakMap;d.customElements.get("media-volume-range")||d.customElements.define("media-volume-range",bE);function gE(t){return`
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

        :host([${o.MEDIA_LOOP}]) #checked-indicator {
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
    `}function fE(){return b("Loop")}class Ed extends se{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=b("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return w(this,o.MEDIA_LOOP)}set mediaLoop(e){R(this,o.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new d.CustomEvent(g.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}Ed.getSlotTemplateHTML=gE;Ed.getTooltipContentHTML=fE;d.customElements.get("media-loop-button")||d.customElements.define("media-loop-button",Ed);var Oh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},M=(t,e,i)=>(Oh(t,e,"read from private field"),i?i.call(t):e.get(t)),mt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ct=(t,e,i,a)=>(Oh(t,e,"write to private field"),e.set(t,i),i),ji,Kn,Ei,nr,Ht,Bt,Wt,bi,ea,Vn,Ve;const $u=1,Hu=0,_E=1,AE={processCallback(t,e,i){if(i){for(const[a,r]of e)if(a in i){const n=i[a];typeof n=="boolean"&&r instanceof Qe&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=n:typeof n=="function"&&r instanceof Qe?r.element[r.attributeName]=n:r.value=n}}}};class eo extends d.DocumentFragment{constructor(e,i,a=AE){var r;super(),mt(this,ji,void 0),mt(this,Kn,void 0),this.append(e.content.cloneNode(!0)),Ct(this,ji,xh(this)),Ct(this,Kn,a),(r=a.createCallback)==null||r.call(a,this,M(this,ji),i),a.processCallback(this,M(this,ji),i)}update(e){M(this,Kn).processCallback(this,M(this,ji),e)}}ji=new WeakMap;Kn=new WeakMap;const xh=(t,e=[])=>{let i,a;for(const r of t.attributes||[])if(r.value.includes("{{")){const n=new yE;for([i,a]of Wu(r.value))if(!i)n.append(a);else{const s=new Qe(t,r.name,r.namespaceURI);n.append(s),e.push([a,s])}r.value=n.toString()}for(const r of t.childNodes)if(r.nodeType===$u&&!(r instanceof HTMLTemplateElement))xh(r,e);else{const n=r.data;if(r.nodeType===$u||n.includes("{{")){const s=[];if(n)for([i,a]of Wu(n))if(!i)s.push(new Text(a));else{const l=new Ra(t);s.push(l),e.push([a,l])}else if(r instanceof HTMLTemplateElement){const l=new Uh(t,r);s.push(l),e.push([l.expression,l])}r.replaceWith(...s.flatMap(l=>l.replacementNodes||[l]))}}return e},Bu={},Wu=t=>{let e="",i=0,a=Bu[t],r=0,n;if(a)return a;for(a=[];n=t[r];r++)n==="{"&&t[r+1]==="{"&&t[r-1]!=="\\"&&t[r+2]&&++i==1?(e&&a.push([Hu,e]),e="",r++):n==="}"&&t[r+1]==="}"&&t[r-1]!=="\\"&&!--i?(a.push([_E,e.trim()]),e="",r++):e+=n||"";return e&&a.push([Hu,(i>0?"{{":"")+e]),Bu[t]=a},TE=11;class Nh{get value(){return""}set value(e){}toString(){return this.value}}const Ph=new WeakMap;class yE{constructor(){mt(this,Ei,[])}[Symbol.iterator](){return M(this,Ei).values()}get length(){return M(this,Ei).length}item(e){return M(this,Ei)[e]}append(...e){for(const i of e)i instanceof Qe&&Ph.set(i,this),M(this,Ei).push(i)}toString(){return M(this,Ei).join("")}}Ei=new WeakMap;class Qe extends Nh{constructor(e,i,a){super(),mt(this,bi),mt(this,nr,""),mt(this,Ht,void 0),mt(this,Bt,void 0),mt(this,Wt,void 0),Ct(this,Ht,e),Ct(this,Bt,i),Ct(this,Wt,a)}get attributeName(){return M(this,Bt)}get attributeNamespace(){return M(this,Wt)}get element(){return M(this,Ht)}get value(){return M(this,nr)}set value(e){M(this,nr)!==e&&(Ct(this,nr,e),!M(this,bi,ea)||M(this,bi,ea).length===1?e==null?M(this,Ht).removeAttributeNS(M(this,Wt),M(this,Bt)):M(this,Ht).setAttributeNS(M(this,Wt),M(this,Bt),e):M(this,Ht).setAttributeNS(M(this,Wt),M(this,Bt),M(this,bi,ea).toString()))}get booleanValue(){return M(this,Ht).hasAttributeNS(M(this,Wt),M(this,Bt))}set booleanValue(e){if(!M(this,bi,ea)||M(this,bi,ea).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}}nr=new WeakMap;Ht=new WeakMap;Bt=new WeakMap;Wt=new WeakMap;bi=new WeakSet;ea=function(){return Ph.get(this)};class Ra extends Nh{constructor(e,i){super(),mt(this,Vn,void 0),mt(this,Ve,void 0),Ct(this,Vn,e),Ct(this,Ve,i?[...i]:[new Text])}get replacementNodes(){return M(this,Ve)}get parentNode(){return M(this,Vn)}get nextSibling(){return M(this,Ve)[M(this,Ve).length-1].nextSibling}get previousSibling(){return M(this,Ve)[0].previousSibling}get value(){return M(this,Ve).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===TE?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),Ct(this,Ve,kE(M(this,Ve)[0].parentNode,M(this,Ve),i,this.nextSibling))}}Vn=new WeakMap;Ve=new WeakMap;class Uh extends Ra{constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let r=i.getAttribute("expression")||i.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=i,this.directive=a}}function kE(t,e,i,a=null){let r=0,n,s,l,c=i.length,m=e.length;for(;r<c&&r<m&&e[r]==i[r];)r++;for(;r<c&&r<m&&i[c-1]==e[m-1];)a=i[--m,--c];if(r==m)for(;r<c;)t.insertBefore(i[r++],a);if(r==c)for(;r<m;)t.removeChild(e[r++]);else{for(n=e[r];r<c;)l=i[r++],s=n?n.nextSibling:a,n==l?n=s:r<c&&i[r]==s?(t.replaceChild(l,n),n=s):t.insertBefore(l,n);for(;n!=a;)s=n.nextSibling,t.removeChild(n),n=s}return i}const Fu={string:t=>String(t)};class $h{constructor(e){this.template=e,this.state=void 0}}const Ti=new WeakMap,yi=new WeakMap,Jo={partial:(t,e)=>{e[t.expression]=new $h(t.template)},if:(t,e)=>{var i;if(Hh(t.expression,e))if(Ti.get(t)!==t.template){Ti.set(t,t.template);const a=new eo(t.template,e,bd);t.replace(a),yi.set(t,a)}else(i=yi.get(t))==null||i.update(e);else t.replace(""),Ti.delete(t),yi.delete(t)}},SE=Object.keys(Jo),bd={processCallback(t,e,i){var a,r;if(i)for(const[n,s]of e){if(s instanceof Uh){if(!s.directive){const c=SE.find(m=>s.template.hasAttribute(m));c&&(s.directive=c,s.expression=s.template.getAttribute(c))}(a=Jo[s.directive])==null||a.call(Jo,s,i);continue}let l=Hh(n,i);if(l instanceof $h){Ti.get(s)!==l.template?(Ti.set(s,l.template),l=new eo(l.template,l.state,bd),s.value=l,yi.set(s,l)):(r=yi.get(s))==null||r.update(l.state);continue}l?(s instanceof Qe&&s.attributeName.startsWith("aria-")&&(l=String(l)),s instanceof Qe?typeof l=="boolean"?s.booleanValue=l:typeof l=="function"?s.element[s.attributeName]=l:s.value=l:(s.value=l,Ti.delete(s),yi.delete(s))):s instanceof Qe?s.value=void 0:(s.value=void 0,Ti.delete(s),yi.delete(s))}}},Ku={"!":t=>!t,"!!":t=>!!t,"==":(t,e)=>t==e,"!=":(t,e)=>t!=e,">":(t,e)=>t>e,">=":(t,e)=>t>=e,"<":(t,e)=>t<e,"<=":(t,e)=>t<=e,"??":(t,e)=>t??e,"|":(t,e)=>{var i;return(i=Fu[e])==null?void 0:i.call(Fu,t)}};function IE(t){return LE(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}function Hh(t,e={}){var i,a,r,n,s,l,c;const m=IE(t);if(m.length===0||m.some(({type:f})=>!f))return Ha(t);if(((i=m[0])==null?void 0:i.token)===">"){const f=e[(a=m[1])==null?void 0:a.token];if(!f)return Ha(t);const A={...e};f.state=A;const v=m.slice(2);for(let E=0;E<v.length;E+=3){const y=(r=v[E])==null?void 0:r.token,_=(n=v[E+1])==null?void 0:n.token,I=(s=v[E+2])==null?void 0:s.token;y&&_==="="&&(A[y]=Ba(I,e))}return f}if(m.length===1)return en(m[0])?Ba(m[0].token,e):Ha(t);if(m.length===2){const f=(l=m[0])==null?void 0:l.token,A=Ku[f];if(!A||!en(m[1]))return Ha(t);const v=Ba(m[1].token,e);return A(v)}if(m.length===3){const f=(c=m[1])==null?void 0:c.token,A=Ku[f];if(!A||!en(m[0])||!en(m[2]))return Ha(t);const v=Ba(m[0].token,e);if(f==="|")return A(v,m[2].token);const E=Ba(m[2].token,e);return A(v,E)}}function Ha(t){return console.warn(`Warning: invalid expression \`${t}\``),!1}function en({type:t}){return["number","boolean","string","param"].includes(t)}function Ba(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):kc(t)?parseFloat(t):e[t]}function LE(t,e){let i,a,r;const n=[];for(;t;){r=null,i=t.length;for(const s in e)a=e[s].exec(t),a&&a.index<i&&(r={token:a[0],type:s,matches:a.slice(1)},i=a.index);i&&n.push({token:t.substr(0,i),type:void 0}),r&&n.push(r),t=t.substr(i+(r?r.token.length:0))}return n}var gd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ft=(t,e,i)=>(gd(t,e,"read from private field"),i?i.call(t):e.get(t)),ui=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Mt=(t,e,i,a)=>(gd(t,e,"write to private field"),e.set(t,i),i),po=(t,e,i)=>(gd(t,e,"access private method"),i),va,Gn,Ea,ta,jo,Bh,Yn,el,sr;const vo={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},Wh=ee.createElement("template");Wh.innerHTML=`
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
`;class to extends d.HTMLElement{constructor(){super(),ui(this,jo),ui(this,Yn),ui(this,va,void 0),ui(this,Gn,void 0),ui(this,Ea,void 0),ui(this,ta,void 0),ui(this,sr,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer()),Mt(this,ta,new MutationObserver(e=>{var i;this.mediaController&&!((i=this.mediaController)!=null&&i.breakpointsComputed)||e.some(a=>{const r=a.target;return r===this?!0:r.localName!=="media-controller"?!1:!!(vo[a.attributeName]||a.attributeName.startsWith("breakpoint"))})&&this.render()})),Mt(this,sr,this.render.bind(this)),po(this,jo,Bh).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=Ft(this,va))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(Mt(this,va,e),Mt(this,Ea,null),this.createRenderer())}get props(){var e,i,a;const r=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:s})=>vo[s]||s.startsWith("breakpoint")),...Array.from(this.attributes)],n={};for(const s of r){const l=(a=vo[s.name])!=null?a:Cp(s.name);let{value:c}=s;c!=null?(kc(c)&&(c=parseFloat(c)),n[l]=c===""?!0:c):n[l]=!1}return n}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&po(this,Yn,el).call(this)}connectedCallback(){this.addEventListener(ft.BREAKPOINTS_COMPUTED,Ft(this,sr)),Ft(this,ta).observe(this,{attributes:!0}),Ft(this,ta).observe(this.renderRoot,{attributes:!0,subtree:!0}),po(this,Yn,el).call(this)}disconnectedCallback(){this.removeEventListener(ft.BREAKPOINTS_COMPUTED,Ft(this,sr)),Ft(this,ta).disconnect()}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==Ft(this,Gn)&&(Mt(this,Gn,this.template),this.renderer=new eo(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(Wh.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}}va=new WeakMap;Gn=new WeakMap;Ea=new WeakMap;ta=new WeakMap;jo=new WeakSet;Bh=function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}};Yn=new WeakSet;el=function(){var t;const e=this.getAttribute("template");if(!e||e===Ft(this,Ea))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){Mt(this,Ea,e),Mt(this,va,a),this.createRenderer();return}ME(e)&&(Mt(this,Ea,e),CE(e).then(r=>{const n=ee.createElement("template");n.innerHTML=r,Mt(this,va,n),this.createRenderer()}).catch(console.error))};sr=new WeakMap;to.observedAttributes=["template"];to.processor=bd;function ME(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}async function CE(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}d.customElements.get("media-theme")||d.customElements.define("media-theme",to);function wE({anchor:t,floating:e,placement:i}){const a=RE({anchor:t,floating:e}),{x:r,y:n}=OE(a,i);return{x:r,y:n}}function RE({anchor:t,floating:e}){return{anchor:DE(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function DE(t,e){var i;const a=t.getBoundingClientRect(),r=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}function OE({anchor:t,floating:e},i){const a=xE(i)==="x"?"y":"x",r=a==="y"?"height":"width",n=Fh(i),s=t.x+t.width/2-e.width/2,l=t.y+t.height/2-e.height/2,c=t[r]/2-e[r]/2;let m;switch(n){case"top":m={x:s,y:t.y-e.height};break;case"bottom":m={x:s,y:t.y+t.height};break;case"right":m={x:t.x+t.width,y:l};break;case"left":m={x:t.x-e.width,y:l};break;default:m={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":m[a]-=c;break;case"end":m[a]+=c;break}return m}function Fh(t){return t.split("-")[0]}function xE(t){return["top","bottom"].includes(Fh(t))?"y":"x"}class fd extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}}class NE extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}}var _d=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},D=(t,e,i)=>(_d(t,e,"read from private field"),i?i.call(t):e.get(t)),N=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},xe=(t,e,i,a)=>(_d(t,e,"write to private field"),e.set(t,i),i),P=(t,e,i)=>(_d(t,e,"access private method"),i),ct,Zt,wt,qn,or,Li,xr,tl,Kh,Ms,Ad,Cs,Zn,il,al,Vh,rl,Gh,nl,Yh,ba,ga,fa,Nr,ws,Td,sl,qh,yd,Zh,ol,zh,kd,Qh,ll,Xh,dl,Jh,gr,Rs,ul,jh,fr,Ds,zn,cl;function Ia({type:t,text:e,value:i,checked:a}){const r=ee.createElement("media-chrome-menu-item");r.type=t,r.part.add("menu-item"),r.part.add(t),r.value=i,r.checked=a;const n=ee.createElement("span");return n.textContent=e,r.append(n),r}function Mi(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}function PE(t){return`
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
  `}const ci={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class Ue extends d.HTMLElement{constructor(){if(super(),N(this,tl),N(this,Ms),N(this,Zn),N(this,al),N(this,rl),N(this,nl),N(this,fa),N(this,ws),N(this,sl),N(this,yd),N(this,ol),N(this,kd),N(this,ll),N(this,dl),N(this,gr),N(this,ul),N(this,fr),N(this,zn),N(this,ct,null),N(this,Zt,null),N(this,wt,null),N(this,qn,new Set),N(this,or,void 0),N(this,Li,!1),N(this,xr,null),N(this,Cs,()=>{const e=D(this,qn),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));xe(this,qn,i)}),N(this,ba,()=>{P(this,fa,Nr).call(this),P(this,ws,Td).call(this,!1)}),N(this,ga,()=>{P(this,fa,Nr).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),xe(this,or,new MutationObserver(D(this,Cs)))}static get observedAttributes(){return[ci.DISABLED,ci.HIDDEN,ci.STYLE,ci.ANCHOR,O.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":P(this,tl,Kh).call(this,e);break;case"invoke":P(this,al,Vh).call(this,e);break;case"click":P(this,sl,qh).call(this,e);break;case"toggle":P(this,ol,zh).call(this,e);break;case"focusout":P(this,ll,Xh).call(this,e);break;case"keydown":P(this,dl,Jh).call(this,e);break}}connectedCallback(){var e,i;D(this,or).observe(this.defaultSlot,{childList:!0}),xe(this,xr,xl(this.shadowRoot,":host")),P(this,Zn,il).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),xe(this,ct,ko(this)),(i=(e=D(this,ct))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(Ta(Pr(this),D(this,ba)),Ta(this,D(this,ga))),P(this,Ms,Ad).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var e,i;D(this,or).disconnect(),ya(Pr(this),D(this,ba)),ya(this,D(this,ga)),this.disable(),(i=(e=D(this,ct))==null?void 0:e.unassociateElement)==null||i.call(e,this),xe(this,ct,null),xe(this,Zt,null),xe(this,wt,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(e,i,a){var r,n,s,l;e===ci.HIDDEN&&a!==i?(D(this,Li)||xe(this,Li,!0),this.hidden?P(this,nl,Yh).call(this):P(this,rl,Gh).call(this),this.dispatchEvent(new NE({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===O.MEDIA_CONTROLLER?(i&&((n=(r=D(this,ct))==null?void 0:r.unassociateElement)==null||n.call(r,this),xe(this,ct,null)),a&&this.isConnected&&(xe(this,ct,ko(this)),(l=(s=D(this,ct))==null?void 0:s.associateElement)==null||l.call(s,this))):e===ci.DISABLED&&a!==i?a==null?this.enable():this.disable():e===ci.STYLE&&a!==i&&P(this,Zn,il).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=Fs(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(UE)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&P(this,zn,cl).call(this,i)}focus(){if(xe(this,Zt,Ol()),this.items.length){P(this,fr,Ds).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=P(this,gr,Rs).call(this,e);a&&(P(this,zn,cl).call(this,a,a.type==="checkbox"),D(this,wt)&&!this.hidden&&((i=D(this,Zt))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:r}=e,n=this.items,s=(a=(i=P(this,gr,Rs).call(this,e))!=null?i:P(this,ul,jh).call(this))!=null?a:n[0],l=n.indexOf(s);let c=Math.max(0,l);r==="ArrowDown"?c++:r==="ArrowUp"?c--:e.key==="Home"?c=0:e.key==="End"&&(c=n.length-1),c<0&&(c=n.length-1),c>n.length-1&&(c=0),P(this,fr,Ds).call(this,n[c]),n[c].focus()}}ct=new WeakMap;Zt=new WeakMap;wt=new WeakMap;qn=new WeakMap;or=new WeakMap;Li=new WeakMap;xr=new WeakMap;tl=new WeakSet;Kh=function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&P(this,Ms,Ad).call(this),e.name||D(this,Cs).call(this)};Ms=new WeakSet;Ad=function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0};Cs=new WeakMap;Zn=new WeakSet;il=function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};al=new WeakSet;Vh=function(t){xe(this,wt,t.relatedTarget),Rt(this,t.relatedTarget)||(this.hidden=!this.hidden)};rl=new WeakSet;Gh=function(){var t;(t=D(this,wt))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Ta(Pr(this),D(this,ba)),Ta(this,D(this,ga))};nl=new WeakSet;Yh=function(){var t;(t=D(this,wt))==null||t.setAttribute("aria-expanded","false"),ya(Pr(this),D(this,ba)),ya(this,D(this,ga))};ba=new WeakMap;ga=new WeakMap;fa=new WeakSet;Nr=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=wE({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const r=Pr(this).getBoundingClientRect(),n=r.width-e-t,s=r.height-i-this.offsetHeight,{style:l}=D(this,xr);l.setProperty("position","absolute"),l.setProperty("right",`${Math.max(0,n)}px`),l.setProperty("--_menu-bottom",`${s}px`);const c=getComputedStyle(this),f=l.getPropertyValue("--_menu-bottom")===c.bottom?s:parseFloat(c.bottom),A=r.height-f-parseFloat(c.marginBottom);this.style.setProperty("--_menu-max-height",`${A}px`)};ws=new WeakSet;Td=function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=D(this,xr);if(t||a.setProperty("--media-menu-transition-in","none"),i){const r=i.offsetHeight,n=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${n}px`),this.style.setProperty("min-height",`${r}px`),P(this,fa,Nr).call(this,n)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),P(this,fa,Nr).call(this);a.removeProperty("--media-menu-transition-in")};sl=new WeakSet;qh=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(D(this,yd,Zh))){(e=D(this,Zt))==null||e.focus(),this.hidden=!0;return}const i=P(this,gr,Rs).call(this,t);!i||i.hasAttribute("disabled")||(P(this,fr,Ds).call(this,i),this.handleSelect(t))};yd=new WeakSet;Zh=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};ol=new WeakSet;zh=function(t){if(t.target===this)return;P(this,kd,Qh).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new fd({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);P(this,ws,Td).call(this,!0)};kd=new WeakSet;Qh=function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};ll=new WeakSet;Xh=function(t){var e;Rt(this,t.relatedTarget)||(D(this,Li)&&((e=D(this,Zt))==null||e.focus()),D(this,wt)&&D(this,wt)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};dl=new WeakSet;Jh=function(t){var e,i,a,r,n;const{key:s,ctrlKey:l,altKey:c,metaKey:m}=t;if(!(l||c||m)&&this.keysUsed.includes(s))if(t.preventDefault(),t.stopPropagation(),s==="Tab"){if(D(this,Li)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else s==="Escape"?((n=D(this,Zt))==null||n.focus(),D(this,Li)&&(this.hidden=!0)):s==="Enter"||s===" "?this.handleSelect(t):this.handleMove(t)};gr=new WeakSet;Rs=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};ul=new WeakSet;jh=function(){return this.items.find(t=>t.tabIndex===0)};fr=new WeakSet;Ds=function(t){for(const e of this.items)e.tabIndex=e===t?0:-1};zn=new WeakSet;cl=function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};Ue.shadowRootOptions={mode:"open"};Ue.getTemplateHTML=PE;function UE(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}function Pr(t){var e;return(e=t.getAttribute("bounds")?Ma(t,`#${t.getAttribute("bounds")}`):fe(t)||t.parentElement)!=null?e:t}d.customElements.get("media-chrome-menu")||d.customElements.define("media-chrome-menu",Ue);var Sd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},he=(t,e,i)=>(Sd(t,e,"read from private field"),i?i.call(t):e.get(t)),At=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Eo=(t,e,i,a)=>(Sd(t,e,"write to private field"),e.set(t,i),i),ca=(t,e,i)=>(Sd(t,e,"access private method"),i),Qn,_r,hl,em,Os,Id,Ld,tm,Et,ia,ml,Xn,pl;function $E(t){return`
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
  `}function HE(t){return""}const Re={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class Xt extends d.HTMLElement{constructor(){if(super(),At(this,hl),At(this,Os),At(this,Ld),At(this,Xn),At(this,Qn,!1),At(this,_r,void 0),At(this,Et,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],n=(i=r?.dataset.description)!=null?i:r?.text,s=ee.createElement("span");s.textContent=n??"",a.replaceChildren(s)}),At(this,ia,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",he(this,ia));return}this.handleClick(e)}),At(this,ml,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",he(this,ia));return}this.addEventListener("keyup",he(this,ia),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Le(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Re.TYPE,Re.DISABLED,Re.CHECKED,Re.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Wa(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":ca(this,hl,em).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":he(this,ml).call(this,e);break;case"keyup":he(this,ia).call(this,e);break}}attributeChangedCallback(e,i,a){e===Re.CHECKED&&Wa(this)&&!he(this,Qn)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===Re.TYPE&&a!==i?this.role="menuitem"+a:e===Re.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(Re.DISABLED)||this.enable(),this.role="menuitem"+this.type,Eo(this,_r,vl(this,this.parentNode)),ca(this,Xn,pl).call(this),this.submenuElement&&ca(this,Os,Id).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),ca(this,Xn,pl).call(this),Eo(this,_r,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Fs(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(Re.TYPE))!=null?e:""}set type(e){this.setAttribute(Re.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(Re.VALUE))!=null?e:this.text}set value(e){this.setAttribute(Re.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(Wa(this))return this.getAttribute("aria-checked")==="true"}set checked(e){Wa(this)&&(Eo(this,Qn,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){Wa(this)||this.invokeTargetElement&&Rt(this,e.target)&&this.invokeTargetElement.dispatchEvent(new fd({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}Qn=new WeakMap;_r=new WeakMap;hl=new WeakSet;em=function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?ca(this,Os,Id).call(this):ca(this,Ld,tm).call(this))};Os=new WeakSet;Id=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",he(this,Et)),this.submenuElement.addEventListener("addmenuitem",he(this,Et)),this.submenuElement.addEventListener("removemenuitem",he(this,Et)),he(this,Et).call(this)};Ld=new WeakSet;tm=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",he(this,Et)),this.submenuElement.removeEventListener("addmenuitem",he(this,Et)),this.submenuElement.removeEventListener("removemenuitem",he(this,Et)),he(this,Et).call(this)};Et=new WeakMap;ia=new WeakMap;ml=new WeakMap;Xn=new WeakSet;pl=function(){var t;const e=(t=he(this,_r))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")};Xt.shadowRootOptions={mode:"open"};Xt.getTemplateHTML=$E;Xt.getSuffixSlotInnerHTML=HE;function Wa(t){return t.type==="radio"||t.type==="checkbox"}function vl(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?vl(t,i):e?.items?e:vl(e,e?.parentNode)}d.customElements.get("media-chrome-menu-item")||d.customElements.define("media-chrome-menu-item",Xt);function BE(t){return`
    ${Ue.getTemplateHTML(t)}
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
  `}class im extends Ue{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:fe(this).querySelector("media-settings-menu-button")}}im.getTemplateHTML=BE;d.customElements.get("media-settings-menu")||d.customElements.define("media-settings-menu",im);function WE(t){return`
    ${Xt.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function FE(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}class io extends Xt{}io.shadowRootOptions={mode:"open"};io.getTemplateHTML=WE;io.getSuffixSlotInnerHTML=FE;d.customElements.get("media-settings-menu-item")||d.customElements.define("media-settings-menu-item",io);class Da extends se{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Fs(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new fd({relatedTarget:this}))}}d.customElements.get("media-chrome-menu-button")||d.customElements.define("media-chrome-menu-button",Da);function KE(){return`
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
  `}function VE(){return b("Settings")}class Md extends Da{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",b("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:fe(this).querySelector("media-settings-menu")}}Md.getSlotTemplateHTML=KE;Md.getTooltipContentHTML=VE;d.customElements.get("media-settings-menu-button")||d.customElements.define("media-settings-menu-button",Md);var Cd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},am=(t,e,i)=>(Cd(t,e,"read from private field"),i?i.call(t):e.get(t)),tn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},El=(t,e,i,a)=>(Cd(t,e,"write to private field"),e.set(t,i),i),an=(t,e,i)=>(Cd(t,e,"access private method"),i),lr,xs,Jn,bl,jn,gl;class GE extends Ue{constructor(){super(...arguments),tn(this,Jn),tn(this,jn),tn(this,lr,[]),tn(this,xs,void 0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_AUDIO_TRACK_LIST,o.MEDIA_AUDIO_TRACK_ENABLED,o.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===o.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(El(this,lr,Ip(a??"")),an(this,Jn,bl).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",an(this,jn,gl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",an(this,jn,gl))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=fe(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return am(this,lr)}set mediaAudioTrackList(e){El(this,lr,e),an(this,Jn,bl).call(this)}get mediaAudioTrackEnabled(){var e;return(e=F(this,o.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){H(this,o.MEDIA_AUDIO_TRACK_ENABLED,e)}}lr=new WeakMap;xs=new WeakMap;Jn=new WeakSet;bl=function(){if(am(this,xs)===JSON.stringify(this.mediaAudioTrackList))return;El(this,xs,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=Ia({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(Mi(this,"checked-indicator")),this.defaultSlot.append(a)}};jn=new WeakSet;gl=function(){if(this.value==null)return;const t=new d.CustomEvent(g.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};d.customElements.get("media-audio-track-menu")||d.customElements.define("media-audio-track-menu",GE);const YE=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function qE(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${YE}</slot>
  `}function ZE(){return b("Audio")}const Vu=t=>{const e=b("Audio");t.setAttribute("aria-label",e)};class wd extends Da{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_AUDIO_TRACK_ENABLED,o.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Vu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_LANG&&Vu(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=fe(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=F(this,o.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){H(this,o.MEDIA_AUDIO_TRACK_ENABLED,e)}}wd.getSlotTemplateHTML=qE;wd.getTooltipContentHTML=ZE;d.customElements.get("media-audio-track-menu-button")||d.customElements.define("media-audio-track-menu-button",wd);var Rd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},zE=(t,e,i)=>(Rd(t,e,"read from private field"),e.get(t)),bo=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},QE=(t,e,i,a)=>(Rd(t,e,"write to private field"),e.set(t,i),i),rn=(t,e,i)=>(Rd(t,e,"access private method"),i),Ns,es,fl,ts,_l;const XE=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function JE(t){return`
    ${Ue.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${XE}</slot>
  `}class rm extends Ue{constructor(){super(...arguments),bo(this,es),bo(this,ts),bo(this,Ns,void 0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_SUBTITLES_LIST&&i!==a?rn(this,es,fl).call(this):e===o.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",rn(this,es,fl).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",rn(this,ts,_l))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",rn(this,ts,_l))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:fe(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Gu(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Yu(this,o.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Gu(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Yu(this,o.MEDIA_SUBTITLES_SHOWING,e)}}Ns=new WeakMap;es=new WeakSet;fl=function(){var t;const e=zE(this,Ns)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(o.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;QE(this,Ns,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,r=Ia({type:"radio",text:this.formatMenuItemText(b("Off")),value:"off",checked:a});r.prepend(Mi(this,"checked-indicator")),this.defaultSlot.append(r);const n=this.mediaSubtitlesList;for(const s of n){const l=Ia({type:"radio",text:this.formatMenuItemText(s.label,s),value:Mo(s),checked:this.value==Mo(s)});l.prepend(Mi(this,"checked-indicator")),((t=s.kind)!=null?t:"subs")==="captions"&&l.append(Mi(this,"captions-indicator")),this.defaultSlot.append(l)}};ts=new WeakSet;_l=function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(o.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new d.CustomEvent(g.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new d.CustomEvent(g.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};rm.getTemplateHTML=JE;const Gu=(t,e)=>{const i=t.getAttribute(e);return i?qs(i):[]},Yu=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Cr(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};d.customElements.get("media-captions-menu")||d.customElements.define("media-captions-menu",rm);const jE=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,eb=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function tb(){return`
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
      <slot name="on">${jE}</slot>
      <slot name="off">${eb}</slot>
    </slot>
  `}function ib(){return b("Captions")}const qu=t=>{t.setAttribute("data-captions-enabled",Kc(t).toString())},Zu=t=>{t.setAttribute("aria-label",b("closed captions"))};class Dd extends Da{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING,o.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),Zu(this),qu(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_SUBTITLES_SHOWING?qu(this):e===o.MEDIA_LANG&&Zu(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=fe(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return zu(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Qu(this,o.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return zu(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Qu(this,o.MEDIA_SUBTITLES_SHOWING,e)}}Dd.getSlotTemplateHTML=tb;Dd.getTooltipContentHTML=ib;const zu=(t,e)=>{const i=t.getAttribute(e);return i?qs(i):[]},Qu=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Cr(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};d.customElements.get("media-captions-menu-button")||d.customElements.define("media-captions-menu-button",Dd);var nm=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},aa=(t,e,i)=>(nm(t,e,"read from private field"),i?i.call(t):e.get(t)),go=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ui=(t,e,i)=>(nm(t,e,"access private method"),i),Gt,ra,dr,is,Al;const fo={RATES:"rates"};class ab extends Ue{constructor(){super(),go(this,ra),go(this,is),go(this,Gt,new Ul(this,fo.RATES,{defaultValue:Ah})),Ui(this,ra,dr).call(this)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,fo.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,Ui(this,ra,dr).call(this)):e===fo.RATES&&i!=a&&(aa(this,Gt).value=a,Ui(this,ra,dr).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ui(this,is,Al))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ui(this,is,Al))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:fe(this).querySelector("media-playback-rate-menu-button")}get rates(){return aa(this,Gt)}set rates(e){e?Array.isArray(e)?aa(this,Gt).value=e.join(" "):typeof e=="string"&&(aa(this,Gt).value=e):aa(this,Gt).value="",Ui(this,ra,dr).call(this)}get mediaPlaybackRate(){return $(this,o.MEDIA_PLAYBACK_RATE,ua)}set mediaPlaybackRate(e){q(this,o.MEDIA_PLAYBACK_RATE,e)}}Gt=new WeakMap;ra=new WeakSet;dr=function(){this.defaultSlot.textContent="";const t=this.mediaPlaybackRate,e=new Set(Array.from(aa(this,Gt)).map(a=>Number(a)));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,r)=>a-r);for(const a of i){const r=Ia({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});r.prepend(Mi(this,"checked-indicator")),this.defaultSlot.append(r)}};is=new WeakSet;Al=function(){if(!this.value)return;const t=new d.CustomEvent(g.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};d.customElements.get("media-playback-rate-menu")||d.customElements.define("media-playback-rate-menu",ab);const as=1;function rb(t){return`
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
    <slot name="icon">${t.mediaplaybackrate||as}x</slot>
  `}function nb(){return b("Playback rate")}class Od extends Da{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:as}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===o.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,n=Number.isNaN(r)?as:r;this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",b("Playback rate {playbackRate}",{playbackRate:n}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:fe(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return $(this,o.MEDIA_PLAYBACK_RATE,as)}set mediaPlaybackRate(e){q(this,o.MEDIA_PLAYBACK_RATE,e)}}Od.getSlotTemplateHTML=rb;Od.getTooltipContentHTML=nb;d.customElements.get("media-playback-rate-menu-button")||d.customElements.define("media-playback-rate-menu-button",Od);var xd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ur=(t,e,i)=>(xd(t,e,"read from private field"),i?i.call(t):e.get(t)),nn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xu=(t,e,i,a)=>(xd(t,e,"write to private field"),e.set(t,i),i),$i=(t,e,i)=>(xd(t,e,"access private method"),i),cr,ha,na,hr,rs,Tl;class sb extends Ue{constructor(){super(...arguments),nn(this,na),nn(this,rs),nn(this,cr,[]),nn(this,ha,{})}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_RENDITION_LIST,o.MEDIA_RENDITION_SELECTED,o.MEDIA_RENDITION_UNAVAILABLE,o.MEDIA_HEIGHT]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const r=e.bitrate/1e6,n=`${r.toFixed(r<1?1:0)} Mbps`;return`${a} (${n})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,r;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((r=e.bitrate)!=null?r:0):i.height-e.height}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===o.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a??"auto",$i(this,na,hr).call(this)):e===o.MEDIA_RENDITION_LIST&&i!==a?(Xu(this,cr,Tp(a)),$i(this,na,hr).call(this)):e===o.MEDIA_HEIGHT&&i!==a&&$i(this,na,hr).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",$i(this,rs,Tl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",$i(this,rs,Tl))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:fe(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return ur(this,cr)}set mediaRenditionList(e){Xu(this,cr,e),$i(this,na,hr).call(this)}get mediaRenditionSelected(){return F(this,o.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){H(this,o.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return $(this,o.MEDIA_HEIGHT)}set mediaHeight(e){q(this,o.MEDIA_HEIGHT,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}}cr=new WeakMap;ha=new WeakMap;na=new WeakSet;hr=function(){if(ur(this,ha).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&ur(this,ha).mediaHeight===this.mediaHeight)return;ur(this,ha).mediaRenditionList=JSON.stringify(this.mediaRenditionList),ur(this,ha).mediaHeight=this.mediaHeight;const t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),e=t.find(s=>s.id===this.mediaRenditionSelected);for(const s of t)s.selected=s===e;this.defaultSlot.textContent="";const i=!this.mediaRenditionSelected;for(const s of t){const l=this.formatRendition(s,{showBitrate:this.showRenditionBitrate(s)}),c=Ia({type:"radio",text:l,value:`${s.id}`,checked:s.selected&&!i});c.prepend(Mi(this,"checked-indicator")),this.defaultSlot.append(c)}const a=e&&this.showRenditionBitrate(e),r=i?e?this.formatMenuItemText(`${b("Auto")} • ${this.formatRendition(e,{showBitrate:a})}`,e):this.formatMenuItemText(`${b("Auto")} (${this.mediaHeight}p)`):this.formatMenuItemText(b("Auto")),n=Ia({type:"radio",text:r,value:"auto",checked:i});n.dataset.description=r,n.prepend(Mi(this,"checked-indicator")),this.defaultSlot.append(n)};rs=new WeakSet;Tl=function(){if(this.value==null)return;const t=new d.CustomEvent(g.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};d.customElements.get("media-rendition-menu")||d.customElements.define("media-rendition-menu",sb);const ob=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function lb(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${ob}</slot>
  `}function db(){return b("Quality")}class Nd extends Da{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_RENDITION_SELECTED,o.MEDIA_RENDITION_UNAVAILABLE,o.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",b("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:fe(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return F(this,o.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){H(this,o.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return $(this,o.MEDIA_HEIGHT)}set mediaHeight(e){q(this,o.MEDIA_HEIGHT,e)}}Nd.getSlotTemplateHTML=lb;Nd.getTooltipContentHTML=db;d.customElements.get("media-rendition-menu-button")||d.customElements.define("media-rendition-menu-button",Nd);var Pd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ht=(t,e,i)=>(Pd(t,e,"read from private field"),i?i.call(t):e.get(t)),it=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},sm=(t,e,i,a)=>(Pd(t,e,"write to private field"),e.set(t,i),i),Ne=(t,e,i)=>(Pd(t,e,"access private method"),i),La,Ur,ao,_i,ma,Ud,om,ns,yl,ss,kl,lm,Ps,Us,os;function ub(t){return`
      ${Ue.getTemplateHTML(t)}
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
    `}class dm extends Ue{constructor(){super(),it(this,Ur),it(this,_i),it(this,Ud),it(this,ns),it(this,kl),it(this,La,!1),it(this,ss,e=>{const i=e.target,a=i?.nodeName==="VIDEO",r=Ne(this,ns,yl).call(this,i);(a||r)&&(ht(this,La)?Ne(this,_i,ma).call(this):Ne(this,kl,lm).call(this,e))}),it(this,Ps,e=>{const i=e.target,a=this.contains(i),r=e.button===2,n=i?.nodeName==="VIDEO",s=Ne(this,ns,yl).call(this,i);a||r&&(n||s)||Ne(this,_i,ma).call(this)}),it(this,Us,e=>{e.key==="Escape"&&Ne(this,_i,ma).call(this)}),it(this,os,e=>{var i,a;const r=e.target;if((i=r.matches)!=null&&i.call(r,'button[invoke="copy"]')){const n=(a=r.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');n&&navigator.clipboard.writeText(n.value)}Ne(this,_i,ma).call(this)}),this.setAttribute("noautohide",""),Ne(this,Ur,ao).call(this)}connectedCallback(){super.connectedCallback(),fe(this).addEventListener("contextmenu",ht(this,ss)),this.addEventListener("click",ht(this,os))}disconnectedCallback(){super.disconnectedCallback(),fe(this).removeEventListener("contextmenu",ht(this,ss)),this.removeEventListener("click",ht(this,os)),document.removeEventListener("mousedown",ht(this,Ps)),document.removeEventListener("keydown",ht(this,Us))}}La=new WeakMap;Ur=new WeakSet;ao=function(){this.hidden=!ht(this,La)};_i=new WeakSet;ma=function(){sm(this,La,!1),Ne(this,Ur,ao).call(this)};Ud=new WeakSet;om=function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&Ne(i=e,_i,ma).call(i)})};ns=new WeakSet;yl=function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1};ss=new WeakMap;kl=new WeakSet;lm=function(t){t.preventDefault(),Ne(this,Ud,om).call(this),sm(this,La,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,Ne(this,Ur,ao).call(this),document.addEventListener("mousedown",ht(this,Ps),{once:!0}),document.addEventListener("keydown",ht(this,Us),{once:!0})};Ps=new WeakMap;Us=new WeakMap;os=new WeakMap;dm.getTemplateHTML=ub;d.customElements.get("media-context-menu")||d.customElements.define("media-context-menu",dm);function cb(t){return`
    ${Xt.getTemplateHTML.call(this,t)}
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
  `}class $d extends Xt{}$d.shadowRootOptions={mode:"open"};$d.getTemplateHTML=cb;d.customElements.get("media-context-menu-item")||d.customElements.define("media-context-menu-item",$d);var um=t=>{throw TypeError(t)},Hd=(t,e,i)=>e.has(t)||um("Cannot "+i),L=(t,e,i)=>(Hd(t,e,"read from private field"),i?i.call(t):e.get(t)),de=(t,e,i)=>e.has(t)?um("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),ge=(t,e,i,a)=>(Hd(t,e,"write to private field"),e.set(t,i),i),z=(t,e,i)=>(Hd(t,e,"access private method"),i),ro=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends ro{}globalThis.DocumentFragment=t}var Bd=class extends ro{},hb=class extends ro{},mb={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(Bd)}},ls,pb=class{constructor(t,e={}){de(this,ls),ge(this,ls,e?.detail)}get detail(){return L(this,ls)}initCustomEvent(){}};ls=new WeakMap;function vb(t,e){return new Bd}var cm={document:{createElement:vb},DocumentFragment,customElements:mb,CustomEvent:pb,EventTarget:ro,HTMLElement:Bd,HTMLVideoElement:hb},hm=typeof window>"u"||typeof globalThis.customElements>"u",pt=hm?cm:globalThis,$s=hm?cm.document:globalThis.document;function Eb(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${Sl(i)}: ${a}; `)}),e?e.trim():void 0}function Sl(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function mm(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function ke(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}function pm(t){let e=bb(t).toString();return e?"?"+e:""}function bb(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}var vm=(t,e)=>!t||!e?!1:t.contains(e)?!0:vm(t,e.getRootNode().host),Em="mux.com",gb=()=>{try{return"3.11.6"}catch{}return"UNKNOWN"},fb=gb(),bm=()=>fb,_b=(t,{token:e,customDomain:i=Em,thumbnailTime:a,programTime:r}={})=>{var n;let s=e==null?a:void 0,{aud:l}=(n=mr(e))!=null?n:{};if(!(e&&l!=="t"))return`https://image.${i}/${t}/thumbnail.webp${pm({token:e,time:s,program_time:r})}`},Ab=(t,{token:e,customDomain:i=Em,programStartTime:a,programEndTime:r}={})=>{var n;let{aud:s}=(n=mr(e))!=null?n:{};if(!(e&&s!=="s"))return`https://image.${i}/${t}/storyboard.vtt${pm({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},Wd=t=>{if(t){if([be.LIVE,be.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return be.LIVE}},Tb={crossorigin:"crossOrigin",playsinline:"playsInline"};function yb(t){var e;return(e=Tb[t])!=null?e:mm(t)}var sa,oa,Ee,kb=class{constructor(t,e){de(this,sa),de(this,oa),de(this,Ee,[]),ge(this,sa,t),ge(this,oa,e)}[Symbol.iterator](){return L(this,Ee).values()}get length(){return L(this,Ee).length}get value(){var t;return(t=L(this,Ee).join(" "))!=null?t:""}set value(t){var e;t!==this.value&&(ge(this,Ee,[]),this.add(...(e=t?.split(" "))!=null?e:[]))}toString(){return this.value}item(t){return L(this,Ee)[t]}values(){return L(this,Ee).values()}keys(){return L(this,Ee).keys()}forEach(t){L(this,Ee).forEach(t)}add(...t){var e,i;t.forEach(a=>{this.contains(a)||L(this,Ee).push(a)}),!(this.value===""&&!((e=L(this,sa))!=null&&e.hasAttribute(`${L(this,oa)}`)))&&((i=L(this,sa))==null||i.setAttribute(`${L(this,oa)}`,`${this.value}`))}remove(...t){var e;t.forEach(i=>{L(this,Ee).splice(L(this,Ee).indexOf(i),1)}),(e=L(this,sa))==null||e.setAttribute(`${L(this,oa)}`,`${this.value}`)}contains(t){return L(this,Ee).includes(t)}toggle(t,e){return typeof e<"u"?e?(this.add(t),!0):(this.remove(t),!1):this.contains(t)?(this.remove(t),!1):(this.add(t),!0)}replace(t,e){this.remove(t),this.add(e)}};sa=new WeakMap,oa=new WeakMap,Ee=new WeakMap;var gm=`[mux-player ${bm()}]`;function yt(...t){console.warn(gm,...t)}function Se(...t){console.error(gm,...t)}function Ju(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${V("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),yt(i)}var ue={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},gi={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},ju=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),Sb=Object.values(ue).filter(t=>ue.PLAYSINLINE!==t),Ib=Object.values(gi),Lb=[...Sb,...Ib],Mb=class extends pt.HTMLElement{static get observedAttributes(){return Lb}constructor(){super()}attributeChangedCallback(t,e,i){var a,r;switch(t){case gi.MUTED:{this.media&&(this.media.muted=i!=null,this.media.defaultMuted=i!=null);return}case gi.VOLUME:{let n=(a=ke(i))!=null?a:1;this.media&&(this.media.volume=n);return}case gi.PLAYBACKRATE:{let n=(r=ke(i))!=null?r:1;this.media&&(this.media.playbackRate=n,this.media.defaultPlaybackRate=n);return}}}play(){var t,e;return(e=(t=this.media)==null?void 0:t.play())!=null?e:Promise.reject()}pause(){var t;(t=this.media)==null||t.pause()}load(){var t;(t=this.media)==null||t.load()}get media(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var t,e;return(e=(t=this.media)==null?void 0:t.paused)!=null?e:!0}get duration(){var t,e;return(e=(t=this.media)==null?void 0:t.duration)!=null?e:NaN}get ended(){var t,e;return(e=(t=this.media)==null?void 0:t.ended)!=null?e:!1}get buffered(){var t,e;return(e=(t=this.media)==null?void 0:t.buffered)!=null?e:ju}get seekable(){var t,e;return(e=(t=this.media)==null?void 0:t.seekable)!=null?e:ju}get readyState(){var t,e;return(e=(t=this.media)==null?void 0:t.readyState)!=null?e:0}get videoWidth(){var t,e;return(e=(t=this.media)==null?void 0:t.videoWidth)!=null?e:0}get videoHeight(){var t,e;return(e=(t=this.media)==null?void 0:t.videoHeight)!=null?e:0}get currentSrc(){var t,e;return(e=(t=this.media)==null?void 0:t.currentSrc)!=null?e:""}get currentTime(){var t,e;return(e=(t=this.media)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.media&&(this.media.currentTime=Number(t))}get volume(){var t,e;return(e=(t=this.media)==null?void 0:t.volume)!=null?e:1}set volume(t){this.media&&(this.media.volume=Number(t))}get playbackRate(){var t,e;return(e=(t=this.media)==null?void 0:t.playbackRate)!=null?e:1}set playbackRate(t){this.media&&(this.media.playbackRate=Number(t))}get defaultPlaybackRate(){var t;return(t=ke(this.getAttribute(gi.PLAYBACKRATE)))!=null?t:1}set defaultPlaybackRate(t){t!=null?this.setAttribute(gi.PLAYBACKRATE,`${t}`):this.removeAttribute(gi.PLAYBACKRATE)}get crossOrigin(){return Fa(this,ue.CROSSORIGIN)}set crossOrigin(t){this.setAttribute(ue.CROSSORIGIN,`${t}`)}get autoplay(){return Fa(this,ue.AUTOPLAY)!=null}set autoplay(t){t?this.setAttribute(ue.AUTOPLAY,typeof t=="string"?t:""):this.removeAttribute(ue.AUTOPLAY)}get loop(){return Fa(this,ue.LOOP)!=null}set loop(t){t?this.setAttribute(ue.LOOP,""):this.removeAttribute(ue.LOOP)}get muted(){var t,e;return(e=(t=this.media)==null?void 0:t.muted)!=null?e:!1}set muted(t){this.media&&(this.media.muted=!!t)}get defaultMuted(){return Fa(this,ue.MUTED)!=null}set defaultMuted(t){t?this.setAttribute(ue.MUTED,""):this.removeAttribute(ue.MUTED)}get playsInline(){return Fa(this,ue.PLAYSINLINE)!=null}set playsInline(t){Se("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(t){["","none","metadata","auto"].includes(t)?this.setAttribute(ue.PRELOAD,t):this.removeAttribute(ue.PRELOAD)}};function Fa(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}var ec=Mb,Cb=`:host {
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
`,Ka=new WeakMap,wb=class fm{constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=Ka.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=Ka.get(this.element);i&&i.delete(this.type)}}static for(e){Ka.has(e.element)||Ka.set(e.element,new Map);let i=e.attributeName.slice(2),a=Ka.get(e.element);return a&&a.has(i)?a.get(i):new fm(e.element,i)}};function Rb(t,e){return t instanceof Qe&&t.attributeName.startsWith("on")?(wb.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}function Db(t,e){return e instanceof _m&&t instanceof Ra?(e.renderInto(t),!0):!1}function Ob(t,e){return e instanceof DocumentFragment&&t instanceof Ra?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}function xb(t,e){if(t instanceof Qe){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}function Nb(t,e){if(t instanceof Qe&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}function Pb(t,e){if(typeof e=="boolean"&&t instanceof Qe){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}function Ub(t,e){return e===!1&&t instanceof Ra?(t.replace(""),!0):!1}function $b(t,e){Nb(t,e)||Pb(t,e)||Rb(t,e)||Ub(t,e)||Db(t,e)||Ob(t,e)||xb(t,e)}var _o=new Map,tc=new WeakMap,ic=new WeakMap,_m=class{constructor(t,e,i){this.strings=t,this.values=e,this.processor=i,this.stringsKey=this.strings.join("")}get template(){if(_o.has(this.stringsKey))return _o.get(this.stringsKey);{let t=$s.createElement("template"),e=this.strings.length-1;return t.innerHTML=this.strings.reduce((i,a,r)=>i+a+(r<e?`{{ ${r} }}`:""),""),_o.set(this.stringsKey,t),t}}renderInto(t){var e;let i=this.template;if(tc.get(t)!==i){tc.set(t,i);let r=new eo(i,this.values,this.processor);ic.set(t,r),t instanceof Ra?t.replace(...r.children):t.appendChild(r);return}let a=ic.get(t);(e=a?.update)==null||e.call(a,this.values)}},Hb={processCallback(t,e,i){var a;if(i){for(let[r,n]of e)if(r in i){let s=(a=i[r])!=null?a:"";$b(n,s)}}}};function ds(t,...e){return new _m(t,e,Hb)}function Bb(t,e){t.renderInto(e)}var Wb=t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},Fb=t=>ds`
  <style>
    ${Wb(t)}
    ${Cb}
  </style>
  ${Yb(t)}
`,Kb=t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return Wd(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},Vb={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},Gb=Object.values(Vb).join(", "),Yb=t=>{var e,i,a,r,n,s,l,c,m,f,A,v,E,y,_,I,S,Q,Xe,Je,$e,me,pe,je,Me,Jt,jt,ei,ti,ii,ai,ri,wi,He,ni,si,oi,ve,_e;return ds`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${Kb(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(be.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(r=Eb({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?r:!1}"
    defaultsubtitles="${!t.defaultHiddenCaptions}"
    forwardseekoffset="${(n=t.forwardSeekOffset)!=null?n:!1}"
    backwardseekoffset="${(s=t.backwardSeekOffset)!=null?s:!1}"
    playbackrates="${(l=t.playbackRates)!=null?l:!1}"
    defaultshowremainingtime="${(c=t.defaultShowRemainingTime)!=null?c:!1}"
    defaultduration="${(m=t.defaultDuration)!=null?m:!1}"
    hideduration="${(f=t.hideDuration)!=null?f:!1}"
    title="${(A=t.title)!=null?A:!1}"
    videotitle="${(v=t.videoTitle)!=null?v:!1}"
    proudlydisplaymuxbadge="${(E=t.proudlyDisplayMuxBadge)!=null?E:!1}"
    exportparts="${Gb}"
    onclose="${t.onCloseErrorDialog}"
    onfocusin="${t.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${(y=t.noHotKeys)!=null?y:!1}"
      target-live-window="${(_=t.targetLiveWindow)!=null?_:!1}"
      stream-type="${(I=Wd(t.streamType))!=null?I:!1}"
      crossorigin="${(S=t.crossOrigin)!=null?S:""}"
      playsinline
      autoplay="${(Q=t.autoplay)!=null?Q:!1}"
      muted="${(Xe=t.muted)!=null?Xe:!1}"
      loop="${(Je=t.loop)!=null?Je:!1}"
      preload="${($e=t.preload)!=null?$e:!1}"
      debug="${(me=t.debug)!=null?me:!1}"
      prefer-cmcd="${(pe=t.preferCmcd)!=null?pe:!1}"
      disable-tracking="${(je=t.disableTracking)!=null?je:!1}"
      disable-cookies="${(Me=t.disableCookies)!=null?Me:!1}"
      prefer-playback="${(Jt=t.preferPlayback)!=null?Jt:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      beacon-collection-domain="${(jt=t.beaconCollectionDomain)!=null?jt:!1}"
      player-init-time="${(ei=t.playerInitTime)!=null?ei:!1}"
      player-software-name="${(ti=t.playerSoftwareName)!=null?ti:!1}"
      player-software-version="${(ii=t.playerSoftwareVersion)!=null?ii:!1}"
      env-key="${(ai=t.envKey)!=null?ai:!1}"
      custom-domain="${(ri=t.customDomain)!=null?ri:!1}"
      src="${t.src?t.src:t.playbackId?To(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?To(t):!1}"
      cast-receiver="${(wi=t.castReceiver)!=null?wi:!1}"
      drm-token="${(ni=(He=t.tokens)==null?void 0:He.drm)!=null?ni:!1}"
      exportparts="video"
      disable-pseudo-ended="${(si=t.disablePseudoEnded)!=null?si:!1}"
      max-auto-resolution="${(oi=t.maxAutoResolution)!=null?oi:!1}"
      cap-rendition-to-player-size="${(ve=t.capRenditionToPlayerSize)!=null?ve:!1}"
    >
      ${t.storyboard?ds`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:ds``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(_e=t.placeholder)!=null?_e:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},Am=t=>t.charAt(0).toUpperCase()+t.slice(1),qb=(t,e=!1)=>{var i,a;if(t.muxCode){let r=Am((i=t.errorCategory)!=null?i:"video"),n=Ec((a=t.errorCategory)!=null?a:bc.VIDEO);if(t.muxCode===U.NETWORK_OFFLINE)return V("Your device appears to be offline",e);if(t.muxCode===U.NETWORK_TOKEN_EXPIRED)return V("{category} URL has expired",e).format({category:r});if([U.NETWORK_TOKEN_SUB_MISMATCH,U.NETWORK_TOKEN_AUD_MISMATCH,U.NETWORK_TOKEN_AUD_MISSING,U.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return V("{category} URL is formatted incorrectly",e).format({category:r});if(t.muxCode===U.NETWORK_TOKEN_MISSING)return V("Invalid {categoryName} URL",e).format({categoryName:n});if(t.muxCode===U.NETWORK_NOT_FOUND)return V("{category} does not exist",e).format({category:r});if(t.muxCode===U.NETWORK_NOT_READY){let s=t.streamType==="live"?"Live stream":"Video";return V("{mediaType} is not currently available",e).format({mediaType:s})}}if(t.code){if(t.code===Ie.MEDIA_ERR_NETWORK)return V("Network Error",e);if(t.code===Ie.MEDIA_ERR_DECODE)return V("Media Error",e);if(t.code===Ie.MEDIA_ERR_SRC_NOT_SUPPORTED)return V("Source Not Supported",e)}return V("Error",e)},Zb=(t,e=!1)=>{var i,a;if(t.muxCode){let r=Am((i=t.errorCategory)!=null?i:"video"),n=Ec((a=t.errorCategory)!=null?a:bc.VIDEO);return t.muxCode===U.NETWORK_OFFLINE?V("Check your internet connection and try reloading this video.",e):t.muxCode===U.NETWORK_TOKEN_EXPIRED?V("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:n}):t.muxCode===U.NETWORK_TOKEN_SUB_MISMATCH?V("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:n}):t.muxCode===U.NETWORK_TOKEN_MALFORMED?V("{category} URL is formatted incorrectly",e).format({category:r}):[U.NETWORK_TOKEN_AUD_MISMATCH,U.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?V("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:n}):[U.NETWORK_TOKEN_MISSING,U.NETWORK_INVALID_URL].includes(t.muxCode)?V("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:n}):t.muxCode===U.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===Ie.MEDIA_ERR_NETWORK||t.code===Ie.MEDIA_ERR_DECODE||(t.code,Ie.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},zb=(t,e=!1)=>{let i=qb(t,e).toString(),a=Zb(t,e).toString();return{title:i,message:a}},Qb=t=>{if(t.muxCode){if(t.muxCode===U.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===U.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([U.NETWORK_TOKEN_AUD_MISMATCH,U.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===U.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===U.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===U.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===U.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===Ie.MEDIA_ERR_NETWORK)return"";if(t.code===Ie.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===Ie.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},Tm=(t,e)=>{let i=Qb(t);return{message:t.message,context:t.context,file:i}},Xb=`<template id="media-theme-gerwig">
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
`,Il=$s.createElement("template");"innerHTML"in Il&&(Il.innerHTML=Xb);var ac,rc,ym=class extends to{};ym.template=(rc=(ac=Il.content)==null?void 0:ac.children)==null?void 0:rc[0];pt.customElements.get("media-theme-gerwig")||pt.customElements.define("media-theme-gerwig",ym);var Jb="gerwig",kt={SRC:"src",POSTER:"poster"},h={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},Ll=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function jb(t,e){var i,a,r;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:((i=t.media)==null?void 0:i.currentSrc)&&t.storyboard,storyboardSrc:t.getAttribute(h.STORYBOARD_SRC),fullscreenElement:t.getAttribute(h.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:t1(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(h.NOHOTKEYS),hotKeys:t.getAttribute(h.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,maxAutoResolution:t.maxAutoResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(u.TARGET_LIVE_WINDOW),streamType:Wd(t.getAttribute(u.STREAM_TYPE)),primaryColor:t.getAttribute(h.PRIMARY_COLOR),secondaryColor:t.getAttribute(h.SECONDARY_COLOR),accentColor:t.getAttribute(h.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:i1(t),playbackRates:t.getAttribute(h.PLAYBACK_RATES),customDomain:(a=t.getAttribute(u.CUSTOM_DOMAIN))!=null?a:void 0,title:t.getAttribute(h.TITLE),videoTitle:(r=t.getAttribute(h.VIDEO_TITLE))!=null?r:t.getAttribute(h.TITLE),novolumepref:t.hasAttribute(h.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(h.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(h.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(h.DISABLE_PSEUDO_ENDED),capRenditionToPlayerSize:t.capRenditionToPlayerSize,...e,extraSourceParams:t.extraSourceParams}}var e1=vh.formatErrorMessage;vh.formatErrorMessage=t=>{var e,i;if(t instanceof Ie){let a=zb(t,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a?.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${V("(opens in a new window)")}"
              >${(i=a.linkText)!=null?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return e1(t)};function t1(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let n=pt.customElements.get(a);if(n!=null&&n.template)return n.template}}function i1(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}function nc(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let r=t.getAttribute(a);return r!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),i},e)}var a1=Object.values(u),r1=Object.values(kt),n1=Object.values(h),sc=bm(),oc="mux-player",lc={isDialogOpen:!1},s1={redundant_streams:!0},us,Ar,cs,fi,hs,Tr,Hs,Bs,_a,yr,Aa,Ws,Y,St,km,Ml,ki,dc,uc,cc,hc,o1=class extends ec{constructor(){super(),de(this,Y),de(this,us),de(this,Ar,!1),de(this,cs,{}),de(this,fi,!0),de(this,hs,new kb(this,"hotkeys")),de(this,Tr),de(this,Hs,()=>z(this,Y,ki).call(this)),de(this,Bs,()=>z(this,Y,ki).call(this)),de(this,_a,()=>z(this,Y,ki).call(this)),de(this,yr),de(this,Aa,{...lc,onCloseErrorDialog:t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&z(this,Y,Ml).call(this,{isDialogOpen:!1})},onFocusInErrorDialog:t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&(vm(this,$s.activeElement)||t.preventDefault())}}),de(this,Ws,t=>{var e;let i=(e=this.media)==null?void 0:e.error;if(!(i instanceof Ie)){let{message:r,code:n}=i??{};i=new Ie(r,n)}if(!(i!=null&&i.fatal)){yt(i),i.data&&yt(`${i.name} data:`,i.data);return}let a=Tm(i);a.message&&Ju(a),Se(i),i.data&&Se(`${i.name} data:`,i.data),z(this,Y,Ml).call(this,{isDialogOpen:!0})}),ge(this,us,Cl()),this.attachShadow({mode:"open"}),z(this,Y,km).call(this),this.isConnected&&z(this,Y,St).call(this)}static get NAME(){return oc}static get VERSION(){return sc}static get observedAttributes(){var t;return[...(t=ec.observedAttributes)!=null?t:[],...r1,...a1,...n1]}get mediaTheme(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("media-theme")}get mediaController(){var t,e;return(e=(t=this.mediaTheme)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("media-controller")}connectedCallback(){z(this,Y,St).call(this);let t=this.media;t&&(t.metadata=nc(this))}disconnectedCallback(){var t,e,i,a,r,n,s,l;(t=L(this,Tr))==null||t.disconnect(),(e=this.media)==null||e.removeEventListener("streamtypechange",L(this,Hs)),(i=this.media)==null||i.removeEventListener("loadstart",L(this,Bs)),this.removeEventListener("error",L(this,Ws)),this.media&&(this.media.errorTranslator=void 0),(r=(a=this.media)==null?void 0:a.textTracks)==null||r.removeEventListener("addtrack",L(this,_a)),(s=(n=this.media)==null?void 0:n.textTracks)==null||s.removeEventListener("removetrack",L(this,_a)),(l=L(this,yr))==null||l.call(this),ge(this,yr,void 0),ge(this,Ar,!1)}attributeChangedCallback(t,e,i){switch(z(this,Y,St).call(this),super.attributeChangedCallback(t,e,i),t){case h.HOTKEYS:L(this,hs).value=i;break;case h.THUMBNAIL_TIME:{i!=null&&this.tokens.thumbnail&&yt(V("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case h.THUMBNAIL_TOKEN:{if(i){let a=mr(i);if(a){let{aud:r}=a,n=so.THUMBNAIL;r!==n&&yt(V("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:n,tokenNamePrefix:"thumbnail"}))}}break}case h.STORYBOARD_TOKEN:{if(i){let a=mr(i);if(a){let{aud:r}=a,n=so.STORYBOARD;r!==n&&yt(V("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:n,tokenNamePrefix:"storyboard"}))}}break}case h.DRM_TOKEN:{if(i){let a=mr(i);if(a){let{aud:r}=a,n=so.DRM;r!==n&&yt(V("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:n,tokenNamePrefix:"drm"}))}}break}case u.PLAYBACK_ID:{i!=null&&i.includes("?token")&&Se(V("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:i}));break}case u.STREAM_TYPE:{i&&![be.LIVE,be.ON_DEMAND,be.UNKNOWN].includes(i)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=i.includes("dvr")?Number.POSITIVE_INFINITY:0:Ju({file:"invalid-stream-type.md",message:V("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):i===be.LIVE?this.getAttribute(h.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case h.FULLSCREEN_ELEMENT:{if(i!=null||i!==e){let a=$s.getElementById(i),r=a?.querySelector("mux-player");this.mediaController&&a&&r&&(this.mediaController.fullscreenElement=a)}break}case u.CAP_RENDITION_TO_PLAYER_SIZE:{(i==null||i!==e)&&(this.capRenditionToPlayerSize=i!=null?!0:void 0);break}}[u.PLAYBACK_ID,kt.SRC,h.PLAYBACK_TOKEN].includes(t)&&e!==i&&ge(this,Aa,{...L(this,Aa),...lc}),z(this,Y,ki).call(this,{[yb(t)]:i})}async requestFullscreen(t){var e;if(!(!this.mediaController||this.mediaController.hasAttribute(o.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new pt.CustomEvent(g.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var r;(r=this.mediaController)==null||r.addEventListener(ft.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}async exitFullscreen(){var t;if(!(!this.mediaController||!this.mediaController.hasAttribute(o.MEDIA_IS_FULLSCREEN)))return(t=this.mediaController)==null||t.dispatchEvent(new pt.CustomEvent(g.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,i)=>{var a;(a=this.mediaController)==null||a.addEventListener(ft.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}get preferCmcd(){var t;return(t=this.getAttribute(u.PREFER_CMCD))!=null?t:void 0}set preferCmcd(t){t!==this.preferCmcd&&(t?ms.includes(t)?this.setAttribute(u.PREFER_CMCD,t):yt(`Invalid value for preferCmcd. Must be one of ${ms.join()}`):this.removeAttribute(u.PREFER_CMCD))}get hasPlayed(){var t,e;return(e=(t=this.mediaController)==null?void 0:t.hasAttribute(o.MEDIA_HAS_PLAYED))!=null?e:!1}get inLiveWindow(){var t;return(t=this.mediaController)==null?void 0:t.hasAttribute(o.MEDIA_TIME_IS_LIVE)}get _hls(){var t;return(t=this.media)==null?void 0:t._hls}get mux(){var t;return(t=this.media)==null?void 0:t.mux}get theme(){var t;return(t=this.getAttribute(h.THEME))!=null?t:Jb}set theme(t){this.setAttribute(h.THEME,`${t}`)}get themeProps(){let t=this.mediaTheme;if(!t)return;let e={};for(let i of t.getAttributeNames()){if(Ll.includes(i))continue;let a=t.getAttribute(i);e[mm(i)]=a===""?!0:a}return e}set themeProps(t){var e,i;z(this,Y,St).call(this);let a={...this.themeProps,...t};for(let r in a){if(Ll.includes(r))continue;let n=t?.[r];typeof n=="boolean"||n==null?(e=this.mediaTheme)==null||e.toggleAttribute(Sl(r),!!n):(i=this.mediaTheme)==null||i.setAttribute(Sl(r),n)}}get playbackId(){var t;return(t=this.getAttribute(u.PLAYBACK_ID))!=null?t:void 0}set playbackId(t){t?this.setAttribute(u.PLAYBACK_ID,t):this.removeAttribute(u.PLAYBACK_ID)}get src(){var t,e;return this.playbackId?(t=hi(this,kt.SRC))!=null?t:void 0:(e=this.getAttribute(kt.SRC))!=null?e:void 0}set src(t){t?this.setAttribute(kt.SRC,t):this.removeAttribute(kt.SRC)}get poster(){var t;let e=this.getAttribute(kt.POSTER);if(e!=null)return e;let{tokens:i}=this;if(i.playback&&!i.thumbnail){yt("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return _b(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(t=this.thumbnailTime)!=null?t:this.startTime,programTime:this.programStartTime,token:i.thumbnail})}set poster(t){t||t===""?this.setAttribute(kt.POSTER,t):this.removeAttribute(kt.POSTER)}get storyboardSrc(){var t;return(t=this.getAttribute(h.STORYBOARD_SRC))!=null?t:void 0}set storyboardSrc(t){t?this.setAttribute(h.STORYBOARD_SRC,t):this.removeAttribute(h.STORYBOARD_SRC)}get storyboard(){let{tokens:t}=this;if(this.storyboardSrc&&!t.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[be.LIVE,be.UNKNOWN].includes(this.streamType)||t.playback&&!t.storyboard))return Ab(this.playbackId,{customDomain:this.customDomain,token:t.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(h.AUDIO)}set audio(t){if(!t){this.removeAttribute(h.AUDIO);return}this.setAttribute(h.AUDIO,"")}get hotkeys(){return L(this,hs)}get nohotkeys(){return this.hasAttribute(h.NOHOTKEYS)}set nohotkeys(t){if(!t){this.removeAttribute(h.NOHOTKEYS);return}this.setAttribute(h.NOHOTKEYS,"")}get thumbnailTime(){return ke(this.getAttribute(h.THUMBNAIL_TIME))}set thumbnailTime(t){this.setAttribute(h.THUMBNAIL_TIME,`${t}`)}get videoTitle(){var t,e;return(e=(t=this.getAttribute(h.VIDEO_TITLE))!=null?t:this.getAttribute(h.TITLE))!=null?e:""}set videoTitle(t){t!==this.videoTitle&&(t?this.setAttribute(h.VIDEO_TITLE,t):this.removeAttribute(h.VIDEO_TITLE))}get placeholder(){var t;return(t=hi(this,h.PLACEHOLDER))!=null?t:""}set placeholder(t){this.setAttribute(h.PLACEHOLDER,`${t}`)}get primaryColor(){var t,e;let i=this.getAttribute(h.PRIMARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=pt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_primary-color"))==null?void 0:e.trim(),i))return i}set primaryColor(t){this.setAttribute(h.PRIMARY_COLOR,`${t}`)}get secondaryColor(){var t,e;let i=this.getAttribute(h.SECONDARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=pt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_secondary-color"))==null?void 0:e.trim(),i))return i}set secondaryColor(t){this.setAttribute(h.SECONDARY_COLOR,`${t}`)}get accentColor(){var t,e;let i=this.getAttribute(h.ACCENT_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=pt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_accent-color"))==null?void 0:e.trim(),i))return i}set accentColor(t){this.setAttribute(h.ACCENT_COLOR,`${t}`)}get defaultShowRemainingTime(){return this.hasAttribute(h.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(t){t?this.setAttribute(h.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(h.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(h.PLAYBACK_RATES))return this.getAttribute(h.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(t=>Number(t)).filter(t=>!Number.isNaN(t)).sort((t,e)=>t-e)}set playbackRates(t){if(!t){this.removeAttribute(h.PLAYBACK_RATES);return}this.setAttribute(h.PLAYBACK_RATES,t.join(" "))}get forwardSeekOffset(){var t;return(t=ke(this.getAttribute(h.FORWARD_SEEK_OFFSET)))!=null?t:10}set forwardSeekOffset(t){this.setAttribute(h.FORWARD_SEEK_OFFSET,`${t}`)}get backwardSeekOffset(){var t;return(t=ke(this.getAttribute(h.BACKWARD_SEEK_OFFSET)))!=null?t:10}set backwardSeekOffset(t){this.setAttribute(h.BACKWARD_SEEK_OFFSET,`${t}`)}get defaultHiddenCaptions(){return this.hasAttribute(h.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(t){t?this.setAttribute(h.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(h.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return ke(this.getAttribute(h.DEFAULT_DURATION))}set defaultDuration(t){t==null?this.removeAttribute(h.DEFAULT_DURATION):this.setAttribute(h.DEFAULT_DURATION,`${t}`)}get playerInitTime(){return this.hasAttribute(u.PLAYER_INIT_TIME)?ke(this.getAttribute(u.PLAYER_INIT_TIME)):L(this,us)}set playerInitTime(t){t!=this.playerInitTime&&(t==null?this.removeAttribute(u.PLAYER_INIT_TIME):this.setAttribute(u.PLAYER_INIT_TIME,`${+t}`))}get playerSoftwareName(){var t;return(t=this.getAttribute(u.PLAYER_SOFTWARE_NAME))!=null?t:oc}get playerSoftwareVersion(){var t;return(t=this.getAttribute(u.PLAYER_SOFTWARE_VERSION))!=null?t:sc}get beaconCollectionDomain(){var t;return(t=this.getAttribute(u.BEACON_COLLECTION_DOMAIN))!=null?t:void 0}set beaconCollectionDomain(t){t!==this.beaconCollectionDomain&&(t?this.setAttribute(u.BEACON_COLLECTION_DOMAIN,t):this.removeAttribute(u.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var t;return(t=this.getAttribute(u.MAX_RESOLUTION))!=null?t:void 0}set maxResolution(t){t!==this.maxResolution&&(t?this.setAttribute(u.MAX_RESOLUTION,t):this.removeAttribute(u.MAX_RESOLUTION))}get minResolution(){var t;return(t=this.getAttribute(u.MIN_RESOLUTION))!=null?t:void 0}set minResolution(t){t!==this.minResolution&&(t?this.setAttribute(u.MIN_RESOLUTION,t):this.removeAttribute(u.MIN_RESOLUTION))}get maxAutoResolution(){var t;return(t=this.getAttribute(u.MAX_AUTO_RESOLUTION))!=null?t:void 0}set maxAutoResolution(t){t==null?this.removeAttribute(u.MAX_AUTO_RESOLUTION):this.setAttribute(u.MAX_AUTO_RESOLUTION,t)}get renditionOrder(){var t;return(t=this.getAttribute(u.RENDITION_ORDER))!=null?t:void 0}set renditionOrder(t){t!==this.renditionOrder&&(t?this.setAttribute(u.RENDITION_ORDER,t):this.removeAttribute(u.RENDITION_ORDER))}get programStartTime(){return ke(this.getAttribute(u.PROGRAM_START_TIME))}set programStartTime(t){t==null?this.removeAttribute(u.PROGRAM_START_TIME):this.setAttribute(u.PROGRAM_START_TIME,`${t}`)}get programEndTime(){return ke(this.getAttribute(u.PROGRAM_END_TIME))}set programEndTime(t){t==null?this.removeAttribute(u.PROGRAM_END_TIME):this.setAttribute(u.PROGRAM_END_TIME,`${t}`)}get assetStartTime(){return ke(this.getAttribute(u.ASSET_START_TIME))}set assetStartTime(t){t==null?this.removeAttribute(u.ASSET_START_TIME):this.setAttribute(u.ASSET_START_TIME,`${t}`)}get assetEndTime(){return ke(this.getAttribute(u.ASSET_END_TIME))}set assetEndTime(t){t==null?this.removeAttribute(u.ASSET_END_TIME):this.setAttribute(u.ASSET_END_TIME,`${t}`)}get extraSourceParams(){return this.hasAttribute(h.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(h.EXTRA_SOURCE_PARAMS)).entries()].reduce((t,[e,i])=>(t[e]=i,t),{}):s1}set extraSourceParams(t){t==null?this.removeAttribute(h.EXTRA_SOURCE_PARAMS):this.setAttribute(h.EXTRA_SOURCE_PARAMS,new URLSearchParams(t).toString())}get customDomain(){var t;return(t=this.getAttribute(u.CUSTOM_DOMAIN))!=null?t:void 0}set customDomain(t){t!==this.customDomain&&(t?this.setAttribute(u.CUSTOM_DOMAIN,t):this.removeAttribute(u.CUSTOM_DOMAIN))}get envKey(){var t;return(t=hi(this,u.ENV_KEY))!=null?t:void 0}set envKey(t){this.setAttribute(u.ENV_KEY,`${t}`)}get noVolumePref(){return this.hasAttribute(h.NO_VOLUME_PREF)}set noVolumePref(t){t?this.setAttribute(h.NO_VOLUME_PREF,""):this.removeAttribute(h.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(h.NO_MUTED_PREF)}set noMutedPref(t){t?this.setAttribute(h.NO_MUTED_PREF,""):this.removeAttribute(h.NO_MUTED_PREF)}get debug(){return hi(this,u.DEBUG)!=null}set debug(t){t?this.setAttribute(u.DEBUG,""):this.removeAttribute(u.DEBUG)}get disableTracking(){return hi(this,u.DISABLE_TRACKING)!=null}set disableTracking(t){this.toggleAttribute(u.DISABLE_TRACKING,!!t)}get disableCookies(){return hi(this,u.DISABLE_COOKIES)!=null}set disableCookies(t){t?this.setAttribute(u.DISABLE_COOKIES,""):this.removeAttribute(u.DISABLE_COOKIES)}get streamType(){var t,e,i;return(i=(e=this.getAttribute(u.STREAM_TYPE))!=null?e:(t=this.media)==null?void 0:t.streamType)!=null?i:be.UNKNOWN}set streamType(t){this.setAttribute(u.STREAM_TYPE,`${t}`)}get defaultStreamType(){var t,e,i;return(i=(e=this.getAttribute(h.DEFAULT_STREAM_TYPE))!=null?e:(t=this.mediaController)==null?void 0:t.getAttribute(h.DEFAULT_STREAM_TYPE))!=null?i:be.ON_DEMAND}set defaultStreamType(t){t?this.setAttribute(h.DEFAULT_STREAM_TYPE,t):this.removeAttribute(h.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var t,e;return this.hasAttribute(h.TARGET_LIVE_WINDOW)?+this.getAttribute(h.TARGET_LIVE_WINDOW):(e=(t=this.media)==null?void 0:t.targetLiveWindow)!=null?e:Number.NaN}set targetLiveWindow(t){t==this.targetLiveWindow||Number.isNaN(t)&&Number.isNaN(this.targetLiveWindow)||(t==null?this.removeAttribute(h.TARGET_LIVE_WINDOW):this.setAttribute(h.TARGET_LIVE_WINDOW,`${+t}`))}get liveEdgeStart(){var t;return(t=this.media)==null?void 0:t.liveEdgeStart}get startTime(){return ke(hi(this,u.START_TIME))}set startTime(t){this.setAttribute(u.START_TIME,`${t}`)}get preferPlayback(){let t=this.getAttribute(u.PREFER_PLAYBACK);if(t===qt.MSE||t===qt.NATIVE)return t}set preferPlayback(t){t!==this.preferPlayback&&(t===qt.MSE||t===qt.NATIVE?this.setAttribute(u.PREFER_PLAYBACK,t):this.removeAttribute(u.PREFER_PLAYBACK))}get metadata(){var t;return(t=this.media)==null?void 0:t.metadata}set metadata(t){if(z(this,Y,St).call(this),!this.media){Se("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...nc(this),...t}}get _hlsConfig(){var t;return(t=this.media)==null?void 0:t._hlsConfig}set _hlsConfig(t){if(z(this,Y,St).call(this),!this.media){Se("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=t}async addCuePoints(t){var e;if(z(this,Y,St).call(this),!this.media){Se("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(e=this.media)==null?void 0:e.addCuePoints(t)}get activeCuePoint(){var t;return(t=this.media)==null?void 0:t.activeCuePoint}get cuePoints(){var t,e;return(e=(t=this.media)==null?void 0:t.cuePoints)!=null?e:[]}addChapters(t){var e;if(z(this,Y,St).call(this),!this.media){Se("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(e=this.media)==null?void 0:e.addChapters(t)}get activeChapter(){var t;return(t=this.media)==null?void 0:t.activeChapter}get chapters(){var t,e;return(e=(t=this.media)==null?void 0:t.chapters)!=null?e:[]}getStartDate(){var t;return(t=this.media)==null?void 0:t.getStartDate()}get currentPdt(){var t;return(t=this.media)==null?void 0:t.currentPdt}get tokens(){let t=this.getAttribute(h.PLAYBACK_TOKEN),e=this.getAttribute(h.DRM_TOKEN),i=this.getAttribute(h.THUMBNAIL_TOKEN),a=this.getAttribute(h.STORYBOARD_TOKEN);return{...L(this,cs),...t!=null?{playback:t}:{},...e!=null?{drm:e}:{},...i!=null?{thumbnail:i}:{},...a!=null?{storyboard:a}:{}}}set tokens(t){ge(this,cs,t??{})}get playbackToken(){var t;return(t=this.getAttribute(h.PLAYBACK_TOKEN))!=null?t:void 0}set playbackToken(t){this.setAttribute(h.PLAYBACK_TOKEN,`${t}`)}get drmToken(){var t;return(t=this.getAttribute(h.DRM_TOKEN))!=null?t:void 0}set drmToken(t){this.setAttribute(h.DRM_TOKEN,`${t}`)}get thumbnailToken(){var t;return(t=this.getAttribute(h.THUMBNAIL_TOKEN))!=null?t:void 0}set thumbnailToken(t){this.setAttribute(h.THUMBNAIL_TOKEN,`${t}`)}get storyboardToken(){var t;return(t=this.getAttribute(h.STORYBOARD_TOKEN))!=null?t:void 0}set storyboardToken(t){this.setAttribute(h.STORYBOARD_TOKEN,`${t}`)}addTextTrack(t,e,i,a){var r;let n=(r=this.media)==null?void 0:r.nativeEl;if(n)return ip(n,t,e,i,a)}removeTextTrack(t){var e;let i=(e=this.media)==null?void 0:e.nativeEl;if(i)return ap(i,t)}get textTracks(){var t;return(t=this.media)==null?void 0:t.textTracks}get castReceiver(){var t;return(t=this.getAttribute(h.CAST_RECEIVER))!=null?t:void 0}set castReceiver(t){t!==this.castReceiver&&(t?this.setAttribute(h.CAST_RECEIVER,t):this.removeAttribute(h.CAST_RECEIVER))}get castCustomData(){var t;return(t=this.media)==null?void 0:t.castCustomData}set castCustomData(t){if(!this.media){Se("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=t}get noTooltips(){return this.hasAttribute(h.NO_TOOLTIPS)}set noTooltips(t){if(!t){this.removeAttribute(h.NO_TOOLTIPS);return}this.setAttribute(h.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(h.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(t){t?this.setAttribute(h.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(h.PROUDLY_DISPLAY_MUX_BADGE)}get capRenditionToPlayerSize(){var t;return(t=this.media)==null?void 0:t.capRenditionToPlayerSize}set capRenditionToPlayerSize(t){if(!this.media){Se("underlying media element missing when trying to set capRenditionToPlayerSize");return}this.media.capRenditionToPlayerSize=t}};us=new WeakMap,Ar=new WeakMap,cs=new WeakMap,fi=new WeakMap,hs=new WeakMap,Tr=new WeakMap,Hs=new WeakMap,Bs=new WeakMap,_a=new WeakMap,yr=new WeakMap,Aa=new WeakMap,Ws=new WeakMap,Y=new WeakSet,St=function(){var t,e,i,a;if(!L(this,Ar)){ge(this,Ar,!0),z(this,Y,ki).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof pt.HTMLElement))throw""}catch{Se("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{Se("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof Sv))throw""}catch{Se("<media-controller> failed to upgrade!")}z(this,Y,dc).call(this),z(this,Y,uc).call(this),z(this,Y,cc).call(this),ge(this,fi,(e=(t=this.mediaController)==null?void 0:t.hasAttribute(k.USER_INACTIVE))!=null?e:!0),z(this,Y,hc).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",L(this,Hs)),(a=this.media)==null||a.addEventListener("loadstart",L(this,Bs))}},km=function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},Ml=function(t){Object.assign(L(this,Aa),t),z(this,Y,ki).call(this)},ki=function(t={}){Bb(Fb(jb(this,{...L(this,Aa),...t})),this.shadowRoot)},dc=function(){let t=e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let r=e.replace(/^theme-/,"");if(Ll.includes(r))return;let n=this.getAttribute(e);n!=null?(i=this.mediaTheme)==null||i.setAttribute(r,n):(a=this.mediaTheme)==null||a.removeAttribute(r)};ge(this,Tr,new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)})),L(this,Tr).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},uc=function(){this.addEventListener("error",L(this,Ws)),this.media&&(this.media.errorTranslator=(t={})=>{var e,i,a;if(!(((e=this.media)==null?void 0:e.error)instanceof Ie))return t;let r=Tm((i=this.media)==null?void 0:i.error);return{player_error_code:(a=this.media)==null?void 0:a.error.code,player_error_message:r.message?String(r.message):t.player_error_message,player_error_context:r.context?String(r.context):t.player_error_context}})},cc=function(){var t,e,i,a;(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",L(this,_a)),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",L(this,_a))},hc=function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=()=>this.streamType===be.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,n=(m,f,A=!1)=>{r()||Array.from(m&&m.activeCues||[]).forEach(v=>{if(!(!v.snapToLines||v.line<-5||v.line>=0&&v.line<10))if(!f||this.paused){let E=v.text.split(`
`).length,y=-3;this.streamType===be.LIVE&&(y=-2);let _=y-E;if(v.line===_&&!A)return;a.has(v)||a.set(v,v.line),v.line=_}else setTimeout(()=>{v.line=a.get(v)||"auto"},500)})},s=()=>{var m,f;n(i,(f=(m=this.mediaController)==null?void 0:m.hasAttribute(k.USER_INACTIVE))!=null?f:!1)},l=()=>{var m,f;let A=Array.from(((f=(m=this.mediaController)==null?void 0:m.media)==null?void 0:f.textTracks)||[]).filter(v=>["subtitles","captions"].includes(v.kind)&&v.mode==="showing")[0];A!==i&&i?.removeEventListener("cuechange",s),i=A,i?.addEventListener("cuechange",s),n(i,L(this,fi))};l(),(t=this.textTracks)==null||t.addEventListener("change",l),(e=this.textTracks)==null||e.addEventListener("addtrack",l);let c=()=>{var m,f;let A=(f=(m=this.mediaController)==null?void 0:m.hasAttribute(k.USER_INACTIVE))!=null?f:!0;L(this,fi)!==A&&(ge(this,fi,A),n(i,L(this,fi)))};this.addEventListener("userinactivechange",c),ge(this,yr,()=>{var m,f;i?.removeEventListener("cuechange",s),(m=this.textTracks)==null||m.removeEventListener("change",l),(f=this.textTracks)==null||f.removeEventListener("addtrack",l),this.removeEventListener("userinactivechange",c)})};function hi(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}var mc=o1,Sm=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends Sm{}globalThis.DocumentFragment=t}var l1=class extends Sm{},d1={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(l1)}},u1={customElements:d1},c1=typeof window>"u"||typeof globalThis.customElements>"u",Ao=c1?u1:globalThis;Ao.customElements.get("mux-player")||(Ao.customElements.define("mux-player",mc),Ao.MuxPlayerElement=mc);var Im=parseInt(kr.version)>=19,pc={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},h1=t=>t==null,m1=(t,e)=>h1(e)?!1:t in e,p1=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),v1=(t,e)=>{if(!(!Im&&typeof e=="boolean"&&!e)){if(m1(t,pc))return pc[t];if(typeof e<"u")return/[A-Z]/.test(t)?p1(t):t}},E1=(t,e)=>!Im&&typeof t=="boolean"?"":t,b1=(t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[r,n])=>{let s=v1(r,n);if(!s)return a;let l=E1(n);return a[s]=l,a},{})};function vc(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}function g1(...t){return e=>{let i=!1,a=t.map(r=>{let n=vc(r,e);return!i&&typeof n=="function"&&(i=!0),n});if(i)return()=>{for(let r=0;r<a.length;r++){let n=a[r];typeof n=="function"?n():vc(t[r],null)}}}}function f1(...t){return Sr.useCallback(g1(...t),t)}var _1=Object.prototype.hasOwnProperty,A1=(t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,n)=>e[n]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!_1.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},Lm=(t,e,i)=>!A1(e,t[i]),T1=(t,e,i)=>{t[i]=e},y1=(t,e,i,a=T1,r=Lm)=>Sr.useEffect(()=>{let n=i?.current;n&&r(n,e,t)&&a(n,e,t)},[i?.current,e]),at=y1,k1=()=>{try{return"3.11.6"}catch{}return"UNKNOWN"},S1=k1(),I1=()=>S1,B=(t,e,i)=>Sr.useEffect(()=>{let a=e?.current;if(!a||!i)return;let r=t,n=i;return a.addEventListener(r,n),()=>{a.removeEventListener(r,n)}},[e?.current,i,t]),L1=kr.forwardRef(({children:t,...e},i)=>kr.createElement("mux-player",{suppressHydrationWarning:!0,...b1(e),ref:i},t)),M1=(t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:n,onLoadStart:s,onLoadedData:l,onLoadedMetadata:c,onProgress:m,onDurationChange:f,onVolumeChange:A,onRateChange:v,onResize:E,onWaiting:y,onPlay:_,onPlaying:I,onTimeUpdate:S,onPause:Q,onSeeking:Xe,onSeeked:Je,onStalled:$e,onSuspend:me,onEnded:pe,onError:je,onCuePointChange:Me,onChapterChange:Jt,metadata:jt,tokens:ei,paused:ti,playbackId:ii,playbackRates:ai,currentTime:ri,themeProps:wi,extraSourceParams:He,castCustomData:ni,_hlsConfig:si,...oi}=e;return at("tokens",ei,t),at("playbackId",ii,t),at("playbackRates",ai,t),at("metadata",jt,t),at("extraSourceParams",He,t),at("_hlsConfig",si,t),at("themeProps",wi,t),at("castCustomData",ni,t),at("paused",ti,t,(ve,_e)=>{_e!=null&&(_e?ve.pause():ve.play())},(ve,_e,$r)=>ve.hasAttribute("autoplay")&&!ve.hasPlayed?!1:Lm(ve,_e,$r)),at("currentTime",ri,t,(ve,_e)=>{_e!=null&&(ve.currentTime=_e)}),B("abort",t,i),B("canplay",t,a),B("canplaythrough",t,r),B("emptied",t,n),B("loadstart",t,s),B("loadeddata",t,l),B("loadedmetadata",t,c),B("progress",t,m),B("durationchange",t,f),B("volumechange",t,A),B("ratechange",t,v),B("resize",t,E),B("waiting",t,y),B("play",t,_),B("playing",t,I),B("timeupdate",t,S),B("pause",t,Q),B("seeking",t,Xe),B("seeked",t,Je),B("stalled",t,$e),B("suspend",t,me),B("ended",t,pe),B("error",t,je),B("cuepointchange",t,Me),B("chapterchange",t,Jt),[oi]},C1=I1(),w1="mux-player-react",R1=kr.forwardRef((t,e)=>{var i;let a=Sr.useRef(null),r=f1(a,e),[n]=M1(a,t),[s]=Sr.useState((i=t.playerInitTime)!=null?i:Cl());return kr.createElement(L1,{ref:r,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:w1,playerSoftwareVersion:C1,playerInitTime:s,...n})}),V1=R1;export{q1 as MaxResolution,Ie as MediaError,Z1 as MinResolution,z1 as RenditionOrder,V1 as default,Cl as generatePlayerInitTime,w1 as playerSoftwareName,C1 as playerSoftwareVersion};
