import { Mark } from './mark.interface';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001, {origins: '*:*'})
export class MarkGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;
    marks: Mark[] = [];
    private logger = new Logger('MarkGateway');

    async handleConnection(client) {
        this.logger.log('New client connected');
    }

    async handleDisconnect(){
        this.logger.log('Client disconnected');
    }

    createMark(mark: Mark) {
        this.wss.emit('createMark', mark);
    }

    deleteMark(markId: string) {
        this.wss.emit('deleteMark', markId);
    }

    updateMark(mark: Mark) {
        this.wss.emit('updateMark', mark);
    }

}