import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { Mark } from './mark.interface';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import {  Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import * as jwt_decode from 'jwt-decode';

@WebSocketGateway(3001, { origins: '*:*', transports: ['websocket', 'polling'] })
export class MarkGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    marks: Mark[] = [];
    private logger = new Logger('MarkGateway');

    async handleConnection(socket: Socket) {
        socket.on('join', (data: {id: string, email: string}) => {
            this.logger.log(`${data.email} succesfully joined socket room ${data.id}.`);
            socket.join(data.id);
        });
    }

    async handleDisconnect() {
    }

    @SubscribeMessage('createMark')
    async onCreateMark(client: Socket, mark: Mark) {
        this.emitToOneClient(client, 'createMark', mark);
    }

    @SubscribeMessage('deleteMark')
    async onDeleteMark(client, markId: string) {
        this.emitToOneClient(client, 'deleteMark', markId);
    }

    @SubscribeMessage('updateMark')
    async onUpdateMark(client, mark: Mark) {
        this.emitToOneClient(client, 'updateMark', mark);
    }

    emitToOneClient(client: Socket,  eventName: string, data: any) {
        const userId = this.getJwtPayloadForClient(client)._id;
        this.wss.in(userId).emit(eventName, data);
    }

    emitToClientByUserId(userId: string, eventName: string, data: any) {
        this.wss.in(userId).emit(eventName, data);
    }

    emitToAllClients(eventName: string, data: any) {
        this.wss.emit(eventName, data);
    }

    getJwtPayloadForClient(client: Socket) {
        try {
            const jwt = client.handshake.query['jwt'];
            // TODO: Validate jwt again
            const jwtPayload: JwtPayload = jwt_decode(jwt);
            return jwtPayload;
        } catch (error) {
            return undefined;
        }
    }

}