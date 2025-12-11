export const compressImage = (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.8,
  maxSizeMB: number = 2
): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (file.size <= maxSizeMB * 1024 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Erro ao criar contexto do canvas");
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const currentQuality = quality;
        const tryCompress = (q: number): void => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject("Erro ao comprimir imagem");
                return;
              }

              const sizeMB = blob.size / (1024 * 1024);

              if (sizeMB > maxSizeMB && q > 0.3) {
                tryCompress(q - 0.1);
              } else {
                const compressedFile = new File([blob], file.name, {
                  type: file.type || "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            },
            file.type || "image/jpeg",
            q
          );
        };

        tryCompress(currentQuality);
      };

      img.onerror = () => {
        reject("Erro ao carregar imagem");
      };
    };

    reader.onerror = () => {
      reject("Erro ao ler arquivo");
    };

    reader.readAsDataURL(file);
  });
};
