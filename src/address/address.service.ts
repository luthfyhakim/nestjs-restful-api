import { HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from 'src/model/address.model';
import { Logger } from 'winston';
import { AddressValidation } from './address.validation';

@Injectable()
export class AddressService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    // validasi request yang masuk
    const createRequest: CreateAddressRequest = this.validationService.validate(
      AddressValidation.CREATE,
      request,
    );

    // cek kontak ada atau tidak
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: createRequest.contact_id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    // insert atau create new contact
    const address = await this.prismaService.address.create({
      data: createRequest,
    });

    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    // validasi request yang masuk
    const getRequest: GetAddressRequest = this.validationService.validate(
      AddressValidation.GET,
      request,
    );

    // cek kontak ada atau tidak
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: getRequest.contact_id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    // cek alamat ada atau tidak
    const address = await this.prismaService.address.findFirst({
      where: {
        id: getRequest.address_id,
        contact_id: getRequest.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not found', 404);
    }

    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async update(
    user: User,
    request: UpdateAddressRequest,
  ): Promise<AddressResponse> {
    // validasi request yang masuk
    const updateRequest: UpdateAddressRequest = this.validationService.validate(
      AddressValidation.UPDATE,
      request,
    );

    // cek kontak ada atau tidak
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: updateRequest.contact_id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    const address = await this.prismaService.address.findFirst({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Contact not found', 404);
    }

    // insert atau create new contact
    const result = await this.prismaService.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });

    return {
      id: result.id,
      street: result.street,
      city: result.city,
      province: result.province,
      country: result.country,
      postal_code: result.postal_code,
    };
  }

  async delete(
    user: User,
    request: DeleteAddressRequest,
  ): Promise<AddressResponse> {
    // validasi request yang masuk
    const deleteRequest: DeleteAddressRequest = this.validationService.validate(
      AddressValidation.DELETE,
      request,
    );

    // cek kontak ada atau tidak
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: deleteRequest.contact_id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    // cek alamat ada atau tidak
    let address = await this.prismaService.address.findFirst({
      where: {
        id: deleteRequest.address_id,
        contact_id: deleteRequest.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not found', 404);
    }

    address = await this.prismaService.address.delete({
      where: {
        id: deleteRequest.address_id,
        contact_id: deleteRequest.contact_id,
      },
    });

    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async list(user: User, contactId: number): Promise<AddressResponse[]> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    const addresses = await this.prismaService.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((address) => ({
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    }));
  }
}
