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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const words_service_1 = require("./words.service");
let WordsController = class WordsController {
    constructor(wordsService) {
        this.wordsService = wordsService;
    }
    async getWords(category, page, limit) {
        return this.wordsService.getWords({ category, page, limit });
    }
    async getWord(id) {
        return this.wordsService.getWord(id);
    }
    async generateAI(body) {
        return this.wordsService.generateAI(body.word, body.meaning);
    }
};
exports.WordsController = WordsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取单词列表' }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], WordsController.prototype, "getWords", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取单词详情' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WordsController.prototype, "getWord", null);
__decorate([
    (0, common_1.Post)('ai/generate'),
    (0, swagger_1.ApiOperation)({ summary: 'AI生成记忆内容' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WordsController.prototype, "generateAI", null);
exports.WordsController = WordsController = __decorate([
    (0, swagger_1.ApiTags)('单词'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('words'),
    __metadata("design:paramtypes", [words_service_1.WordsService])
], WordsController);
//# sourceMappingURL=words.controller.js.map