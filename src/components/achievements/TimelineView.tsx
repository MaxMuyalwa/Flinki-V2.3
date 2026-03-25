import { motion } from 'motion/react';
import { Trophy, Route, Calendar, CheckCircle, Activity, Clock } from 'lucide-react';

export default function TimelineView({ achievement }: { achievement?: any }) {
  // If an achievement is provided, we show its logs as a timeline
  // Otherwise we show the global timeline
  const events = achievement?.logs?.length > 0 
    ? achievement.logs.map((log: any, idx: number) => ({
        id: log.id,
        date: log.date,
        title: log.title,
        description: log.note || `Training session for ${achievement.title}`,
        icon: <Activity className="h-4 w-4" />,
        color: 'bg-blue-500',
        metrics: [
          { label: 'Dist', value: log.distance },
          { label: 'Time', value: log.time },
          { label: 'Pace', value: log.pace }
        ].filter(m => m.value)
      }))
    : [
        {
          id: 1,
          date: 'Jan 20, 2026',
          title: 'Dubai Marathon 2026',
          type: 'goal_started',
          description: 'Officially started the journey to Dubai. Target: Sub-3:30.',
          icon: <Trophy className="h-4 w-4" />,
          color: 'bg-blue-500'
        },
        {
          id: 2,
          date: 'Dec 15, 2025',
          title: '1,000 km Club',
          type: 'achievement_unlocked',
          description: 'Reached the annual goal of 1,000km logged in 2025.',
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'bg-green-500'
        },
        {
          id: 3,
          date: 'Nov 3, 2025',
          title: 'Barcelona Marathon',
          type: 'race_completed',
          description: 'Finished in 3:28:44. New Personal Best!',
          icon: <Trophy className="h-4 w-4" />,
          color: 'bg-orange-500'
        },
        {
          id: 4,
          date: 'Oct 12, 2025',
          title: 'Peak Week Training',
          type: 'milestone',
          description: 'Completed 95km in a single week. Highest volume ever.',
          icon: <Route className="h-4 w-4" />,
          color: 'bg-purple-500'
        },
        {
          id: 5,
          date: 'Aug 15, 2025',
          title: 'Ultra 50K Trail',
          type: 'race_completed',
          description: 'First trail ultra completed in the Peak District.',
          icon: <Trophy className="h-4 w-4" />,
          color: 'bg-yellow-500'
        }
      ];

  return (
    <div className="mx-auto max-w-4xl py-4">
      {achievement && (
        <div className="mb-8 flex items-center gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/10 text-slate-900">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">{achievement.title} Timeline</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progressive history of your training</p>
          </div>
        </div>
      )}

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent sm:before:ml-[6.5rem]">
        {events.map((event: any, idx: number) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="relative flex items-start gap-6 sm:gap-12"
          >
            {/* Date - Desktop only */}
            <div className="hidden w-24 flex-shrink-0 pt-1 text-right sm:block">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{event.date}</p>
            </div>

            {/* Icon/Dot */}
            <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-card shadow-sm">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${event.color}`}>
                {event.icon}
              </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-base font-bold text-foreground">{event.title}</h4>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground sm:hidden">{event.date}</span>
              </div>
              <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              
              {event.metrics && event.metrics.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {event.metrics.map((m: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-lg bg-secondary/50 px-2 py-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{m.label}:</span>
                      <span className="text-xs font-black text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-bold">No events recorded yet</h3>
            <p className="text-xs text-muted-foreground">Start logging activities to build your timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
}
