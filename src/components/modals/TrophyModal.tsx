import React from 'react';
import { Trophy, Star, Award, Medal, CheckCircle2, Lock, Share2 } from 'lucide-react';
import Modal from '../ui/Modal';
import { motion } from 'motion/react';

interface TrophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare?: (trophy: any) => void;
}

const trophies = [
  {
    id: '2',
    title: 'Marathon Finisher',
    description: 'Completed a full marathon distance (42.2km).',
    icon: <Award className="h-8 w-8" />,
    color: 'bg-blue-500',
    date: 'Nov 2025',
    isUnlocked: true,
  },
  {
    id: '3',
    title: 'Early Bird',
    description: 'Logged 10 activities before 6:00 AM.',
    icon: <Star className="h-8 w-8" />,
    color: 'bg-purple-500',
    date: 'Oct 2025',
    isUnlocked: true,
  },
  {
    id: '4',
    title: 'Consistent Climber',
    description: 'Gained over 5,000m of elevation in a month.',
    icon: <Medal className="h-8 w-8" />,
    color: 'bg-orange-500',
    date: 'Aug 2025',
    isUnlocked: true,
  },
  {
    id: '5',
    title: 'Century Ride',
    description: 'Completed a 100km cycling activity.',
    icon: <CheckCircle2 className="h-8 w-8" />,
    color: 'bg-green-500',
    date: 'Jul 2025',
    isUnlocked: true,
  },
  {
    id: '6',
    title: 'Double Trouble',
    description: 'Complete two marathons in one year.',
    icon: <Lock className="h-8 w-8" />,
    color: 'bg-secondary',
    date: 'Locked',
    isUnlocked: false,
  },
];

export default function TrophyModal({ isOpen, onClose, onShare }: TrophyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trophy Cabinet">
      <div className="space-y-6">
        <div className="rounded-lg bg-blue-500/5 p-4 text-center">
          <p className="text-sm font-medium text-blue-500">
            You've unlocked {trophies.filter(t => t.isUnlocked).length} out of {trophies.length} verified trophies!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {trophies.map((trophy, idx) => (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`group relative flex flex-col items-center rounded-lg border border-border p-4 text-center transition-all hover:shadow-md ${
                !trophy.isUnlocked ? 'opacity-60 grayscale' : 'bg-card'
              }`}
            >
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-lg ${trophy.color}`}>
                {React.cloneElement(trophy.icon as React.ReactElement, { className: 'h-6 w-6' })}
              </div>
              <h3 className="mb-0.5 text-xs font-bold">{trophy.title}</h3>
              <p className="mb-2 text-[9px] text-muted-foreground leading-tight">
                {trophy.description}
              </p>
              <span className="mt-auto text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                {trophy.date}
              </span>
              
              {trophy.isUnlocked && (
                <>
                  <div className="absolute top-3 right-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                  </div>
                  {onShare && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShare({
                          title: trophy.title,
                          description: trophy.description,
                          metrics: [
                            { label: 'Date', value: trophy.date },
                            { label: 'Status', value: 'Verified' }
                          ]
                        });
                      }}
                      className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-muted-foreground opacity-100 sm:opacity-0 transition-all hover:bg-blue-500 hover:text-white group-hover:opacity-100"
                    >
                      <Share2 className="h-3 w-3" />
                    </button>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-secondary py-4 text-sm font-bold transition-all hover:bg-secondary/80"
        >
          Close Cabinet
        </button>
      </div>
    </Modal>
  );
}
