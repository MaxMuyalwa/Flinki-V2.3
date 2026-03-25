import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
