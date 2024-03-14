import type { UserDocument } from "../models/user.model";

export {};

declare global {
  namespace Express {
    interface Request {
      userCtx: UserDocument;
    }
  }
}
