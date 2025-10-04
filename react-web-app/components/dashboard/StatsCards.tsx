'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CreditCard, TrendingUp, Users } from 'lucide-react';
import { useWallet } from '@/hooks';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  textColor: string;
}

const stats: StatCard[] = [
  {
    title: 'Saldo Total',
    value: '$2,350.00',
    change: '+12% desde el mes pasado',
    icon: Wallet,
    gradient: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-100'
  },
  {
    title: 'Ingresos',
    value: '$1,250.00',
    change: '+8% desde el mes pasado',
    icon: TrendingUp,
    gradient: 'from-green-500 to-green-600',
    textColor: 'text-green-100'
  },
  {
    title: 'Gastos',
    value: '$890.00',
    change: '-3% desde el mes pasado',
    icon: CreditCard,
    gradient: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-100'
  },
  {
    title: 'Transacciones',
    value: '24',
    change: 'Este mes',
    icon: Users,
    gradient: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-100'
  }
];

export default function StatsCards() {

const { wallet: virtualWallet } = useWallet();

return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card 
            key={index}
            className={`bg-gradient-to-br ${stat.gradient} text-white`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <IconComponent className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.title !== 'Saldo Total' ? stat.value : virtualWallet?.balance}</div>
              <p className={`text-xs ${stat.textColor}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
