export interface ShowResult {
  id: number;
  userId: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  userName: string;
  pfp: string | null;
}

export interface BodyCreate {
  userId: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}
