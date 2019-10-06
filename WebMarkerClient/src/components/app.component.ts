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
  markService = new MarkerService();
  jwtService = new JwtService();

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property() marks!: Mark[];

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

  async loadMarks() {
    console.log("Load marks");
    this.marks = await this.markService.getMarks();
  }

  async updateMark(mark: Mark, tags: string[]) {
    mark.tags = tags;
    await this.markService.updateMark(mark);
  }

  render() {
    return html`
    ${!this.loaded ? html`
    <span>Loading...</span>
    ` :
        html`
        ${this.loggedUser && this.loggedUser.email ? html`
        <bronco-template>

            <div slot="header"> Header </div>

            <div slot="nav">
              <mark-overview .loggedUser=${this.loggedUser} .show=${true}></mark-overview>
            </div>

            <div slot="main"> Main </div>

        </bronco-template>
        ` : html`
        <landing-page @login=${async () => this.loggedUser = await this.jwtService.getJwtPayload()}></landing-page>`}
        `}
    `}

  async deleteMark(mark: Mark) {
    this.marks = this.marks.filter(e => e !== mark);
    await this.markService.deleteMark(mark.id);
  }

}
