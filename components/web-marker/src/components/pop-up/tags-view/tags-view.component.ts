import { MarkerService } from './../../../services/marker.service';
import { Mark } from './../../../../../../WebMarkerClient/src/models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { urlToOrigin } from '../../../helper/urlHelper';

const componentCSS = require('./tags-view.component.scss');

@customElement('tags-view')
export class TreeViewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  activeDirectory = '';

  @property()
  marks: Mark[] = [];

  @property()
  loaded = false;

  @property()
  selectedTag = '';


  tags: string[] = [];


  async firstUpdated() {
    this.getDistinctTags();
    this.loaded = true;
  }

  getDistinctTags() {
    this.marks.forEach(mark => {
      this.tags = [...this.tags, ...mark.tags];
    });
    this.tags = [...new Set(this.tags)];
    this.tags.sort();
  }

  getRelatedTags() {
    let relatedTags = [];
    this.marks.filter(mark => mark.tags.includes(this.selectedTag)).forEach(mark => relatedTags = [...relatedTags, ...mark.tags]);
    return [...new Set(relatedTags)].filter(tag => tag !== this.selectedTag);
  }


  render() {
    return html`
    ${this.loaded ? html`

    <!-- If no tag is selected -->
    ${!this.selectedTag ? html`
    <div class="container">
      ${this.tags.map(tag =>
      html`
      <bronco-chip
      @click=${() => this.selectedTag === tag ? this.selectedTag = '' : this.selectedTag = tag}
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
      @click=${() => this.selectedTag = ''}
      .badgeValue=${this.marks.filter(mark => mark.tags.includes(this.selectedTag)).length} .hideDeleteIcon=${true}>
      <div class="chipContainer">
        <span>${this.selectedTag}</span>
      </div>
    </bronco-chip>
  </div>
    ${this.marks.filter(mark => mark.tags.includes(this.selectedTag)).map(mark =>
      html`<mark-element .mark=${mark} .headerInfo=${urlToOrigin(mark.url)}></mark-element>`
    )}
    <!-- Show related tags -->
    <div class="container">
      ${this.getRelatedTags().map(tag => html`
      <bronco-chip
        @click=${() => this.selectedTag === tag ? this.selectedTag = '' : this.selectedTag = tag}
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