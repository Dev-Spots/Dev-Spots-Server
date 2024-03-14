import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  Get,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserValidator } from './user.validation';
import { encryption } from '../../utils/encryption.utils';
import ResponseWriter from '../../base/response.base';
import { jwtUtils } from '../../utils/jwt.utils';
import type { Request } from 'express';

@Controller('user')
export class UserController extends ResponseWriter {
  constructor(
    private readonly userService: UserService,
    private readonly userValidation: UserValidator,
  ) {
    super();
  }

  @Post('login')
  public async login(@Body() payload: any) {
    const { email, password } =
      await this.userValidation.validateLogin(payload);

    const user = await this.userService.findOneByEmail(email);
    if (!user || !encryption.compareHash(password, user.password))
      throw new UnauthorizedException('invalid email/password');

    return this.generateResponse({
      code: 200,
      message: 'success',
      data: { access_token: jwtUtils.createToken({ _id: user._id }) },
    });
  }

  @Post('register')
  @HttpCode(201)
  public async register(@Body() payload: any) {
    const data = await this.userService.createOneUser(
      await this.userValidation.validateRegister(payload),
    );

    return this.generateResponse({
      code: 201,
      message: 'success',
      data: { ...(data as any)._doc, password: undefined },
    });
  }

  @Get('me')
  public async me(@Req() req: Request) {
    return this.generateResponse({
      code: 200,
      message: 'OK',
      data: req.userCtx,
    });
  }
}
