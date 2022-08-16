(function(){"use strict";var e={4139:function(e,a,t){var n=t(9242),i=t(3396);const r={class:"w-100 p-1"};function o(e,a,t,n,o,s){const c=(0,i.up)("SelfieCamera");return(0,i.wg)(),(0,i.iD)("div",r,[(0,i.Wm)(c)])}var s=t(7139);const c=e=>((0,i.dD)("data-v-40595da2"),e=e(),(0,i.Cn)(),e),d={class:"card p-1",style:{"max-width":"500px"}},l={class:"camera-button mt-2 mb-2"},m={key:0},h={key:1},u={class:"camera-loading"},p={key:0,class:"p-2"},f=c((()=>(0,i._)("p",{style:{"text-align":"left"}},[(0,i.Uk)(" Um beim J🌰 Memory-Spiel mitbachen zu können brauchen wir nur ein Bild und deinen Namen."),(0,i._)("br"),(0,i.Uk)(" Dazu musst du nur die Kamera deines Handys aktivieren, ein Photo machen, deinen Vor- und Nachnamen eingeben und abschicken."),(0,i._)("br"),(0,i.Uk)(" Dann ist dein Bild auch im nächsten Memory mit dabei. ")],-1))),b=[f],g={id:"videobox"},v={ref:"camera",width:300,height:300,autoplay:""},y={id:"photoTaken",ref:"canvas",width:300,height:300},k={key:2,class:"camera-shoot mt-2 mb-2"},w=c((()=>(0,i._)("img",{src:"https://img.icons8.com/material-outlined/40/ffffff/camera--v2.png"},null,-1))),_=[w],C={key:3,class:"camera-download"},O={class:"mt-2 lowerform"},D={class:"input-group mb-3"},S=c((()=>(0,i._)("div",{class:"input-group-prepend"},[(0,i._)("span",{class:"input-group-text",id:"basic-addon1"},"Vorname")],-1))),P={class:"mt-2 lowerform"},T={class:"input-group mb-3"},j=c((()=>(0,i._)("div",{class:"input-group-prepend"},[(0,i._)("span",{class:"input-group-text",id:"basic-addon2"},"Nachname")],-1))),x=["disabled"],U={key:0,class:"alert alert-success",role:"alert"},B={key:1,class:"alert alert-danger",role:"alert"};function E(e,a,t,r,o,c){return(0,i.wg)(),(0,i.iD)("div",d,[(0,i._)("div",l,[(0,i._)("button",{class:(0,s.C_)(["btn btn-primary",{"is-primary":!o.isCameraOpen,"is-danger":o.isCameraOpen}]),onClick:a[0]||(a[0]=(...e)=>c.toggleCamera&&c.toggleCamera(...e))},[o.isCameraOpen?((0,i.wg)(),(0,i.iD)("span",h,"Close Camera")):((0,i.wg)(),(0,i.iD)("span",m,"Open Camera"))],2)]),(0,i.wy)((0,i._)("div",u,null,512),[[n.F8,o.isCameraOpen&&o.isLoading]]),o.isCameraOpen?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",p,b)),o.isCameraOpen?(0,i.wy)(((0,i.wg)(),(0,i.iD)("div",{key:1,class:(0,s.C_)(["camera-box",{flash:o.isShotPhoto}])},[(0,i._)("div",{class:(0,s.C_)(["camera-shutter",{flash:o.isShotPhoto}])},null,2),(0,i._)("div",g,[(0,i.wy)((0,i._)("video",v,null,512),[[n.F8,!o.isPhotoTaken]]),(0,i.wy)((0,i._)("canvas",y,null,512),[[n.F8,o.isPhotoTaken]])])],2)),[[n.F8,!o.isLoading]]):(0,i.kq)("",!0),o.isCameraOpen&&!o.isLoading?((0,i.wg)(),(0,i.iD)("div",k,[(0,i._)("button",{type:"button",class:"btn btn-primary",onClick:a[1]||(a[1]=(...e)=>c.takePhoto&&c.takePhoto(...e))},_)])):(0,i.kq)("",!0),o.isPhotoTaken&&o.isCameraOpen?((0,i.wg)(),(0,i.iD)("div",C,[(0,i._)("div",O,[(0,i._)("div",D,[S,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",placeholder:"Vorname","aria-label":"Vorname","aria-describedby":"basic-addon1","onUpdate:modelValue":a[2]||(a[2]=e=>o.nameA=e)},null,512),[[n.nr,o.nameA]])])]),(0,i._)("div",P,[(0,i._)("div",T,[j,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",placeholder:"Nachname","aria-label":"Nachname","aria-describedby":"basic-addon2","onUpdate:modelValue":a[3]||(a[3]=e=>o.nameB=e)},null,512),[[n.nr,o.nameB]])])]),(0,i._)("button",{type:"submit",class:"btn btn-primary lowerform mb-3",onClick:a[4]||(a[4]=(...e)=>c.sendData&&c.sendData(...e)),disabled:o.isSendDisabled}," Submit ",8,x),o.isOk?((0,i.wg)(),(0,i.iD)("div",U," Daten erfolgreich hochgeladen. ")):(0,i.kq)("",!0),o.isError?((0,i.wg)(),(0,i.iD)("div",B," Probleme beim Upload. Bitte nochmal probieren. ")):(0,i.kq)("",!0)])):(0,i.kq)("",!0)])}var L={data(){return{isCameraOpen:!1,isPhotoTaken:!1,isShotPhoto:!1,isLoading:!1,isOk:!1,isError:!1,isSendDisabled:!1,nameA:"",nameB:"",link:"#"}},methods:{toggleCamera(){this.isCameraOpen?(this.isCameraOpen=!1,this.isPhotoTaken=!1,this.isShotPhoto=!1,this.stopCameraStream()):(this.isCameraOpen=!0,this.createCameraElement())},createCameraElement(){this.isLoading=!0;const e=window.constraints={audio:!1,video:{width:300,height:300,facingMode:"user"}};navigator.mediaDevices.getUserMedia(e).then((e=>{this.isLoading=!1,this.$refs.camera.srcObject=e})).catch((e=>{this.isLoading=!1,alert("May the browser didn't support or there is some errors."),console.log(e)}))},stopCameraStream(){let e=this.$refs.camera.srcObject.getTracks();e.forEach((e=>{e.stop()}))},takePhoto(){if(!this.isPhotoTaken){this.isShotPhoto=!0;const e=50;setTimeout((()=>{this.isShotPhoto=!1}),e)}this.isPhotoTaken=!this.isPhotoTaken;let e=this.$refs.canvas,a=this.$refs.camera;e.width=a.videoWidth,e.height=a.videoHeight,e.getContext("2d").drawImage(a,0,0),this.isSendDisabled=!1,this.nameA="",this.nameB="",this.isOk=!1,this.isError=!1},async internalSendData(e){const a=await fetch("https://j-nuts-cal.herokuapp.com/memory",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return a.ok},sendData(){this.isSendDisabled=!0;let e={name:this.nameA+" "+this.nameB,img:this.$refs.canvas.toDataURL()};this.internalSendData(e).then((e=>{this.isOk=e,this.isError=!e}))}}},M=t(89);const q=(0,M.Z)(L,[["render",E],["__scopeId","data-v-40595da2"]]);var A=q,N={name:"App",components:{SelfieCamera:A}};const V=(0,M.Z)(N,[["render",o]]);var F=V;t(2166);(0,n.ri)(F).mount("#app")}},a={};function t(n){var i=a[n];if(void 0!==i)return i.exports;var r=a[n]={exports:{}};return e[n](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(a,n,i,r){if(!n){var o=1/0;for(l=0;l<e.length;l++){n=e[l][0],i=e[l][1],r=e[l][2];for(var s=!0,c=0;c<n.length;c++)(!1&r||o>=r)&&Object.keys(t.O).every((function(e){return t.O[e](n[c])}))?n.splice(c--,1):(s=!1,r<o&&(o=r));if(s){e.splice(l--,1);var d=i();void 0!==d&&(a=d)}}return a}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[n,i,r]}}(),function(){t.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(a,{a:a}),a}}(),function(){t.d=function(e,a){for(var n in a)t.o(a,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:a[n]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};t.O.j=function(a){return 0===e[a]};var a=function(a,n){var i,r,o=n[0],s=n[1],c=n[2],d=0;if(o.some((function(a){return 0!==e[a]}))){for(i in s)t.o(s,i)&&(t.m[i]=s[i]);if(c)var l=c(t)}for(a&&a(n);d<o.length;d++)r=o[d],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(l)},n=self["webpackChunkj_nuts_memory_join"]=self["webpackChunkj_nuts_memory_join"]||[];n.forEach(a.bind(null,0)),n.push=a.bind(null,n.push.bind(n))}();var n=t.O(void 0,[998],(function(){return t(4139)}));n=t.O(n)})();
//# sourceMappingURL=app.cfb0b305.js.map