import { Mark } from './../models/mark';
import { HttpClient } from './http-client';


export class MarkerService {
  httpClient!: HttpClient;

  constructor() {
    //this.httpClient = new HttpClient({ baseURL: 'http://ec2-3-130-73-179.us-east-2.compute.amazonaws.com:3000' });
    this.httpClient = new HttpClient({ baseURL: 'http://localhost:3000' });
    //this.httpClient = new HttpClient({ baseURL: 'https://marius96.uber.space' });

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

  async createMark(mark: Partial<Mark>): Promise<Mark | undefined> {
    console.log(mark)
    const response = await this.httpClient.post('/marks', mark);
    const createdMark: Mark = (await response.json() as Mark);
    console.log(`Created mark with id ${createdMark._id}`);
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
