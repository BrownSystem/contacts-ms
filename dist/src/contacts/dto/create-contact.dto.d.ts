import { ContactType, IvaCondition, DocumentType } from '@prisma/client';
export declare class CreateContactDto {
    branchId: string;
    code: string;
    name: string;
    businessName?: string;
    ivaCondition: IvaCondition;
    documentType: DocumentType;
    documentNumber: string;
    available?: boolean;
    phone?: string;
    email?: string;
    address?: string;
    type: ContactType;
}
