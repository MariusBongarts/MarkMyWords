"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const jwt_decode = require("jwt-decode");
let MarkGateway = class MarkGateway {
    constructor() {
        this.marks = [];
        this.logger = new common_1.Logger('MarkGateway');
    }
    handleConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('New client connected');
            socket.on('join', (data) => {
                this.logger.log(`${data.email} succesfully joined socket room ${data.id}.`);
                socket.join(data.id);
            });
        });
    }
    handleDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Client disconnected');
        });
    }
    onCreateMark(client, mark) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitToOneClient(client, 'createMark', mark);
        });
    }
    onDeleteMark(client, markId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitToOneClient(client, 'deleteMark', markId);
        });
    }
    onUpdateMark(client, mark) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitToOneClient(client, 'updateMark', mark);
        });
    }
    emitToOneClient(client, eventName, data) {
        const userId = this.getJwtPayloadForClient(client)._id;
        this.wss.in(userId).emit(eventName, data);
    }
    emitToAllClients(eventName, data) {
        this.wss.emit(eventName, data);
    }
    getJwtPayloadForClient(client) {
        try {
            const jwt = client.handshake.query['jwt'];
            const jwtPayload = jwt_decode(jwt);
            return jwtPayload;
        }
        catch (error) {
            return undefined;
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], MarkGateway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage('createMark'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarkGateway.prototype, "onCreateMark", null);
__decorate([
    websockets_1.SubscribeMessage('deleteMark'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarkGateway.prototype, "onDeleteMark", null);
__decorate([
    websockets_1.SubscribeMessage('updateMark'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarkGateway.prototype, "onUpdateMark", null);
MarkGateway = __decorate([
    websockets_1.WebSocketGateway(3001, { origins: '*:*', transports: ['websocket', 'xhr-polling'] })
], MarkGateway);
exports.MarkGateway = MarkGateway;
//# sourceMappingURL=mark.gateway.js.map