import React, { useState } from 'react';
import styles from '@/app/dashboard/dashboard.module.css';
import { Button } from './Button';
import { Product } from './ProductTable';

interface AddProductFormProps {
  onAdd: (product: Omit<Product, 'id' | 'sales'>) => void;
  onCancel: () => void;
}

export function AddProductForm({ onAdd, onCancel }: AddProductFormProps) {
  const [name, setName] = useState('');
  const [variant, setVariant] = useState('');
  const [price, setPrice] = useState('');
  const [stockStatus, setStockStatus] = useState<Product['stockStatus']>('In Stock');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    onAdd({
      name,
      variant,
      price: price.startsWith('$') ? price : `$${price}`,
      stockStatus
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Product Name</label>
        <input required type="text" className={styles.formInput} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Yakult Plus" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Variant</label>
        <input type="text" className={styles.formInput} value={variant} onChange={(e) => setVariant(e.target.value)} placeholder="e.g. 5-Pack" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Price</label>
        <input required type="text" className={styles.formInput} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 5.49" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Stock Status</label>
        <select className={styles.formSelect} value={stockStatus} onChange={(e) => setStockStatus(e.target.value as Product['stockStatus'])}>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-6)', justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Add Product</Button>
      </div>
    </form>
  );
}
