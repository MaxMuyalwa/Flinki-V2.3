import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Plus, Compass } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { label: 'Feed', path: '/feed', icon: Home },
  { label: 'Explore', path: '/explore', icon: Compass },
  { label: 'Post', action: 'create-post', icon: Plus },
  { label: 'Profile', path: '/', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path?: string) => path ? location.pathname === path : false;

  const handleAction = (action?: string) => {
    if (action) {
      if (action === 'create-post') {
        navigate('/');
      }
      window.dispatchEvent(new CustomEvent('open-modal', { detail: action }));
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 lg:hidden">
      <nav className="relative flex w-full max-w-md items-center justify-between rounded-full bg-flinki-navy p-2 shadow-xl shadow-flinki-navy/20 outline outline-1 outline-white/10">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          const content = (
            <Icon className={`h-5 w-5 stroke-[1.5px] ${active ? 'text-white' : 'text-white/40'}`} />
          );

          if (item.path) {
            return (
              <Link
                key={item.label}
                to={item.path}
                aria-label={item.label}
                className="relative flex flex-1 items-center justify-center py-3 transition-all"
              >
                {active && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-flinki-orange shadow-lg shadow-flinki-orange/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10">{content}</div>
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => handleAction(item.action)}
              aria-label={item.label}
              className="relative flex flex-1 items-center justify-center py-3 transition-all"
            >
              <div className="relative z-10">{content}</div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
