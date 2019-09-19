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

  async updateMark(mark: Mark, tags: string[]){
    mark.tags = tags;
    await this.markService.updateMark(mark);
  }

  render() {
    return html`
          ${this.marks && this.marks.length ? this.marks.map(mark => html`
          <div class="container">
          <block-qoute .mark=${mark}></block-qoute>
          <bronco-chip-list .mark=${mark}
          @tagsChanged=${(e: CustomEvent) => this.updateMark(mark, e.detail as string[])}></bronco-chip-list>
            <div class="footer" style="width: 100%">
            <span>${timeSinceTimestamp(mark.createdAt)} ago</span>
            <a href="${mark.url}" target="_blank">${mark.url.substring(0, 50)}</a>
            </div>
            <button
            @click=${async () => await this.deleteMark(mark)}>X</button>
          </div>

          `) :
        html`<sign-in @login=${async () => await this.firstUpdated()}></sign-in>`}
`;
  }


  async deleteMark(mark: Mark) {
    this.marks = this.marks.filter(e => e !== mark);
    await this.markService.deleteMark(mark.id);
  }

}
