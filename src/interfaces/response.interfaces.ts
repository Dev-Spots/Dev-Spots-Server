export interface GenerateRespInput {
  code: number;
  message: string;
  data?: any;
}

export type ControllerResp<T = any> = {
  code: number;
  message: string;
  status: string;
  data?: T;
};
