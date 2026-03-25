import { Bookmark, Settings, User, Image, Award, CheckCircle, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SARAH_AVATAR } from '../../constants/images';

interface ProfileSidebarProps {
  isScrolled?: boolean;
}

export default function ProfileSidebar({ isScrolled }: ProfileSidebarProps) {
  const profileImage = SARAH_AVATAR;

  return (
    <div className="space-y-4">
      {/* Main Profile Card */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="flex flex-col items-center px-4 pb-4 pt-6">
          <div className="relative mb-3 h-24 w-24">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted/20"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * 68) / 100}
                className="text-flinki-orange drop-shadow-[0_0_8px_rgba(242,125,38,0.8)] transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-2 overflow-hidden rounded-full border-2 border-background shadow-md">
              <img src={profileImage} alt="Abigail Ndala" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-base font-bold hover:underline cursor-pointer">Abigail Ndala</h2>
            <p className="mt-1 text-xs text-muted-foreground">Endurance Athlete | Marathoner | Trail Runner</p>
            <p className="mt-1 text-[10px] text-muted-foreground">London, United Kingdom</p>
          </div>
        </div>
        
        <div className="border-t border-border py-2">
          <div className="px-2">
            <Link to="/explore" className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
            <Link to="/profile" className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link to="/photos" className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Image className="h-4 w-4" />
              <span>Photos</span>
            </Link>
            <Link to="/profile#achievements" className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <CheckCircle className="h-4 w-4" />
              <span>Achievements</span>
            </Link>
            <Link to="/profile#cv" className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Award className="h-4 w-4" />
              <span>CV</span>
            </Link>
            <button className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
              <span>Account settings</span>
            </button>
          </div>
        </div>

        <div className="border-t border-border px-4 py-3 hover:bg-secondary cursor-pointer flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-bold">Saved items</span>
        </div>
      </div>
    </div>
  );
}
