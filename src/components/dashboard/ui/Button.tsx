import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const btnClass = variant === 'icon' ? styles.iconButton : `${styles.btn} ${styles[`btn-${variant}`]}`;
  return (
    <button className={`${btnClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
