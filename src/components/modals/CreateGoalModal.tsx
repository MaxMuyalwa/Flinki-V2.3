import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Target, Calendar, Image as ImageIcon, Plus, Trash2, Info } from 'lucide-react';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: any) => void;
}

export default function CreateGoalModal({ isOpen, onClose, onSave }: CreateGoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [type, setType] = useState<'GOAL' | 'CHALLENGE'>('GOAL');
  const [metrics, setMetrics] = useState([{ label: '', value: '', unit: '' }]);
  const [image, setImage] = useState('https://loremflickr.com/1200/800/sports');

  const handleAddMetric = () => {
    setMetrics([...metrics, { label: '', value: '', unit: '' }]);
  };

  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const handleMetricChange = (index: number, field: string, value: string) => {
    const newMetrics = [...metrics];
    (newMetrics[index] as any)[field] = value;
    setMetrics(newMetrics);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      date: new Date(targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      status: 'ONGOING',
      progress: 0,
      description,
      image,
      verified: false,
      metrics: metrics.filter(m => m.label && m.value),
      logs: []
    };
    onSave(newGoal);
    onClose();
    // Reset form
    setTitle('');
    setDescription('');
    setTargetDate('');
    setMetrics([{ label: '', value: '', unit: '' }]);
  };

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
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-border p-3 sm:p-4 bg-secondary/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-athlepulse-orange/10 text-athlepulse-orange shadow-inner">
                  <Trophy className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Create New {type === 'GOAL' ? 'Goal' : 'Challenge'}</h2>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Define your next milestone</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-secondary transition-all active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Type Selection */}
              <div className="flex flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setType('GOAL')}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 sm:p-4 transition-all duration-300 ${
                    type === 'GOAL' ? 'border-athlepulse-orange bg-athlepulse-orange/5 text-athlepulse-orange shadow-lg shadow-athlepulse-orange/10' : 'border-border hover:bg-secondary/50 text-muted-foreground'
                  }`}
                >
                  <div className={`p-2 sm:p-2.5 rounded-lg ${type === 'GOAL' ? 'bg-athlepulse-orange text-white' : 'bg-secondary text-muted-foreground'}`}>
                    <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Personal Goal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('CHALLENGE')}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 sm:p-4 transition-all duration-300 ${
                    type === 'CHALLENGE' ? 'border-athlepulse-navy bg-athlepulse-navy/5 text-athlepulse-navy shadow-lg shadow-athlepulse-navy/10' : 'border-border hover:bg-secondary/50 text-muted-foreground'
                  }`}
                >
                  <div className={`p-2 sm:p-2.5 rounded-lg ${type === 'CHALLENGE' ? 'bg-athlepulse-navy text-white' : 'bg-secondary text-muted-foreground'}`}>
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Community Challenge</span>
                </button>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Title</label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., London Marathon 2026"
                    className="w-full rounded-xl border-2 border-border bg-secondary/20 px-4 py-2.5 text-xs font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's the story behind this goal?"
                    rows={2}
                    className="w-full rounded-xl border-2 border-border bg-secondary/20 px-4 py-2.5 text-xs font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Target Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 pl-10 pr-4 py-2.5 text-xs font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cover Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full rounded-xl border-2 border-border bg-secondary/20 pl-10 pr-4 py-2.5 text-xs font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Target Metrics</label>
                  <button
                    type="button"
                    onClick={handleAddMetric}
                    className="flex items-center gap-1.5 rounded-lg bg-athlepulse-blue/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-athlepulse-blue hover:bg-athlepulse-blue hover:text-white transition-all"
                  >
                    <Plus className="h-3 w-3" />
                    Add Metric
                  </button>
                </div>
                <div className="space-y-3">
                  {metrics.map((metric, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-3 group p-3 rounded-xl bg-secondary/10 sm:bg-transparent sm:p-0">
                      <div className="flex-1">
                        <label className="mb-1 block text-[8px] font-black uppercase tracking-widest text-muted-foreground sm:hidden">Metric Label</label>
                        <input
                          type="text"
                          placeholder="Label (e.g., Distance)"
                          value={metric.label}
                          onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                          className="w-full rounded-xl border-2 border-border bg-secondary/20 px-3.5 py-2 text-[11px] font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all"
                        />
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-1 sm:w-24">
                          <label className="mb-1 block text-[8px] font-black uppercase tracking-widest text-muted-foreground sm:hidden">Value</label>
                          <input
                            type="text"
                            placeholder="Value"
                            value={metric.value}
                            onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                            className="w-full rounded-xl border-2 border-border bg-secondary/20 px-3.5 py-2 text-[11px] font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all"
                          />
                        </div>
                        <div className="flex-1 sm:w-20">
                          <label className="mb-1 block text-[8px] font-black uppercase tracking-widest text-muted-foreground sm:hidden">Unit</label>
                          <input
                            type="text"
                            placeholder="Unit"
                            value={metric.unit}
                            onChange={(e) => handleMetricChange(index, 'unit', e.target.value)}
                            className="w-full rounded-xl border-2 border-border bg-secondary/20 px-3.5 py-2 text-[11px] font-bold outline-none focus:border-athlepulse-orange focus:bg-white transition-all"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMetric(index)}
                          disabled={metrics.length === 1}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-0 transition-all active:scale-95 sm:mt-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Info */}
              <div className="rounded-xl bg-athlepulse-navy/5 p-3.5 border-2 border-athlepulse-navy/10 shadow-inner">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-athlepulse-navy/10 text-athlepulse-navy">
                    <Info className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground leading-relaxed uppercase tracking-wider">
                    Creating a goal will add it to your <span className="text-athlepulse-navy">Achievement Journey</span>. You can log activities against this goal to track your progress.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-border py-3 text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-athlepulse-navy py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-athlepulse-navy/20 hover:bg-athlepulse-orange hover:shadow-athlepulse-orange/20 transition-all active:scale-95"
                >
                  Create {type === 'GOAL' ? 'Goal' : 'Challenge'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
