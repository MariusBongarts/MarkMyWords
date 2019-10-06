import { JwtPayload } from './../../models/jwtPayload';
import { Mark } from './../../models/mark';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { timeSinceTimestamp } from '../../helper/dateHelper';
import { MarkerService } from '../../services/marker.service';

const componentCSS = require('./mark-element.component.scss');

/**
 *
 * This component shows one single mark
 *
 * It allows the user to login.
 *
 * @export
 * @class MarkElementComponent
 * @extends {LitElement}
 */

@customElement('mark-element')
class MarkElementComponent extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;
  markService = new MarkerService();

  @property()
  mark!: Mark;

  @property()
  isActive = false;

  @property()
  headerInfo!: string;

  async firstUpdated() {

  }

  async deleteMark(e: MouseEvent) {
    e.stopPropagation();
    await this.markService.deleteMark(this.mark.id);
  }

  async deleteTag(e: MouseEvent, deletedTag: any) {
    e.stopPropagation();
    this.mark.tags = this.mark.tags.filter(tag => tag !== deletedTag);
    await this.markService.updateMark(this.mark);
  }

  render() {
    return html`
    <div class="mark">
    <div class="header" >
      <span>${ this.headerInfo} </span>
        <span class="timeSince" > ${ timeSinceTimestamp(this.mark.createdAt)} ago </span>
          <span class="deleteBtn" @click=${async (e: MouseEvent) => await this.deleteMark(e)}> X </span>
            </div>
            <div class="main">
              <blockquote>${ this.mark.text} </blockquote>
                </div>
                <div class="footer" >
                  ${
      this.mark.tags.map(tag => html`
      <bronco-chip
      @deleted=${async (e: MouseEvent) => await this.deleteTag(e, tag)}
      >${tag}</bronco-chip>`)
      }
        </div>
      </div>
    `;
  }

}
