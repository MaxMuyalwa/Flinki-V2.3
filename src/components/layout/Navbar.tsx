import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, Search, ArrowLeft } from 'lucide-react';
import NotificationsDropdown from '../dropdowns/NotificationsDropdown';
import UserMenuDropdown from '../dropdowns/UserMenuDropdown';
import MobileMenuDropdown from '../dropdowns/MobileMenuDropdown';
import Logo from '../brand/Logo';
import { useAchievements } from '../../context/AchievementsContext';

export default function Navbar() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { achievements } = useAchievements();

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: 'search' }));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 items-center justify-between px-4 lg:h-16 lg:px-8 gap-2 sm:gap-4">
        {/* Left: Logo & Back */}
        <div className="flex flex-1 items-center gap-4 shrink-0">
          <Link to="/" className="flex items-center">
            <Logo className="h-6 sm:h-8" />
          </Link>
          {(location.pathname === '/explore') && (
            <Link to="/feed" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-blue-500">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Feed</span>
            </Link>
          )}
        </div>

        {/* Center: Search Bar */}
        <div className="flex justify-center w-full max-w-[160px] sm:max-w-xs lg:max-w-md px-2">
          <button 
            onClick={openSearch}
            className="flex h-9 w-full items-center gap-2 rounded-full border border-border bg-transparent px-3 text-xs sm:text-sm text-muted-foreground hover:border-blue-500 transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Search Flinki</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2 lg:gap-4 shrink-0">
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </button>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="fixed left-4 right-4 top-14 z-50 mt-2 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:w-80 sm:mt-2">
                  <NotificationsDropdown />
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors lg:h-10 lg:w-10"
            >
              <Menu className="h-6 w-6" />
            </button>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-full z-50 mt-2 w-64 sm:w-48">
                  <div className="hidden sm:block">
                    <UserMenuDropdown onClose={() => setShowUserMenu(false)} />
                  </div>
                  <div className="block sm:hidden">
                    <MobileMenuDropdown onClose={() => setShowUserMenu(false)} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
