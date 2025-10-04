'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  title: string;
  description: string;
  amount: string;
  time: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    title: 'Pago recibido',
    description: 'De: Juan Pérez',
    amount: '+$250.00',
    time: 'Hace 2 horas'
  },
  {
    id: '2',
    type: 'expense',
    title: 'Compra en línea',
    description: 'Amazon.com',
    amount: '-$89.99',
    time: 'Ayer'
  },
  {
    id: '3',
    type: 'transfer',
    title: 'Transferencia',
    description: 'A: María García',
    amount: '-$150.00',
    time: 'Hace 3 días'
  }
];

const getTransactionStyles = (type: Transaction['type']) => {
  switch (type) {
    case 'income':
      return {
        bgColor: 'bg-green-50',
        dotColor: 'bg-green-500',
        textColor: 'text-green-600'
      };
    case 'expense':
      return {
        bgColor: 'bg-red-50',
        dotColor: 'bg-red-500',
        textColor: 'text-red-600'
      };
    case 'transfer':
      return {
        bgColor: 'bg-blue-50',
        dotColor: 'bg-blue-500',
        textColor: 'text-blue-600'
      };
    default:
      return {
        bgColor: 'bg-gray-50',
        dotColor: 'bg-gray-500',
        textColor: 'text-gray-600'
      };
  }
};

export default function ActivityCard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Actividad Reciente
        </CardTitle>
        <CardDescription>
          Tus últimas transacciones y movimientos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const styles = getTransactionStyles(transaction.type);
            return (
              <div 
                key={transaction.id}
                className={`flex items-center justify-between p-3 ${styles.bgColor} rounded-lg`}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 ${styles.dotColor} rounded-full mr-3`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${styles.textColor}`}>
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            Ver todas las transacciones
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
