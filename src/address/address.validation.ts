import { z, ZodType } from 'zod';

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    province: z.string().min(1).max(255).optional(),
    country: z.string().min(1),
    postal_code: z.string().min(1),
    contact_id: z.number().min(1).positive(),
  });

  static readonly GET: ZodType = z.object({
    contact_id: z.number().min(1).positive(),
    address_id: z.number().min(1).positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    province: z.string().min(1).max(255).optional(),
    country: z.string().min(1),
    postal_code: z.string().min(1),
    contact_id: z.number().min(1).positive(),
  });

  static readonly DELETE: ZodType = z.object({
    contact_id: z.number().min(1).positive(),
    address_id: z.number().min(1).positive(),
  });
}
