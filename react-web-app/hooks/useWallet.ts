'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8002/api';

interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface WalletStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactionCount: number;
  incomeChange: number;
  expenseChange: number;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

interface UseWalletReturn {
  wallet: Wallet | null;
  stats: WalletStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWallet(): UseWalletReturn {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      throw new Error('Usuario no autenticado');
    }
    const user = JSON.parse(userData);
    const token = user.session.id;
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('Usuario no autenticado');
      }

      const user = JSON.parse(userData);
      
      const walletId = user.walletId || user.id;

      const walletResponse = await fetch(`${API_BASE_URL}/wallets/${walletId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!walletResponse.ok) {
        throw new Error(`Error al obtener wallet: ${walletResponse.status}`);
      }

      const walletData = await walletResponse.json();

      if (walletData.code !== 200) {
        throw new Error(walletData.message || 'Error al obtener wallet');
      }

      setWallet(walletData.data);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return {
    wallet,
    stats,
    loading,
    error,
    refetch: fetchWallet,
  };
}

export function useWalletOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      throw new Error('Usuario no autenticado');
    }
    const user = JSON.parse(userData);
    const token = user.token || user.id;
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const updateBalance = async (amount: number, operation: 'add' | 'subtract') => {
    try {
      setLoading(true);
      setError(null);

      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('Usuario no autenticado');
      }

      const user = JSON.parse(userData);
      const walletId = user.walletId || user.id;

      const response = await fetch(`${API_BASE_URL}/wallets/${walletId}/balance`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          amount,
          operation,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar balance: ${response.status}`);
      }

      const data: ApiResponse<Wallet> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Error al actualizar balance');
      }

      return data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const transferFunds = async (toWalletId: string, amount: number, description?: string) => {
    try {
      setLoading(true);
      setError(null);

      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('Usuario no autenticado');
      }

      const user = JSON.parse(userData);
      const fromWalletId = user.walletId || user.id;

      const response = await fetch(`${API_BASE_URL}/wallets/transfer`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          fromWalletId,
          toWalletId,
          amount,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en transferencia: ${response.status}`);
      }

      const data: ApiResponse<{ transaction: any; fromWallet: Wallet; toWallet: Wallet }> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Error en transferencia');
      }

      return data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateBalance,
    transferFunds,
  };
}
