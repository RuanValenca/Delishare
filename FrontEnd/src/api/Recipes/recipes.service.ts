import * as apiService from "../api.service";
import { defaultReturn } from "../../Util/Toast";
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
      return defaultReturn(request);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Ocorreu um erro inesperado");
    }
  },

  async getMyRecipe(id: number): Promise<{
    data: ShowResult[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest(
        "/recipes/get-recipes",
        "POST",
        { id }
      );
      return defaultReturn(request);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Ocorreu um erro inesperado");
    }
  },

  async createRecipe(body: BodyCreate): Promise<{
    data: string[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest(
        "/recipes/create",
        "POST",
        body
      );
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

export const handleGetList = async () => {
  try {
    const { data, result, message } = await recipeService.getRecipe();
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const handleGetMyList = async (id: number) => {
  try {
    const { data, result, message } = await recipeService.getMyRecipe(id);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const handleCreate = async (body: BodyCreate) => {
  try {
    const { data, result, message } = await recipeService.createRecipe(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};
