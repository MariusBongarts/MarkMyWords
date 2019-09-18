import { MarkerService } from './../../../services/marker.service';
import { Mark } from './../../../models/mark';
import { LoginUserDto } from './../../../models/loginUserDto';
import { UserService } from './../../../services/user.service';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { JwtPayload } from '../../../models/jwtPayload';


const componentCSS = require('./profile-overview.component.scss');

/**
 *
 * This component is the sign-in component.
 *
 * It allows the user to login.
 *
 * @export
 * @class ProfileOverviewComponent
 * @extends {LitElement}
 */

@customElement('profile-overview')
class ProfileOverviewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  userService = new UserService();
  markService = new MarkerService();

  @property()
  loggedUser!: JwtPayload;

  @property()
  marks!: Mark[];

  async firstUpdated() {
    this.marks = [];
    try {
      this.marks = await this.markService.getMarks();
    } catch (error) {
      this.emitLogout();
    }
  }

  emitLogout() {
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true
      })
    );
  }

  render() {
    return html`
    <div class="container">
    <p>${this.loggedUser.email}</p>
    ${this.marks ? html`
    <h5>Anzahl Markierungen: ${this.marks.length}<h5>
    ` : ''}
    <button @click=${() => this.emitLogout()}>Logout</button>
    </div>
  `
  }
}