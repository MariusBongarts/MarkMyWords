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

  @property()
  selectedTag = '';

  @property()
  selectedUrl = '';


  @property()
  searchValue = '';

  static styles = css`${unsafeCSS(componentCSS)}`;

  async firstUpdated() {
    await this.loadMarks();
  }

  async loadMarks() {
    this.marks = await this.markService.getMarks();
    this.marks.sort((a, b) => b.createdAt - a.createdAt);
  }

  filteredMarks() {
    const marks = this.marks.filter(mark => {
      return mark.text.toLowerCase().includes(this.searchValue.toLowerCase()) &&
      mark.url.includes(this.selectedUrl);
    });
    return this.selectedTag ? marks.filter(mark => mark.tags.includes(this.selectedTag)) : marks;
  }

  render() {
    return html`
    <div class="container">
      ${this.marks.length ? this.filteredMarks().map(mark => html`<block-qoute .mark=${mark}></block-qoute>`) : ''}
    </div>
`;
  }

}
