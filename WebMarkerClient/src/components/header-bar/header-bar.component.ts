import { Mark } from './../../models/mark';
import { MarkerService } from './../../services/marker.service';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { timeSinceTimestamp } from '../../helper/dateHelper';

const componentCSS = require('./header-bar.component.scss');

@customElement('header-bar')
export class MainPageComponent extends LitElement {
  @query('#searchInput')
  searchElement!: HTMLInputElement;

  static styles = css`${unsafeCSS(componentCSS)}`;

  emitLogout() {
    this.dispatchEvent(
      new CustomEvent(
        'logout',
      )
    )
  }


  emitInput(e: KeyboardEvent) {
    const value = this.searchElement.value.toLowerCase();
    this.dispatchEvent(
      new CustomEvent('inputChange', {
        detail: value
      }
      )
    )
  }

  render() {
    return html`
    <div class="container">
      <div>

    </div>


    <input
      id="searchInput"
      class="searchInput"
      type="search"
      autofocus
      @search=${(e: KeyboardEvent) => this.emitInput(e)}
      @keydown=${(e: KeyboardEvent) => this.emitInput(e)}
      @keyup=${(e: KeyboardEvent) => this.emitInput(e)}
      placeholder="Search...">

      <button @click=${() => this.emitLogout()} class="logoutBtn">Logout</button>
    </div>
`;
  }

}
