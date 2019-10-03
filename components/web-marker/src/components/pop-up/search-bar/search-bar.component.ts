import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./search-bar.component.scss');

@customElement('search-bar')
export class SearchBarComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  active = false;

  render() {
    return html`
`;
  }

}
