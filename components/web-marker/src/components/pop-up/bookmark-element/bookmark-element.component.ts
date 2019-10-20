import { State } from './../../../store/reducer';
import { connect } from 'pwa-helpers';
import { store } from './../../../store/store';
import { JwtPayload } from './../../../models/jwtPayload';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { timeSinceTimestamp } from '../../../helper/dateHelper';

const componentCSS = require('./bookmark-element.component.scss');

@customElement('bookmark-element')
class BookmarkElementComponent extends connect(store)(LitElement) {
  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  tags = ['Test'];


  tagsChanged(e: CustomEvent) {
    if (this.tags.length != e.detail.chips.length) {
      this.tags = e.detail.chips;
      console.log(e.detail)
      this.dispatchEvent(
        new CustomEvent('tagsChanged', {
          bubbles: true,
          detail: e.detail
        })
      );
    }
  }

  render() {
    return html`
    <div class="mark">
      <div class="header" >
        <span>${document.title} </span>
      </div>
      <div class="main">
      </div>
      <div class="footer">
        <bronco-chip-list
        @tagsChanged=${(e: CustomEvent) => this.tagsChanged(e)}
        .hideOnOutsideClick=${false}
        .chips=${this.tags}></bronco-chip-list>
      </div>
    </div>
    `;
  }

}
