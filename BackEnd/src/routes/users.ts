import { Router, Request, Response } from "express";
import { pool } from "../db";
import { ApiResponse } from "../types/genericApi.interface";
import { RowDataPacket } from "mysql2";

export interface UpdateUserBody {
  userId: number;
  name: string;
  email: string;
  pfp: string;
  bio: string;
  password: string;
  isCreate: boolean;
}

export interface GetUserResponse extends RowDataPacket {
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
      const [rows] = await pool.query<GetUserResponse[]>(
        `
        SELECT id, name, email, password, profile_photo AS pfp, bio
        FROM users
        WHERE id = ?
        `,
        [userId]
      );

      res.json({
        data: rows,
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
  async (req: Request, res: Response<ApiResponse<string[]>>) => {
    try {
      const {
        userId,
        email,
        name,
        password,
        pfp,
        bio,
        isCreate,
      }: UpdateUserBody = req.body;

      if (isCreate) {
        await pool.query(
          `
          INSERT INTO users (name, email, password, profile_photo, bio, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, NOW(), NOW())
          `,
          [name, email, password, pfp, bio]
        );
      } else {
        await pool.query(
          `
          UPDATE users
          SET name = ?, email = ?, password = ?, profile_photo = ?, bio = ?, updated_at = NOW()
          WHERE id = ?
          `,
          [name, email, password, pfp, bio, userId]
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
