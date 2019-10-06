import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./header-toggle.component.scss');

@customElement('header-toggle')
export class HeaderToggleComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @query('#searchInput')
  searchElement!: HTMLInputElement;

  @property()
  active = 2;

  @property()
  searchActive = false;

  emitChange(active: number) {
    this.active === 0 ? this.active = active : this.active = active;
    this.dispatchEvent(
      new CustomEvent('toggleChanged', {
        detail: this.active
      }
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

      <div class="toggle">
      ${!this.searchActive ? html`

        <button
        class="${this.active === 0 ? 'active' : ''}"
        @click=${() => this.emitChange(0)}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      </button>
             <button
        class="${this.active === 1 ? 'active' : ''}"
        @click=${() => this.emitChange(1)}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tags" class="svg-inline--fa fa-tags fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"></path></svg>
      </button>

      ` : html`
      <input
      id="searchInput"
      class="searchInput"
      type="search"
      autofocus
      @blur=${() => this.searchActive = false}
      @search=${(e: KeyboardEvent) => this.emitInput(e)}
      @keydown=${(e: KeyboardEvent) => this.emitInput(e)}
      @keyup=${(e: KeyboardEvent) => this.emitInput(e)}
      placeholder="Search...">
      `}

</div>

<div class="searchBtn" @click=${() => this.searchActive ? this.searchActive = false : this.searchActive = true}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  </div>
</div>
`;
  }

}
