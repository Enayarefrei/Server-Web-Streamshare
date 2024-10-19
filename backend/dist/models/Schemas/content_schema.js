"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_content_schema = exports.tags_schema = exports.genres_schema = exports.content_schema = void 0;
const yup = __importStar(require("yup"));
exports.content_schema = yup.object({
    Id: yup.number(),
    Name: yup.string().required(),
    Mail: yup.string().email().required(),
    Password: yup.string().required(),
    Subscription: yup.string().required(),
    "Created-date": yup.date(),
    "Updated-at": yup.date()
}).noUnknown();
exports.genres_schema = yup.mixed().oneOf(["Science Fiction", "Action", "Crime", "Drama", "Thriller", "Romance", "Adventure", "Animation", "Superhero", "Fantasy", "Horror", "Musical", "Family"]);
exports.tags_schema = yup.string().nullable();
exports.get_content_schema = yup.object({
    FulfilName: yup.string(),
    Genres: yup.array(exports.genres_schema),
    Tags: yup.array(exports.tags_schema)
}).noUnknown();