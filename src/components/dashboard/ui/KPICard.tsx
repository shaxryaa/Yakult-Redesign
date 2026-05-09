import React from 'react';
import { Card, CardHeader, CardTitle } from './Card';
import styles from '@/app/dashboard/dashboard.module.css';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trendValue: string;
  trendPositive: boolean;
}

export function KPICard({ title, value, icon: Icon, trendValue, trendPositive }: KPICardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Icon className="text-muted" size={20} />
      </CardHeader>
      <div className={styles.kpiValue}>{value}</div>
      <div className={`${styles.kpiTrend} ${trendPositive ? styles.trendPositive : styles.trendNegative}`}>
        {trendValue}
      </div>
    </Card>
  );
}
