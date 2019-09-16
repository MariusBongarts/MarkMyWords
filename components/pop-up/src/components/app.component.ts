import { JwtService } from './../services/jwt.service';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

@customElement('pop-up')
export class WebMarker extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  jwtService = new JwtService();
  firstUpdated() {
    console.log(this.jwtService.getJwt());
  }


  render() {
    return html`
  <sign-in></sign-in>
  `;
  }

}
