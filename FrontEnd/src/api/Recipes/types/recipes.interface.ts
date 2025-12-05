export interface ShowResult {
  id: number;
  userId: number;
  recipeName: string;
  description: string;
  meal: "Almoço" | "Lanche" | "Jantar" | "Café";
  difficulty: "Fácil" | "Médio" | "Difícil";
  time: string;
  img: string | null;
  instructions: string | null;
  createdAt: string | Date;
}

export interface BodyCreate {
  userId?: number;
  recipeName: string;
  description: string;
  instructions: string;
  createdAt: string;
  time: string;
  meal: string;
  difficulty: string;
}
