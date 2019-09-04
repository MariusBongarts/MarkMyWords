import { Mark } from './../models/mark';
import { HttpClient } from './http-client';


export class MarkerService {
  httpClient!: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({ baseURL: 'http://localhost:3000' });

    // Backup Gateway
    // this.httpClient = new HttpClient({ baseURL: ' http://10.42.30.122:8080/finance/' });
  }

  async getMarks(): Promise<Mark[]> {
    try {
      const response = await this.httpClient.get('/marks');
      const marks: Mark[] = (await response.json() as Mark[]);
      return marks;
    } catch (error) {
      return [];
    }
  }

  async createMark(mark: Mark): Promise<Mark | undefined> {
    try {
      const response = await this.httpClient.post('/marks', mark);
      const createdMark: Mark = (await response.json() as Mark);
      return createdMark;
    } catch (error) {
      return undefined;
    }
  }
}
