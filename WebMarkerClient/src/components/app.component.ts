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
  title: string = 'MarkMyWords';

  async firstUpdated() {
    this.marks = await this.markService.getMarks();
    console.log(this.marks);
  }

  render() {
    return html`
          ${this.marks && this.marks.length ? this.marks.map(mark => html`
          <blockquote>
            ${mark.completeText.split(mark.text)[0]}
            <mark>${mark.text}</mark>
            ${mark.completeText.split(mark.text)[0]}
            <a href="${mark.url}" target="_blank">${mark.url}</a>
          </blockquote>`) :
          html`<h1>No marks made yet</h1>`}
`;
  }

  getDateString(date: number) {
    const newDate = new Date(date);
    return `${newDate.getHours()}:${newDate.getMinutes()} Uhr`;
  }


}
