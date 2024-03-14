import { Injectable } from "@nestjs/common";
import BaseValidation from "../../base/validation.base";
import type { LoginInput } from "../../interfaces/user.interface";
import * as yup from "yup";

@Injectable()
export class UserValidator extends BaseValidation {
  public async validateLogin(data: any) {
    return await this.validate<LoginInput>(
      yup.object().shape({
        email: yup
          .string()
          .required("email is required")
          .email("invalid email format"),
        password: yup.string().required("password is required"),
      }),
      data
    );
  }
}
