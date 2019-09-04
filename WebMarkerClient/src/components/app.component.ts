import { Mark } from './../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { MarkerService } from '../services/marker.service';

const componentCSS = require('./app.component.scss');

/**
 * @author Marius Bongarts
 * Root web component
 */
@customElement('app-root')
export class AppRoot extends LitElement {
  markService = new MarkerService();

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property() marks!: Mark[];

  @property()
  title: string = 'LitElement Starter';

  async firstUpdated() {
    this.marks = await this.markService.getMarks();
  }

  render() {
    return html`
    <h1>${this.title}</h1>
          ${this.marks && this.marks.length ? this.marks.map(mark => html`
          <div class="entry">
          <h5>${mark.origin}</h5><br><span>${this.getDateString(mark.createdAt)}: ${mark.text}</span>`) : html`<h1>No marks made yet</h1>
          </div>
          `}
`;
  }

  getDateString(date: number) {
    const newDate = new Date(date);
    return `${newDate.getHours()}:${newDate.getMinutes()} Uhr`;
  }


}
