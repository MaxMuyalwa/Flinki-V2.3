import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title = "Delete Post" }: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-md overflow-hidden rounded-lg bg-card shadow-2xl border border-border"
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-bold">{title}</h2>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Are you sure?</h3>
              <p className="text-muted-foreground">
                This action cannot be undone. This will permanently delete your post.
              </p>
            </div>

            <div className="flex gap-3 border-t border-border p-4">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-border py-3 text-sm font-bold hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 rounded-lg bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
