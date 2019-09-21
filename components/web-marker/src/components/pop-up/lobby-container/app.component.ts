import { LoginUserDto } from './../../../../../../NestJsServer/src/users/dto/login-user.dto';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { UserService } from '../../../services/user.service';

const componentCSS = require('./app.component.scss');

/**
 *
 * This component is the sign-in component.
 *
 * It allows the user to login.
 *
 * @export
 * @class LobbyContainer
 * @extends {LitElement}
 */

@customElement('lobby-container')
class LobbyContainer extends LitElement {
	static styles = css`${unsafeCSS(componentCSS)}`;
	userService = new UserService();

	@property()
	formSuccess = false;

	@query('form')
	form!: HTMLFormElement;

	@query('#email')
	emailElement!: HTMLInputElement;

	@query('#password')
	passwordElement!: HTMLInputElement;


	firstUpdated() {
		this.emailElement.addEventListener('keyup', async (e: KeyboardEvent) => {
			if (e.keyCode === 13) {
				await this.submit();
			}
		});
		this.passwordElement.addEventListener('keyup', async (e: KeyboardEvent) => {
			if (e.keyCode === 13) {
				await this.submit();
			}
		});
	}

	async submit(e?: MouseEvent) {
		e.preventDefault();
		let jwtToken = '';
		if (this.isFormValid()) {
			const signInData: LoginUserDto = {
				email: this.emailElement.value,
				password: this.passwordElement.value
			};
			console.log(signInData);
			try {
				jwtToken = await this.userService.login(signInData);
				this.formSuccess = true;
				console.log(jwtToken);
			} catch (error) {
				console.log(error);
			}
		} else {
			this.form.classList.add('was-validated');
		}
		if (jwtToken) {
			setTimeout(() => this.emitLogin(jwtToken), 1000);
		}
	}

	emitLogin(jwtToken: string) {
		this.dispatchEvent(
			new CustomEvent('login', {
				detail: jwtToken,
				bubbles: true
			})
		);
	}

	isFormValid() {
		return this.form.checkValidity();
	}

	render() {
		return html`
<div class="bubblesContainer">
	<div class="container ${this.formSuccess ? 'form-success' : ''}">
		<h1>Welcome</h1>
		${!this.formSuccess ? html`
		<form class="form">
			<input type="email" required id="email" name="email" placeholder="Email">
			<input type="password" required id="password" name="password" placeholder="Password">
			<button type="submit" id="login-button" @click=${(e: MouseEvent) => this.submit(e)}>Login</button>
		</form>
		` : ''}
	</div>

	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>
  `
	}
}