import { JwtPayload } from './../../../models/jwtPayload';
import { LoginUserDto } from './../../../../../../NestJsServer/src/users/dto/login-user.dto';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { UserService } from '../../../services/user.service';

const componentCSS = require('./account-overview.component.scss');

@customElement('account-overview')
class LobbyContainer extends LitElement {
	static styles = css`${unsafeCSS(componentCSS)}`;
	userService = new UserService();

	@property()
	loggedUser: JwtPayload;

	emitLogout() {
		this.dispatchEvent(
			new CustomEvent('logout', {
				bubbles: true
			})
		);
	}

	render() {
		return html`
			<div class="container">
				<h1>Welcome</h1>
				<p>${this.loggedUser.email}</p>
				<br>
			<button @click=${() => this.emitLogout()}>Logout</button>
			</div>

		`
	}

}
