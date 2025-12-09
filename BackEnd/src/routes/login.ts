import { Router, Request, Response } from "express";
import { pool } from "../db";

interface LoginProps {
  id: number;
  name: string;
  email: string;
  profilePhoto: string;
  bio: string;
}

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios.", result: false });
    }

    // Verifica se o pool está conectado
    if (!pool) {
      console.error("❌ Pool de conexão não disponível");
      return res.status(500).json({
        data: null,
        message: ["Erro de conexão com o banco de dados"],
        result: false,
      });
    }

    const result = await pool.query<LoginProps>(
      'SELECT id, name, email, profile_photo as "profilePhoto", bio FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou senha inválidos.", result: false });
    }

    return res.json({
      data: user,
      message: ["Login realizado com sucesso"],
      result: true,
    });
  } catch (error) {
    console.error("❌ Erro na rota de login:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Detalhes do erro:", errorMessage);

    // Garante que a resposta seja enviada mesmo em caso de erro
    if (!res.headersSent) {
      res.status(500).json({
        data: null,
        message: ["Algo deu errado!"],
        result: false,
      });
    }
  }
});

export default router;
