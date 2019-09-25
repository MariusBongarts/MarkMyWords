import { Mark } from './mark.interface';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001)
export class MarkGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;
    marks: Mark[] = [];
    private logger = new Logger('MarkGateway');

    async handleConnection() {
        this.logger.log('New client connected');
        return true;
    }

    async handleDisconnect(){
        this.logger.log('Client disconnected');
        return true;
    }

    // @SubscribeMessage('newMark')
    // handleEvent(client: Client, data: Mark): Mark {
    //   console.log(data);
    //   return data;
    // }

}