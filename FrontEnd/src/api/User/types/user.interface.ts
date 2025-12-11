export interface BodyShowResult {
  id: number;
  name: string;
  email: string;
  password: string;
  pfp: string;
  bio: string;
}

export interface BodyCreateUpdate {
  userId?: number;
  name: string;
  email: string;
  pfp?: string | File;
  bio: string;
  password: string;
  isCreate: boolean;
}
