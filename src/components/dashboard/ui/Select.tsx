import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string | number }[];
}

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <select className={`${styles.formSelect} ${className}`} {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
