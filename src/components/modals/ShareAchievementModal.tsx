import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: any;
}

export default function ShareAchievementModal({ isOpen, onClose, achievement }: ShareAchievementModalProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = achievement?.title ? `https://flinki.com/achievement/${achievement.title.toLowerCase().replace(/\s+/g, '-')}` : '';

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && achievement && (
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
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border p-3 sm:p-4 bg-secondary/10">
              <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground">Share Achievement</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-secondary transition-all active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-5 text-center">
                {achievement.image && (
                  <div className="mx-auto mb-4 h-32 w-full overflow-hidden rounded-xl shadow-inner">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <h3 className="mb-1 text-base sm:text-lg font-black uppercase tracking-widest text-flinki-navy">{achievement.title}</h3>
                <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-wider leading-relaxed">
                  {achievement.description}
                </p>
                
                {/* Metrics */}
                {achievement.metrics && achievement.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 text-left bg-flinki-navy/5 border-2 border-flinki-navy/10 p-3 rounded-xl shadow-inner mb-4">
                    {achievement.metrics.map((metric: any, idx: number) => (
                      <div key={idx}>
                        <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{metric.label}</p>
                        <p className="text-xs font-black text-flinki-navy">{metric.value}{metric.unit && <span className="ml-0.5 text-[9px] opacity-70">{metric.unit}</span>}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Devices and Apps */}
                {(achievement.devices?.length > 0 || achievement.apps?.length > 0) && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {achievement.devices?.map((device: any, idx: number) => (
                      <div key={`device-${idx}`} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[9px] font-bold text-muted-foreground shadow-sm">
                        {device.icon}
                        <span>{device.name}</span>
                      </div>
                    ))}
                    {achievement.apps?.map((app: any, idx: number) => (
                      <div key={`app-${idx}`} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[9px] font-bold text-muted-foreground shadow-sm">
                        {app.icon}
                        <span>{app.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6 flex justify-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 shadow-lg shadow-[#1DA1F2]/10 active:scale-95">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-lg shadow-[#1877F2]/10 active:scale-95">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 shadow-lg shadow-[#0A66C2]/10 active:scale-95">
                  <Linkedin className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-secondary/20 p-1.5 focus-within:border-flinki-blue focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent px-2 text-[10px] font-bold text-muted-foreground outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg bg-flinki-navy px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white hover:bg-flinki-blue transition-all active:scale-95 shadow-lg shadow-flinki-navy/20"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
