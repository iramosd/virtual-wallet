'use client';

import ProtectedRoute from '@/components/protected-route';
import { DashboardHeader, DashboardWelcome, StatsCards, ActivityCard, MetricsCard } from '@/components/dashboard';
import { useWallet } from '@/hooks';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardWelcome />
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityCard />
          <MetricsCard />
        </div>
      </main>
    </div>
  );
}
