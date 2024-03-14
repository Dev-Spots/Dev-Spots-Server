import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COLLECTION } from '../../constant/user.constant';
import { type Model, Types } from 'mongoose';
import type { UserDocument } from '../../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_COLLECTION)
    private readonly userRepo: Model<UserDocument>,
  ) {}

  public async findOneById(_id: Types.ObjectId) {
    return await this.userRepo.findById(_id);
  }
}
