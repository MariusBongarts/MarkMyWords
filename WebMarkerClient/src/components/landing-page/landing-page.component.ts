import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
const componentCSS = require('./landing-page.component.scss');

@customElement('landing-page')
export class LandingPageComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  activeElement = 'start';

  @property()
  particlesMin: any;

  firstUpdated() {
    this.startParticlesAnimation();
  }

  startParticlesAnimation() {
    this.particlesMin = require('./particles.min.js');
    const particles = document.createElement('div');
    particles.id = 'particles-js';
    document.body.appendChild(particles);
    const startParticles = require('./../../helper/particles.js');
  }

  disconnectedCallback() {
    try {
      this.particlesMin = undefined;
      document.getElementById('particles-js')!.remove();
    } catch (error) {
      //
    }
  }

  emitLogin(jwtToken: string) {
    this.dispatchEvent(new CustomEvent('login', {
      detail: jwtToken,
      bubbles: true
    })
    );
  }

  render() {
    return html`
    <div class="container">
      ${this.activeElement === 'start' ? html`
      <div class="landingContainer">
      <div class="infoContainer">
    <div class="mainInfo">
    <span>Structure your Web</span>
    </div>
    <div class="subInfo">
      <span>Highlight the web and save text wherever you want.</span>
    </div>
    </div>
      <hr class="divider">
      <button
      @click=${() => this.activeElement = 'login'}
      class="loginBtn"
      >Get started</button>
      </div>
` : ''}

      ${this.activeElement === 'login' ? html`
      <lobby-container
      @login=${(e: CustomEvent) => this.emitLogin(e.detail)}>
    </lobby-container>
      ` : ''}
    </div>
`;
  }

}
