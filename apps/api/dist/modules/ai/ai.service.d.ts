export declare class AiService {
    private readonly openRouterConfig;
    generateMemory(word: string, meaning: string): Promise<string>;
    generateExamples(word: string, meaning: string): Promise<string[]>;
    private generateText;
}
