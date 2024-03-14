import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION } from '../../constant/user.constant';
import { UserSchema } from '../../models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserValidator } from './user.validation';
import { Authentication } from '../../middlewares/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_COLLECTION,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserValidator],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authentication)
      .forRoutes({ path: '/user/me', method: RequestMethod.GET });
  }
}
