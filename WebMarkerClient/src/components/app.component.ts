import { Mark } from './../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { MarkerService } from '../services/marker.service';
import { timeSinceTimestamp } from '../helper/dateHelper';

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
            ${mark.completeText.split(mark.text)[1]}
            <br>
            <div class="footer" style="width: 100%">
            <span>${timeSinceTimestamp(mark.createdAt)} ago</span>
            <a href="${mark.url}" target="_blank">${mark.url.substring(0, 50)}</a>
            </div>
            <button style="position: absolute; right: 0px; top: -22px"
            @click=${async () => await this.deleteMark(mark)}>Delete mark</button>
          </blockquote>`) :
        html`<h1>No marks made yet</h1>`}
`;
  }


  async deleteMark(mark: Mark) {
    this.marks = this.marks.filter(e => e !== mark);
    await this.markService.deleteMark(mark.id);
  }

}
