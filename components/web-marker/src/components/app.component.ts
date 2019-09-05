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

  @property()
  show = false;

  private markerService = new MarkerService();

  async firstUpdated() {
    this.marks = await this.markerService.getMarks();
    const filteredMarks = this.marks.filter(e => e.url === location.href);
    filteredMarks.forEach(mark => highlightText(mark));
    console.log(`${filteredMarks.length} marks found!`);

    window.addEventListener('mouseup', (e: MouseEvent) => {
      const selection = window.getSelection();
      if (this.show && !selection.toString().length) this.show = false;
      else if (selection.toString().length > 3) {
        this.style.left = e.clientX + 'px';
        this.style.top = e.clientY + 'px';
        this.show = true;
      }
    });

    window.addEventListener('mousedown', (e: MouseEvent) => {
      this.show && !window.getSelection().toString().length ? this.show = false : '';
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

  async emit() {
    this.show = false;
    const selection = window.getSelection();
    console.log("Click")
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
    ${this.show ? html`
    <div class="markContainer">
  <button class="btn info" style="color: none; background: none" @click=${() => this.emit()}>
    <bronco-icon class=${false ? 'active' : ''} iconName="edit"></bronco-icon>
  </button>
  <button class="btn info" style="color: none; background: none" @click=${() => this.emit()}>
    <bronco-icon iconName="delete"></bronco-icon>
  </button>
  </div>
            ` : ''}

`;
  }

}
