import { MarkerService } from './../../../services/marker.service';
import { Mark } from './../../../../../../WebMarkerClient/src/models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./tags-view.component.scss');

@customElement('tags-view')
export class TreeViewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  markService = new MarkerService();

  @property()
  activeDirectory = '';

  @property()
  marks: Mark[] = [];

  @property()
  loaded = false;

  @property()
  selectedOrigin = '';


  tags: string[] = [];


  async firstUpdated() {
    if (!this.marks.length) {
      this.marks = await this.markService.getMarks();
    }
    this.getDistinctTags();
    this.loaded = true;
  }

  getDistinctTags() {
    this.marks.forEach(mark => {
      this.tags = [...this.tags, ...mark.tags];
    });
    this.tags = [...new Set(this.tags)];
    console.log(this.tags);
  }


  render() {
    return html`
    ${this.loaded ? html`
    <div class="container">
    ${this.tags.map(tag =>
      html`
      <bronco-chip .badgeValue=${this.marks.filter(mark => mark.tags.includes(tag)).length} .hideDeleteIcon=${true}>
      <div class="chipContainer">
      <span>${tag}</span>
      </div>
      </bronco-chip>`
      )}
    </div>

        ` : html`Loading...`}
`;
  }

}
