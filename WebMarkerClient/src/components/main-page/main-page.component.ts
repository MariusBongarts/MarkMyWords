import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./main-page.component.scss');

@customElement('main-page')
export class MainPageComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  render() {
    return html`

`;
  }

}
