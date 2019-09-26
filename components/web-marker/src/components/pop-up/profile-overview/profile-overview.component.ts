import { MarkerService } from './../../../services/marker.service';
import { Mark } from './../../../models/mark';
import { LoginUserDto } from './../../../models/loginUserDto';
import { UserService } from './../../../services/user.service';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { JwtPayload } from '../../../models/jwtPayload';
import './../mark-element/mark-element.component';
import openSocket from 'socket.io-client';
import { environment } from '../../../environments/environment.dev';
import { JwtService } from '../../../services/jwt.service';
import { Socket } from 'socket.io-client';

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
  socket: SocketIOClient.Socket;

  userService = new UserService();
  markService = new MarkerService();
  jwtService = new JwtService();


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

    await this.initSocket();

    this.handleSockets();
  }

  async initSocket() {
    const jwt = await this.jwtService.getJwt();
    const jwtPayload = await this.jwtService.getJwtPayload();
    this.socket = openSocket(environment.SOCKET_URL, { query: { jwt: jwt } });
    this.socket.emit('join', { id: jwtPayload._id, email: jwtPayload.email });

  }

  handleSockets() {
    this.socket.on('createMark', (createdMark: Mark) => {
      this.marks = [...this.marks, createdMark];
    });

    this.socket.on('deleteMark', (deletedMarkId: string) => {
      this.marks = this.marks.filter(mark => mark.id !== deletedMarkId);
    });

    this.socket.on('updateMark', (updatedMark: Mark) => {
      this.marks = this.marks.map(mark => mark.id === updatedMark.id ? updatedMark : mark);
    });

    this.socket.on('connect', (data: string) => {
      console.log('yeah');
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