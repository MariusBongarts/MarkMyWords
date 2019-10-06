import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { SwipeDetector } from '../../helper/swipeDetector';
import { Swipe } from '../../types/swipe';

const componentCSS = require('./app.component.scss');

@customElement('bronco-template')
export class BroncoTemplate extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  swipeDetector = new SwipeDetector();

  /**
   *
   * Set this to true to hide the nav bar on default
   * @memberof BroncoTemplate
   */
  @property()
  hideNav = false;


  /**
   * Set this to true to hide the left navigation completely
   * @memberof BroncoTemplate
   */
  @property()
  hideNavForever = false;

  /**
   * Boolean if mobile device
   * @type {boolean}
   * @memberof BroncoTemplate
   */
  @property()
  mobile = false;

  firstUpdated() {
    if (window.innerWidth < 928) this.mobile = true;
    this.hideNav = this.mobile;
    window.addEventListener('resize', () => {
      if (window.innerWidth < 928) {
        this.mobile = true;
        this.hideNav = true;
      }
      if (window.innerWidth >= 928) {
        this.mobile = false;
        this.hideNav = false;
      }
    });

    this.swipeDetector.subscribe((swipe: Swipe) => {
      this.hideNav = true;
      console.log(this.hideNav);
      if (swipe === 'swipeRight') this.hideNav = false;
      if (swipe === 'swipeLeft') this.hideNav = true;
    });
  }

  render() {
    return html`
    <div class="grid-container ${this.hideNav ? 'hideNav' : 'open'} ${this.hideNavForever ? 'hideForever' : ''}">
      <header>
        <slot name="header"></slot>
      </header>
      <nav>
        <slot name="nav"></slot>
      </nav>
      <main>
        <slot name="main"></slot>
      </main>
    </div>
    <div id="drag" class="${this.hideNav ? 'hideNav' : ''}" @click=${()=> this.hideNav ? this.hideNav = false :
          this.hideNav = true}>
      ${this.hideNavForever ? '' : html`
      ${this.hideNav ? html`
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
      ` : html`
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
      `}
      `}


    </div>
`;
  }
}