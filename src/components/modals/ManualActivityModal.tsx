import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, Calendar, Clock, MapPin, AlignLeft, Trophy, ChevronRight } from 'lucide-react';

interface ManualActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (activity: any) => void;
  achievements?: any[];
}

export default function ManualActivityModal({ isOpen, onClose, onSave, achievements = [] }: ManualActivityModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'Run',
    title: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    distance: '',
    location: '',
    notes: '',
    achievementId: ''
  });

  const activityTypes = ['Run', 'Trail Run', 'Walk', 'Hike', 'Cycle', 'Swim'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activityToSave = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      verified: false,
      createdAt: new Date().toISOString()
    };
    if (onSave) onSave(activityToSave);
    onClose();
    // Reset form
    setStep(1);
    setFormData({
      type: 'Run',
      title: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      distance: '',
      location: '',
      notes: '',
      achievementId: ''
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
              <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground">Manual Activity Entry</h2>
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
                  <label className="mb-2 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Activity Type</label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {activityTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`rounded-xl border-2 py-2.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
                          formData.type === type
                            ? 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-lg shadow-blue-500/10'
                            : 'border-border bg-secondary/20 text-muted-foreground hover:border-muted-foreground'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Activity Title</label>
                  <div className="relative">
                    <Activity className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. Morning Recovery Run"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
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
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="London, UK"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-slate-900/20 hover:bg-blue-500 transition-all active:scale-95"
                >
                  Next Details
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Distance (km)</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.distance}
                        onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Duration</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="HH:MM:SS"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Link to Achievement</label>
                  <div className="relative">
                    <Trophy className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      value={formData.achievementId}
                      onChange={(e) => setFormData({ ...formData, achievementId: e.target.value })}
                      className="w-full appearance-none rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="">Select an achievement (optional)</option>
                      {achievements.map((ach) => (
                        <option key={ach.id} value={ach.id}>{ach.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Notes</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <textarea
                      placeholder="How did it feel?"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="h-24 w-full rounded-xl border-2 border-border bg-secondary/20 py-2.5 pl-10 pr-4 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none"
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
                    className="flex-[2] rounded-xl bg-orange-500 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-900 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    Save Activity
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
