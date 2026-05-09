"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, HeartPulse, MessageSquare, LineChart, Settings } from 'lucide-react';
import styles from '@/app/dashboard/dashboard.module.css';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Health Benefits', href: '/dashboard/benefits', icon: HeartPulse },
  { name: 'Customer Feedback', href: '/dashboard/feedback', icon: MessageSquare },
  { name: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Link href="/">
          <h2 className="text-primary font-instrument" style={{ margin: 0 }}>Yakult</h2>
        </Link>
      </div>
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
          return (
            <Link key={item.name} href={item.href} className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
              <item.icon className={styles.navIcon} size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
