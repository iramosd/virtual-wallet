export class Transaction {
  id: string;
  walletId: string;
  clientId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'PAYMENT';
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  description: string;
  reference: string;
  fee: number;
  fromWallet?: string;
  toWallet?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
