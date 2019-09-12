import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./app.component.scss');

/**
 * Modern chip
 * @event clicked - Dispatches when chip is clicked.
 * @event removed - Dispatched when removed is clicked.
 * @slot - Default content.
 * @cssprop --bg-color - Background color
 * @cssprop --height - Height of the chip
 *
 */
@customElement('bronco-chip')
export class BroncoChip extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  /**
   *
   * If true, trash icon will be shown with red background
   * @type {boolean}
   * @memberof BroncoChip
   */
  @property() deleteMode: boolean = true;

  /**
   *
   * Makes the chip outlined
   * @type {boolean}
   * @memberof BroncoChip
   */
  @property({ type: Boolean, reflect: false }) outline: boolean = false;

  /**
   * Enables the outline effect after clicking
   * @type {boolean}
   * @memberof BroncoChip
   */
  @property({ type: Boolean, reflect: false }) outlineEffect: boolean = false;

  emit() {
    this.dispatchEvent(
      new CustomEvent('clicked', {
        bubbles: true
      })
    );
  }

  emitDeleted() {
    this.dispatchEvent(
      new CustomEvent('deleted', {
        bubbles: true
      })
    );
  }

  render() {
    return html`
<div class="chip ripple ${this.deleteMode ? 'delete-mode' : ''}">
  <div class="chip-content"><slot></slot></div>
  <div class="chip-close" @click=${() => this.emitDeleted()}>
      <svg class="chip-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
  </div>
</div>
`;
  }

}
