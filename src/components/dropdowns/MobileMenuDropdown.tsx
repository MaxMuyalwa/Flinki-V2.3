import { Link } from 'react-router-dom';
import { User, Image, Trophy, Award, Settings, Bookmark, FileText, Compass } from 'lucide-react';

interface MobileMenuDropdownProps {
  onClose?: () => void;
}

export default function MobileMenuDropdown({ onClose }: MobileMenuDropdownProps) {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg border border-border bg-card p-4 shadow-xl ring-1 ring-black/5 z-50">
      <div className="mb-4">
        <h4 className="mb-2 px-2 text-sm font-bold text-foreground">Menu</h4>
        <div className="space-y-1">
          <Link 
            to="/explore" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span>Explore</span>
          </Link>
          <Link 
            to="/profile" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link 
            to="/photos" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Image className="h-4 w-4" />
            <span>Photos</span>
          </Link>
          <Link 
            to="/achievements" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
          </Link>
          <Link 
            to="/cv" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>CV</span>
          </Link>
          <Link 
            to="/settings" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Account Settings</span>
          </Link>
          <Link 
            to="/saved" 
            onClick={handleClick}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved items</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
