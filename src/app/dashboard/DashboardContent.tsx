"use client";

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './dashboard.module.css';
import { DollarSign, Users, Activity, ThumbsUp, MoreHorizontal, Download, Plus } from 'lucide-react';
import { KPICard } from '@/components/dashboard/ui/KPICard';
import { ProductTable, Product } from '@/components/dashboard/ui/ProductTable';
import { LineChart, BarChart } from '@/components/dashboard/ui/Charts';
import { FeedbackCard } from '@/components/dashboard/ui/FeedbackCard';
import { Button } from '@/components/dashboard/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/dashboard/ui/Card';
import { Modal } from '@/components/dashboard/ui/Modal';
import { AddProductForm } from '@/components/dashboard/ui/AddProductForm';
import { Select } from '@/components/dashboard/ui/Select';

const initialProducts: Product[] = [
  { id: '1', name: 'Yakult Original', variant: '5-Pack', price: '$4.99', stockStatus: 'In Stock', sales: 12400 },
  { id: '2', name: 'Yakult Light', variant: '5-Pack', price: '$4.99', stockStatus: 'In Stock', sales: 8100 },
  { id: '3', name: 'Yakult Plus', variant: '5-Pack', price: '$5.49', stockStatus: 'Low Stock', sales: 2300 },
  { id: '4', name: 'Yakult Balance', variant: '5-Pack', price: '$5.49', stockStatus: 'Out of Stock', sales: 450 },
];

const mockFeedback = [
  { id: '1', name: 'Sarah J.', rating: 5, comment: 'The new packaging is great, love the smaller multipacks!' },
  { id: '2', name: 'Michael T.', rating: 4, comment: 'Yakult Light is my daily go-to. Digestion has improved.' },
  { id: '3', name: 'Emma R.', rating: 5, comment: 'Would love to see a larger bottle size option.' },
  { id: '4', name: 'John D.', rating: 3, comment: 'Hard to find the plus version in stores.' },
];

export function DashboardContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [stockFilter, setStockFilter] = useState('All');
  const [sortBy, setSortBy] = useState<keyof Product>('sales');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const [feedbackFilter, setFeedbackFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSort = (field: keyof Product) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // Default to desc when changing field
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = stockFilter === 'All' || p.stockStatus === stockFilter;
        return matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (sortBy === 'price') {
          valA = parseFloat((valA as string).replace('$', ''));
          valB = parseFloat((valB as string).replace('$', ''));
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [products, searchQuery, stockFilter, sortBy, sortOrder]);

  const filteredFeedback = useMemo(() => {
    return mockFeedback.filter(f => feedbackFilter === 'All' || f.rating.toString() === feedbackFilter);
  }, [feedbackFilter]);

  // Derived data for charts
  const salesDataPoints = useMemo(() => {
    if (filteredProducts.length === 0) return [0, 0, 0, 0, 0];
    return filteredProducts.map(p => p.sales).slice(0, 7); // Show max 7 points
  }, [filteredProducts]);

  const engagementDataPoints = useMemo(() => {
    return filteredFeedback.map(f => f.rating * 20); // Scale 1-5 to 20-100
  }, [filteredFeedback]);

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'sales'>) => {
    const product: Product = {
      ...newProduct,
      id: Math.random().toString(),
      sales: 0,
    };
    setProducts([...products, product]);
    setIsAddModalOpen(false);
  };

  return (
    <main className={styles.pageContent}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Overview</h1>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Select 
            options={[
              { label: 'All Stock', value: 'All' },
              { label: 'In Stock', value: 'In Stock' },
              { label: 'Low Stock', value: 'Low Stock' },
              { label: 'Out of Stock', value: 'Out of Stock' },
            ]}
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          />
          <Button variant="secondary" onClick={() => alert('Exporting data...')}>
            <Download size={16} /> Export
          </Button>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add Product
          </Button>
        </div>
      </div>

      {/* Top row: KPI cards */}
      <div className={styles.kpiGrid}>
        <KPICard title="Total Sales" value="$124,563" icon={DollarSign} trendValue="+12.5% from last month" trendPositive={true} />
        <KPICard title="Active Customers" value="45,231" icon={Users} trendValue="+5.2% from last month" trendPositive={true} />
        <KPICard title="Daily Consumption" value="112k bottles" icon={Activity} trendValue="+8.1% from last month" trendPositive={true} />
        <KPICard title="Satisfaction Rate" value="98.4%" icon={ThumbsUp} trendValue="+0.4% from last month" trendPositive={true} />
      </div>

      {/* Middle section: Charts */}
      <div className={styles.chartGrid}>
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend ({filteredProducts.length} items)</CardTitle>
            <Button variant="icon"><MoreHorizontal size={20} /></Button>
          </CardHeader>
          <LineChart dataPoints={salesDataPoints.length > 0 ? salesDataPoints : [0,0,0]} />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Engagement</CardTitle>
            <Button variant="icon"><MoreHorizontal size={20} /></Button>
          </CardHeader>
          <BarChart dataPoints={engagementDataPoints.length > 0 ? engagementDataPoints : [0,0]} />
        </Card>
      </div>

      {/* Bottom section: Product table, Customer feedback */}
      <div className={styles.bottomGrid}>
        <Card>
          <CardHeader>
            <CardTitle>Product Overview</CardTitle>
            <Button variant="icon"><MoreHorizontal size={20} /></Button>
          </CardHeader>
          <ProductTable 
            products={filteredProducts} 
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <Select 
              options={[
                { label: 'All Ratings', value: 'All' },
                { label: '5 Stars', value: '5' },
                { label: '4 Stars', value: '4' },
                { label: '3 Stars', value: '3' },
              ]}
              value={feedbackFilter}
              onChange={(e) => setFeedbackFilter(e.target.value)}
              style={{ width: 'auto', padding: 'var(--space-1) var(--space-2)' }}
            />
          </CardHeader>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredFeedback.length === 0 ? (
              <div className="text-muted" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>No feedback found.</div>
            ) : (
              filteredFeedback.map(item => (
                <FeedbackCard key={item.id} name={item.name} rating={item.rating} comment={item.comment} />
              ))
            )}
          </div>
        </Card>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Product">
        <AddProductForm onAdd={handleAddProduct} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>
    </main>
  );
}
