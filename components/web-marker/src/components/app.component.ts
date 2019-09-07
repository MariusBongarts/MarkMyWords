import { MarkerService } from './../services/marker.service';
import { Mark } from './../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { highlightText } from '../helper/markerHelper';


const componentCSS = require('./app.component.scss');

@customElement('web-marker')
export class WebMarker extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  marks!: Mark[];

  @property()
  show = false;

  private markerService = new MarkerService();

  async firstUpdated() {
    document.addEventListener('selectionchange', (e: Event) => {
      const selectionText = window.getSelection().toString();
      if (!selectionText.length) this.show = false;
    });
    document.addEventListener('click', (e: MouseEvent) => {
      const selectionText = window.getSelection().toString();
      if (!selectionText.length) this.show = false;
      else if (selectionText.length) {
        this.style.position = 'fixed';
        this.style.left = e.clientX + 'px';
        this.style.top = e.clientY - 18 + 'px';
        this.show = true;
      }
    });

    document.addEventListener('scroll', (e: MouseEvent) => {
      this.show = false;
    });

    try {
      this.marks = await this.markerService.getMarks();
      const filteredMarks = this.marks.filter(e => e.url === location.href);
      filteredMarks.forEach(mark => highlightText(null, mark));
      console.log(`${filteredMarks.length} marks found!`);
    } catch (error) {
      this.marks = [];
      console.log('MarkMyWords Server error!');
    }

  }

  loadedEvent() {
    this.dispatchEvent(
      new CustomEvent('loaded', {
        bubbles: true,
        detail: this.marks
      })
    );
  }

  render() {
    return html`
  <my-marker .show=${this.show}></my-marker>

`
  }


}
