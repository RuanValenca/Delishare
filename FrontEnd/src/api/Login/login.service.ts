import * as apiService from "../api.service";
import { defaultReturnWithToast } from "../../Util/Toast";
import type { IBodyLogin, IResultLogin } from "./types/login.interface";

export const loginService = {
  async login(body: IBodyLogin): Promise<{
    data: IResultLogin;
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest("/login", "POST", body);
      return defaultReturnWithToast(request);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  },
};
