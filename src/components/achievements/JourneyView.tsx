import { useState } from 'react';
import { Route, Calendar, Clock, TrendingUp, CheckCircle, Smartphone, Watch, Activity, Share2, Trophy, Target } from 'lucide-react';
import TimelineView from './TimelineView';
import ActivitiesView from './ActivitiesView';

export default function JourneyView({ achievements, onShare }: { achievements: any[], onShare?: (achievement: any) => void }) {
  const [selectedAchievement, setSelectedAchievement] = useState(achievements.length > 0 ? achievements[0] : null);
  const [activeTab, setActiveTab] = useState('CV');

  if (achievements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-secondary p-4">
          <Trophy className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold">No achievements yet</h3>
        <p className="text-sm text-muted-foreground">Start your journey by creating a goal or adding a manual entry.</p>
      </div>
    );
  }

  const currentAchievement = selectedAchievement || achievements[0];

  return (
    <div className="space-y-6">
      {/* Tab Bar */}
      <div className="sticky top-14 z-40 rounded-lg border border-flinki-navy/20 bg-flinki-navy p-1 shadow-md backdrop-blur-md lg:top-16">
        <div className="flex items-center justify-between">
          {['CV', 'Timeline', 'Activities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-md py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-flinki-orange text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Shared between CV and Timeline */}
        {(activeTab === 'CV' || activeTab === 'Timeline') && (
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div className="space-y-1">
              <h3 className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-flinki-orange">Current Goals</h3>
              {achievements.filter(a => a.status === 'ONGOING').map((achievement) => (
                <button
                  key={achievement.id}
                  onClick={() => setSelectedAchievement(achievement)}
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-all ${
                    currentAchievement.id === achievement.id
                      ? 'bg-flinki-navy/10 font-bold text-flinki-navy'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="truncate">{achievement.title}</span>
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <h3 className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-flinki-orange">Completed</h3>
              {achievements.filter(a => a.status === 'COMPLETED').map((achievement) => (
                <button
                  key={achievement.id}
                  onClick={() => setSelectedAchievement(achievement)}
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-all ${
                    currentAchievement.id === achievement.id
                      ? 'bg-flinki-navy/10 font-bold text-flinki-navy'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="truncate">{achievement.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'CV' && (
            <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
              <div className="relative h-64">
                <img
                  src={currentAchievement.image}
                  alt={currentAchievement.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {onShare && (
                  <button
                    onClick={() => onShare(currentAchievement)}
                    className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                )}
                <div className="absolute bottom-6 left-6">
                  <div className={`mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white ${
                    currentAchievement.status === 'COMPLETED' ? 'bg-flinki-navy' : 'bg-flinki-green'
                  }`}>
                    {currentAchievement.status}
                  </div>
                  <h3 className="text-4xl font-bold text-white">{currentAchievement.title}</h3>
                </div>
              </div>

              <div className="p-8">
                <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                  {currentAchievement.description}
                </p>

                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Weeks</span>
                    </div>
                    <p className="text-2xl font-bold">{currentAchievement.weeks || '18'}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <Route className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Distance</span>
                    </div>
                    <p className="text-2xl font-bold">{currentAchievement.distance || '210 km'}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Time</span>
                    </div>
                    <p className="text-2xl font-bold">{currentAchievement.time || '18h 45m'}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Pace</span>
                    </div>
                    <p className="text-2xl font-bold">{currentAchievement.pace || '4:55 /km'}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="mb-2 flex items-center justify-between text-sm font-bold">
                    <span className="uppercase tracking-widest text-muted-foreground">Training Progress</span>
                    <span className="text-flinki-green">{currentAchievement.progress}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-flinki-green transition-all duration-500" style={{ width: `${currentAchievement.progress}%` }} />
                  </div>
                </div>

                {/* Additional Info: Goals & Durations */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-flinki-navy">
                      <Target className="h-5 w-5 text-flinki-orange" />
                      Specific Goals
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-base text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-flinki-green" />
                        <span>Complete all long runs over 30km</span>
                      </li>
                      <li className="flex items-center gap-3 text-base text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-flinki-green" />
                        <span>Maintain average pace of 5:00/km</span>
                      </li>
                      <li className="flex items-center gap-3 text-base text-muted-foreground">
                        <div className="h-5 w-5 rounded-full border-2 border-border" />
                        <span>Sub-3:30 finish time</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-flinki-navy">
                      <Clock className="h-5 w-5 text-flinki-blue" />
                      Phase Durations
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-base">
                        <span className="text-muted-foreground">Base Phase</span>
                        <span className="font-bold">6 Weeks</span>
                      </div>
                      <div className="flex items-center justify-between text-base">
                        <span className="text-muted-foreground">Build Phase</span>
                        <span className="font-bold">8 Weeks</span>
                      </div>
                      <div className="flex items-center justify-between text-base">
                        <span className="text-muted-foreground">Peak & Taper</span>
                        <span className="font-bold">4 Weeks</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Logs */}
                {currentAchievement.logs?.length > 0 && (
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-flinki-navy">
                      <Activity className="h-5 w-5 text-flinki-teal" />
                      Recent Training Logs
                    </h4>
                    <div className="space-y-3">
                      {currentAchievement.logs.map((log: any) => (
                        <div key={log.id} className="rounded-xl border border-border bg-secondary/20 p-4 transition-all hover:bg-secondary/40">
                          <div className="mb-2 flex items-center justify-between">
                            <h5 className="font-bold text-base text-foreground">{log.title}</h5>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{log.date}</span>
                          </div>
                          <div className="mb-2 flex gap-4 text-xs font-black uppercase tracking-widest text-flinki-blue">
                            {log.distance && <span>{log.distance}</span>}
                            {log.time && <span>{log.time}</span>}
                            {log.pace && <span>{log.pace}</span>}
                          </div>
                          {log.note && <p className="text-sm text-muted-foreground leading-relaxed">{log.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Timeline' && <TimelineView achievement={currentAchievement} />}
          {activeTab === 'Activities' && <ActivitiesView achievement={currentAchievement} />}
        </div>
      </div>
    </div>
  );
}
