import uuidv4 from 'uuid/v4';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
import { highlightText } from '../../helper/markerHelper';
const componentCSS = require('./my-menu.component.scss');

@customElement('my-menu')
export class MyMarkElement extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  marks!: Mark[];

  @property()
  show = false;

  @property()
  markId!: string;

  @property()
  menuWidth = 80;

  private markerService = new MarkerService();

  firstUpdated() {
    this.setStyle();
  }

  /**
   *  Width is set dynamically because it it necessary to calculcate center in parent element
   *
   * @memberof MyMarkElement
   */
  setStyle() {
    this.parentElement.style.width = `${this.menuWidth}px`;
  }

  /**
   *
   *
   * @param {MouseEvent}
   * @memberof MyMarkElement
   */
  async saveMark(e: MouseEvent) {
    e.stopPropagation();
    this.show = false;
    const mark = this.createMark();
    highlightText(null, mark);
    window.getSelection().empty();
    await this.markerService.createMark(mark);
  }

  /**
   * Created mark to save it in database.
   * Important is that the attributes of the range are saved to recreate it later.
   *
   * @returns {Mark}
   * @memberof MyMarkElement
   */
  createMark(): Mark {
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
      completeText: range.startContainer.parentElement.textContent,
      nodeTagName: range.startContainer.parentElement.tagName.toLowerCase(),
      startContainer: range.startContainer,
      endContainer: range.endContainer,
      startContainerText: range.startContainer.textContent,
      endContainerText: range.endContainer.textContent,
      title: document.title
    };
    return mark;
  }

  /**
   *  First dispatches event to delete mark in client,
   *  then deletes it in server.
   *
   * @memberof MyMarkElement
   */
  async deleteMark() {
    this.dispatchEvent(
      new CustomEvent('deleted', {
        bubbles: true,
        detail: this.markId
      })
    );
    try {
      await this.markerService.deleteMark(this.markId);
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return html`
    <div class="menuContainer">

        <button class="btn info" @click=${(e: MouseEvent) => this.saveMark(e)}>
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"/></svg>
        </button>

        ${this.markId ? html`
        <button class="btn info" @click=${async () => this.deleteMark()}>
        <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
      </button>

        ` : ''}
    </div>
 `;
  }

}
