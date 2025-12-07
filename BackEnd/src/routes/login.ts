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
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios.", result: false });
    }

    const result = await pool.query<LoginProps>(
      'SELECT id, name, email, profile_photo as "profilePhoto", bio FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    // Só um usuário deve voltar
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
    console.error(error);
    res.status(500).json({
      data: null,
      message: ["Algo deu errado!"],
      result: false,
    });
  }
});

// router.get("/POST", async (_req: Request, res: Response) => {
//   try {
//     const [rows] = await pool.query("SELECT name FROM users");

//     res.json({
//       data: rows,
//       message: ["Usuários carregados com sucesso"],
//       result: true,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       data: [],
//       message: ["Algo deu errado!"],
//       result: false,
//     });
//   }
// });

export default router;
