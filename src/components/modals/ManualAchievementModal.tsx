import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Calendar, AlignLeft, Image as ImageIcon, ChevronRight, Check } from 'lucide-react';

interface ManualAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (achievement: any) => void;
}

export default function ManualAchievementModal({ isOpen, onClose, onSave }: ManualAchievementModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    image: 'https://loremflickr.com/1200/800/sports',
    status: 'COMPLETED',
    color: 'bg-flinki-navy',
    verified: false
  });

  const colors = [
    { name: 'Navy', class: 'bg-flinki-navy' },
    { name: 'Orange', class: 'bg-flinki-orange' },
    { name: 'Blue', class: 'bg-flinki-blue' },
    { name: 'Green', class: 'bg-flinki-green' },
    { name: 'Purple', class: 'bg-flinki-purple' },
    { name: 'Gold', class: 'bg-flinki-gold' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAchievement = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      progress: formData.status === 'COMPLETED' ? 100 : 0,
      metrics: [
        { label: '# of Logs', value: '0' },
        { label: 'Distance', value: '0', unit: 'km' },
        { label: 'Time', value: '0h 0m' },
        { label: 'Avg Pace', value: '0:00', unit: '/km' },
      ],
      logs: [],
      createdAt: new Date().toISOString()
    };
    if (onSave) onSave(newAchievement);
    onClose();
    // Reset form
    setStep(1);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      image: 'https://loremflickr.com/1200/800/sports',
      status: 'COMPLETED',
      color: 'bg-flinki-navy',
      verified: false
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border p-4 sm:p-5 bg-secondary/10">
            <div>
              <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground">Add Manual Entry</h2>
              <p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Step {step} of 2</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg bg-secondary/50 p-1.5 text-muted-foreground hover:text-foreground transition-all active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {step === 1 ? (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Achievement Title</label>
                  <div className="relative">
                    <Trophy className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. London Marathon 2026"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-flinki-blue focus:bg-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-flinki-blue focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 px-4 text-xs font-bold focus:border-flinki-blue focus:bg-white focus:outline-none transition-all appearance-none"
                    >
                      <option value="COMPLETED">Completed</option>
                      <option value="ONGOING">Ongoing</option>
                      <option value="PLANNED">Planned</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Theme Color</label>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.class })}
                        className={`group relative h-8 w-8 rounded-lg transition-all ${color.class} ${
                          formData.color === color.class ? 'ring-2 ring-flinki-blue ring-offset-2 scale-110 shadow-lg' : 'hover:scale-110 opacity-70 hover:opacity-100'
                        }`}
                        title={color.name}
                      >
                        {formData.color === color.class && (
                          <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-flinki-navy py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-flinki-navy/20 hover:bg-flinki-blue transition-all active:scale-95"
                >
                  Next Details
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cover Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="url"
                      placeholder="https://loremflickr.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-flinki-blue focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                  <p className="mt-1.5 text-[8px] sm:text-[9px] font-bold text-muted-foreground italic uppercase tracking-wider">Leave empty for a default placeholder</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Description</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <textarea
                      placeholder="Tell the story of this achievement..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="h-24 w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-flinki-blue focus:bg-white focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border-2 border-border py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-secondary transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] rounded-xl bg-flinki-orange py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-flinki-navy transition-all shadow-lg shadow-flinki-orange/20 active:scale-95"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
