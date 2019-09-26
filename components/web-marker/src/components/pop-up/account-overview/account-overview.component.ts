import { LoginUserDto } from './../../../../../../NestJsServer/src/users/dto/login-user.dto';
import { css, customElement, html, LitElement, query, property, unsafeCSS } from 'lit-element';
import { UserService } from '../../../services/user.service';

const componentCSS = require('./account-overview.component.scss');

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

@customElement('account-overview')
class LobbyContainer extends LitElement {
	static styles = css`${unsafeCSS(componentCSS)}`;
	userService = new UserService();

	@property()
	formSuccess = false;

	@property()
	loading = false;

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
		e ? e.preventDefault() : '';
		let jwtToken = '';
		if (this.isFormValid()) {
			const signInData: LoginUserDto = {
				email: this.emailElement.value,
				password: this.passwordElement.value
			};
			console.log(signInData);
			try {
				this.loading = true;
				jwtToken = await this.userService.login(signInData);
				console.log(jwtToken);
			} catch (error) {
				console.log(error);
			}
			jwtToken ? this.formSuccess = true : '';
			this.loading = false;
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
<bubbles-animation>

	<div class="container ${this.formSuccess ? 'form-success' : ''}">
		<h1>Welcome</h1>
	</div>

	</bubbles-animation>
  `
	}
}