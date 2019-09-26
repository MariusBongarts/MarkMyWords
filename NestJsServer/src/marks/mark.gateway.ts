import { LoginUserDto } from './../../../WebMarkerClient/src/models/loginUserDto';
import { AuthService } from './../auth/auth.service';
import { User } from './../users/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Mark } from './mark.interface';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { Logger, UseGuards, Body } from '@nestjs/common';
import * as jwt_decode from 'jwt-decode';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
export type UserClient = { client: any, userId: string };

@WebSocketGateway(3001, { origins: '*:*' })
export class MarkGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    marks: Mark[] = [];
    connectedClients = [] as UserClient[];
    private logger = new Logger('MarkGateway');

    async handleConnection(client) {
        this.logger.log('New client connected');
        const user = jwt_decode(client.handshake.query.jwt) as JwtPayload;
        console.log(user._id);
        this.connectedClients.push({ client: client, userId: user._id })
        client.emit('connect', 'Success');
    }

    async handleDisconnect() {
        this.logger.log('Client disconnected');
    }

    @SubscribeMessage('createMark')
    async onCreateMark(client: Client, mark: Mark) {
        this.wss.emit('createMark', mark);
        //client.server.emit('createMark', mark);
        // client.conn.emit('createMark', mark);
    }
    @SubscribeMessage('deleteMark')
    async onDeleteMark(client, mark: Mark) {
        this.wss.emit('deleteMark', mark);
    }

    @SubscribeMessage('updateMark')
    async onUpdateMark(client, mark: Mark) {
        this.wss.emit('updateMark', mark);
    }

}