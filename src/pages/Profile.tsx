import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAchievements } from '../context/AchievementsContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import JourneyView from '../components/achievements/JourneyView';
import CreateGoalModal from '../components/modals/CreateGoalModal';
import ManualAchievementModal from '../components/modals/ManualAchievementModal';
import ManualActivityModal from '../components/modals/ManualActivityModal';
import ConnectDeviceModal from '../components/modals/ConnectDeviceModal';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, PlusCircle, Trophy, Target, Users, Activity, Plus, ListFilter } from 'lucide-react';

import { PEXELS_IMAGES, SARAH_AVATAR } from '../constants/images';

const currentUser = {
  name: 'Abigail Ndala',
  headline: 'Endurance Athlete | Marathoner | Trail Runner',
  avatar: SARAH_AVATAR,
  banner: PEXELS_IMAGES[0],
  location: 'London, UK',
  website: 'abigailndala.run',
  stats: { distance: '28.7', elevation: '1,420', pace: '4\'45"' },
  groups: [
    { name: 'London Marathoners', members: '1.2k', avatar: PEXELS_IMAGES[1] },
    { name: 'Sub-4 Club', members: '850', avatar: PEXELS_IMAGES[2] }
  ],
  activityLogs: [
    { id: '1', title: 'Morning Run', type: 'Run', date: 'Today', distance: '10.2 km', duration: '48:12', pace: '4:43/km' },
    { id: '2', title: 'Interval Training', type: 'Run', date: 'Yesterday', distance: '8.5 km', duration: '38:45', pace: '4:33/km' },
    { id: '3', title: 'Long Trail Run', type: 'Trail', date: '2 days ago', distance: '22.4 km', duration: '2:15:30', pace: '6:03/km' }
  ]
};

