import type { UserDocument } from "../src/models/user.model";

export {};

declare global {
  namespace Express {
    interface Request {
      userCtx: UserDocument;
    }
  }
}
