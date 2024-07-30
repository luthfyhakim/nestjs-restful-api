import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

@Module({
  providers: [UserService, UserValidation],
  controllers: [UserController],
})
export class UserModule {}
