'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface Category {
  name: string;
  percentage: number;
  color: string;
}

interface Metric {
  label: string;
  value: string;
  color: string;
}

const categories: Category[] = [
  { name: 'Compras', percentage: 45, color: 'bg-blue-500' },
  { name: 'Servicios', percentage: 30, color: 'bg-green-500' },
  { name: 'Entretenimiento', percentage: 25, color: 'bg-purple-500' }
];

const metrics: Metric[] = [
  { label: 'Ingresos', value: '$1,250', color: 'text-green-600' },
  { label: 'Gastos', value: '$890', color: 'text-red-600' }
];

export default function MetricsCard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
          Métricas del Mes
        </CardTitle>
        <CardDescription>
          Análisis de tus patrones de gasto y ahorro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gastos por categoría */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Gastos por categoría</span>
              <span className="text-sm text-gray-500">$890.00</span>
            </div>
            
            {categories.map((category, index) => (
              <div key={index} className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{category.name}</span>
                  <span className="text-xs font-medium">{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de ingresos y gastos */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-600">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de acción */}
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              Ver análisis detallado
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
