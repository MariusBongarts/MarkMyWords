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

const componentCSS = require('./mark-overview.component.scss');

/**
 *
 * This component is the sign-in component.
 *
 * It allows the user to login.
 *
 * @export
 * @class MarkOverviewComponent
 * @extends {LitElement}
 */

@customElement('mark-overview')
class MarkOverviewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  socket: SocketIOClient.Socket;

  userService = new UserService();
  markService = new MarkerService();
  jwtService = new JwtService();


  @property()
  loggedUser!: JwtPayload;

  @property()
  marks!: Mark[];

  @property()
  show = environment.production ? false : true;

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
    this.socket = openSocket(environment.SOCKET_URL, { query: { jwt: jwt }, transports: ['websocket', 'xhr-polling'] });
    this.socket.emit('join', { id: jwtPayload._id, email: jwtPayload.email });

  }

  handleSockets() {
    this.socket.on('createMark', (createdMark: Mark) => {
      if (location.href === createdMark.url) {
        this.marks = [...this.marks, createdMark];
      } else {
        // TODO: Maybe a popup to show that on different page has been added a mark?
      }
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

  render() {
    return html`
    <button class="hideShow" @click=${() => this.show ? this.show = false : this.show = true}>${this.show ? '<' : ''}</button>
    ${this.show ? html`
    <div class="container">
      <div class="main">
        ${this.marks ? this.marks.map(mark => html`
        <mark-element
      .loggedUser=${this.loggedUser}
      .mark=${mark}
      ></mark-element>`) : html`<p>Loading</p>`}
    </div>
</div>
` : ''}
  `
  }
}