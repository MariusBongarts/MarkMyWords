import { JwtPayload } from './../models/jwtPayload';
import { HttpClient } from './http-client';
import jwt_decode from 'jwt-decode';

export class JwtService {
  httpClient!: HttpClient;


  getJwt(): Promise<string> {
    return new Promise((res) => {
      try {
        chrome.storage.sync.get((items) => {
          res(items['jwt_key']);
        });
      } catch (error) {
        let jwt = localStorage.jwt_webmarker;
        jwt ? res(jwt) : res('');
      }
    });
  }

  /**
   * Tries to get the jwt-token either from the chrome storage or localstorage
   *
   * @returns {Promise<JwtPayload>}
   * @memberof JwtService
   */
  getJwtPayload(): Promise<JwtPayload> {
    return new Promise((res) => {
      try {
        chrome.storage.sync.get((items) => {
          console.log('1')
          let payload;
          try {
            payload = jwt_decode(items['jwt_key']);
          } catch (error) {
            res({} as JwtPayload);
          }
          console.log('2')
          res(payload as JwtPayload);
        });
      } catch (error) {
        try {
          const jwt = localStorage.jwt_webmarker;
          const payload = jwt_decode(jwt);
          payload ? res(payload as JwtPayload) : res({} as JwtPayload);
        } catch (error) {
          res({} as JwtPayload);

        }
      }
    });
  }

  setJwt(jwt: string) {
    try {
      localStorage.jwt_webmarker = jwt;
    } catch (error) {
      console.log(error);
    }
  }
}
