import fs from "fs";
import path from "path";
import { Express } from "express-serve-static-core";

export function saveFileToPublic(
  file: Express.Multer.File,
  directory: string
): string {
  // Remover barra inicial se houver
  const cleanDirectory = directory.startsWith("/")
    ? directory.slice(1)
    : directory;

  // __dirname em runtime será backend/src/util, então ../public = backend/src/public
  // Mesmo caminho que o app.ts usa para servir arquivos estáticos
  const publicDir = path.join(__dirname, "../public");
  const targetDir = path.join(publicDir, cleanDirectory);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const filename = `${cleanDirectory}-${uniqueSuffix}${ext}`;

  const filePath = path.join(targetDir, filename);

  fs.renameSync(file.path, filePath);

  return `/${cleanDirectory}/${filename}`;
}
