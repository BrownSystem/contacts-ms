import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { EContact, PrismaClient } from '@prisma/client';
import { PaginateWithMeta } from './dto/pagination.helper';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ContactsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ContactsService.name);

  onModuleInit() {
    void this.$connect();
    this.logger.log('Database connected');
  }

  async create(createContactDto: CreateContactDto) {
    const existingContact = await this.eContact.findFirst({
      where: { documentNumber: createContactDto.documentNumber },
    });

    if (existingContact) {
      return {
        message:
          '[CONTACT_CREATE] Contact with this CUIT/CUIL/DNI already exists',
        status: HttpStatus.METHOD_NOT_ALLOWED,
      };
    }

    // 1. Buscar el último código existente (ordenado de mayor a menor)
    const lastContact = await this.eContact.findFirst({
      orderBy: { code: 'desc' },
      where: { branchId: createContactDto.branchId },
    });

    // 2. Calcular el nuevo número incremental
    const nextNumber = lastContact ? parseInt(lastContact.code, 10) + 1 : 1;

    // 3. Formatearlo como string con ceros (ej: '0001', '0002', ...)
    const generatedCode = nextNumber.toString().padStart(4, '0');

    // 4. Crear el contacto incluyendo el code generado
    const newContact = await this.eContact.create({
      data: {
        ...createContactDto,
        code: generatedCode,
      },
    });

    return newContact;
  }

  async findAll(paginationDto: PaginationDto) {
    const { branchId } = paginationDto;

    return await PaginateWithMeta<EContact>({
      model: this.eContact,
      where: { branchId, available: true }, // 🔍 filtro por branch
      pagination: paginationDto,
    });
  }

  async findOneById(id: string) {
    const contact = await this.eContact.findUnique({
      where: { id, available: true },
    });

    if (!contact) {
      return {
        message: '[CONTACT_FIND_ONE_BY_ID] Contact not found',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return contact;
  }

  async searchContact(paginationDto: PaginationDto) {
    const { branchId, search, type } = paginationDto;

    const where: any = {
      branchId,
      type,
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

    return await PaginateWithMeta({
      model: this.eContact,
      where,
      pagination: paginationDto,
    });
  }

  // update(id: string, updateContactDto: UpdateContactDto) {
  //   return `This action updates a #${id} contact`;
  // }
}
