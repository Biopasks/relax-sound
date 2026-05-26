
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PlayCircle, History, Settings as SettingsIcon, Star, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import { useSound } from '@/context/SoundContext';
import { showError } from '@/utils/toast';

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: LucideIcon;
  isCentral?: boolean;
}

const navItems: NavItem[] = [
  { id: 'home-nav', path: '/', label: 'Home', icon: Home },
  { id: 'favorites-nav', path: '/favorites', label: 'Favorites', icon: Star },
  { id: 'player-nav', path: '/player', label: 'Player', icon: PlayCircle, isCentral: true },
  { id: 'history-nav', path: '/history', label: 'History', icon: History },
  { id: 'settings-nav', path: '/settings', label: 'Settings', icon: SettingsIcon },
];

const BottomNav = React.forwardRef<HTMLElement, { triggerAppShakeEffect: () => void }>(({ triggerAppShakeEffect }, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerHapticFeedback } = useSettings();
  const { currentNoise, isNoisePlaying } = useSound();

  const handleNavigationClick = (item: NavItem, e: React.MouseEvent) => {
    triggerHapticFeedback();
    if (item.isCentral && !currentNoise) {
      e.preventDefault();
      triggerAppShakeEffect();
      showError("Select a sound to go to the player!");
      return;
    }
    navigate(item.path);
  };

  return (
    <nav ref={ref} className="fixed bottom-0 left-0 right-0 z-[10000] rounded-t-3xl border-t border-white/10 flex items-center justify-around h-16 sm:h-20 md:h-24 px-1 sm:px-2 shadow-2xl" style={{ background: `linear-gradient(180deg, rgba(var(--current-theme-rgb, 59,130,246), 0.08) 0%, rgba(var(--current-theme-rgb, 59,130,246), 0.25) 100%), rgba(0,0,0,0.95)` }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const IconComponent = item.icon;
        const isCentral = item.isCentral;
        return (
          <div key={item.id} className="flex flex-col items-center justify-center flex-1 h-full">
            <Link
              to={item.path}
              onClick={(e) => handleNavigationClick(item, e)}
              className="flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            >
              <div className={cn(
                "flex items-center justify-center rounded-full aspect-square",
                isCentral ? "w-12 h-12 sm:w-14 sm:h-14" : "w-9 h-9 sm:w-10 sm:h-10",
                isCentral ? "bg-magic-accent-green/30 border-2 border-magic-accent-green/60" : "bg-white/[0.15] border border-white/20"
              )}>
                <IconComponent size={isCentral ? 22 : 18} className="text-white" />
              </div>
              <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold mt-0 text-white/80">
                {item.label}
              </span>
            </Link>
          </div>
        );
      })}
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';
const BottomNavWithMemo = React.memo(BottomNav);
BottomNavWithMemo.displayName = 'BottomNav';
export default BottomNavWithMemo;
