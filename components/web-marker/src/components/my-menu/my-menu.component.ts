import uuidv4 from 'uuid/v4';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { highlightText } from '../../helper/markerHelper';
import { styleMap } from 'lit-html/directives/style-map';

const componentCSS = require('./my-menu.component.scss');

@customElement('my-menu')
export class MyMarkElement extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  marks!: Mark[];

  @property()
  left!: number;

  @property()
  show = false;


  private markerService = new MarkerService();

  async firstUpdated() {
    console.log(this.left)
  }


  async emit(e: MouseEvent) {
    e.stopPropagation();
    this.show = false;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const mark: Mark = {
      id: uuidv4(),
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

    highlightText(null, mark);
    window.getSelection().empty();

    await this.markerService.createMark(mark);

  }

  render() {
    return html`
    <div class="menuContainer" style=${styleMap({left: `${this.left}px`})}>
        <button class="btn info" @click=${(e: MouseEvent) => this.emit(e)}>
          <bronco-icon class=${false ? 'active' : ''} iconName="edit"></bronco-icon>
        </button>
        <button class="btn info">
          <bronco-icon iconName="delete"></bronco-icon>
        </button>
    </div>
 `;
  }

}
