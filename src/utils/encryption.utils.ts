import { hashSync, compareSync } from 'bcryptjs';
import { AES, enc } from 'crypto-ts';
import { config } from 'dotenv';

config();

class Encryption {
  private readonly key = process.env.ENCRYPTION_KEY;
  public hashData(data: string): string {
    return hashSync(data, 10);
  }

  public compareHash(data: string, hash: string): boolean {
    return compareSync(data, hash);
  }

  public encrypt(data: string): string {
    return AES.encrypt(data.replace(/\s/g, '_'), this.key).toString();
  }

  public decrypt(data: string): string {
    return AES.decrypt(data, this.key).toString(enc.Utf8).replace(/_/g, ' ');
  }
}

export const encryption = new Encryption();
