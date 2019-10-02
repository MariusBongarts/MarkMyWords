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


  /**
   * 1 = Only marks for current page
   * 2 = Accordion view of marks for all pages
   *
   * @memberof MarkOverviewComponent
   */
  @property()
  activeToggle = 1;

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
    if (environment.production) {
      this.socket = openSocket(environment.SOCKET_URL, { query: { jwt: jwt } });
    } else {
      this.socket = openSocket(environment.SOCKET_URL, { query: { jwt: jwt }, transports: ['websocket', 'xhr-polling'] });
    }
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
    <button class="hideShow" @click=${() => this.show ? this.show = false : this.show = true}>${this.show ?
        html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>`
        : html`<mark-badge>${this.marks ? this.marks.length : 0}</mark-badge>`}</button>
    ${this.show ? html`
    <div class="container">
    <div class="header">
    <header-toggle
    .active=${this.activeToggle}
    @toggleChanged=${(e: CustomEvent) => this.activeToggle = e.detail}></header-toggle>
    </div>
      <div class="main">

      ${this.activeToggle === 1 ? html`
      <!-- Only marks for current page -->
      ${this.marks ? this.marks.map(mark => html`
        <mark-element
      .loggedUser=${this.loggedUser}
      .mark=${mark}
      ></mark-element>`) : html`<p>Loading</p>`}
      ` :
      html`
      <!-- Accordion view of marks for all pages -->
      <accordion-view></accordion-view>

      `}

    </div>
</div>
` : ''}
  `
  }
}