import { Mark } from './../../models/mark';
import { MarkerService } from './../../services/marker.service';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { timeSinceTimestamp } from '../../helper/dateHelper';

const componentCSS = require('./header-bar.component.scss');

@customElement('header-bar')
export class MainPageComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  emitLogout() {
    this.dispatchEvent(
      new CustomEvent(
        'logout',
      )
    )
  }

  render() {
    return html`
    <div class="container">
      <div>

    </div>
      <button @click=${() => this.emitLogout()} class="logoutBtn">Logout</button>
    </div>
`;
  }

}
