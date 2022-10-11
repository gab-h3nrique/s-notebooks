export type User = {
  name: string;
  email: string;
  password: string;
}

export type UserAuth = {
  id: number;
  name: string;
  email: string;
} | null
