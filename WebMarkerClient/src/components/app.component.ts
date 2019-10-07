import { UserService } from './../services/user.service';
import { JwtService } from './../services/jwt.service';
import { JwtPayload } from './../models/jwtPayload';
import { Mark } from './../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { MarkerService } from '../services/marker.service';
import { timeSinceTimestamp } from '../helper/dateHelper';
import { startParticlesAnimation } from '../helper/particlesHelper';

const componentCSS = require('./app.component.scss');

/**
 * @author Marius Bongarts
 * Root web component
 */
@customElement('app-root')
export class AppRoot extends LitElement {
  jwtService = new JwtService();
  userService = new UserService();

  static styles = css`${unsafeCSS(componentCSS)}`;


  @property()
  loggedUser: JwtPayload | undefined;

  @property()
  title: string = 'MarkMyWords';

  @property()
  loaded = false;

  async firstUpdated() {
    this.loggedUser = await this.jwtService.getJwtPayload();
    this.loaded = true;
  }


  async updateMark(mark: Mark, tags: string[]) {
    mark.tags = tags;
  }

  async logout() {
    this.loggedUser = undefined;
    await this.userService.logout();
  }

  render() {
    return html`
    ${!this.loaded ? html`
    <span>Loading...</span>
    ` :
        html`
        ${this.loggedUser && this.loggedUser.email ? html`
        <bronco-template .loggedUser=${this.loggedUser} @logout=${async () => await this.logout()}>

            <div slot="main">
              <main-page></main-page>
            </div>

        </bronco-template>
        ` : html`
        <landing-page @login=${async () => this.loggedUser = await this.jwtService.getJwtPayload()}></landing-page>`}
        `}
    `}

}
