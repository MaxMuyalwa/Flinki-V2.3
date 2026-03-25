import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, Search, User, ArrowLeft } from 'lucide-react';
import NotificationsDropdown from '../dropdowns/NotificationsDropdown';
import UserMenuDropdown from '../dropdowns/UserMenuDropdown';
import MobileMenuDropdown from '../dropdowns/MobileMenuDropdown';
import Logo from '../brand/Logo';
import SearchDropdown from '../dropdowns/SearchDropdown';
import { initialPosts } from '../../data/posts';
import { useAchievements } from '../../context/AchievementsContext';

export default function Navbar() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { achievements } = useAchievements();

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery?.toLowerCase() || '';
    const users = initialPosts
      .map(post => post.user)
      .filter((user, index, self) => 
        user?.name &&
        index === self.findIndex((u) => u.name === user.name) &&
        user.name.toLowerCase().includes(query)
      )
      .map(user => ({
        id: user.name,
        type: 'user' as const,
        title: user.name,
        subtitle: 'User',
        avatar: user.avatar
      }));

    const foundAchievements = achievements
      .filter(ach => ach?.title && ach.title.toLowerCase().includes(query))
      .map(ach => ({
        id: ach.id,
        type: 'achievement' as const,
        title: ach.title,
        subtitle: 'Achievement'
      }));

    return [...users, ...foundAchievements];
  }, [searchQuery, achievements]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 items-center justify-between px-4 lg:h-16 lg:px-8 gap-2 sm:gap-4">
        {/* Left: Logo & Back */}
        <div className="flex flex-1 items-center gap-4 shrink-0">
          <Link to="/" className="flex items-center">
            <Logo className="h-6 sm:h-8" />
          </Link>
          {(location.pathname === '/explore') && (
            <Link to="/feed" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-flinki-blue">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Feed</span>
            </Link>
          )}
        </div>

        {/* Center: Search Bar */}
        <div className="flex justify-center w-full max-w-[160px] sm:max-w-xs lg:max-w-md px-2">
          <div className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search Flinki" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-full border border-border bg-transparent pl-9 pr-3 sm:pr-4 text-xs sm:text-sm outline-none focus:border-flinki-blue focus:ring-1 focus:ring-flinki-blue transition-all"
              />
            </div>
            {searchQuery && (
              <SearchDropdown results={searchResults} onClose={() => setSearchQuery('')} />
            )}
          </div>
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
