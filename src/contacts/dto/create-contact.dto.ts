import { ContactType, IvaCondition, DocumentType } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  branchId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsEnum(IvaCondition)
  ivaCondition: IvaCondition;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\d{2}-\d{8}-\d|\d{7,8})$/, {
    message: 'Debe ser un CUIT/CUIL (XX-XXXXXXXX-X) o DNI (7 u 8 dígitos)',
  })
  documentNumber: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(ContactType)
  type: ContactType;
}
