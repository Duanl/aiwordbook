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
exports.LearningController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const learning_service_1 = require("./learning.service");
let LearningController = class LearningController {
    constructor(learningService) {
        this.learningService = learningService;
    }
    async getTodayTask(req) {
        return this.learningService.getTodayTask(req.user.id);
    }
    async getReviewWords(req) {
        const words = await this.learningService.getReviewQueue(req.user.id);
        return { success: true, data: words };
    }
    async submitLearning(req, body) {
        return this.learningService.submitLearning(req.user.id, body.wordId, body.status, body.responseTime);
    }
    async getStats(req) {
        return this.learningService.getStats(req.user.id);
    }
};
exports.LearningController = LearningController;
__decorate([
    (0, common_1.Get)('today'),
    (0, swagger_1.ApiOperation)({ summary: '获取今日学习任务' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "getTodayTask", null);
__decorate([
    (0, common_1.Get)('review'),
    (0, swagger_1.ApiOperation)({ summary: '获取待复习单词' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "getReviewWords", null);
__decorate([
    (0, common_1.Post)('submit'),
    (0, swagger_1.ApiOperation)({ summary: '提交学习结果' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "submitLearning", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: '获取学习统计' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "getStats", null);
exports.LearningController = LearningController = __decorate([
    (0, swagger_1.ApiTags)('学习'),
    (0, common_1.Controller)('learning'),
    __metadata("design:paramtypes", [learning_service_1.LearningService])
], LearningController);
//# sourceMappingURL=learning.controller.js.map