import React, { Suspense } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import styles from './dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Suspense fallback={<div className={styles.topbar}>Loading...</div>}>
          <TopBar />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
