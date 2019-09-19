import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
const componentCSS = require('./app.component.scss');

@customElement('block-qoute')
export class BroncoChip extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property() mark!: Mark;

  render() {
    return html`
    <div>
    <blockquote>
            ${this.mark.completeText.split(this.mark.text)[0]}
            <mark>${this.mark.text}</mark>
            ${this.mark.completeText.split(this.mark.text)[1]}
          </blockquote>
    </div>

`;
  }

}
