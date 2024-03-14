import { RESPONSE_STATUS } from "../constant";
import type {
  ControllerResp,
  GenerateRespInput,
} from "../interfaces/response.interfaces";

export default abstract class ResponseWriter {
  public generateResponse<T = any>({
    code,
    message,
    data,
  }: GenerateRespInput): ControllerResp<T> {
    return {
      code,
      message,
      status: RESPONSE_STATUS[code],
      data,
    };
  }
}
