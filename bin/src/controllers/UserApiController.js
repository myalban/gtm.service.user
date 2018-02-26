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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const lib_common_1 = require("@gtm/lib.common");
const tsoa_1 = require("tsoa");
const express = require("express");
const lib_service_1 = require("@gtm/lib.service");
const tsoa_2 = require("tsoa");
const UserRepository_1 = require("../repositories/UserRepository");
const UserEntity_1 = require("../entities/UserEntity");
const MProfileView_1 = require("../views/MProfileView");
let UserApiController = UserApiController_1 = class UserApiController extends lib_service_1.ApiController {
    /** Get all user with profiles */
    getAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield this.UserRepository.find({});
            if (users) {
                return Promise.resolve(MProfileView_1.UserProfile.toProfileViews(users));
            }
            return Promise.reject(`Not found.`);
        });
    }
    /** Get all user with profiles */
    getProfileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.UserRepository.findOne({ _id: id });
            if (user) {
                return Promise.resolve(MProfileView_1.UserProfile.toProfileView(user));
            }
            return Promise.reject(`Not found.`);
        });
    }
    /** Update user with profiles */
    updateUserProfiles(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield this.UserRepository.findOne({ _id: profile.id });
            if (!users) {
                return Promise.reject("User not exist");
            }
            let userToSave = users;
            if (profile.name)
                userToSave.name = profile.name;
            if (profile.birthday)
                userToSave.birthday = profile.birthday;
            if (profile.address)
                userToSave.address = profile.address;
            if (profile.location)
                userToSave.location = profile.location;
            if (profile.phone)
                userToSave.phone = profile.phone;
            if (profile.email)
                userToSave.email = profile.email;
            if (profile.language)
                userToSave.language = profile.language;
            if (profile.gender)
                userToSave.gender = profile.gender;
            if (profile.timezone)
                userToSave.timezone = profile.timezone;
            let userSave = yield this.UserRepository.findOneAndUpdate({ _id: profile.id }, userToSave);
            if (userSave) {
                return Promise.resolve(MProfileView_1.UserProfile.toProfileView(userSave));
            }
            return Promise.reject(`Not found.`);
        });
    }
    /** Update user with profiles */
    updateUserPhone(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield this.UserRepository.findOne({ _id: profile.id });
            if (!users) {
                return Promise.reject("User not exist");
            }
            let userToSave = users;
            if (profile.phone)
                userToSave.phone = profile.phone;
            let userSave = yield this.UserRepository.findOneAndUpdate({ _id: profile.id }, userToSave);
            if (userSave) {
                return Promise.resolve(MProfileView_1.UserProfile.toProfileView(userSave));
            }
            return Promise.reject(`Not found.`);
        });
    }
    /** Get all user lite */
    getUserLite() {
        return __awaiter(this, void 0, void 0, function* () {
            let userEntity = yield this.UserRepository.find({});
            if (userEntity) {
                return Promise.resolve(this.UserRepository.buildClientUsers(userEntity));
            }
            return Promise.reject(`Not found.`);
        });
    }
    /** Get user by Id */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userEntity = yield this.UserRepository.findOneById(id);
            if (userEntity) {
                return Promise.resolve(this.UserRepository.buildClientUser(userEntity));
            }
            return Promise.reject(`Not found.`);
        });
    }
    getUserByName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            let userEntity = yield this.UserRepository.getByName(userName);
            if (userEntity) {
                return Promise.resolve(this.UserRepository.buildClientUsers(userEntity));
            }
            return Promise.reject(`Not found.`);
        });
    }
    getProfileCurrent(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let userEntity = yield this.UserRepository.findOneById(req.user.user);
            if (userEntity) {
                return Promise.resolve(UserEntity_1.User.toProfileView(userEntity));
            }
            return Promise.reject(`Not found`);
        });
    }
    updateProfileCurrent(profileView, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let userEntity = yield this.UserRepository.findOneAndUpdate({ _id: req.user.user }, profileView);
            if (!userEntity) {
                return Promise.reject('Not found');
            }
            if (userEntity instanceof Error) {
                return Promise.reject(userEntity);
            }
            return Promise.resolve(UserEntity_1.User.toProfileView(userEntity));
        });
    }
};
__decorate([
    inversify_1.inject(UserRepository_1.UserRepositoryTYPE),
    __metadata("design:type", Object)
], UserApiController.prototype, "UserRepository", void 0);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Get('/get-all-profiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "getAllProfiles", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Get('/get-profile-by-id'),
    __param(0, tsoa_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "getProfileById", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Post('/update-user-profiles'),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "updateUserProfiles", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Post('/update-user-phone'),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "updateUserPhone", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Get('/get-user-lite'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "getUserLite", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Get('/getById/{id}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "getById", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Get('/getByUserName'),
    __param(0, tsoa_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "getUserByName", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Get('/profile'),
    __param(0, tsoa_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "getProfileCurrent", null);
__decorate([
    tsoa_2.Tags('User'), tsoa_2.Security('jwt'), tsoa_1.Post('/profile'),
    __param(0, tsoa_1.Body()), __param(1, tsoa_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "updateProfileCurrent", null);
UserApiController = UserApiController_1 = __decorate([
    lib_common_1.injectableSingleton(UserApiController_1),
    tsoa_1.Route('api/user/v1/user')
], UserApiController);
exports.UserApiController = UserApiController;
var UserApiController_1;