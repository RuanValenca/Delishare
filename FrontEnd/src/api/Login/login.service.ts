import * as apiService from "../api.service";
import { defaultReturn } from "../../Util/Toast";
import type { IBodyLogin, IResultLogin } from "./types/login.interface";

export const loginService = {
  async login(body: IBodyLogin): Promise<{
    data: IResultLogin;
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest("/login", "POST", body);
      return defaultReturn(request);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  },
};
