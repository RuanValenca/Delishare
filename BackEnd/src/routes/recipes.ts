import { Router, Request, Response } from "express";
import { pool } from "../db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { ApiResponse } from "../types/genericApi.interface";

interface CreateRecipeResponse {
  id: number;
}

interface CreateBody {
  userId: number;
  recipeName: string;
  description: string;
  img: string;
  createdAt: Date;
  time: string;
  meal: string;
  difficulty: string;
}
interface ResponseData extends RowDataPacket {
  id: number;
  userId: number;
  recipeName: string;
  description: string;
  meal: string;
  difficulty: string;
  instructions: string;
  createdAt: string;
}

const router = Router();

router.get("/get-recipes", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<ResponseData[]>(
      `SELECT 
      id,
      user_id AS userId,
      recipeName,
      description,
      meal,
      difficulty,
      image_url AS img,
      created_at AS createdAt
    FROM recipes`
    );

    res.json({
      data: rows,
      message: ["Receitas listadas com sucesso"],
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
});

router.post(
  "/create",
  async (req: Request, res: Response<ApiResponse<CreateRecipeResponse>>) => {
    try {
      const {
        userId,
        recipeName,
        description,
        img,
        createdAt,
        time,
        meal,
        difficulty,
      }: CreateBody = req.body;

      const mysqlDate = new Date(createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      if (
        !userId ||
        !recipeName ||
        !description ||
        !createdAt ||
        !time ||
        !meal ||
        !difficulty
      ) {
        return res.status(400).json({
          data: null,
          message: ["Todos os campos são obrigatórios"],
          result: false,
        });
      }

      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO recipes (user_id as userId ,recipeName, description, image_url as imageUrl, created_at as createdAt, meal, time, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          recipeName,
          description,
          img,
          mysqlDate,
          meal,
          time,
          difficulty,
        ]
      );

      res.json({
        data: { id: result.insertId },
        message: ["Receita criada com sucesso"],
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

export default router;
