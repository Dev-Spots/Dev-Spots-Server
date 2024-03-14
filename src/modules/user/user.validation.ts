import { Injectable } from "@nestjs/common";
import BaseValidation from "../../base/validation.base";
import type {
  LoginInput,
  RegisterInput,
} from "../../interfaces/user.interface";
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

  public async validateRegister(data: any) {
    return await this.validate<RegisterInput>(
      yup
        .object()
        .shape({
          name: yup.string().required("name is required"),
          email: yup
            .string()
            .required("email is required")
            .email("invalid email format"),
          password: yup
            .string()
            .required("password is required")
            .test(this.passwordValidation),
          confirmPassword: yup.string().required("confirmPassword is required"),
        })
        .test(
          "is same",
          "password and confirmPassword doesnt match",
          ({ password, confirmPassword }) => password === confirmPassword
        ),
      data
    );
  }
}
