export class CreateTransactionDto {
  walletId: string;
  clientId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'PAYMENT';
  amount: number;
  currency: string;
  description: string;
  reference: string;
  fee?: number;
  fromWallet?: string;
  toWallet?: string;
  metadata?: any;
}
