import { Router, Request, Response } from "express";
import { pool } from "../db";
import { ApiResponse } from "../types/genericApi.interface";

interface FeedCreateBody {
  userId: number;
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

interface CommentResponse {
  id: number;
  userId: number;
  userName: string;
  pfp: string;
  text: string;
  createdAt: string;
}

interface FeedResponse {
  id: number;
  userName: string;
  userId: number;
  description: string;
  imageUrl?: string;
  createdAt: string;
  pfp: string;
  comments?: CommentResponse[];
}

interface CreateFeedResponse {
  id: number;
}

interface CommentCreateBody {
  postId: number;
  userId: number;
  text: string;
  createdAt: Date;
}

interface CreateCommentResponse {
  id: number;
  userId: number;
  userName: string;
  pfp: string;
  text: string;
  createdAt: string;
}

const router = Router();
router.get(
  "/get-feed",
  async (_req: Request, res: Response<ApiResponse<FeedResponse[]>>) => {
    try {
      const result = await pool.query<FeedResponse>(`
        SELECT 
          p.id,
          p.user_id AS "userId",
          u.name AS "userName",
          u.profile_photo AS pfp,
          p.description,
          p.image_url AS "imageUrl",
          p.created_at AS "createdAt"
        FROM posts p
        JOIN users u ON u.id = p.user_id
        ORDER BY p.created_at DESC
      `);
      const rows = result.rows;

      // Buscar comentários para cada post
      const postsWithComments = await Promise.all(
        rows.map(async (post) => {
          const commentsResult = await pool.query<CommentResponse>(
            `
            SELECT 
              c.id,
              c.user_id AS "userId",
              u.name AS "userName",
              u.profile_photo AS pfp,
              c.text,
              c.created_at AS "createdAt"
            FROM post_comments c
            JOIN users u ON u.id = c.user_id
            WHERE c.post_id = $1
            ORDER BY c.created_at ASC
          `,
            [post.id]
          );

          return {
            ...post,
            comments: commentsResult.rows,
          };
        })
      );

      res.json({
        data: postsWithComments,
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

      const result = await pool.query<{ id: number }>(
        `INSERT INTO posts (user_id, description, image_url, created_at)
VALUES ($1, $2, $3, $4) RETURNING id`,
        [userId, description, imageUrl || null, mysqlDate]
      );

      res.json({
        data: { id: result.rows[0].id },
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

router.post(
  "/comment/create",
  async (req: Request, res: Response<ApiResponse<CreateCommentResponse>>) => {
    try {
      const { postId, userId, text, createdAt }: CommentCreateBody = req.body;

      if (!postId || !userId || !text) {
        return res.status(400).json({
          data: null,
          message: ["postId, userId e text são obrigatórios"],
          result: false,
        });
      }

      // Verificar se o post existe
      const postCheck = await pool.query<{ id: number }>(
        `SELECT id FROM posts WHERE id = $1`,
        [postId]
      );

      if (postCheck.rows.length === 0) {
        return res.status(404).json({
          data: null,
          message: ["Post não encontrado"],
          result: false,
        });
      }

      const mysqlDate = new Date(createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const result = await pool.query<{
        id: number;
        user_id: number;
        text: string;
        created_at: string;
      }>(
        `INSERT INTO post_comments (post_id, user_id, text, created_at)
         VALUES ($1, $2, $3, $4) RETURNING id, user_id, text, created_at`,
        [postId, userId, text, mysqlDate]
      );

      // Buscar informações do usuário
      const userResult = await pool.query<{
        name: string;
        profile_photo: string;
      }>(`SELECT name, profile_photo FROM users WHERE id = $1`, [userId]);

      const user = userResult.rows[0];

      const commentResponse: CreateCommentResponse = {
        id: result.rows[0].id,
        userId: result.rows[0].user_id,
        userName: user.name,
        pfp: user.profile_photo || "",
        text: result.rows[0].text,
        createdAt: result.rows[0].created_at,
      };

      res.json({
        data: commentResponse,
        message: ["Comentário criado com sucesso"],
        result: true,
      });
    } catch (error) {
      console.error("Erro na rota POST /comment/create:", error);
      res.status(500).json({
        data: null,
        message: ["Erro interno do servidor"],
        result: false,
      });
    }
  }
);

export default router;
