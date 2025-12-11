export interface BodyShowResult {
  id: number;
  name: string;
  email: string;
  password: string;
  pfp: string;
  bio: string;
}

export interface BodyCreate {
  name: string;
  email: string;
  pfp?: string | File;
  bio: string;
  password: string;
}

export interface BodyUpdate {
  userId: number;
  name: string;
  email: string;
  pfp?: string | File;
  bio: string;
  password: string;
}
