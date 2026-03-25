import { Activity, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Modal from '../ui/Modal';

interface SyncAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SyncAppsModal({ isOpen, onClose }: SyncAppsModalProps) {
  const [step, setStep] = useState<'list' | 'syncing' | 'success'>('list');

  const handleConnect = () => {
    setStep('syncing');
    setTimeout(() => setStep('success'), 2000);
  };

  const renderContent = () => {
    if (step === 'syncing') {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="relative mb-6 h-16 w-16">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <h3 className="text-lg font-bold">Syncing your recent activities...</h3>
          <p className="mt-2 text-muted-foreground">This usually takes a few seconds</p>
          <div className="mt-6 flex gap-1.5">
            <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:0.2s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:0.4s]" />
          </div>
        </div>
      );
    }

    if (step === 'success') {
      return (
        <div className="space-y-6 py-2">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Strava Connected!</h3>
            <p className="mt-1 text-xs text-muted-foreground">We found <span className="font-bold text-foreground">3 new activities</span> from the last 7 days.</p>
            <div className="mt-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
              Trust level upgraded: Self-Reported → Device Data
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'Sunday Long Run', dist: '21.1 km', time: '1h 54m', date: '8 days ago' },
              { title: 'Recovery 5k', dist: '5.0 km', time: '27m 0s', date: '8 days ago' },
              { title: 'Interval Session — Track', dist: '8.0 km', time: '48m 0s', date: '11 days ago' },
            ].map((act, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <Activity className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{act.title}</p>
                    <p className="text-[9px] text-muted-foreground">{act.date} • <span className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-orange-500">Run</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{act.dist}</p>
                  <p className="text-[9px] text-muted-foreground">{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              onClose();
              window.location.reload();
            }}
            className="w-full rounded-lg bg-slate-900 py-3.5 text-sm font-bold text-white hover:bg-slate-900/90 transition-all"
          >
            View on Profile
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-yellow-900">Unlock Device Data verification</h4>
              <p className="mt-1 text-xs text-yellow-800 leading-relaxed">
                Connecting Strava auto-verifies activities from Self-Reported to Device Data — syncing distance, pace, heart rate, GPS routes & more.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-secondary/30 p-4">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Data we'll import</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Date, time & duration
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Distance & GPS route
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Elevation gain
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Heart rate (avg/max)
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Strava</p>
                <p className="text-[11px] text-muted-foreground">Running, cycling & swimming</p>
              </div>
            </div>
            <button 
              onClick={handleConnect}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-orange-500/90 transition-all"
            >
              Connect
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 opacity-60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-500">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Apple Health</p>
                <p className="text-[11px] text-muted-foreground">Heart rate, steps, workouts</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              Connected
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 opacity-60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-500">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Garmin Connect</p>
                <p className="text-[11px] text-muted-foreground">GPS, pace, device metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              Connected
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] text-muted-foreground">
          🔒 Flinki uses read-only access. We never post on your behalf.
        </p>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Apps">
      {renderContent()}
    </Modal>
  );
}
