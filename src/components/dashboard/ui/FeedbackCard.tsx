import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';
import { Star } from 'lucide-react';

interface FeedbackCardProps {
  name: string;
  rating: number; // 1-5
  comment: string;
}

export function FeedbackCard({ name, rating, comment }: FeedbackCardProps) {
  return (
    <div className={styles.feedbackItem}>
      <div className={styles.feedbackHeader}>
        <div className={styles.feedbackName}>{name}</div>
        <div className={styles.feedbackStars}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < rating ? "var(--primary)" : "none"} color={i < rating ? "var(--primary)" : "var(--text-muted)"} />
          ))}
        </div>
      </div>
      <div className={styles.feedbackComment}>&quot;{comment}&quot;</div>
    </div>
  );
}
