import { JwtService } from './jwt.service';
import { LoginUserDto } from './../models/loginUserDto';
import { HttpClient } from './http-client';
import { environment } from '../environments/environment.dev';


export class UserService {
  httpClient!: HttpClient;
  jwtService = new JwtService();

  constructor() {
    this.httpClient = new HttpClient({ baseURL: environment.BACKEND_URL });
  }

  /**
   * Signs the user in and saves the jwtToken in the jwtService.
   *
   * @returns {Promise<string>}
   * @memberof UserService
   */
  async login(loginUserDto: LoginUserDto): Promise<string> {
    const token = await this.httpClient.post('/auth', loginUserDto);
    const jwtToken = await token.json();
    this.jwtService.setJwt(jwtToken.token);
    return jwtToken.token;
  }

  async logout() {
    this.jwtService.setJwt('');
  }

}
