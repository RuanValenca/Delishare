import { Router, Request, Response } from "express";
import { pool } from "../db";
import { ApiResponse } from "../types/genericApi.interface";
import { upload } from "../middleware/upload";
import { saveFileToPublic } from "../util/fileUpload";

// URL base do backend (usar variável de ambiente ou padrão)
const getBaseUrl = (req: Request): string => {
  // Se tiver variável de ambiente BACKEND_URL, usa ela
  if (process.env.BACKEND_URL) {
    // Remove barra final se houver
    return process.env.BACKEND_URL.replace(/\/$/, "");
  }
  // Senão, constrói a partir da requisição
  return `${req.protocol}://${req.get("host")}`;
};

interface CreateRecipeResponse {
  id: number;
}

interface CreateRecipeBody {
  userId: string;
  recipeName: string;
  description: string;
  instructions: string;
  createdAt: string;
  time: string;
  meal: string;
  difficulty: string;
}

interface ResponseData {
  id: number;
  userId: number;
  recipeName: string;
  description: string;
  instructions: string;
  img: string;
  meal: string;
  difficulty: string;
  time: string;
  createdAt: string;
}

const router = Router();

router.get("/get-recipes", async (req: Request, res: Response) => {
  try {
    const result = await pool.query<ResponseData>(
      `SELECT 
      id,
      user_id AS "userId",
      "recipeName",
      description,
      instructions,
      meal,
      difficulty,
      time,
      image_url AS img,
      created_at AS "createdAt"
    FROM recipes`
    );
    const rows = result.rows;

    // Adicionar URL completa para as imagens
    const baseUrl = getBaseUrl(req);
    const recipesWithUrls = rows.map((recipe) => ({
      ...recipe,
      img: recipe.img ? `${baseUrl}${recipe.img}` : null,
    }));

    res.json({
      data: recipesWithUrls,
      message: ["Receitas listadas com sucesso"],
      result: true,
    });
  } catch (error) {
    console.error("Erro na rota GET /get-recipes:", error);
    res.status(500).json({
      data: null,
      message: ["Erro interno do servidor"],
      result: false,
    });
  }
});

router.post(
  "/create",
  upload.single("image"),
  async (req: Request, res: Response<ApiResponse<CreateRecipeResponse>>) => {
    try {
      const {
        userId,
        recipeName,
        description,
        instructions,
        createdAt,
        time,
        meal,
        difficulty,
      } = req.body as CreateRecipeBody;

      // Salvar arquivo na pasta pública usando a função utilitária
      const imagePath = req.file ? saveFileToPublic(req.file, "recipes") : null;

      const mysqlDate = new Date(createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      if (
        !userId ||
        !recipeName ||
        !description ||
        !instructions ||
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

      const result = await pool.query<{ id: number }>(
        `INSERT INTO recipes (user_id, "recipeName", description, instructions, image_url, created_at, meal, time, difficulty) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [
          Number(userId),
          recipeName,
          description,
          instructions,
          imagePath,
          mysqlDate,
          meal,
          time,
          difficulty,
        ]
      );

      res.json({
        data: { id: result.rows[0].id },
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
