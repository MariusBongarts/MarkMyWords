import { JwtPayload } from './../../../models/jwtPayload';
import { JwtService } from './../../../services/jwt.service';
import { MarkerService } from './../../../services/marker.service';
import { Mark } from './../../../../../../WebMarkerClient/src/models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./accordion-view.component.scss');

@customElement('accordion-view')
export class TreeViewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  markService = new MarkerService();
  jwtService = new JwtService();

  @property()
  activeDirectory = '';

  @property()
  marks: Mark[] = [];

  @property()
  loaded = false;

  @property()
  selectedOrigin = '';

  @property()
  loggedUser: JwtPayload;

  origins: string[] = [];


  async firstUpdated() {
    this.loggedUser = await this.jwtService.getJwtPayload();
    this.marks = await this.markService.getMarks();
    this.getDistinctOrigins();
    this.loaded = true;
  }

  getDistinctOrigins() {
    this.origins = [...new Set(this.marks.map(mark => mark.origin))];
    this.origins = this.origins.map(origin => origin.replace(/https:\/\/|http:\/\/|/gi, ''));
    this.origins = this.origins.map(origin => origin.split('/')[0]);
    this.origins.sort();
  }


  render() {
    return html`
    ${this.loaded ? html`
    <div class="tabs">
          <!-- Close placeholder -->
          ${this.selectedOrigin ? html`
          <div class="tab">
            <input type="radio" id="closeBtn" name="radioBtn">
            <label for="closeBtn" class="tab-close">Close others &times;</label>
          </div>
        ` : ''}
      ${this.origins.map((origin: string) => html`
      <div class="tab">
        <input type="radio" id="${origin}" name="radioBtn">

        <label class="tab-label" for="${origin}"
        @click=${(e) => this.selectedOrigin === origin ? this.selectedOrigin = '' : this.selectedOrigin = origin}
        ><span>${origin.substring(0, 30)}</span></label>
        <div class="tab-content">
          ${this.marks.filter(mark => mark.origin.includes(origin)).map(mark => html`
          <mark-element .mark=${mark} .loggedUser=${this.loggedUser}></mark-element>
          `)}
          </div>
          `)}
      </div>

        ` : html`Loading....`}
`;
  }

}
