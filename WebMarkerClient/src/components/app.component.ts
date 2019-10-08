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
  selectedTag = '';

  @property()
  selectedUrl = '';

  @property()
  searchValue = '';

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

  inputChanged(value: string) {
    this.selectedTag = '';
    this.selectedUrl = '';
    this.searchValue = value;
  }

    selectedTagChanged(tag: string) {
      this.selectedUrl = '';
      this.selectedTag = tag;
      this.searchValue = '';
    }

    selectedUrlChanged(url: string) {
      this.selectedTag = '';
      this.selectedUrl = url;
      this.searchValue = '';
    }


  render() {
    return html`
    ${!this.loaded ? html`
    <span>Loading...</span>
    ` :
        html`
        ${this.loggedUser && this.loggedUser.email ? html`
        <bronco-template
        @selectedTag=${(e: CustomEvent) => this.selectedTagChanged(e.detail)}
        @selectedUrl=${(e: CustomEvent) => this.selectedUrlChanged(e.detail)}
        @inputChange=${(e: CustomEvent) => this.inputChanged(e.detail)}
        .loggedUser=${this.loggedUser} @logout=${async () => await this.logout()}>

            <div slot="main">
              <main-page
              .selectedTag=${this.selectedTag}
              .selectedUrl=${this.selectedUrl}
              .searchValue=${this.searchValue}></main-page>
            </div>

        </bronco-template>
        ` : html`
        <landing-page @login=${async () => this.loggedUser = await this.jwtService.getJwtPayload()}></landing-page>`}
        `}
    `}

}
