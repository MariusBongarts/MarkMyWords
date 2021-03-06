import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../models/mark';
import { LoginUserDto } from './../../models/loginUserDto';
import { UserService } from './../../services/user.service';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { JwtPayload } from '../../models/jwtPayload';
import './../mark-element/mark-element.component';
import openSocket from 'socket.io-client';
import { environment } from '../../environments/environment.dev';
import { JwtService } from '../../services/jwt.service';

const componentCSS = require('./mark-overview.component.scss');

@customElement('mark-overview')
class MarkOverviewComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  socket!: SocketIOClient.Socket;

  userService = new UserService();
  markService = new MarkerService();
  jwtService = new JwtService();

  @property()
  loggedUser!: JwtPayload;

  @property()
  searchValue!: string;

  /**
   * 1 = Only marks for current page
   * 2 = Accordion view of marks for all pages
   *
   * @memberof MarkOverviewComponent
   */
  @property()
  activeToggle = 1;

  /**
   * Only marks fur current url
   *
   * @type {Mark[]}
   * @memberof MarkOverviewComponent
   */
  @property()
  marks!: Mark[];

  @property()
  show = environment.production ? false : true;

  async firstUpdated() {
    this.marks = [];
    try {
      this.marks = await this.markService.getMarks();
    } catch (error) {
      this.emitLogout();
    }

    // await this.initSocket();
    // this.handleSockets();
  }

  async initSocket() {
    const jwt = await this.jwtService.getJwt();
    const jwtPayload = await this.jwtService.getJwtPayload();
    if (environment.production) {
      this.socket = openSocket(environment.SOCKET_URL, { query: { jwt } });
    } else {
      this.socket = openSocket(environment.SOCKET_URL, { query: { jwt }, transports: ['websocket', 'xhr-polling'] });
    }
    this.socket.emit('join', { id: jwtPayload._id, email: jwtPayload.email });
  }

  handleSockets() {
    this.socket.on('createMark', (createdMark: Mark) => {
      this.marks = [...this.marks, createdMark];
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

  emitTabChange(tabNr: number) {
    this.searchValue = '';
    this.activeToggle = tabNr;
  }

  render() {
    return html`
    ${this.show ? html`
    <div class="container">

    <div class="header">
      <header-toggle
      @inputChange=${(e: CustomEvent) => this.searchValue = e.detail}
      .active=${this.activeToggle}
      @toggleChanged=${(e: CustomEvent) => this.emitTabChange(e.detail)}></header-toggle>
      <search-bar></search-bar>

    </div>
      <div class="main">

      ${this.searchValue ? html`
      <search-view .marks=${this.marks} .searchValue=${this.searchValue}></search-view>
      ` :

          html`
      ${this.marks && this.marks.length ? html`

      ${this.activeToggle === 0 ? html`
      <!-- Accordion view of marks for all pages -->
      <accordion-view
            @selectedUrl=${(e: CustomEvent) => this.dispatchEvent(new CustomEvent('selectedUrl', { detail: e.detail }))}
      .marks=${this.marks}></accordion-view>
      ` : ''}

      ${this.activeToggle === 1 ? html`
      <!-- Accordion view of marks for all pages -->
      <tags-view
      @selectedTag=${(e: CustomEvent) => this.dispatchEvent(new CustomEvent('selectedTag', { detail: e.detail }))}
      .marks=${this.marks}></tags-view>
      ` : ''}

      ` : ''}
      `}
    </div>

    ${this.marks && this.marks.length === 0 && this.activeToggle === 2 && !this.searchValue ? html`
    <div class="infoContainer">
    <div class="mainInfo">
    <span>No marks made on this page</span>
    </div>
    <div class="subInfo">
      <span>Select text on this page to add new highlights.</span>
    </div>
    </div>
    ` : ''}

</div>
` : ''}
  `;
  }
}
