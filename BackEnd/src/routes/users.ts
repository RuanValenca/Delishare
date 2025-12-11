import { Router, Request, Response } from "express";
import { pool } from "../db";
import { ApiResponse } from "../types/genericApi.interface";
import { upload } from "../middleware/upload";
import { saveFileToPublic } from "../util/fileUpload";

const getBaseUrl = (req: Request): string => {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/$/, "");
  }
  return `${req.protocol}://${req.get("host")}`;
};

export interface UpdateUserBody {
  userId: number;
  name: string;
  email: string;
  bio: string;
  password: string;
  isCreate: boolean;
}

export interface GetUserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  pfp: string;
  bio: string;
}

const router = Router();

router.post(
  "/get-user",
  async (
    req: Request,
    res: Response<ApiResponse<GetUserResponse[] | null>>
  ) => {
    const { userId }: { userId: number } = req.body;

    try {
      const result = await pool.query<GetUserResponse>(
        `
        SELECT id, name, email, password, profile_photo AS pfp, bio
        FROM users
        WHERE id = $1
        `,
        [userId]
      );
      const rows = result.rows;

      const baseUrl = getBaseUrl(req);
      const usersWithUrls = rows.map((user) => ({
        ...user,
        pfp: user.pfp ? `${baseUrl}${user.pfp}` : "",
      }));

      res.json({
        data: usersWithUrls,
        message: ["Usuário carregado com sucesso"],
        result: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: null,
        message: ["Algo deu errado!"],
        result: false,
      });
    }
  }
);

router.post(
  "/create-update",
  upload.single("pfp"),
  async (req: Request, res: Response<ApiResponse<string[]>>) => {
    try {
      const { userId, email, name, password, bio, isCreate } =
        req.body as UpdateUserBody;

      const imagePath = req.file ? saveFileToPublic(req.file, "profile") : null;

      if (isCreate) {
        await pool.query(
          `
          INSERT INTO users (name, email, password, profile_photo, bio, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `,
          [name, email, password, imagePath || "", bio || ""]
        );
      } else {
        const existingUser = await pool.query<{ profile_photo: string }>(
          `SELECT profile_photo FROM users WHERE id = $1`,
          [userId]
        );

        const finalImagePath =
          imagePath || existingUser.rows[0]?.profile_photo || "";

        await pool.query(
          `
          UPDATE users
          SET name = $1, email = $2, password = $3, profile_photo = $4, bio = $5, updated_at = CURRENT_TIMESTAMP
          WHERE id = $6
          `,
          [name, email, password, finalImagePath, bio, userId]
        );
      }

      res.json({
        data: [""],
        message: [
          isCreate
            ? "Usuário criado com sucesso"
            : "Usuário atualizado com sucesso",
        ],
        result: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: [""],
        message: ["Algo deu errado!"],
        result: false,
      });
    }
  }
);

export default router;
