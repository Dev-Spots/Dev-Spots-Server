import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COLLECTION } from '../../constant/user.constant';
import { type Model, Types } from 'mongoose';
import type { UserDocument } from '../../models/user.model';
import type { CreateUserProps } from '../../interfaces/user.interface';
import { encryption } from '../../utils/encryption.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_COLLECTION)
    private readonly userRepo: Model<UserDocument>,
  ) {}

  public async findOneById(_id: Types.ObjectId) {
    return (await this.userRepo.findById(_id)) as UserDocument | null;
  }

  public async findOneByEmail(email: string) {
    return (await this.userRepo.findOne({ email })) as UserDocument | null;
  }

  public async createOneUser({ name, password, email }: CreateUserProps) {
    return this.userRepo.create({
      email,
      password: encryption.hashData(password),
      name,
    });
  }
}
