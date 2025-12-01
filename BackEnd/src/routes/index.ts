import { Router, Request, Response } from "express";

const router = Router();

// Rota padrão (GET /)
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API do AIFA funcionando 🚀" });
});

export default router;
