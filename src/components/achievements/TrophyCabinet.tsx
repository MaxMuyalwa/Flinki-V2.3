import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ShieldCheck, ChevronRight, Share2, Download, Trophy as TrophyIcon, ExternalLink, Users, Activity, Plus, ListFilter } from 'lucide-react';

import { PEXELS_IMAGES } from '../../constants/images';

const trophies = [
  { 
    id: 'marathon', 
    label: 'MARATHON', 
    subtitle: '6x Finisher', 
    date: 'Nov 2025', 
    color: 'bg-slate-900', 
    image: PEXELS_IMAGES[5], 
    verified: true, 
    targetId: 3,
    groups: [
      { id: 'g1', name: 'London Marathoners', members: 1240, image: PEXELS_IMAGES[0] },
      { id: 'g2', name: 'Sub-4 Club', members: 850, image: PEXELS_IMAGES[1] }
    ],
    logs: [
      { id: 'l1', type: 'Race', title: 'Barcelona Marathon', date: 'Mar 15, 2024', stats: '3:42:12 • 42.2km', pace: '5:16/km' },
      { id: 'l2', type: 'Training', title: 'Long Run Sunday', date: 'Mar 8, 2024', stats: '2:30:00 • 28.0km', pace: '5:21/km' },
      { id: 'l3', type: 'Training', title: 'Tempo Session', date: 'Mar 5, 2024', stats: '1:05:00 • 12.5km', pace: '5:12/km' }
    ]
  },
  { 
    id: 'ultra', 
    label: 'ULTRA 50K', 
    subtitle: 'Trail Certified', 
    date: 'Aug 2025', 
    color: 'bg-yellow-500', 
    image: PEXELS_IMAGES[6], 
    verified: true, 
    targetId: 5,
    groups: [
      { id: 'g3', name: 'Trail Blazers UK', members: 420, image: PEXELS_IMAGES[2] }
    ],
    logs: [
      { id: 'l4', type: 'Race', title: 'Peak District 50', date: 'Aug 12, 2024', stats: '6:15:00 • 50.0km', pace: '7:30/km' },
      { id: 'l5', type: 'Training', title: 'Hill Repeats', date: 'Aug 5, 2024', stats: '1:45:00 • 15.0km', pace: '7:00/km' }
    ]
  },
  { 
    id: 'sub20', 
    label: 'SUB-20', 
    subtitle: '5K Personal Best', 
    date: 'Jun 2025', 
    color: 'bg-blue-500', 
    image: PEXELS_IMAGES[7], 
    verified: true, 
    targetId: 3,
    groups: [
      { id: 'g5', name: 'Speed Demons', members: 150, image: PEXELS_IMAGES[3] }
    ],
    logs: [
      { id: 'l8', type: 'Race', title: 'Battersea Park 5K', date: 'Jun 10, 2024', stats: '0:19:42 • 5.0km', pace: '3:56/km' }
    ]
  },
  { 
    id: 'crew', 
    label: 'CREW', 
    subtitle: '25 Group Sessions', 
    date: 'Aug 2025', 
    color: 'bg-purple-500', 
    image: PEXELS_IMAGES[8], 
    verified: false, 
    targetId: 4,
    groups: [
      { id: 'g6', name: 'Flinki London Crew', members: 500, image: PEXELS_IMAGES[4] }
    ],
    logs: [
      { id: 'l9', type: 'Group', title: 'Regents Park Social', date: 'Aug 22, 2024', stats: '1:00:00 • 10.0km', pace: '6:00/km' }
    ]
  },
];

interface TrophyCabinetProps {
  onNavigate?: (tab: string) => void;
  onShare?: (trophy: any) => void;
}

