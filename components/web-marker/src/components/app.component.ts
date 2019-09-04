import { MarkerService } from './../services/marker.service';
import { Mark } from './../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { highlightText } from '../helper/markerHelper';

const componentCSS = require('./app.component.scss');

@customElement('web-marker')
export class WebMarker extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  marks!: Mark[];

  @property({ type: Boolean, reflect: false }) outline: boolean = false;

  @property({ type: Boolean, reflect: false }) outlineEffect: boolean = false;

  private markerService = new MarkerService();

  async firstUpdated() {
    this.marks = await this.markerService.getMarks();
    const filteredMarks = this.marks.filter(e => e.url === location.href);
    filteredMarks.forEach(mark => highlightText(mark));
    console.log(`${filteredMarks.length} marks found!`);
  }

  loadedEvent() {
    this.dispatchEvent(
      new CustomEvent('loaded', {
        bubbles: true,
        detail: this.marks
      })
    );
  }

  async emit() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const mark: Mark = {
      url: location.href,
      origin: location.href,
      text: selection.toString(),
      anchorNodeText: selection.anchorNode['data'],
      anchorOffset: selection.anchorOffset,
      createdAt: new Date().getTime(),
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      nodeData: range.startContainer.nodeValue,
      nodeHTML: range.startContainer.parentElement.innerHTML,
      completeText: range.startContainer.parentElement.textContent,
      nodeTagName: range.startContainer.parentElement.tagName.toLowerCase(),
      startContainer: range.startContainer,
      endContainer: range.endContainer,
      startContainerText: range.startContainer.textContent,
      endContainerText: range.endContainer.textContent
    };

    highlightText(mark);

    await this.markerService.createMark(mark);
    // this.dispatchEvent(
    //   new CustomEvent('clicked', {
    //     bubbles: true,
    //     detail: mark
    //   })
    // );
  }

  render() {
    return html`
          <button class='
            ${this.outline ? ' outline' : ''}
            ${this.outlineEffect ? 'outlineEffect' : ''}' @click=${() => this.emit()}>
              <span>
                <slot></slot>
              </span>
            </button>
`;
  }

}
