import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { USER_COLLECTION } from "../../constant/user.constant";
import { UserSchema } from "../../models/user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserValidator } from "./user.validation";

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
export class UserModule {}
