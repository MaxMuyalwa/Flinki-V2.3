import React from 'react';
import Modal from '../ui/Modal';
import { useAchievements } from '../../context/AchievementsContext';
import { Trophy } from 'lucide-react';

const GoalIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

interface SelectTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (target: string) => void;
}

export default function SelectTargetModal({ isOpen, onClose, onSelect }: SelectTargetModalProps) {
  const { achievements } = useAchievements();

  const activeGoals = achievements.filter(a => a.status === 'ONGOING');
  const completedAchievements = achievements.filter(a => a.status === 'COMPLETED');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Targets">
      <div className="space-y-6">
        {activeGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Goals</h3>
            {activeGoals.map(goal => (
              <button
                key={goal.id}
                onClick={() => {
                  onSelect(goal.title);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/30 p-3 transition-all hover:bg-secondary/50"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-flinki-orange text-white shadow-sm shadow-flinki-orange/20`}>
                    <GoalIcon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{goal.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Goal</p>
                  </div>
                </div>
                <div className="h-5 w-5 rounded-full border border-border bg-white shadow-inner" />
              </button>
            ))}
          </div>
        )}

        {completedAchievements.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Achievements</h3>
            {completedAchievements.map(ach => (
              <button
                key={ach.id}
                onClick={() => {
                  onSelect(ach.title);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/30 p-3 transition-all hover:bg-secondary/50"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-flinki-navy text-white shadow-sm shadow-flinki-navy/20`}>
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{ach.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Achievement</p>
                  </div>
                </div>
                <div className="h-5 w-5 rounded-full border border-border bg-white shadow-inner" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
