import {
  Injectable,
  type NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COLLECTION } from '../constant/user.constant';
import { type Model, Types, isValidObjectId } from 'mongoose';
import type { UserDocument } from '../models/user.model';
import { jwtUtils } from '../../utils/jwt.utils';

@Injectable()
export class Authentication implements NestMiddleware {
  constructor(
    @InjectModel(USER_COLLECTION)
    private readonly userRepo: Model<UserDocument>,
  ) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      throw new UnauthorizedException('missing or invalid token');

    const { _id } = jwtUtils.verifyToken(authorization);
    if (!isValidObjectId(_id))
      throw new UnauthorizedException('missing or invalid token');

    const user = await this.userRepo.findById(new Types.ObjectId(_id));
    if (!user) throw new UnauthorizedException('missing or invalid token');

    req.userCtx = user;

    next();
  }
}
