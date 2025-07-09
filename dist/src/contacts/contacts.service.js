"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ContactsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const pagination_helper_1 = require("./dto/pagination.helper");
let ContactsService = ContactsService_1 = class ContactsService extends client_1.PrismaClient {
    logger = new common_1.Logger(ContactsService_1.name);
    onModuleInit() {
        void this.$connect();
        this.logger.log('Database connected');
    }
    async create(createContactDto) {
        const existingContact = await this.eContact.findFirst({
            where: { documentNumber: createContactDto.documentNumber },
        });
        if (existingContact) {
            return {
                message: '[CONTACT_CREATE] Contact with this CUIT/CUIL/DNI already exists',
                status: common_1.HttpStatus.METHOD_NOT_ALLOWED,
            };
        }
        const newContact = await this.eContact.create({
            data: createContactDto,
        });
        return newContact;
    }
    async findAll(paginationDto) {
        const { branchId } = paginationDto;
        return await (0, pagination_helper_1.PaginateWithMeta)({
            model: this.eContact,
            where: { branchId, available: true },
            pagination: paginationDto,
        });
    }
    async findOneById(id) {
        const contact = await this.eContact.findUnique({
            where: { id, available: true },
        });
        if (!contact) {
            return {
                message: '[CONTACT_FIND_ONE_BY_ID] Contact not found',
                status: common_1.HttpStatus.NOT_FOUND,
            };
        }
        return contact;
    }
    async searchContact(paginationDto) {
        const { branchId, search } = paginationDto;
        const where = {
            branchId,
            available: true,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
                { businessName: { contains: search, mode: 'insensitive' } },
                { documentNumber: { contains: search, mode: 'insensitive' } },
            ];
        }
        return await (0, pagination_helper_1.PaginateWithMeta)({
            model: this.eContact,
            where,
            pagination: paginationDto,
        });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = ContactsService_1 = __decorate([
    (0, common_1.Injectable)()
], ContactsService);
//# sourceMappingURL=contacts.service.js.map