import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface HealthBenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function HealthBenefitCard({ title, description, icon: Icon }: HealthBenefitCardProps) {
  return (
    <Card className={styles.benefitCard}>
      <div className={styles.benefitIconWrapper}>
        <Icon className={styles.benefitIcon} size={24} />
      </div>
      <div>
        <h4 className={styles.benefitTitle}>{title}</h4>
        <p className={styles.benefitDescription}>{description}</p>
      </div>
    </Card>
  );
}
