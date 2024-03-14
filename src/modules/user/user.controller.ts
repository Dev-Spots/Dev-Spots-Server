import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserValidator } from "./user.validation";
import { encryption } from "../../../utils/encryption.utils";
import ResponseWriter from "../../base/response.base";
import { jwtUtils } from "utils/jwt.utils";

@Controller("user")
export class UserController extends ResponseWriter {
  constructor(
    private readonly userService: UserService,
    private readonly userValidation: UserValidator
  ) {
    super();
  }

  @Post("login")
  public async login(@Body() payload: any) {
    const { email, password } = await this.userValidation.validateLogin(
      payload
    );

    const user = await this.userService.findOneByEmail(email);
    if (!user || !encryption.compareHash(password, user.password))
      throw new UnauthorizedException("invalid email/password");

    return this.generateResponse({
      code: 200,
      message: "success",
      data: { access_token: jwtUtils.createToken({ _id: user._id }) },
    });
  }
}
