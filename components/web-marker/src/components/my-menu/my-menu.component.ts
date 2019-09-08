import { router } from './../../services/router';
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
        <button class="btn href" @click=${() => router.navigateExternal('https://marius96.uber.space/')}>
        <svg class="icon hrefIcon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="hand-point-right" class="svg-inline--fa fa-hand-point-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M428.8 137.6h-86.177a115.52 115.52 0 0 0 2.176-22.4c0-47.914-35.072-83.2-92-83.2-45.314 0-57.002 48.537-75.707 78.784-7.735 12.413-16.994 23.317-25.851 33.253l-.131.146-.129.148C135.662 161.807 127.764 168 120.8 168h-2.679c-5.747-4.952-13.536-8-22.12-8H32c-17.673 0-32 12.894-32 28.8v230.4C0 435.106 14.327 448 32 448h64c8.584 0 16.373-3.048 22.12-8h2.679c28.688 0 67.137 40 127.2 40h21.299c62.542 0 98.8-38.658 99.94-91.145 12.482-17.813 18.491-40.785 15.985-62.791A93.148 93.148 0 0 0 393.152 304H428.8c45.435 0 83.2-37.584 83.2-83.2 0-45.099-38.101-83.2-83.2-83.2zm0 118.4h-91.026c12.837 14.669 14.415 42.825-4.95 61.05 11.227 19.646 1.687 45.624-12.925 53.625 6.524 39.128-10.076 61.325-50.6 61.325H248c-45.491 0-77.21-35.913-120-39.676V215.571c25.239-2.964 42.966-21.222 59.075-39.596 11.275-12.65 21.725-25.3 30.799-39.875C232.355 112.712 244.006 80 252.8 80c23.375 0 44 8.8 44 35.2 0 35.2-26.4 53.075-26.4 70.4h158.4c18.425 0 35.2 16.5 35.2 35.2 0 18.975-16.225 35.2-35.2 35.2zM88 384c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path></svg>
        </button>
    </div>
 `
  }

}
