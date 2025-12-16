import fs from "fs";
import path from "path";

export function saveFileToPublic(
  file: Express.Multer.File,
  directory: string,
  userId: number,
  itemId: number
): string {
  const cleanDirectory = directory.startsWith("/")
    ? directory.slice(1)
    : directory;

  const publicDir = path.join(__dirname, "../public");
  const targetDir = path.join(publicDir, cleanDirectory);

  // Cria a pasta se não existir
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const ext = path.extname(file.originalname);
  const filename = `${dateStr}-${userId}-${itemId}${ext}`;

  const filePath = path.join(targetDir, filename);

  // Copia e remove o arquivo temporário para evitar problemas de rename no Windows
  fs.copyFileSync(file.path, filePath);
  fs.unlinkSync(file.path);

  return `/${cleanDirectory}/${filename}`;
}
