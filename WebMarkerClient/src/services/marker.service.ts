import { Mark } from './../models/mark';
import { HttpClient } from './http-client';
import { environment } from '../environments/environment.dev';


export class MarkerService {
  httpClient!: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({ baseURL: environment.BACKEND_URL });
  }

  async getMarks(): Promise<Mark[]> {
    try {
    const response = await this.httpClient.get('/marks');
    console.log(response);
    const marks: Mark[] = (await response.json() as Mark[]);
    console.log(marks);
    return marks;
    } catch (error) {
      return [];
    }
  }

  async createMark(mark: Partial<Mark>): Promise<Mark | undefined> {
    console.log(mark)
    const response = await this.httpClient.post('/marks', mark);
    const createdMark: Mark = (await response.json() as Mark);
    console.log(`Created mark with id ${createdMark.id}`);
    return createdMark;
  }

  async deleteMark(markId: string): Promise<void> {
    await this.httpClient.delete('/marks/' + markId);
  }

  async updateMark(mark: Mark): Promise<void> {
    await this.httpClient.put('/marks', mark);
  }

  async getMarkById(id: string): Promise<Mark> {
    const response = await this.httpClient.get('/marks/' + id);
    console.log(response);
    const mark = (await response.json() as Mark);
    return mark;
  }
}
