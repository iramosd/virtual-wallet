export class Token {
  id: string;
  clientId: string;
  token: string;
  refreshToken?: string;
  type: 'ACCESS' | 'REFRESH' | 'VERIFICATION' | 'RESET_PASSWORD';
  isActive: boolean;
  expiresAt: Date;
  usedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
