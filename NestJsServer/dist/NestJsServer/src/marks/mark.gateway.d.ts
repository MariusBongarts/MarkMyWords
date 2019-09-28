import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { Mark } from './mark.interface';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class MarkGateway implements OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    marks: Mark[];
    private logger;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(): Promise<void>;
    onCreateMark(client: Socket, mark: Mark): Promise<void>;
    onDeleteMark(client: any, markId: string): Promise<void>;
    onUpdateMark(client: any, mark: Mark): Promise<void>;
    emitToOneClient(client: Socket, eventName: string, data: any): void;
    emitToAllClients(eventName: string, data: any): void;
    getJwtPayloadForClient(client: Socket): JwtPayload;
}
