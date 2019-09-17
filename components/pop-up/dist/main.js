/*! For license information please see main.js.LICENSE */
!function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=13)}([,function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",s=t[3];if(!s)return n;if(e&&"function"==typeof btoa){var i=(o=s,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),r=s.sources.map(function(t){return"/*# sourceURL="+s.sourceRoot+t+" */"});return[n].concat(r).concat([i]).join("\n")}var o;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},i=0;i<this.length;i++){var r=this[i][0];null!=r&&(s[r]=!0)}for(i=0;i<t.length;i++){var o=t[i];null!=o[0]&&s[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},,,,,,,function(t,e,n){},function(t,e,n){var s=n(10);t.exports="string"==typeof s?s:s.toString()},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,":host {\n  z-index: 9999 !important; }\n",""])},function(t,e,n){var s=n(12);t.exports="string"==typeof s?s:s.toString()},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,":host {\n  --primary-color: #78c0a8;\n  --primary-light: #a9f3d9;\n  --primary-dark: #488f79;\n  --secondary-color: #3d3d3d;\n  --secondary-light: #676767;\n  --secondary-dark: #171717;\n  --error-color: #c5344e;\n  --error-info: #14854e; }\n\nh1 {\n  font-weight: lighter;\n  padding-left: 20px;\n  padding-right: 10px;\n  width: 100%;\n  color: white; }\n\nlabel {\n  margin-top: 1rem;\n  margin-left: 35px;\n  display: block;\n  color: white;\n  margin-bottom: 0.5rem;\n  padding-left: 10px;\n  padding-right: 10px; }\n\ninput {\n  display: block;\n  border: solid rgba(0, 0, 0, 0.125) 1px;\n  border-radius: 0.25rem;\n  font-size: 1.25rem;\n  box-sizing: border-box;\n  padding: 0.5rem;\n  width: 100%; }\n\nbutton {\n  margin-top: 8px;\n  display: inline-block;\n  vertical-align: middle;\n  border: solid rgba(0, 0, 0, 0.125) 1px;\n  border-radius: 0.25rem;\n  box-sizing: border-box;\n  font-size: 1rem;\n  line-height: 1.5;\n  background-color: var(--primary-dark);\n  color: white;\n  position: relative;\n  left: 2%;\n  bottom: 2%; }\n\n.invalid-feedback {\n  display: none; }\n\n.was-validated input:invalid {\n  border: solid var(--error-color) 1px; }\n\n.was-validated input:invalid ~ .invalid-feedback {\n  color: var(--error-color);\n  margin-top: 0.2rem;\n  font-size: 0.8rem;\n  display: block; }\n\n.was-validated input:valid ~ .invalid-feedback {\n  display: none; }\n\n#container {\n  background: var(--secondary-color);\n  padding: 10px;\n  border-radius: 30px;\n  margin-top: 10%; }\n\n.input {\n  padding-left: 10px;\n  padding-right: 10px; }\n",""])},function(t,e,n){"use strict";n.r(e);n(8);class s{constructor(){}getJwt(){return new Promise(t=>{try{chrome.storage.sync.get(e=>{t(e.jwt_key)})}catch(e){t("")}})}setJwt(t){return new Promise(e=>{try{chrome.storage.sync.set({jwt_key:t}),e()}catch(t){console.log(t),e()}})}}const i=new WeakMap,r=t=>"function"==typeof t&&i.has(t),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(t,e,n=null)=>{let s=e;for(;s!==n;){const e=s.nextSibling;t.removeChild(s),s=e}},l={},c={},d=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${d}--\x3e`,u=new RegExp(`${d}|${h}`),p="$lit$";class f{constructor(t,e){this.parts=[],this.element=e;let n=-1,s=0;const i=[],r=e=>{const o=e.content,a=document.createTreeWalker(o,133,null,!1);let l=0;for(;a.nextNode();){n++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const i=e.attributes;let r=0;for(let t=0;t<i.length;t++)i[t].value.indexOf(d)>=0&&r++;for(;r-- >0;){const i=t.strings[s],r=g.exec(i)[2],o=r.toLowerCase()+p,a=e.getAttribute(o).split(u);this.parts.push({type:"attribute",index:n,name:r,strings:a}),e.removeAttribute(o),s+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(d)>=0){const r=e.parentNode,o=t.split(u),a=o.length-1;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?y():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++n});""===o[a]?(r.insertBefore(y(),e),i.push(e)):e.data=o[a],s+=a}}else if(8===e.nodeType)if(e.data===d){const t=e.parentNode;null!==e.previousSibling&&n!==l||(n++,t.insertBefore(y(),e)),l=n,this.parts.push({type:"node",index:n}),null===e.nextSibling?e.data="":(i.push(e),n--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(d,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of i)t.parentNode.removeChild(t)}}const m=t=>-1!==t.index,y=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class v{constructor(t,e,n){this._parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this._parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let n=0,s=0;const i=t=>{const r=document.createTreeWalker(t,133,null,!1);let o=r.nextNode();for(;n<e.length&&null!==o;){const t=e[n];if(m(t))if(s===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));n++}else s++,"TEMPLATE"===o.nodeName&&i(o.content),o=r.nextNode();else this._parts.push(void 0),n++}};return i(t),o&&(document.adoptNode(t),customElements.upgrade(t)),t}}class _{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let n=0;n<t;n++){const t=this.strings[n],s=g.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+p+s[3]+d:t+h}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const w=t=>null===t||!("object"==typeof t||"function"==typeof t);class S{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let s=0;s<e;s++){n+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)n+="string"==typeof e?e:String(e);else n+="string"==typeof t?t:String(t)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===l||w(t)&&t===this.value||(this.value=t,r(t)||(this.committer.dirty=!0))}commit(){for(;r(this.value);){const t=this.value;this.value=l,t(this)}this.value!==l&&this.committer.commit()}}class x{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(y()),this.endNode=t.appendChild(y())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=y()),t._insert(this.endNode=y())}insertAfterPart(t){t._insert(this.startNode=y()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;r(this._pendingValue);){const t=this._pendingValue;this._pendingValue=l,t(this)}const t=this._pendingValue;t!==l&&(w(t)?t!==this.value&&this._commitText(t):t instanceof _?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===c?(this.value=c,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const n=new v(e,t.processor,this.options),s=n._clone();n.update(t.values),this._commitNode(s),this.value=n}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)void 0===(n=e[s])&&(n=new x(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){a(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this._pendingValue=t}commit(){for(;r(this._pendingValue);){const t=this._pendingValue;this._pendingValue=l,t(this)}if(this._pendingValue===l)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=l}}class C extends S{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends b{}let E=!1;try{const t={get capture(){return E=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class T{constructor(t,e,n){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this._boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this._pendingValue=t}commit(){for(;r(this._pendingValue);){const t=this._pendingValue;this._pendingValue=l,t(this)}if(this._pendingValue===l)return;const t=this._pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),s&&(this._options=A(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=l}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(E?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const k=new class{handleAttributeExpressions(t,e,n,s){const i=e[0];return"."===i?new C(t,e.slice(1),n).parts:"@"===i?[new T(t,e.slice(1),s.eventContext)]:"?"===i?[new P(t,e.slice(1),n)]:new S(t,e,n).parts}handleTextExpression(t){return new x(t)}};function V(t){let e=j.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},j.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(d);return void 0===(n=e.keyString.get(s))&&(n=new f(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const j=new Map,O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const R=(t,...e)=>new _(t,e,"html",k),U=133;function M(t,e){const{element:{content:n},parts:s}=t,i=document.createTreeWalker(n,U,null,!1);let r=L(s),o=s[r],a=-1,l=0;const c=[];let d=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,o=s[r=L(s,r)]}c.forEach(t=>t.parentNode.removeChild(t))}const z=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,U,null,!1);for(;n.nextNode();)e++;return e},L=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(m(e))return n}return-1};const F=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),q=!1);const J=t=>e=>{const n=F(e.type,t);let s=j.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},j.set(n,s));let i=s.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(d);if(void 0===(i=s.keyString.get(r))){const n=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(n,t),i=new f(e,n),s.keyString.set(r,i)}return s.stringsArray.set(e.strings,i),i},$=["html","svg"],H=new Set,I=(t,e,n)=>{H.add(n);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,n);const i=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),i.textContent+=e.textContent}if((t=>{$.forEach(e=>{const n=j.get(F(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),M(t,n)})})})(n),function(t,e,n=null){const{element:{content:s},parts:i}=t;if(null==n)return void s.appendChild(e);const r=document.createTreeWalker(s,U,null,!1);let o=L(i),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===n&&(a=z(e),n.parentNode.insertBefore(e,n));-1!==o&&i[o].index===l;){if(a>0){for(;-1!==o;)i[o].index+=a,o=L(i,o);return}o=L(i,o)}}(e,i,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,n),window.ShadyCSS.nativeShadow){const n=e.element.content.querySelector("style");t.insertBefore(n.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(i,e.element.content.firstChild);const t=new Set;t.add(i),M(e,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const B={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),D={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:W},G=Promise.resolve(!0),K=1,Q=4,X=8,Y=16,Z=32;class tt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const s=this._attributeNameForProperty(n,e);void 0!==s&&(this._attributeToPropertyMap.set(s,n),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=D){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[n]},set(e){const s=this[t];this[n]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=W){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,s=e.converter||B,i="function"==typeof s?s:s.fromAttribute;return i?i(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,s=e.converter;return(s&&s.toAttribute||B.toAttribute)(t,n)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=D){const s=this.constructor,i=s._attributeNameForProperty(t,n);if(void 0!==i){const t=s._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=this._updateState|X,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=this._updateState&~X}}_attributeToProperty(t,e){if(this._updateState&X)return;const n=this.constructor,s=n._attributeToPropertyMap.get(t);if(void 0!==s){const t=n._classProperties.get(s)||D;this._updateState=this._updateState|Y,this[s]=n._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Y}}_requestUpdate(t,e){let n=!0;if(void 0!==t){const s=this.constructor,i=s._classProperties.get(t)||D;s._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Q;const n=this._updatePromise;this._updatePromise=new Promise((n,s)=>{t=n,e=s});try{await n}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&K}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&K||(this._updateState=this._updateState|K,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}tt.finalized=!0;const et=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:s}=e;return{kind:n,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e);function nt(t){return(e,n)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};return void 0!==n?st(s,e,n):it(s,e)}}const st=(t,e,n)=>{Object.defineProperty(e,n,t)},it=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),rt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=t=>new at(String(t),ot),ct=(t,...e)=>{const n=e.reduce((e,n,s)=>e+(t=>{if(t instanceof at)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[s+1],t[0]);return new at(n,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const dt=t=>t.flat?t.flat(1/0):function t(e,n=[]){for(let s=0,i=e.length;s<i;s++){const i=e[s];Array.isArray(i)?t(i,n):n.push(i)}return n}(t);class ht extends tt{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){dt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof _&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ht.finalized=!0,ht.render=(t,e,n)=>{const s=n.scopeName,i=O.has(e),r=e instanceof ShadowRoot&&q&&t instanceof _,o=r&&!H.has(s),l=o?document.createDocumentFragment():e;if(((t,e,n)=>{let s=O.get(e);void 0===s&&(a(e,e.firstChild),O.set(e,s=new x(Object.assign({templateFactory:V},n))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:J(s)},n)),o){const t=O.get(l);O.delete(l),t.value instanceof v&&I(l,t.value.template,s),a(e,e.firstChild),e.appendChild(l),O.set(e,t)}!i&&r&&window.ShadyCSS.styleElement(e.host)};var ut=function(t,e,n,s){var i,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(r<3?i(o):r>3?i(e,n,o):i(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o};const pt=n(9);let ft=class extends ht{constructor(){super(...arguments),this.jwtService=new s}firstUpdated(){console.log(this.jwtService.getJwt())}render(){return R`
  <sign-in></sign-in>
  `}};ft.styles=ct`${lt(pt)}`,ft=ut([et("pop-up")],ft);var mt=function(t,e,n,s){return new(n||(n=Promise))(function(i,r){function o(t){try{l(s.next(t))}catch(t){r(t)}}function a(t){try{l(s.throw(t))}catch(t){r(t)}}function l(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(o,a)}l((s=s.apply(t,e||[])).next())})};class yt{constructor(t){this.config=t,this.jwtService=new s}get(t){return this.createFetch("GET",t)}post(t,e){return this.createFetch("POST",t,e)}put(t,e){return this.createFetch("PUT",t,e)}patch(t,e){return this.createFetch("PATCH",t,e)}delete(t){return this.createFetch("DELETE",t)}createFetch(t,e,n){return mt(this,void 0,void 0,function*(){const s=yield this.jwtService.getJwt();console.log(s);const i={headers:{"Content-Type":"application/json; charset=utf-8",Authorization:`Bearer ${s}`},method:t};n&&(i.body=JSON.stringify(n));const r=yield fetch(this.config.baseURL+e,i);if(r.ok)return r;{let t=yield r.text();try{t=JSON.parse(t).message}catch(t){}return t=t||r.statusText,Promise.reject(t)}})}}var gt=function(t,e,n,s){return new(n||(n=Promise))(function(i,r){function o(t){try{l(s.next(t))}catch(t){r(t)}}function a(t){try{l(s.throw(t))}catch(t){r(t)}}function l(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(o,a)}l((s=s.apply(t,e||[])).next())})};class vt{constructor(){this.jwtService=new s,this.httpClient=new yt({baseURL:"http://localhost:3000"})}login(t){return gt(this,void 0,void 0,function*(){const e=yield this.httpClient.post("/auth",t),n=yield e.json();return this.jwtService.setJwt(n.token),n.token})}logout(){return gt(this,void 0,void 0,function*(){this.jwtService.setJwt("")})}}var _t=function(t,e,n,s){var i,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(r<3?i(o):r>3?i(e,n,o):i(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o},wt=function(t,e,n,s){return new(n||(n=Promise))(function(i,r){function o(t){try{l(s.next(t))}catch(t){r(t)}}function a(t){try{l(s.throw(t))}catch(t){r(t)}}function l(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(o,a)}l((s=s.apply(t,e||[])).next())})};const St=n(11);let bt=class extends ht{constructor(){super(...arguments),this.userService=new vt}firstUpdated(){this.emailElement.addEventListener("keyup",t=>wt(this,void 0,void 0,function*(){13===t.keyCode&&(yield this.submit())})),this.passwordElement.addEventListener("keyup",t=>wt(this,void 0,void 0,function*(){13===t.keyCode&&(yield this.submit())}))}render(){return R`
    <div id="container">
      <form>
        <div class="input shadow-lg">
          <label for="email">E-Mail</label>
          <input type="email" autofocus="autofocus" required id="email" name="email">
          <div class="invalid-feedback">Email is required</div>
        </div>
        <div class="input shadow-lg">
          <label for="password">Password</label>
          <input type="password" required id="password" name="password">
          <div class="invalid-feedback">Pasword is required</div>
        </div>
        <button type="button" @click="${this.submit}">Sign-in</button>
      </form>
      `}submit(){return wt(this,void 0,void 0,function*(){if(this.isFormValid()){const t={email:this.emailElement.value,password:this.passwordElement.value};console.log(t);try{const e=yield this.userService.login(t);console.log(e),e&&this.emitLogin(e)}catch(t){console.log(t)}}else this.form.classList.add("was-validated")})}emitLogin(t){this.dispatchEvent(new CustomEvent("login",{detail:t,bubbles:!0}))}isFormValid(){return this.form.checkValidity()}};bt.styles=ct`${lt(St)}`,_t([nt("form")],bt.prototype,"form",void 0),_t([nt("#email")],bt.prototype,"emailElement",void 0),_t([nt("#password")],bt.prototype,"passwordElement",void 0),bt=_t([et("sign-in")],bt)}]);