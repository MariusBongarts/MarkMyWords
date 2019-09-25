import { MarkerService } from './../../../services/marker.service';
import { Mark } from './../../../models/mark';
import { LoginUserDto } from './../../../models/loginUserDto';
import { UserService } from './../../../services/user.service';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { JwtPayload } from '../../../models/jwtPayload';
import './../mark-element/mark-element.component';
import openSocket from 'socket.io-client';
import { environment } from '../../../environments/environment.dev';

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
  socket = openSocket(environment.SOCKET_URL);

  userService = new UserService();
  markService = new MarkerService();

  @property()
  loggedUser!: JwtPayload;

  @property()
  marks!: Mark[];

  async firstUpdated() {
    this.marks = [];
    try {
      this.marks = await this.markService.getMarksForUrl(location.href);
    } catch (error) {
      this.emitLogout();
    }
    this.socket.on('newMark', (data, error) => {
      console.log('++++++++++++++++++++ Data from Socket ++++++++++++++++');
      console.log(data);
      console.log(error);
      this.marks = [...this.marks, data];
    });

    this.socket.on('connect', () => {
      console.log('Listening on WebSocket for new marks...');
    });
  }

  disconnectedCallback() {
    this.socket.disconnect();
  }

  emitLogout() {
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true
      })
    );
  }

  checkEqual(id1: string, id2: string) {
    console.log(id1);
    console.log(id2);
    console.log(id2 === id1);
    return id2 === id1;

  }

  render() {
    return html`
    <div class="container">
    <div class="main">
      ${this.marks ? this.marks.map(mark => html`
      <mark-element
      .mark=${mark}
      ></mark-element>`) : html`<p>Loading</p>`}
    </div>

    <div class="footer">
    <p style="width: 100%; text-align: center; margin: 5px">${this.loggedUser.email}</p>
    <br>
    <button @click=${() => this.emitLogout()}>Logout</button>
    </div>
    </div>
  `
  }
}