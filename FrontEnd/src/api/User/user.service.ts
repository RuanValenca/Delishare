import * as apiService from "../api.service";
import { defaultReturnWithToast } from "../../Util/Toast";
import { changeObjectToFormData } from "../api.service";
import type {
  BodyCreate,
  BodyUpdate,
  BodyShowResult,
} from "./types/user.interface";

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

  async createUser(body: BodyCreate): Promise<{
    data: string[];
    message: string[];
    result: boolean;
  }> {
    try {
      const formData = changeObjectToFormData({
        ...body,
        pfp: body.pfp,
      });

      const request = await apiService.apiRequest(
        "/user/create",
        "POST",
        formData,
        "file"
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

  async updateUser(body: BodyUpdate): Promise<{
    data: string[];
    message: string[];
    result: boolean;
  }> {
    try {
      const formData = changeObjectToFormData({
        ...body,
        pfp: body.pfp,
      });

      const request = await apiService.apiRequest(
        "/user/update",
        "POST",
        formData,
        "file"
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

export const handleCreateUser = async (body: BodyCreate) => {
  try {
    const { data, result, message } = await userService.createUser(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const handleUpdateUser = async (body: BodyUpdate) => {
  try {
    const { data, result, message } = await userService.updateUser(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};
