import * as apiService from "../api.service";
import { defaultReturnNotToast } from "../../Util/Toast";
import { changeObjectToFormData } from "../api.service";
import type { BodyCreate, ShowResult } from "./types/recipes.interface";

const recipeService = {
  async getRecipe(): Promise<{
    data: ShowResult[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest(
        "/recipes/get-recipes",
        "GET"
      );
      return defaultReturnNotToast(request);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Ocorreu um erro inesperado");
    }
  },

  async createRecipe(body: BodyCreate & { image?: File }): Promise<{
    data: string[];
    message: string[];
    result: boolean;
  }> {
    try {
      const formData = changeObjectToFormData({
        ...body,
        image: body.image,
      });

      const request = await apiService.apiRequest(
        "/recipes/create",
        "POST",
        formData,
        "file"
      );
      return defaultReturnNotToast(request);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  },
};

export const handleGetList = async () => {
  try {
    const { data, result, message } = await recipeService.getRecipe();
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const handleCreate = async (
  body: BodyCreate & { image?: File }
) => {
  try {
    const { data, result, message } = await recipeService.createRecipe(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};
