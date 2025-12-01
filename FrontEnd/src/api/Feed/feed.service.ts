import * as apiService from "../api.service";
import { defaultReturn } from "../../Util/Toast";
import type { BodyCreate, ShowResult } from "./types/feed.interface";

const feedService = {
  async getFeed(): Promise<{
    data: ShowResult[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest("/feed/get-feed", "GET");
      return defaultReturn(request);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Ocorreu um erro inesperado");
    }
  },

  async createFeed(body: BodyCreate): Promise<{
    data: string[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest("/feed/create", "POST", body);
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
    const { data, result, message } = await feedService.getFeed();
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const handleCreate = async (body: BodyCreate) => {
  try {
    const { data, result, message } = await feedService.createFeed(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};
