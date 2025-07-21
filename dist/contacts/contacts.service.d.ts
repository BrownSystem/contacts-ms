import { HttpStatus, OnModuleInit } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from './dto/pagination.dto';
export declare class ContactsService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    create(createContactDto: CreateContactDto): Promise<{
        branchId: string;
        name: string;
        businessName: string | null;
        ivaCondition: import(".prisma/client").$Enums.IvaCondition;
        documentType: import(".prisma/client").$Enums.DocumentType;
        documentNumber: string;
        available: boolean;
        phone: string | null;
        email: string | null;
        address: string | null;
        type: import(".prisma/client").$Enums.ContactType;
        id: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
        status: HttpStatus;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: any;
        meta: {
            total: any;
            page: number;
            lastPage: number;
        };
    }>;
    findOneById(id: string): Promise<{
        branchId: string;
        name: string;
        businessName: string | null;
        ivaCondition: import(".prisma/client").$Enums.IvaCondition;
        documentType: import(".prisma/client").$Enums.DocumentType;
        documentNumber: string;
        available: boolean;
        phone: string | null;
        email: string | null;
        address: string | null;
        type: import(".prisma/client").$Enums.ContactType;
        id: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
        status: HttpStatus;
    }>;
    searchContact(paginationDto: PaginationDto): Promise<{
        data: any;
        meta: {
            total: any;
            page: number;
            lastPage: number;
        };
    }>;
}
