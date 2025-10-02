export class Transaction {
  id: string;
  walletId: string;
  type: string;
  amount: number;
  description?: string;
  createdAt: Date;
  sessionId?: string;
}

