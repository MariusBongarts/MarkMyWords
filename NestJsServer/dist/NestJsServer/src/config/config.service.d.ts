export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    get(key: string): string;
}
