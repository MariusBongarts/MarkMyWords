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
        res('');
      }
    });
  }

  setJwt(jwt: string) {
    return new Promise((res) => {
      try {
        chrome.storage.sync.set({ jwt_key: jwt });
        res();
      } catch (error) {
        console.log(error);
        res();
      }
    });

  }

}
