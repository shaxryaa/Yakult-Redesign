import React from 'react';
import styles from '@/app/dashboard/dashboard.module.css';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <Button variant="icon" onClick={onClose}><X size={20} /></Button>
        </div>
        {children}
      </div>
    </div>
  );
}
