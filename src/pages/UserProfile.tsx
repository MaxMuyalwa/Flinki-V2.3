import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import { mockUsers } from '../data/users';
import { ArrowLeft, Trophy, Users, Activity, Target, Share2, PlusCircle, MessageSquare } from 'lucide-react';
import JourneyView from '../components/achievements/JourneyView';

export default function UserProfile() {
  const { userName } = useParams<{ userName: string }>();
  const user = userName ? (mockUsers as any)[userName] : null;
  const [activeTab, setActiveTab] = useState('CV');
  const [isFollowed, setIsFollowed] = useState(false);

  if (!user) {
    return <div className="p-8 text-center">User not found</div>;
  }

  const handleShareClick = (achievement: any) => {
    window.dispatchEvent(new CustomEvent('open-share-modal', { detail: achievement }));
  };

  const mappedAchievements = user.achievements?.map((ach: any) => {
    const metrics = ach.metrics || [];
    return {
      ...ach,
      weeks: metrics.find((m: any) => m.label === '# of Logs')?.value || '0',
      distance: (metrics.find((m: any) => m.label === 'Distance')?.value || '0') + ' ' + (metrics.find((m: any) => m.label === 'Distance')?.unit || 'km'),
      time: metrics.find((m: any) => m.label === 'Time')?.value || '0h 0m',
      pace: (metrics.find((m: any) => m.label === 'Avg Pace')?.value || '0:00') + ' ' + (metrics.find((m: any) => m.label === 'Avg Pace')?.unit || '/km'),
    };
  }) || [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
      <div className="mb-6">
        <Link to="/profile" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-blue-500">
          <ArrowLeft className="h-4 w-4" />
          Back to my profile
        </Link>
      </div>
      
      <ProfileHeader user={user} />

      <div className="mb-8 flex justify-center gap-4">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'message', data: { name: user.name } } }))}
          className="flex items-center gap-2 rounded-full border-2 border-slate-900 bg-transparent px-8 py-3.5 text-sm font-black uppercase tracking-widest text-slate-900 transition-all hover:bg-slate-900 hover:text-white active:scale-95"
        >
          <MessageSquare className="h-4 w-4" />
          Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Associated Groups */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Associated Groups</h3>
            </div>
            
            <div className="space-y-4">
              {user.groups?.map((group: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={group.avatar} alt={group.name} className="h-10 w-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{group.name}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{group.members} members</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 w-full rounded-xl border border-border py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-slate-900">
              Find More Groups
            </button>
          </div>
        </div>

        {/* Right Column: Activity Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Activity Logs</h3>
              </div>
            </div>

            <div className="space-y-3">
              {user.activityLogs?.map((log: any) => (
                <div key={log.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4 transition-all hover:border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{log.title} <span className="text-xs font-medium text-muted-foreground">• {log.type}</span></h4>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{log.distance} • {log.duration}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.pace}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full rounded-xl border border-border py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-slate-900">
              View All Logs
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Achievement Journey */}
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tighter text-slate-900 sm:text-xl">Achievement Journey</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{user.name.split(' ')[0]}'s milestones & goals</p>
            </div>
          </div>
          <div className="flex w-full sm:w-auto items-center justify-between gap-1.5 sm:gap-3">
            <button 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-2 sm:px-5 py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              <Share2 className="hidden sm:block h-4 w-4" />
              Share CV
            </button>
          </div>
        </div>
        
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <JourneyView achievements={mappedAchievements} onShare={handleShareClick} />
        </div>
      </div>
    </div>
  );
}
