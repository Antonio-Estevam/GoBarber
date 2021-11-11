"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
require("./database");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
app.listen(3333, function () {
    console.log('🚀 Server started on port 3333');
});
