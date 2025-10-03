export class Client {
  id: string;
  document: string;
  fullName: string;
  email: string;
  password: string;
  walletId?: string  | null;
  createdAt: Date;
  updatedAt: Date;
}