export default function TrophyCabinet({ onNavigate, onShare }: TrophyCabinetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentTrophy = trophies[currentIndex];

  const nextTrophy = () => {
    setCurrentIndex((prev) => (prev + 1) % trophies.length);
    setDropdownOpen(false);
  };

  const prevTrophy = () => {
    setCurrentIndex((prev) => (prev - 1 + trophies.length) % trophies.length);
    setDropdownOpen(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    if (offset < -50) {
      nextTrophy();
    } else if (offset > 50) {
      prevTrophy();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (e: React.MouseEvent, action: string, trophyId: string) => {
    e.stopPropagation();
    setDropdownOpen(false);
    
    if (action === 'view') {
      const trophy = trophies.find(t => t.id === trophyId);
      if (trophy && onNavigate) {
        onNavigate('Timeline');
        // Wait for tab switch to complete
        setTimeout(() => {
          const element = document.getElementById(`timeline-event-${trophy.targetId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-2', 'ring-orange-500', 'ring-offset-4');
            setTimeout(() => {
              element.classList.remove('ring-2', 'ring-orange-500', 'ring-offset-4');
            }, 2000);
          }
        }, 100);
      }
    } else if (action === 'share') {
      const trophy = trophies.find(t => t.id === trophyId);
      if (trophy && onShare) {
        onShare({
          title: trophy.label,
          description: trophy.subtitle,
          image: trophy.image,
          metrics: [
            { label: 'Date', value: trophy.date },
            { label: 'Status', value: trophy.verified ? 'Verified' : 'Unverified' }
          ]
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="relative h-[320px] sm:h-[400px] w-full">
          <AnimatePresence mode={isMobile ? "sync" : "wait"}>
            <motion.div
              key={currentTrophy.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, opacity }}
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: isMobile ? 0 : 0.4, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
            >
              {/* Background Image */}
              <img 
                src={currentTrophy.image}
                alt={currentTrophy.label}
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-[5]" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10">
                {/* Top Section with Share Button */}
                <div className="flex justify-end">
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-white backdrop-blur-xl transition-all border border-white/20 ${
                        dropdownOpen ? 'bg-white/40' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute top-full right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-1.5 backdrop-blur-2xl shadow-2xl z-50"
                        >
                          <button 
                            onClick={(e) => handleAction(e, 'view', currentTrophy.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Details
                          </button>
                          <button 
                            onClick={(e) => handleAction(e, 'share', currentTrophy.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            Share
                          </button>
                          <button 
                            onClick={(e) => handleAction(e, 'download', currentTrophy.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                          <div className="my-1 h-px bg-white/10" />
                          <button 
                            onClick={(e) => handleAction(e, 'primary', currentTrophy.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:bg-white/10 transition-colors"
                          >
                            <TrophyIcon className="h-3.5 w-3.5" />
                            Set Primary
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Section with Info */}
                <div className="flex w-full items-end justify-between mb-10 sm:mb-12">
                  <div className="flex flex-col items-start">
                    {currentTrophy.verified && (
                      <motion.div 
                        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isMobile ? 0 : 0.2, duration: isMobile ? 0 : 0.3 }}
                        className="mb-2 flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-0.5 backdrop-blur-md border border-green-500/30"
                      >
                        <ShieldCheck className="h-3 w-3 text-green-500" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-green-500">Verified Achievement</span>
                      </motion.div>
                    )}
                    <motion.h3 
                      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0 : 0.3 }}
                      className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tighter"
                    >
                      {currentTrophy.label}
                    </motion.h3>
                    <motion.p 
                      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0 : 0.3 }}
                      className="text-xs sm:text-base font-bold text-white/90 mt-0.5"
                    >
                      {currentTrophy.subtitle}
                    </motion.p>
                    <motion.p 
                      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isMobile ? 0 : 0.5, duration: isMobile ? 0 : 0.3 }}
                      className="mt-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
                    >
                      {currentTrophy.date}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slideshow Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-5 flex items-center justify-between z-20">
          <div className="flex gap-1.5">
            {trophies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-6 bg-orange-500' : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevTrophy}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all active:scale-90"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <button 
              onClick={nextTrophy}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all active:scale-90"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details Section */}
      <AnimatePresence mode={isMobile ? "sync" : "wait"}>
        <motion.div
          key={currentTrophy.id}
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: isMobile ? 0 : 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Associated Groups */}
          <div className="md:col-span-1 rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <h4 className="text-sm font-bold uppercase tracking-wider">Associated Groups</h4>
              </div>
            </div>
            <div className="space-y-3">
              {currentTrophy.groups?.map(group => (
                <div key={group.id} className="flex items-center gap-3 group cursor-pointer">
                  <img src={group.image} alt={group.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate group-hover:text-blue-500 transition-colors">{group.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{group.members.toLocaleString()} Members</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-lg border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              Find More Groups
            </button>
          </div>

          {/* Activity Logs */}
          <div className="md:col-span-2 rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <h4 className="text-sm font-bold uppercase tracking-wider">Activity Logs</h4>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: 'add-activity' }))}
                className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-500 hover:bg-orange-500/20 transition-colors"
              >
                <Plus className="h-3 w-3" />
                Manual Entry
              </button>
            </div>
            
            <div className="space-y-3">
              {currentTrophy.logs?.map(log => (
                <div key={log.id} className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      log.type === 'Race' ? 'bg-orange-500/10 text-orange-500' : 
                      log.type === 'Training' ? 'bg-blue-500/10 text-blue-500' : 
                      'bg-purple-500/10 text-purple-500'
                    }`}>
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{log.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-60">• {log.type}</span>
                      </div>
                      <p className="text-[10px] font-medium text-muted-foreground">{log.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{log.stats}</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{log.pace}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <ListFilter className="h-3.5 w-3.5" />
              View All Logs
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
