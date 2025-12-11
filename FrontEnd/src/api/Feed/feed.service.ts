import * as apiService from "../api.service";
import { defaultReturnNotToast } from "../../Util/Toast";
import { changeObjectToFormData } from "../api.service";
import type {
  BodyCreate,
  BodyCreateComment,
  Comment,
  ShowResult,
} from "./types/feed.interface";

const feedService = {
  async getFeed(): Promise<{
    data: ShowResult[];
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest("/feed/get-feed", "GET");
      return defaultReturnNotToast(request);
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
      const formData = changeObjectToFormData({
        ...body,
        image: body.image,
      });

      const request = await apiService.apiRequest(
        "/feed/create",
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

  async createComment(body: BodyCreateComment): Promise<{
    data: Comment;
    message: string[];
    result: boolean;
  }> {
    try {
      const request = await apiService.apiRequest(
        "/feed/comment/create",
        "POST",
        body
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

export const handleCreateComment = async (body: BodyCreateComment) => {
  try {
    const { data, result, message } = await feedService.createComment(body);
    return { data, message, result };
  } catch (error) {
    throw new Error(String(error));
  }
};
