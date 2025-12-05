import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Diretório temporário para uploads (será movido depois pela função utilitária)
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configuração do storage (salva temporariamente)
const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, tempDir);
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    // Gerar nome único temporário
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `temp-${uniqueSuffix}${ext}`);
  },
});

// Filtro para aceitar apenas imagens
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
