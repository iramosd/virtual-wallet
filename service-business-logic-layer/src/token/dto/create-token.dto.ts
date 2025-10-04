export class CreateTokenDto {
  clientId: string;
  token: string;
  refreshToken?: string;
  type: 'ACCESS' | 'REFRESH' | 'VERIFICATION' | 'RESET_PASSWORD';
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
}
