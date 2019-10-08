import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { urlToOrigin } from '../../helper/urlHelper';

const componentCSS = require('./tags-view.component.scss');

@customElement('tags-view')
export class TagsViewComponent extends LitElement {
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
  selectedTag = '';

  @property()
  tags: string[] = [];


  async firstUpdated() {
    this.loadDistinctTags();
    this.loaded = true;
  }

  loadDistinctTags() {
    this.marks.forEach(mark => {
      this.tags = [...this.tags, ...mark.tags];
    });
    this.tags = [...new Set(this.tags)];
    this.tags.sort();
  }

  getRelatedTags() {
    let relatedTags: string[] = [];
    this.marks.filter(mark => mark.tags.includes(this.selectedTag)).forEach(mark => relatedTags = [...relatedTags, ...mark.tags]);
    return [...new Set(relatedTags)].filter(tag => tag !== this.selectedTag);
  }

  selectTag(tag: string) {
    this.selectedTag === tag ? this.selectedTag = '' : this.selectedTag = tag;
    this.dispatchEvent(new CustomEvent('selectedTag', { detail: this.selectedTag }));
  }


  render() {
    return html`
    ${this.loaded ? html`

    <!-- If no tag is selected -->
    ${!this.selectedTag ? html`
    <div class="container">
      ${this.tags.filter(tag => tag.toLowerCase().includes(this.filter)).map(tag =>
      html`
      <bronco-chip
      @click=${() => this.selectTag(tag)}
      .badgeValue=${this.marks.filter(mark => mark.tags.includes(tag)).length} .hideDeleteIcon=${true}>
      <div class="chipContainer">
        <span>${tag}</span>
        </div>
        </bronco-chip>`
    )}

    </div>

    <!-- If Tag is selected -->
    ` : html`
    <div class="selectedChipContainer">
      <bronco-chip
      @click=${() => this.selectTag(this.selectedTag)}
      .badgeValue=${this.marks.filter(mark => mark.tags.includes(this.selectedTag)).length} .hideDeleteIcon=${true}>
      <div class="chipContainer">
        <span>${this.selectedTag}</span>
      </div>
    </bronco-chip>
  </div>

    <!-- Show related tags -->
    <div class="container">
    <span>Related Tags</span>
    <hr class="divider">
      ${this.getRelatedTags().map(tag => html`
      <bronco-chip
        @click=${() => this.selectTag(tag)}
        .badgeValue=${this.marks.filter(mark => mark.tags.includes(tag)).length} .hideDeleteIcon=${true}>
        <div class="chipContainer">
          <span>${tag}</span>
          </div>
      </bronco-chip>
      `)}
    </div>
    `}
        ` : html`Loading...`}

`;
  }

}
