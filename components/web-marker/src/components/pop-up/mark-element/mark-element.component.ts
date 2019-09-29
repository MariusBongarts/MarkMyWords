import { JwtPayload } from './../../../models/jwtPayload';
import { Mark } from './../../../models/mark';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { timeSinceTimestamp } from '../../../helper/dateHelper';
import { MarkerService } from '../../../services/marker.service';

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
  markService = new MarkerService();

  @property()
  mark: Mark;

  @property()
  isActive = false;

  @property()
  loggedUser: JwtPayload;

  async firstUpdated() {
  }

  deleteMark() {
    this.dispatchEvent(new CustomEvent('delete'));
  }

  render() {
    return html`
    <div class="mark" @click=${() => window.scrollTo(0, this.mark.scrollY ? this.mark.scrollY :  0)}>
      <div class="header">
        <span>${this.loggedUser.email}</span>
        <span class="timeSince">${timeSinceTimestamp(this.mark.createdAt)} ago</span>
        <span class="deleteBtn" @click=${() => this.deleteMark()}>X</span>
      </div>
      <div class="main">
        <blockquote>${this.mark.text}</blockquote>
      </div>
    <div class="footer">
      ${this.mark.tags.map(tag => html`
      <bronco-chip
      .hideDeleteIcon=${true}
      >${tag}</bronco-chip>`)}
    </div>
    </div>
      `;
  }

}
