import { JwtService } from './jwt.service';
import openSocket from 'socket.io-client';
import { Mark } from './../models/mark';
import { HttpClient } from './http-client';
import { environment } from '../environments/environment.dev';


export class MarkerService {
  httpClient!: HttpClient;
  socket;
  jwtService = new JwtService();

  constructor() {
    this.httpClient = new HttpClient({ baseURL: environment.BACKEND_URL });
  }

  async initSocket() {
    const jwt = await this.jwtService.getJwt();

    if (environment.production) {
      this.socket = openSocket(environment.SOCKET_URL, { query: { jwt: jwt } });
    } else {
      this.socket = openSocket(environment.SOCKET_URL, { query: { jwt: jwt }, transports: ['websocket'] });
    }
  }


  async getMarks(): Promise<Mark[]> {
    const response = await this.httpClient.get('/marks');
    const marks: Mark[] = (await response.json() as Mark[]);
    return marks;
  }

  async getMarksForUrl(url: string): Promise<Mark[]> {
    const response = await this.httpClient.get('/marks/url?url=' + url);
    const marks: Mark[] = (await response.json() as Mark[]);
    return marks;
  }

  async createMark(mark: Partial<Mark>): Promise<Mark | undefined> {
    !this.socket ? await this.initSocket() : '';
    this.socket.emit('createMark', mark);

    const response = await this.httpClient.post('/marks', mark);
    const createdMark: Mark = (await response.json() as Mark);
    console.log(`Created mark with id ${createdMark.id}`);
    return createdMark;
  }

  async deleteMark(markId: string): Promise<void> {
    !this.socket ? await this.initSocket() : '';
    this.socket.emit('deleteMark', markId);
    await this.httpClient.delete('/marks/' + markId);
  }

  async updateMark(mark: Mark): Promise<void> {
    !this.socket ? await this.initSocket() : '';
    this.socket.emit('updateMark', mark);
    await this.httpClient.put('/marks', mark);
  }

  async getMarkById(id: string): Promise<Mark> {
    const response = await this.httpClient.get('/marks/' + id);
    console.log(response);
    const mark = (await response.json() as Mark);
    return mark;
  }
}
