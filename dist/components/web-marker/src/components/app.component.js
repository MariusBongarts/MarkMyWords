var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MarkerService } from './../services/marker.service';
import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
import { highlightText } from '../helper/markerHelper';
const componentCSS = require('./app.component.scss');
let WebMarker = class WebMarker extends LitElement {
    constructor() {
        super(...arguments);
        this.show = false;
        /**
         * Set width of menu in px to calculate center.
         * Only for making new marks.
         *
         * @memberof WebMarker
         */
        this.menuWidth = 80;
        this.markerService = new MarkerService();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Login and save JWT in storage
            chrome.storage.sync.set({ jwt_key: 'MyFuckingSecretKey' });
            chrome.storage.sync.get((items) => {
                console.log(`Current JWT: ${items['jwt_key']}`);
            });
            this.listenToShowMarker();
            yield this.loadMarks();
        });
    }
    /**
     * Listens for click and selection events to show or hide the marker
     *
     * @memberof WebMarker
     */
    listenToShowMarker() {
        document.addEventListener('selectionchange', (e) => {
            const selectionText = window.getSelection().toString();
            if (!selectionText.length)
                this.show = false;
        });
        document.addEventListener('click', (e) => {
            const selectionText = window.getSelection().toString();
            if (!selectionText.length)
                this.show = false;
            else if (selectionText.length) {
                this.setPositionOfMarkerForClick(e);
            }
        });
        document.addEventListener('scroll', (e) => {
            this.show = false;
        });
    }
    /**
     *  Sets the position of the marker for a click event.
     *  Gets the center from the bounds of the createdRange
     *
     * @param {MouseEvent} e
     * @memberof WebMarker
     */
    setPositionOfMarkerForClick(e) {
        const rangeBounds = window.getSelection().getRangeAt(0).getBoundingClientRect();
        this.style.position = 'fixed';
        this.style.left = rangeBounds.left + (rangeBounds.width / 2) - (this.menuWidth / 2) + 'px';
        this.style.top = rangeBounds.top + 'px';
        this.show = true;
    }
    /**
     *  This method loads all marks from server, filters them for current
     *  url, and highlights all marks for current page
     *
     * @todo Load only marks with current url from server
     *
     * @memberof WebMarker
     */
    loadMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.marks = yield this.markerService.getMarks();
            console.log(this.marks);
            const filteredMarks = this.marks.filter(e => e.url === location.href);
            filteredMarks.forEach(mark => highlightText(null, mark));
            console.log(`${filteredMarks.length} marks found!`);
        });
    }
    render() {
        return html `
  <my-marker .marks=${this.marks ? this.marks : []} .show=${this.show} .menuWidth=${this.menuWidth}></my-marker>
  `;
    }
};
WebMarker.styles = css `${unsafeCSS(componentCSS)}`;
__decorate([
    property()
], WebMarker.prototype, "marks", void 0);
__decorate([
    property()
], WebMarker.prototype, "show", void 0);
__decorate([
    property()
], WebMarker.prototype, "menuWidth", void 0);
WebMarker = __decorate([
    customElement('web-marker')
], WebMarker);
export { WebMarker };
//# sourceMappingURL=app.component.js.map