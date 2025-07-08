import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @MessagePattern({ cmd: 'create_contact' })
  create(@Payload() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @MessagePattern({ cmd: 'find_all_contacts' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.contactsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_contact' })
  findOneById(@Payload() id: string) {
    return this.contactsService.findOneById(id);
  }

  @MessagePattern({ cmd: 'search_contacts' })
  searchContact(@Payload() paginationDto: PaginationDto) {
    return this.contactsService.searchContact(paginationDto);
  }

  // @MessagePattern({ cmd: 'update_contact' })
  // update(@Payload() updateContactDto: UpdateContactDto) {
  //   return this.contactsService.update(updateContactDto.id, updateContactDto);
  // }
}
