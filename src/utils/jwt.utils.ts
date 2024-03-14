import {
  type JwtPayload,
  sign,
  type SignOptions,
  verify,
  decode,
} from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export interface JwtValue extends JwtPayload {
  _id: string;
}

class JWT {
  private readonly secret = process.env.SECRET;

  public createToken(data: { _id: string }, options?: SignOptions) {
    return sign({ ...data }, this.secret, options);
  }

  public verifyToken<T = JwtValue>(token: string) {
    return verify(token, this.secret) as T;
  }

  public decodeToken<T = JwtValue>(token: string) {
    return decode(token) as T;
  }
}

export const jwtUtils = new JWT();
