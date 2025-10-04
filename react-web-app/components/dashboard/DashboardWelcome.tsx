'use client';

import { useAuth } from '@/lib/auth-context';

export default function DashboardWelcome() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        ¡Bienvenido, {user.name}!
      </h2>
      <p className="text-gray-600">
        Aquí tienes un resumen de tu cuenta y actividades recientes.
      </p>
    </div>
  );
}
