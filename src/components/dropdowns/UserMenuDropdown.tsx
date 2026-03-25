import { Shield, User, Settings, ShieldCheck, LogOut, ChevronRight, LogIn, UserPlus } from 'lucide-react';

interface UserMenuDropdownProps {
  onClose?: () => void;
}

export default function UserMenuDropdown({ onClose }: UserMenuDropdownProps) {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-lg border border-border bg-card p-4 shadow-xl ring-1 ring-black/5 z-50">
      <div className="space-y-1">
        <button 
          onClick={handleClick}
          className="flex w-full items-center justify-between rounded-lg p-2 text-sm font-medium hover:bg-secondary transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogIn className="h-4 w-4 text-muted-foreground" />
            <span>Sign In</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <button 
          onClick={handleClick}
          className="flex w-full items-center justify-between rounded-lg p-2 text-sm font-medium hover:bg-secondary transition-colors"
        >
          <div className="flex items-center gap-3">
            <UserPlus className="h-4 w-4 text-muted-foreground" />
            <span>Sign Up</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="my-3 h-px bg-border" />

      <button 
        onClick={handleClick}
        className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-bold text-flinki-orange hover:bg-flinki-orange/5 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
