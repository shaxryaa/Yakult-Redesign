import React, { Suspense } from 'react';
import { DashboardContent } from './DashboardContent';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem' }}>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
