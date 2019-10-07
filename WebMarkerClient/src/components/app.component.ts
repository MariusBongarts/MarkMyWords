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

  static styles = css`${unsafeCSS(componentCSS)}`;


  @property()
  loggedUser!: JwtPayload;

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

  render() {
    return html`
    ${!this.loaded ? html`
    <span>Loading...</span>
    ` :
        html`
        ${this.loggedUser && this.loggedUser.email ? html`
        <bronco-template>

            <div slot="header"></div>

            <div slot="nav">
              <mark-overview .loggedUser=${this.loggedUser} .show=${true}></mark-overview>
            </div>

            <div slot="main">
              <main-page></main-page>
            </div>

        </bronco-template>
        ` : html`
        <landing-page @login=${async () => this.loggedUser = await this.jwtService.getJwtPayload()}></landing-page>`}
        `}
    `}

}
