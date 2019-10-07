import { Mark } from './../../models/mark';
import { MarkerService } from './../../services/marker.service';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { timeSinceTimestamp } from '../../helper/dateHelper';

const componentCSS = require('./main-page.component.scss');

@customElement('main-page')
export class MainPageComponent extends LitElement {
  markService = new MarkerService();

  @property() marks: Mark[] = [];

  static styles = css`${unsafeCSS(componentCSS)}`;

  async firstUpdated() {
    await this.loadMarks();
  }

  async loadMarks() {
    this.marks = await this.markService.getMarks();
  }

  render() {
    return html`
    <div class="container">
      ${this.marks.length ? this.marks.map(mark => html`<mark-element .headerInfo=${timeSinceTimestamp(mark.createdAt)} .mark=${mark}></mark-element>`) : ''}
    </div>
`;
  }

}
