import { HttpClient } from './http-client';

export class JwtService {
  httpClient!: HttpClient;

  constructor() {}

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

  
  setJwt(jwt: string) {
    try {
      localStorage.jwt_webmarker = jwt;
      chrome.storage.sync.set({ jwt_key: jwt });
    } catch (error) {
      console.log(error);
    }
  }
}
