import { JwtService } from './jwt.service';
import { LoginUserDto } from './../models/loginUserDto';
import { HttpClient } from './http-client';


export class UserService {
  httpClient!: HttpClient;
  jwtService = new JwtService();

  constructor() {
    this.httpClient = new HttpClient({ baseURL: 'http://localhost:3000' });
    //this.httpClient = new HttpClient({ baseURL: 'https://marius96.uber.space' });

    // Backup Gateway
    // this.httpClient = new HttpClient({ baseURL: ' http://10.42.30.122:8080/finance/' });
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
