import { Mark } from './../models/mark';
import { HttpClient } from './http-client';


export class MarkerService {
  httpClient!: HttpClient;

  constructor() {
    //this.httpClient = new HttpClient({ baseURL: 'http://ec2-3-130-73-179.us-east-2.compute.amazonaws.com:3000' });
    // this.httpClient = new HttpClient({ baseURL: 'http://localhost:3000' });
    this.httpClient = new HttpClient({ baseURL: 'https://marius96.uber.space/server' });

    // Backup Gateway
    // this.httpClient = new HttpClient({ baseURL: ' http://10.42.30.122:8080/finance/' });
  }

  async getMarks(): Promise<Mark[]> {
    const response = await this.httpClient.get('/marks');
    console.log(response);
    const marks: Mark[] = (await response.json() as Mark[]);
    console.log(marks);
    return marks;
  }

  async createMark(mark: Mark): Promise<Mark | undefined> {
    try {
      const response = await this.httpClient.post('/marks', mark);
      const createdMark: Mark = (await response.json() as Mark);
      return createdMark;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMark(markId: string): Promise<void> {
    await this.httpClient.delete('/marks?id=' + markId);
  }
}
