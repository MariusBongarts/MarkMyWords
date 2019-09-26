import { Mark } from './../../../models/mark';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';

const componentCSS = require('./mark-element.component.scss');

/**
 *
 * This component shows one single mark
 *
 * It allows the user to login.
 *
 * @export
 * @class MarkElementComponent
 * @extends {LitElement}
 */

@customElement('mark-element')
class MarkElementComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  mark: Mark;

  @property()
  isActive = false;

  firstUpdated() {
  }

  render() {
    return html`
    <div class="mark">
      <blockquote>${this.mark.text}</blockquote>
      ${this.mark.tags.map(tag => html`
      <bronco-chip
      .hideDeleteIcon=${true}
      >${tag}</bronco-chip>`)}
      ${this.isActive ? html`
      ` : ''}
    </div>
      `;
  }

}
