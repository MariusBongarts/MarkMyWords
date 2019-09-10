import uuidv4 from 'uuid/v4';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
const componentCSS = require('./my-tags.component.scss');


@customElement('my-tags')
export class MyTagsElement extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  firstUpdated() {
  }

  /* tslint:disable: max-line-length */
  render() {
    return html`

 `
  }

}
