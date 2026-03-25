import { CheckCircle, MapPin, Link as LinkIcon, Mail, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileHeaderProps {
  user: {
    name: string;
    headline: string;
    avatar: string;
    banner: string;
    location: string;
    stats: { distance: string; elevation: string; pace: string };
  };
  activeGoal?: any;
}

export default function ProfileHeader({ user, activeGoal }: ProfileHeaderProps) {
  const displayDistance = activeGoal?.distance ? activeGoal.distance.replace('km', '') : user.stats.distance;
  const displayMiddleValue = activeGoal?.time ? activeGoal.time : user.stats.elevation;
  const displayMiddleLabel = activeGoal?.time ? 'Time' : 'M Elev';
  const displayPace = activeGoal?.pace ? activeGoal.pace.replace('/km', '') : user.stats.pace;
  const progress = activeGoal?.progress ?? 68;
  const title = activeGoal?.title ?? 'Dubai Marathon 2026';

  return (
    <div className="relative mb-8 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
      {/* Banner Image (Dashboard) */}
      <div className="relative h-40 w-full overflow-hidden sm:h-64">
        <img
          src={activeGoal ? activeGoal.image : user.banner}
          alt="Profile Banner"
          className="h-full w-full object-cover transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Current Challenge Info on Banner */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {title}
            </h3>
            <span className="text-xs sm:text-sm font-black text-white uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{progress}%</span>
          </div>
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Goal Progress</p>
        </div>
      </div>

      {/* Profile Info Container */}
      <div className="relative px-4 sm:px-6 pb-6 pt-5">
        {/* Name and Bio */}
        <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-start sm:text-left">
          {/* Profile Image */}
          <div className="shrink-0 relative h-20 w-20 sm:h-28 sm:w-28">
            <svg className="absolute inset-0 h-full w-full -rotate-90 scale-110 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-orange-500/20"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="289.026"
                strokeDashoffset="92.488"
                strokeLinecap="round"
                className="text-orange-500"
              />
            </svg>
            <img
              src={user.avatar}
              alt={user.name}
              className="relative h-full w-full rounded-full border-4 border-card object-cover shadow-xl z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl text-slate-900 uppercase">{user.name}</h1>
            </div>
            <p className="text-sm sm:text-base font-bold text-muted-foreground/80">{user.headline}</p>
            
            <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground/60 sm:justify-start">
              <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-default">
                <MapPin className="h-3.5 w-3.5 text-orange-500" />
                {user.location}
              </div>
              <div className="flex items-center gap-1.5">
                <LinkIcon className="h-3.5 w-3.5 text-blue-500" />
                <a href="#" className="text-blue-500 hover:text-slate-900 transition-colors">flinki.com/{user?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}</a>
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer">
                <Mail className="h-3.5 w-3.5 text-teal-500" />
                Contact
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-4 flex w-full flex-col gap-3 sm:mt-0 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <div className="grid grid-cols-3 items-center gap-2 rounded-lg bg-slate-900/5 px-4 py-3 border border-slate-900/10 sm:flex sm:gap-5 sm:px-6">
              <div className="text-center">
                <p className="text-xl font-black leading-tight tracking-tight sm:text-2xl text-slate-900">{displayDistance}</p>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-500">KM Dist</p>
              </div>
              <div className="hidden h-8 w-px bg-slate-900/10 sm:block" />
              <div className="text-center">
                <p className="text-xl font-black leading-tight tracking-tight sm:text-2xl text-slate-900">{displayMiddleValue}</p>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-500">{displayMiddleLabel}</p>
              </div>
              <div className="hidden h-8 w-px bg-slate-900/10 sm:block" />
              <div className="text-center">
                <p className="text-xl font-black leading-tight tracking-tight sm:text-2xl text-slate-900">{displayPace}</p>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-500">Pace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
