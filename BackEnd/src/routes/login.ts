import { Router, Request, Response } from "express";
import { pool } from "../db";

interface LoginProps {
  id: number;
  name: string;
  email: string;
  pfp: string;
  bio: string;
}

const router = Router();

// Rota GET para testar
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Rota de login ativa. Use POST para fazer login.",
    result: true,
  });
});

// Rota POST para login
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validação
    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Por favor, informe seu email",
        result: false,
      });
    }

    if (!password || password.trim() === "") {
      return res.status(400).json({
        message: "Por favor, informe sua senha",
        result: false,
      });
    }

    const result = await pool.query<LoginProps>(
      'SELECT id, name, email, profile_photo as "pfp", bio FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
        result: false,
      });
    }

    return res.json({
      data: user,
      message: ["Login realizado com sucesso"],
      result: true,
    });
  } catch (error) {
    console.error("❌ Erro na rota de login:", error);

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
