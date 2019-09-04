var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
const componentCSS = require('./app.component.scss');
/**
 * Modern button
 * @event clicked - Dispatches when button is clicked.
 * @slot - Default content.
 * @cssprop --bg-color - Background color
 * @cssprop --bg-color-focus - Background color when focused
 * @cssprop --bg-color-hover - Background color when hovered
 * @cssprop --bg-color-focus-hover - Background color when focused and hovered
 * @cssprop --border-radius - Border radius
 * @cssprop --button-color-shadow - Shadow color when not focused
 * @cssprop --button-color-shadow-focus - Shadow color when focused
 * @cssprop --color - text color
 * @cssprop --color-focus-hover - text color when focused and hovered
 * @cssprop --height - Height of button
 * @cssprop --margin - Margin of button
 * @cssprop --min-width - Width of button
 * @cssprop --primary-color - Change primary color easily
 * @cssprop --primary-color-hover - Hover background color
 *
 */
let BroncoButton = class BroncoButton extends LitElement {
    /**
     * Modern button
     * @event clicked - Dispatches when button is clicked.
     * @slot - Default content.
     * @cssprop --bg-color - Background color
     * @cssprop --bg-color-focus - Background color when focused
     * @cssprop --bg-color-hover - Background color when hovered
     * @cssprop --bg-color-focus-hover - Background color when focused and hovered
     * @cssprop --border-radius - Border radius
     * @cssprop --button-color-shadow - Shadow color when not focused
     * @cssprop --button-color-shadow-focus - Shadow color when focused
     * @cssprop --color - text color
     * @cssprop --color-focus-hover - text color when focused and hovered
     * @cssprop --height - Height of button
     * @cssprop --margin - Margin of button
     * @cssprop --min-width - Width of button
     * @cssprop --primary-color - Change primary color easily
     * @cssprop --primary-color-hover - Hover background color
     *
     */
    constructor() {
        super(...arguments);
        /**
         *
         * Makes the button outlined
         * @type {boolean}
         * @memberof BroncoButton
         */
        this.outline = false;
        /**
         * Enables the outline effect after clicking
         * @type {boolean}
         * @memberof BroncoButton
         */
        this.outlineEffect = false;
    }
    emit() {
        this.dispatchEvent(new CustomEvent('clicked', {
            bubbles: true
        }));
    }
    render() {
        return html `
          <button class='
            ${this.outline ? ' outline' : ''}
            ${this.outlineEffect ? 'outlineEffect' : ''}' @click=${() => this.emit()}>
              <span>
                <slot></slot>
              </span>
            </button>
`;
    }
};
BroncoButton.styles = css `${unsafeCSS(componentCSS)}`;
__decorate([
    property({ type: Boolean, reflect: false })
], BroncoButton.prototype, "outline", void 0);
__decorate([
    property({ type: Boolean, reflect: false })
], BroncoButton.prototype, "outlineEffect", void 0);
BroncoButton = __decorate([
    customElement('bronco-button')
], BroncoButton);
export { BroncoButton };
//# sourceMappingURL=app.component.js.map