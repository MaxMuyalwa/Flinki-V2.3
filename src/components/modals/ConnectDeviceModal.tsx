import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Clock, Mountain, Gauge, Activity, MapPin, Heart, Flame, Timer, ExternalLink, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface ConnectDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectDeviceModal({ isOpen, onClose }: ConnectDeviceModalProps) {
  const handleConnectStrava = async () => {
    try {
      const response = await fetch('/api/auth/url');
      if (!response.ok) {
        throw new Error('Failed to get auth URL');
      }
      const { url } = await response.json();
      const authWindow = window.open(url, 'oauth_popup', 'width=600,height=700');
      if (!authWindow) {
        toast.error('Please allow popups for this site to connect your account.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
      toast.error('Failed to connect to Strava. Please try again later.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Connect Data Sources</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Sync training data to boost your Trust Score</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 pb-6 space-y-6">
              {/* Notice Box */}
              <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100/80 text-amber-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-900">Unlock Device Data verification</h3>
                  <p className="mt-1 text-xs font-medium text-amber-700/80 leading-relaxed">
                    Connecting Strava auto-verifies activities from Self-Reported to Device Data — syncing distance, pace, heart rate, GPS routes & more.
                  </p>
                </div>
              </div>

              {/* Data We'll Import */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Data we'll import</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Date, time & duration</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Distance & GPS route</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mountain className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Elevation gain</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Heart className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Heart rate (avg/max)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Gauge className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Pace & speed</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Flame className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Calories burned</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Activity className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Sport type</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Timer className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold">Moving vs. elapsed time</span>
                  </div>
                </div>
              </div>

              {/* Connection Options */}
              <div className="space-y-3">
                {/* Strava */}
                <div className="flex items-center justify-between rounded-2xl border border-[#FC4C02]/30 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FC4C02]/10 text-[#FC4C02]">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Strava</h4>
                      <p className="text-xs font-semibold text-slate-400">Running, cycling & swimming</p>
                    </div>
                  </div>
                  <button
                    onClick={handleConnectStrava}
                    className="flex items-center gap-1.5 rounded-full bg-[#D94302] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#C23C02]"
                  >
                    Connect <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Apple Health */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF2D55] text-white">
                      <Heart className="h-6 w-6 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Apple Health</h4>
                      <p className="text-xs font-semibold text-slate-400">Heart rate, steps, workouts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#00C853]">
                    <div className="h-2 w-2 rounded-full bg-[#00C853]" />
                    Connected
                  </div>
                </div>

                {/* Garmin Connect */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#007CC3] text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.5c-3.59 0-6.5-2.91-6.5-6.5S8.41 5.5 12 5.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5zm1.5-6.5h-3v-3h3v3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Garmin Connect</h4>
                      <p className="text-xs font-semibold text-slate-400">GPS, pace, device metrics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#00C853]">
                    <div className="h-2 w-2 rounded-full bg-[#00C853]" />
                    Connected
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 pt-2 text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                <p className="text-[10px] font-medium">Flinki uses read-only access. We never post on your behalf.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
