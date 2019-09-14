import * as dotenv from 'dotenv';
import * as fs from 'fs';
export class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
}
//# sourceMappingURL=config.service.js.map