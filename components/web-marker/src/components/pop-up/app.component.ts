import { environment } from './../../environments/environment.dev';
import { JwtPayload } from './../../models/jwtPayload';
import { LoginUserDto } from './../../models/loginUserDto';
import { UserService } from './../../services/user.service';
import { MarkerService } from './../../services/marker.service';
import { Mark } from './../../../../../WebMarkerClient/src/models/mark';
import { JwtService } from './../../services/jwt.service';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import './sign-in/sign-in.component.ts';
import './mark-overview/mark-overview.component.ts';

const componentCSS = require('./app.component.scss');

@customElement('pop-up')
export class PopUpComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  jwtService = new JwtService();
  markService = new MarkerService();
  userService = new UserService();

  @property()
  loaded = false;

  @property()
  showAccountPopup = environment.production ? false : true;

  @property()
  marks!: Mark[];

  @property()
  loggedUser: JwtPayload;

  async firstUpdated() {
    await this.loadUserData();
    this.loaded = true;
  }

  async loadUserData() {
    try {
      this.loggedUser = await this.jwtService.getJwtPayload();
    } catch (error) {
      this.logout();
    }
  }

  logout() {
    this.loggedUser = undefined;
    this.userService.logout();
  }


  render() {
    return html`
    ${this.loaded ? html`
    ${this.loggedUser && this.loggedUser.email ?
          html`
      ${this.showAccountPopup ? html`
      <account-overview @logout=${() => this.logout()} .loggedUser=${this.loggedUser}></account-overview>
      ` : ''}
      <mark-overview .loggedUser=${this.loggedUser}></mark-overview>` :
        // html`<sign-in @login=${async () => await this.loadUserData()}></sign-in>`}
        html`<lobby-container @login=${async () => await this.loadUserData()}></lobby-container>`}
      ` : html`<p>Loading...</p>`}
  `;
  }
}
