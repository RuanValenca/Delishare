import { Router, Request, Response } from "express";
import { pool } from "../db";
import { ApiResponse } from "../types/genericApi.interface";
import { saveFileToPublic } from "../util/fileUpload";
import { upload } from "../config/multer";
import { supabase } from "../lib/supabase";

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

    const recipesWithUrls = rows.map((recipe) => ({
      ...recipe,
      img: recipe.img || null,
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
  upload.single("image"), // multer memoryStorage para req.file.buffer
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

      const mysqlDate = new Date(createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const missingFields: string[] = [];
      if (!recipeName?.trim()) missingFields.push("nome da receita");
      if (!description?.trim()) missingFields.push("descrição");
      if (!instructions?.trim()) missingFields.push("instruções de preparo");
      if (!time?.trim()) missingFields.push("tempo de preparo");
      if (!meal?.trim()) missingFields.push("refeição");
      if (!difficulty?.trim()) missingFields.push("dificuldade");

      if (!userId) {
        return res.status(400).json({
          data: null,
          message: ["Erro ao identificar o usuário. Tente novamente"],
          result: false,
        });
      }

      if (missingFields.length > 0) {
        const fieldsText =
          missingFields.length === 1
            ? missingFields[0]
            : missingFields.slice(0, -1).join(", ") +
              " e " +
              missingFields[missingFields.length - 1];

        return res.status(400).json({
          data: null,
          message: [`Por favor, preencha o campo: ${fieldsText}`],
          result: false,
        });
      }

      // Cria a receita sem imagem
      const result = await pool.query<{ id: number }>(
        `INSERT INTO recipes (user_id, "recipeName", description, instructions, image_url, created_at, meal, time, difficulty) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [Number(userId), recipeName, description, instructions, null, mysqlDate, meal, time, difficulty]
      );

      const recipeId = result.rows[0].id;

      // Upload para Supabase se houver imagem
      let imageUrl: string | null = null;
      if (req.file) {
        const fileExt = req.file.mimetype.split("/")[1];
        const fileName = `recipe-${recipeId}-${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage
          .from("recipes")
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true,
          });

        if (error) {
          console.error("Erro ao enviar imagem para Supabase:", error);
          return res.status(500).json({
            data: null,
            message: ["Erro ao enviar imagem"],
            result: false,
          });
        }

        const { data } = supabase.storage
          .from("recipes")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;

        // Atualiza a receita com a URL pública
        await pool.query(`UPDATE recipes SET image_url = $1 WHERE id = $2`, [
          imageUrl,
          recipeId,
        ]);
      }

      res.json({
        data: { id: recipeId },
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
