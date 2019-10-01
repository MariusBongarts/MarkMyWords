import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./accordion-view.component.scss');

@customElement('accordion-view')
export class TreeViewComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  activeDirectory = '';

  firstUpdated() {

  }


  render() {
    return html`
    <div class="tabs">
      <div class="tab">
        <input type="checkbox" id="chck1">
        <label class="tab-label" for="chck1">Item 1</label>
        <div class="tab-content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
        </div>
      </div>
      <div class="tab">
        <input type="checkbox" id="chck2">
        <label class="tab-label" for="chck2">Item 2</label>
        <div class="tab-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
        </div>
      </div>
    </div>
`;
  }

}
