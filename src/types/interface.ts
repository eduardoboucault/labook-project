export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface GetInputUser {
  q: string;
}

export interface UserDBPost {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface UserDBPut {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface UserDBDelete {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}
