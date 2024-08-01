import { HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from 'src/model/contact.model';
import { Logger } from 'winston';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    const createRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...createRequest,
        ...{ username: user.username },
      },
    });

    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  async update(
    user: User,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    const updateRequest = await this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );

    let contact = await this.prismaService.contact.findFirst({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    contact = await this.prismaService.contact.update({
      where: {
        id: contact.id,
        username: contact.username,
      },
      data: updateRequest,
    });

    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  async delete(user: User, contactId: number): Promise<ContactResponse> {
    let contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    contact = await this.prismaService.contact.delete({
      where: {
        id: contactId,
        username: contact.username,
      },
    });

    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  async search(
    user: User,
    request: SearchContactRequest,
  ): Promise<ContactResponse[]> {
    const searchRequest = this.validationService.validate(
      ContactValidation.SEARCH,
      request,
    );

    const contacts = await this.prismaService.contact.findMany({
      where: {
        username: user.username,
        OR: [
          {
            first_name: {
              contains: searchRequest.name,
            },
          },
          {
            email: {
              contains: searchRequest.email,
            },
          },
          {
            phone: {
              contains: searchRequest.phone,
            },
          },
        ],
      },
      skip: (searchRequest.page - 1) * searchRequest.size,
      take: searchRequest.size,
    });

    return contacts.map((contact) => {
      return {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        id: contact.id,
      };
    });
  }
}
