"use client";

import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';

interface LineChartProps {
  dataPoints?: number[];
}

export function LineChart({ dataPoints = [35, 20, 30, 15, 25, 5, 20] }: LineChartProps) {
  // Pad dataPoints if there are too few, just to make the chart look nice
  const paddedData = dataPoints.length < 5 
    ? [...dataPoints, ...Array(5 - dataPoints.length).fill(dataPoints[dataPoints.length - 1] || 0)] 
    : dataPoints;

  const max = Math.max(...paddedData, 40);
  const pathData = paddedData.map((point, index) => {
    const x = (index / (paddedData.length - 1)) * 100;
    const y = 40 - (point / max) * 40;
    return `${index === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

  return (
    <div className={styles.placeholderChart}>
      <div className={styles.chartLinePlaceholder}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d={pathData} fill="none" stroke="var(--primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

interface BarChartProps {
  dataPoints?: number[];
}

export function BarChart({ dataPoints = [40, 60, 80, 50, 90] }: BarChartProps) {
  const max = Math.max(...dataPoints, 100);
  
  return (
    <div className={styles.placeholderChart}>
      <div className={styles.chartBarPlaceholder}>
        {dataPoints.map((point, i) => (
          <div 
            key={i} 
            className={styles.barItem} 
            style={{ 
              height: `${(point / max) * 100}%`,
              transition: 'height 0.3s ease-out'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
