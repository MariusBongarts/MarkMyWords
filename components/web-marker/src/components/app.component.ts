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
    this.listenToShowMarker();
    await this.highlightMarks();
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
    this.style.left = rangeBounds.left + (rangeBounds.width / 2) - (this.menuWidth / 2) - 35 + 'px';
    this.style.top = rangeBounds.top + 'px';
    this.show = true;
  }

  /**
   *  This method loads all marks for current url from server
   *
   * @todo Load only marks with current url from server
   *
   * @memberof WebMarker
   */
  async highlightMarks() {
    this.scrollToMark();
    this.marks = await this.markerService.getMarksForUrl(location.href.split('?')[0]);
    console.log(this.marks);
    this.marks.forEach(mark => highlightText(null, mark));
    console.log(`${this.marks.length} mark found!`);
  }


  /**
   *  Scroll to mark if there is a scrollY param in query url.
   *  SetTimeout to put at the end of event Loop
   * @memberof WebMarker
   */
  scrollToMark() {
    setTimeout(() => {
      const params = location.href.split('?')[1].split('=');
      params.forEach((param, index) => {
        if (param === 'scrollY') {
          console.log("sij")
          const scrollOptions: ScrollToOptions = {
            top: Number(params[index+1]),
            left: 0,
            behavior: 'smooth'
          }
          window.scrollTo(scrollOptions);
          console.log(params);
        }
      });
    });

  }

  render() {
    return html`
  <my-marker .show=${this.show} .menuWidth=${this.menuWidth}></my-marker>
  `;
  }

}
