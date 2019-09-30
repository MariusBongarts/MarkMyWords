import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./header-toggle.component.scss');

@customElement('header-toggle')
export class HeaderToggle extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  active = 1;

  render() {
    return html`
    <div class="toggle">
    <button
    class="${this.active === 0 ? 'active' : ''}"
    @click=${() => this.active = 0}
    >Folders</button>
    <button
    @click=${() => this.active = 1}
    class="${this.active === 1 ? 'active' : ''}">Marks</button>
    </div>
`;
  }

}
