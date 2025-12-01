import { Router, Request, Response } from "express";
import { pool } from "../db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { ApiResponse } from "../types/genericApi.interface";

interface FeedCreateBody {
  userId: number;
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

interface FeedResponse extends RowDataPacket {
  id: number;
  userName: string;
  userId: number;
  description: string;
  imageUrl?: string;
  createdAt: string;
  pfp: File;
}

interface CreateFeedResponse {
  id: number;
}

const router = Router();
router.get(
  "/get-feed",
  async (_req: Request, res: Response<ApiResponse<FeedResponse[]>>) => {
    try {
      const [rows] = await pool.query<FeedResponse[]>(`
        SELECT 
          p.id,
          p.user_id AS userId,
          u.name AS userName,
          u.profile_photo AS pfp,
          p.description,
          p.image_url AS imageUrl,
          p.created_at AS createdAt
        FROM posts p
        JOIN users u ON u.id = p.user_id
        ORDER BY p.created_at DESC
      `);

      res.json({
        data: rows,
        message: ["Feeds listados com sucesso"],
        result: true,
      });
    } catch (error) {
      console.error("Erro na rota GET /get-feed:", error);
      res.status(500).json({
        data: null,
        message: ["Erro interno do servidor"],
        result: false,
      });
    }
  }
);

router.post(
  "/create",
  async (req: Request, res: Response<ApiResponse<CreateFeedResponse>>) => {
    try {
      const { userId, description, imageUrl, createdAt }: FeedCreateBody =
        req.body;

      if (!userId || !description) {
        return res.status(400).json({
          data: null,
          message: ["userId e description são obrigatórios"],
          result: false,
        });
      }

      const mysqlDate = new Date(createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO posts (user_id, description, image_url, created_at)
VALUES (?, ?, ?, ?)`,
        [userId, description, imageUrl || null, mysqlDate]
      );

      res.json({
        data: { id: result.insertId },
        message: ["Feed criado com sucesso"],
        result: true,
      });
    } catch (error) {
      console.error("Erro na rota POST /create-feed:", error);
      res.status(500).json({
        data: null,
        message: ["Erro interno do servidor"],
        result: false,
      });
    }
  }
);

export default router;
