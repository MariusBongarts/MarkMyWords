import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./header-toggle.component.scss');

@customElement('header-toggle')
export class HeaderToggleComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  active = 1;

  emitChange() {
    this.active === 0 ? this.active = 1 : this.active = 0;
    this.dispatchEvent(
      new CustomEvent('toggleChanged', {
        detail: this.active
      }
      )
    )
  }

  render() {
    return html`
    <div class="toggle">
    <button
    class="${this.active === 0 ? 'active' : ''}"
    @click=${() => this.emitChange()}
    >Folders</button>
    <button
    @click=${() => this.emitChange()}
    class="${this.active === 1 ? 'active' : ''}">Marks</button>
    </div>
`;
  }

}
