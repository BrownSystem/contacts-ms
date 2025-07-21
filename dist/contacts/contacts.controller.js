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
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const contacts_service_1 = require("./contacts.service");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
let ContactsController = class ContactsController {
    contactsService;
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    create(createContactDto) {
        return this.contactsService.create(createContactDto);
    }
    findAll(paginationDto) {
        return this.contactsService.findAll(paginationDto);
    }
    findOneById(id) {
        return this.contactsService.findOneById(id);
    }
    searchContact(paginationDto) {
        return this.contactsService.searchContact(paginationDto);
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_contact' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_contacts' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_contact' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "findOneById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'search_contacts' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "searchContact", null);
exports.ContactsController = ContactsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService])
], ContactsController);
//# sourceMappingURL=contacts.controller.js.map