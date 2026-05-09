import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[`badge-${variant}`]}`}>
      {children}
    </span>
  );
}
