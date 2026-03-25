import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

export default function MessageModal({ isOpen, onClose, recipientName }: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
        onClose();
      }, 2000);
    }, 1000);
  };

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
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flinki-blue/10 text-flinki-blue">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tight text-flinki-navy">Message {recipientName}</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Send a direct message</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-flinki-green/10 text-flinki-green">
                    <Send className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-flinki-navy">Message Sent!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Your message has been delivered to {recipientName}.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Your Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hey ${recipientName.split(' ')[0]}, great run today!`}
                      className="h-32 w-full resize-none rounded-2xl border border-border bg-secondary/30 p-4 text-sm font-medium focus:border-flinki-blue focus:outline-none focus:ring-1 focus:ring-flinki-blue"
                    />
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!message.trim() || isSending}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-flinki-navy py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-flinki-blue disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isSending ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
