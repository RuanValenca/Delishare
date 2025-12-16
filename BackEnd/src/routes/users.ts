import { Router, Request, Response } from "express";
import { pool } from "../db";
import { ApiResponse } from "../types/genericApi.interface";
import { saveFileToPublic } from "../util/fileUpload";
import { supabase } from "../lib/supabase";
import { randomUUID } from "crypto";
import { upload } from "../config/multer";

export interface CreateUserBody {
  name: string;
  email: string;
  bio: string;
  password: string;
}

export interface UpdateUserBody {
  userId: number;
  name: string;
  email: string;
  bio: string;
  password: string;
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

      if (rows.length === 0) {
        return res.status(404).json({
          data: null,
          message: ["Usuário não encontrado"],
          result: false,
        });
      }

      const usersWithUrls = rows.map((user) => ({
        ...user,
        pfp: user.pfp ? `${user.pfp}` : "", 
      }));

      return res.json({
        data: usersWithUrls,
        message: ["Usuário carregado com sucesso"],
        result: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: null,
        message: ["Algo deu errado!"],
        result: false,
      });
    }
  }
);


router.post(
  "/create",
  upload.single("pfp"),
  async (req: Request, res: Response<ApiResponse<string[]>>) => {
    const { email, name, password, bio } = req.body as CreateUserBody;

    if (!password || password.trim() === "") {
      return res.status(400).json({
        data: [""],
        message: ["A senha é obrigatória"],
        result: false,
      });
    }

    try {
      const result = await pool.query<{ id: number }>(
        `
        INSERT INTO users (name, email, password, profile_photo, bio, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id
        `,
        [name, email, password, "", bio || ""]
      );

      const newUserId = result.rows[0].id;
      const imagePath = req.file
        ? saveFileToPublic(req.file, "profile", newUserId, newUserId)
        : null;

      if (imagePath) {
        await pool.query(`UPDATE users SET profile_photo = $1 WHERE id = $2`, [
          imagePath,
          newUserId,
        ]);
      }

      return res.json({
        data: [""],
        message: ["Usuário criado com sucesso"],
        result: true,
      });
    } catch (error: unknown) {
      console.error(error);

      const dbError = error as { code?: string };
      if (dbError?.code === "23505") {
        return res.status(400).json({
          data: [""],
          message: ["Email já está em uso"],
          result: false,
        });
      }

      return res.status(500).json({
        data: [""],
        message: ["Algo deu errado!"],
        result: false,
      });
    }
  }
);
router.post(
  "/update",
  upload.single("pfp"), 
  async (req: Request, res: Response<ApiResponse<string[]>>) => {
 
    const { userId, email, name, password, bio } = req.body as UpdateUserBody;

    try {
      
      const existingUser = await pool.query<{
        profile_photo: string;
        password: string;
      }>(
        `SELECT profile_photo, password FROM users WHERE id = $1`,
        [userId]
      );

      if (existingUser.rows.length === 0) {
        return res.status(404).json({
          data: [""],
          message: ["Usuário não encontrado"],
          result: false,
        });
      }

      
      let imageUrl: string | null = null;

      if (req.file) {
        const fileExt = req.file.mimetype.split("/")[1];
        const fileName = `user-${userId}-${randomUUID()}.${fileExt}`;

        const { error } = await supabase.storage
          .from("avatar")
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true,
          });

        if (error) {
          console.error("Erro ao enviar imagem para Supabase:", error);
          return res.status(500).json({
            data: [""],
            message: ["Erro ao enviar imagem"],
            result: false,
          });
        }

        const { data } = supabase.storage
          .from("avatar")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      
      const finalImagePath =
        imageUrl || existingUser.rows[0].profile_photo || "";

      const finalPassword =
        password && password.trim() !== ""
          ? password
          : existingUser.rows[0].password;

      
      await pool.query(
        `
        UPDATE users
        SET
          name = $1,
          email = $2,
          password = $3,
          profile_photo = $4,
          bio = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        `,
        [name, email, finalPassword, finalImagePath, bio, userId]
      );

      return res.json({
        data: [""],
        message: ["Usuário atualizado com sucesso"],
        result: true,
      });
    } catch (error: unknown) {
      console.error(error);

      const dbError = error as { code?: string; constraint?: string };
      if (
        dbError?.code === "23505" &&
        dbError?.constraint === "users_email_key"
      ) {
        return res.status(400).json({
          data: [""],
          message: ["Este email já está cadastrado. Use outro email."],
          result: false,
        });
      }

      return res.status(500).json({
        data: [""],
        message: ["Algo deu errado!"],
        result: false,
      });
    }
  }
);

export default router;
