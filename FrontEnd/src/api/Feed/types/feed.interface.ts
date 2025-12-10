export interface Comment {
  id: number;
  userId: number;
  userName: string;
  pfp: string | null;
  text: string;
  createdAt: string;
}

export interface ShowResult {
  id: number;
  userId: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  userName: string;
  pfp: string | null;
  comments?: Comment[];
  isMocked?: boolean;
}

export interface BodyCreate {
  userId: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface BodyCreateComment {
  postId: number;
  userId: number;
  text: string;
  createdAt: string;
}
