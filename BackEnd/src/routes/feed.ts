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

interface FeedCreateBody {
  userId: number;
  description: string;
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
  async (req: Request, res: Response<ApiResponse<FeedResponse[]>>) => {
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

      const baseUrl = getBaseUrl(req);

      const postsWithUrls = rows.map((post) => ({
        ...post,
        imageUrl: post.imageUrl ? `${baseUrl}${post.imageUrl}` : undefined,
        pfp: post.pfp ? `${baseUrl}${post.pfp}` : "",
      }));

      const postsWithComments = await Promise.all(
        postsWithUrls.map(async (post) => {
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

          const commentsWithUrls = commentsResult.rows.map((comment) => ({
            ...comment,
            pfp: comment.pfp ? `${baseUrl}${comment.pfp}` : "",
          }));

          return {
            ...post,
            comments: commentsWithUrls,
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
  upload.single("image"),
  async (req: Request, res: Response<ApiResponse<CreateFeedResponse>>) => {
    try {
      const { userId, description, createdAt }: FeedCreateBody = req.body;

      if (!description || description.trim() === "") {
        return res.status(400).json({
          data: null,
          message: ["Por favor, escreva algo no seu post"],
          result: false,
        });
      }

      if (!userId) {
        return res.status(400).json({
          data: null,
          message: ["Erro ao identificar o usuário. Tente novamente"],
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
        [userId, description, null, mysqlDate]
      );

      const postId = result.rows[0].id;
      const imagePath = req.file
        ? saveFileToPublic(req.file, "feed", Number(userId), postId)
        : null;

      if (imagePath) {
        await pool.query(`UPDATE posts SET image_url = $1 WHERE id = $2`, [
          imagePath,
          postId,
        ]);
      }

      res.json({
        data: { id: result.rows[0].id },
        message: ["Feed criado com sucesso"],
        result: true,
      });
    } catch (error) {
      console.error("Erro na rota POST /create:", error);
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

      if (!text || text.trim() === "") {
        return res.status(400).json({
          data: null,
          message: ["Por favor, escreva um comentário"],
          result: false,
        });
      }

      if (!userId) {
        return res.status(400).json({
          data: null,
          message: ["Erro ao identificar o usuário. Tente novamente"],
          result: false,
        });
      }

      if (!postId) {
        return res.status(400).json({
          data: null,
          message: ["Erro ao identificar o post. Tente novamente"],
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
          message: ["Este post não existe mais ou foi removido"],
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
