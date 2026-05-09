"use client";

import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';
import { Badge } from './Badge';

export interface Product {
  id: string;
  name: string;
  variant: string;
  price: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  sales: number;
}

interface ProductTableProps {
  products: Product[];
  onSort?: (field: keyof Product) => void;
  sortBy?: keyof Product;
  sortOrder?: 'asc' | 'desc';
}

export function ProductTable({ products, onSort, sortBy, sortOrder }: ProductTableProps) {
  const getStatusVariant = (status: Product['stockStatus']) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'danger';
      default: return 'default';
    }
  };

  const renderSortIndicator = (field: keyof Product) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{ cursor: onSort ? 'pointer' : 'default' }} onClick={() => onSort?.('name')}>
            Product Name{renderSortIndicator('name')}
          </th>
          <th style={{ cursor: onSort ? 'pointer' : 'default' }} onClick={() => onSort?.('variant')}>
            Variant{renderSortIndicator('variant')}
          </th>
          <th style={{ cursor: onSort ? 'pointer' : 'default' }} onClick={() => onSort?.('price')}>
            Price{renderSortIndicator('price')}
          </th>
          <th style={{ cursor: onSort ? 'pointer' : 'default' }} onClick={() => onSort?.('stockStatus')}>
            Stock Status{renderSortIndicator('stockStatus')}
          </th>
          <th style={{ cursor: onSort ? 'pointer' : 'default' }} onClick={() => onSort?.('sales')}>
            Sales{renderSortIndicator('sales')}
          </th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 && (
          <tr>
            <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)' }} className="text-muted">
              No products found.
            </td>
          </tr>
        )}
        {products.map((product) => (
          <tr key={product.id} className={styles.tableRow}>
            <td className={styles.tableCellMain}>{product.name}</td>
            <td>{product.variant}</td>
            <td>{product.price}</td>
            <td>
              <Badge variant={getStatusVariant(product.stockStatus)}>
                {product.stockStatus}
              </Badge>
            </td>
            <td>{product.sales.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
