import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { LoginUserDto } from './../../../WebMarkerClient/src/models/loginUserDto';
import { AuthService } from './../auth/auth.service';
import { User } from './../users/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Mark } from './mark.interface';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { Logger, UseGuards, Body } from '@nestjs/common';
import * as jwt_decode from 'jwt-decode';

@WebSocketGateway(3001, { origins: '*:*' })
export class MarkGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    marks: Mark[] = [];
    private logger = new Logger('MarkGateway');

    async handleConnection(socket: Socket) {
        this.logger.log('New client connected');
        socket.on('join', (data: {id: string, email: string}) => {
            this.logger.log(`${data.email} succesfully joined socket room ${data.id}.`);
            socket.join(data.id);
        });
    }

    async handleDisconnect() {
        this.logger.log('Client disconnected');
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