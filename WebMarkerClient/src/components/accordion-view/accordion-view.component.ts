import { JwtPayload } from './../../models/jwtPayload';
import { JwtService } from './../../services/jwt.service';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { urlToOrigin } from '../../helper/urlHelper';

const componentCSS = require('./accordion-view.component.scss');

@customElement('accordion-view')
export class TreeViewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  activeDirectory = '';

  @property()
  marks: Mark[] = [];

  @property()
  filter = '';

  @property()
  loaded = false;

  @property()
  selectedOrigin = '';

  origins: string[] = [];


  async firstUpdated() {
    this.getDistinctOrigins();
    this.loaded = true;
  }

  getDistinctOrigins() {
    this.origins = [...new Set(this.marks.map(mark => mark.origin))];
    console.log(this.origins);
    this.origins = this.origins.map(origin => urlToOrigin(origin));
    this.origins.sort();
    this.origins = [...new Set(this.origins.map(origin => origin))];
  }

  selectOrigin(origin: string) {
    setTimeout(() => {
      this.selectedOrigin === origin ? this.selectedOrigin = '' : this.selectedOrigin = origin;
      this.dispatchEvent(new CustomEvent('selectedUrl', { detail: this.selectedOrigin }));
    }, 1);
  }


  render() {
    return html`
    ${this.marks ? html`
    <div class="tabs">
          <!-- Close placeholder -->
          ${this.selectedOrigin ? html`
          <div class="tab">
            <input type="radio" id="closeBtn" name="radioBtn">
          </div>
        ` : ''}
      ${this.origins.filter(origin => origin.toLowerCase().includes(this.filter)).map((origin: string) => html`
      <div class="tab">
        <input type="radio" id="${origin}" name="radioBtn">
        <!-- setTimeout() is necessary to change selectedOrigin after radio input event -->
        <label class="tab-label" for="${this.selectedOrigin && this.selectedOrigin === origin ? 'closeBtn' : origin}"
        @click=${(e: any) => this.selectOrigin(origin) }
        >
        <span>${origin.substring(0, 30)}</span>
        
        <span class="badge">${this.marks.filter(mark => mark.origin.includes(origin)).length}</span>
      </label>
      <div class="tab-content">

      </div>
          `)}
      </div>

        ` : html`Loading...`}
`;
  }

}
