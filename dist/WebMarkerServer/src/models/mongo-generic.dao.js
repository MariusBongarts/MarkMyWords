var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import uuidv4 from 'uuid/v4';
export class MongoGenericDAO {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            entity.id = uuidv4();
            entity.createdAt = new Date().getTime();
            yield this.db.collection(this.collection).insertOne(entity);
            return entity;
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.collection)
                .find(filter)
                .sort({ createdAt: -1 })
                .toArray();
        });
    }
    findOne(entityFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.collection).findOne(entityFilter);
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.collection(this.collection).updateOne({ id: entity.id }, { $set: entity });
            return !!result.modifiedCount;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.collection(this.collection).deleteOne({ id });
            return !!result.deletedCount;
        });
    }
}
//# sourceMappingURL=mongo-generic.dao.js.map