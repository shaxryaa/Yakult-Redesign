"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, User, Bell } from 'lucide-react';
import styles from '@/app/dashboard/dashboard.module.css';

export default function TopBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Yakult Dashboard</h2>
        <span className="text-muted">{currentDate}</span>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.searchBar}>
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className={styles.searchInput} 
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <button className={styles.iconButton}>
          <Bell size={20} />
        </button>
        <div className={styles.userProfile}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
