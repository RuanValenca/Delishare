import * as apiService from "../api.service";
import { defaultReturnWithToast } from "../../Util/Toast";
import type { BodyCreateUpdate, BodyShowResult } from "./types/user.interface";

const userService = {
  async getUser(userId: number): Promise<{
    data: BodyShowResult;
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest("/user/get-user", "POST", {
        userId,
      });
      return defaultReturnWithToast(request);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Ocorreu um erro inesperado");
    }
  },

  async createUpdateUser(body: BodyCreateUpdate): Promise<{
    data: string[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest(
        "/user/create-update",
        "POST",
        body
      );
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

export const handleGetUser = async (userId: number) => {
  try {
    const { data, result, message } = await userService.getUser(userId);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const handleCreateUpdate = async (body: BodyCreateUpdate) => {
  try {
    const { data, result, message } = await userService.createUpdateUser(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};