export default function Profile() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('CV');
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null);
  const { achievements, setAchievements } = useAchievements();
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [manualAchievementModalOpen, setManualAchievementModalOpen] = useState(false);
  const [manualActivityModalOpen, setManualActivityModalOpen] = useState(false);
  const [connectDeviceModalOpen, setConnectDeviceModalOpen] = useState(false);
  const [selectedAchievementForActivity, setSelectedAchievementForActivity] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash === '#achievements' || location.hash === '#cv') {
      setActiveTab('CV');
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (expandedAchievement) {
      const element = document.getElementById(`achievement-${expandedAchievement}`);
      if (element) {
        setTimeout(() => {
          const headerOffset = 160;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  }, [expandedAchievement]);

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      if (e.detail === 'create-goal') {
        setGoalModalOpen(true);
      } else if (e.detail === 'add-achievement') {
        setManualAchievementModalOpen(true);
      } else if (e.detail === 'add-activity') {
        setManualActivityModalOpen(true);
      }
    };
    window.addEventListener('open-modal', handleOpenModal);
    return () => window.removeEventListener('open-modal', handleOpenModal);
  }, []);

  const handleCreateGoal = (newGoal: any) => {
    setAchievements([newGoal, ...achievements]);
  };

  const handleSaveAchievement = (newAchievement: any) => {
    setAchievements([newAchievement, ...achievements]);
  };

  const handleSaveActivity = (newActivity: any) => {
    const achievementId = newActivity.achievementId || selectedAchievementForActivity;
    if (!achievementId) return;

    setAchievements(prev => prev.map(ach => {
      if (ach.id === achievementId) {
        const newLog = {
          id: newActivity.id,
          title: newActivity.title || `${newActivity.type} Session`,
          date: 'Just now',
          distance: newActivity.distance ? `${newActivity.distance} km` : undefined,
          time: newActivity.duration,
          note: newActivity.notes
        };
        return {
          ...ach,
          logs: [newLog, ...(ach.logs || [])],
          progress: Math.min(100, (ach.progress || 0) + 5)
        };
      }
      return ach;
    }));
  };

  const mappedAchievements = achievements.map(ach => {
    const metrics = ach.metrics || [];
    return {
      ...ach,
      weeks: metrics.find((m: any) => m.label === '# of Logs')?.value || '0',
      distance: (metrics.find((m: any) => m.label === 'Distance')?.value || '0') + ' ' + (metrics.find((m: any) => m.label === 'Distance')?.unit || 'km'),
      time: metrics.find((m: any) => m.label === 'Time')?.value || '0h 0m',
      pace: (metrics.find((m: any) => m.label === 'Avg Pace')?.value || '0:00') + ' ' + (metrics.find((m: any) => m.label === 'Avg Pace')?.unit || '/km'),
    };
  });

  const handleShareClick = (achievement: any) => {
    window.dispatchEvent(new CustomEvent('open-share-modal', { detail: achievement }));
  };

  const activeGoal = achievements.find(a => a.status === 'ONGOING');

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
      <ProfileHeader user={currentUser} activeGoal={activeGoal} />

      <div className="mb-8 flex justify-center gap-4">
        <button 
          onClick={() => setConnectDeviceModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-orange-500 hover:shadow-orange-500/20 active:scale-95"
        >
          Connect Device
        </button>
        <Link 
          to="/feed"
          className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-slate-900 hover:shadow-slate-900/20 active:scale-95"
        >
          Feed
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Associated Groups */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Associated Groups</h3>
            </div>
            
            <div className="space-y-4">
              {currentUser.groups?.map((group: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={group.avatar} alt={group.name} className="h-12 w-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-base font-bold text-foreground">{group.name}</h4>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{group.members} members</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 w-full rounded-xl border border-border py-3 text-xs font-black uppercase tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-slate-900">
              Find More Groups
            </button>
          </div>
        </div>

        {/* Right Column: Activity Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-orange-500" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Activity Logs</h3>
              </div>
              <button 
                onClick={() => setManualActivityModalOpen(true)}
                className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-500 hover:bg-orange-500/20 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Manual Entry
              </button>
            </div>

            <div className="space-y-3">
              {currentUser.activityLogs?.map((log: any) => (
                <div key={log.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4 transition-all hover:border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">{log.title} <span className="text-sm font-medium text-muted-foreground">• {log.type}</span></h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{log.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-slate-900">{log.distance} • {log.duration}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{log.pace}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full rounded-xl border border-border py-3 text-xs font-black uppercase tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-slate-900">
              <ListFilter className="inline-block h-4 w-4 mr-2" />
              View All Logs
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="min-w-0">
          <div className="space-y-8">
            <div className="space-y-8" id="cv">
              <div className="space-y-6" id="achievements">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 sm:text-2xl">Achievement Journey</h2>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Your milestones & goals</p>
                    </div>
                  </div>
                  <div className="flex w-full sm:w-auto items-center justify-between gap-1.5 sm:gap-3">
                    <button 
                      onClick={() => setGoalModalOpen(true)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 sm:px-6 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                    >
                      <Target className="hidden sm:block h-4 w-4" />
                      Create Goal
                    </button>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: 'export-cv' }))}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 sm:px-6 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                    >
                      <Share2 className="hidden sm:block h-4 w-4" />
                      Share CV
                    </button>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: 'add-achievement' }))}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 sm:px-6 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                    >
                      <PlusCircle className="hidden sm:block h-4 w-4" />
                      Manual Entry
                    </button>
                  </div>
                </div>
                
                <div className="rounded-2xl border border-border bg-card shadow-sm">
                  <JourneyView achievements={mappedAchievements} onShare={handleShareClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onSave={handleCreateGoal}
      />

      <ManualAchievementModal
        isOpen={manualAchievementModalOpen}
        onClose={() => setManualAchievementModalOpen(false)}
        onSave={handleSaveAchievement}
      />

      <ManualActivityModal
        isOpen={manualActivityModalOpen}
        onClose={() => {
          setManualActivityModalOpen(false);
          setSelectedAchievementForActivity(null);
        }}
        onSave={handleSaveActivity}
        achievements={achievements}
      />

      <ConnectDeviceModal
        isOpen={connectDeviceModalOpen}
        onClose={() => setConnectDeviceModalOpen(false)}
      />
    </div>
  );
}
