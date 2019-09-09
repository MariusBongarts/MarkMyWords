import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
const componentCSS = require('./my-marker.component.scss');

@customElement('my-marker')
export class MyMarkerElement extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  listener = [];

  @property()
  marks!: Mark[];

  @property()
  menuWidth!: number;

  @property()
  markId!: string;

  @property()
  show = false;

  @property()
  animation: 'slideIn' | 'slideOut' = 'slideIn';

  /**
   *  Necessary to abort hide animation when user enters mark again
   *
   * @memberof MyMarkerElement
   */
  abortHide = false;

  async firstUpdated() {

    if (this.markId) {
      this.setPosition();
      this.registerListener();
    }
  }

  /**
   *  Sets position of this component so that it is centralized above mark-element
   *
   * @memberof MyMarkerElement
   */
  setPosition() {
    console.log(this.id);
    const rectLines = this.parentElement.getClientRects() as DOMRectList;
    this.style.left = rectLines.length === 1 ? this.parentElement.offsetLeft + 'px' : this.parentElement.parentElement.offsetLeft + 'px';
    this.style.width = this.parentElement.offsetWidth + 'px';
    const offsetTop = rectLines.length === 1 ? 0 : (rectLines.length - 1) * rectLines[0].height;
    this.style.transform = `translateY(${-offsetTop}px)`;
    this.classList.add('slideIn');
  }

  /**
   *  Register Listener to show and hide hovering menu.
   *  Abortes hiding when user enters element again after 300ms
   *
   * @memberof MyMarkerElement
   */
  registerListener() {
    this.parentElement.addEventListener('mouseenter', (e) => {
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
      }, 300);
    });
  }

  /**
   *  Cascading event to trigger delete in root component
   *
   * @memberof MyMarkerElement
   */
  emitDeleted() {
    this.dispatchEvent(
      new CustomEvent('deleted', {
        bubbles: true,
        detail: this.markId
      })
    );
  }

  render() {
    return html`
    ${this.show ? html`
    <div class="markContainer">
      <my-menu .menuWidth=${this.menuWidth} class="${this.animation}" @deleted=${() => this.emitDeleted()} .markId=${this.markId}></my-menu>
    </div>
    ` : ''}
 `;
  }


}
