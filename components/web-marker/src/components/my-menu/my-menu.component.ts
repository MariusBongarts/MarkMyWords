import uuidv4 from 'uuid/v4';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
import { highlightText } from '../../helper/markerHelper';
import { navigateExternal } from '../../helper/router';
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

  async toggleMark(e: MouseEvent) {
    e.stopPropagation();
    if (!this.markId) await this.saveMark();
    if (this.markId) await this.deleteMark();
  }

  /**
   *
   *
   * @param {MouseEvent}
   * @memberof MyMarkElement
   */
  async saveMark() {
    this.show = false;
    const mark = this.createMark();
    highlightText(null, mark);
    window.getSelection().empty();
    await this.markerService.createMark(mark);
  }

  /**
   * Created mark to save it in database.
   * Attributes of the range are saved to recreate it later.
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
      title: document.title,
      anchorOffset: selection.anchorOffset,
      createdAt: new Date().getTime(),
      nodeData: range.startContainer.nodeValue,
      completeText: range.startContainer.parentElement.textContent,
      nodeTagName: range.startContainer.parentElement.tagName.toLowerCase(),
      startContainerText: range.startContainer.textContent,
      endContainerText: range.endContainer.textContent,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
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
        <button class="btn ${this.markId ? 'active' : ''}" @click=${async (e: MouseEvent) => await this.toggleMark(e)}>
            <svg class="icon markIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"/></svg>
        </button>
        <button class="btn user" @click=${() => navigateExternal('https://marius96.uber.space/')}>
        <svg class="icon userIcon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-tag" class="svg-inline--fa fa-user-tag fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7.1-45.2zm-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24c0 13.2-10.7 24-24 24zm-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9zm127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9z"></path></svg>
        </button>
    </div>
 `
  }

}
