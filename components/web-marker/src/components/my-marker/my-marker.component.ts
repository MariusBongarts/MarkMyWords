import uuidv4 from 'uuid/v4';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { highlightText } from '../../helper/markerHelper';
import { styleMap } from 'lit-html/directives/style-map';
const componentCSS = require('./my-marker.component.scss');

@customElement('my-marker')
export class MyMarkerElement extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  marks!: Mark[];

  @property()
  id!: string;

  @property()
  left = '0px';

  @property()
  show = false;

  @property()
  animation: 'slideIn' | 'slideOut' = 'slideIn';

  abortHide = false;

  private markerService = new MarkerService();

  async firstUpdated() {
    console.log(this.id);
    const rectLines = this.parentElement.getClientRects() as DOMRectList;
    //this.left = rectLines.length > 1 ? this.left = '50%' : this.left = `${rectLines[0].left - this.parentElement.offsetLeft}px`;

    this.style.left = rectLines.length === 1 ? this.parentElement.offsetLeft + 'px' : this.parentElement.parentElement.offsetLeft + 'px';

    this.style.width = this.parentElement.offsetWidth + 'px';

    this.style.height = rectLines[0].height + 'px';


    const offsetTop = rectLines.length === 1 ? 0 : (rectLines.length - 1) * rectLines[0].height;
    this.style.transform = `translateY(${-offsetTop}px)`;

    console.log(offsetTop);


    this.classList.add('slideIn');

    this.parentElement.addEventListener('mouseenter', (e) => {
      console.log(e);
      this.show = true;
      this.abortHide = true;
      this.animation = 'slideIn';
    });

    this.parentElement.addEventListener('mouseleave', () => {
      this.abortHide = false;
      setTimeout(() => {
        if (!this.abortHide) {
          this.animation = 'slideOut';
        }
      }, 500);
    });
  }

  loadedEvent() {
    this.dispatchEvent(
      new CustomEvent('loaded', {
        bubbles: true,
        detail: this.marks
      })
    );
  }

  async emit(e: MouseEvent) {
    e.stopPropagation();
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
    // this.dispatchEvent(
    //   new CustomEvent('clicked', {
    //     bubbles: true,
    //     detail: mark
    //   })
    // );
  }

  render() {
    return html`
    ${this.show ? html`
    <div class="markContainer ${this.animation}">

      <my-menu .left=${this.left}></my-menu>

  </div>
    ` : ''}
 `;
  }


}
