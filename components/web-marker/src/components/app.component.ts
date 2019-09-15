import { MarkerService } from './../services/marker.service';
import { Mark } from './../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { highlightText } from '../helper/markerHelper';

const componentCSS = require('./app.component.scss');

@customElement('web-marker')
export class WebMarker extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  marks!: Mark[];

  @property()
  show = false;

  /**
   * Set width of menu in px to calculate center.
   * Only for making new marks.
   *
   * @memberof WebMarker
   */
  @property()
  menuWidth = 80;

  private markerService = new MarkerService();

  async firstUpdated() {

    this.setChromeSettings();

    this.listenToShowMarker();
    await this.loadMarks();
  }

  setChromeSettings() {
    try {
      // TODO: Login and save JWT in storage
      chrome.storage.sync.set({ jwt_key: 'MyFuckingSecretKey' });

      chrome.storage.sync.get((items) => {
        console.log(`Current JWT: ${items['jwt_key']}`);
      });
    } catch (error) {

    }
  }

  /**
   * Listens for click and selection events to show or hide the marker
   *
   * @memberof WebMarker
   */
  listenToShowMarker() {

    document.addEventListener('selectionchange', (e: Event) => {
      const selectionText = window.getSelection().toString();
      if (!selectionText.length) this.show = false;
    });

    document.addEventListener('click', (e: MouseEvent) => {
      const selectionText = window.getSelection().toString();
      if (!selectionText.length) this.show = false;
      else if (selectionText.length) {
        this.setPositionOfMarkerForClick(e);
      }
    });

    document.addEventListener('scroll', (e: MouseEvent) => {
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
  setPositionOfMarkerForClick(e: MouseEvent) {
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
  async loadMarks() {
    this.marks = await this.markerService.getMarks();
    console.log(this.marks);
    const filteredMarks = this.marks.filter(e => e.url === location.href);
    filteredMarks.forEach(mark => highlightText(null, mark));
    console.log(`${filteredMarks.length} marks found!`);
  }

  render() {
    return html`
  <my-marker .marks=${this.marks ? this.marks : []} .show=${this.show} .menuWidth=${this.menuWidth}></my-marker>
  `;
  }

}
