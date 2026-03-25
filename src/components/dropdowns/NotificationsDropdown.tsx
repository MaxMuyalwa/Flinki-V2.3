import { Heart, MessageCircle, UserPlus, Award, UserPlus2 } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'follow_request',
    user: { name: 'Mark Davies', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Mark' },
    text: 'sent you a follow request',
    time: '2m ago',
    hasActions: true,
  },
  {
    id: 2,
    type: 'like',
    user: { name: 'Elena Rostova', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Elena' },
    text: 'liked your Morning Tempo Run',
    time: '15m ago',
  },
  {
    id: 3,
    type: 'system',
    user: { name: 'AthlePulse', avatar: null },
    text: 'Your Dubai Marathon goal is 75% complete!',
    time: '1h ago',
  },
];

export default function NotificationsDropdown() {
  return (
    <div className="w-full origin-top-right rounded-lg border border-border bg-card p-4 shadow-xl ring-1 ring-black/5 z-50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Notifications</h3>
        <button className="text-xs font-semibold text-flinki-orange hover:underline">Mark all read</button>
      </div>

      <div className="mb-4 flex gap-2">
        <button className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">All</button>
        <button className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">Requests 2</button>
        <button className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">Mentions 1</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex gap-3">
            <div className="relative flex-shrink-0">
              {notif.user.avatar ? (
                <img src={notif.user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flinki-navy text-white font-bold">F</div>
              )}
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-background">
                {notif.type === 'follow_request' && <UserPlus className="h-3 w-3 text-flinki-blue" />}
                {notif.type === 'like' && <Heart className="h-3 w-3 text-flinki-orange fill-flinki-orange" />}
                {notif.type === 'system' && <Award className="h-3 w-3 text-flinki-orange" />}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-tight">
                <span className="font-bold">{notif.user.name}</span> {notif.text}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{notif.time}</p>
              {notif.hasActions && (
                <div className="mt-2 flex gap-2">
                  <button className="rounded-lg bg-flinki-blue px-3 py-1 text-xs font-bold text-white hover:bg-flinki-blue/90">Accept</button>
                  <button className="rounded-lg bg-secondary px-3 py-1 text-xs font-bold text-foreground hover:bg-muted">Decline</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full border-t border-border pt-3 text-center text-xs font-bold text-flinki-blue hover:underline">
        View all notifications →
      </button>
    </div>
  );
}
