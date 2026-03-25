import { Heart, MessageCircle, UserPlus, Award, UserPlus2 } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'follow_request',
    user: { name: 'Mark Davies', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
    text: 'sent you a follow request',
    time: '2m ago',
    hasActions: true,
  },
  {
    id: 2,
    type: 'like',
    user: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    text: 'liked your Morning Tempo Run',
    time: '15m ago',
  },
  {
    id: 3,
    type: 'system',
    user: { name: 'Flinki', avatar: null },
    text: 'Your Dubai Marathon goal is 75% complete!',
    time: '1h ago',
  },
];

export default function NotificationsDropdown() {
  return (
    <div className="w-full origin-top-right rounded-lg border border-border bg-card p-4 shadow-xl ring-1 ring-black/5 z-50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Notifications</h3>
        <button className="text-xs font-semibold text-orange-500 hover:underline">Mark all read</button>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold">F</div>
              )}
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-background">
                {notif.type === 'follow_request' && <UserPlus className="h-3 w-3 text-blue-500" />}
                {notif.type === 'like' && <Heart className="h-3 w-3 text-orange-500 fill-orange-500" />}
                {notif.type === 'system' && <Award className="h-3 w-3 text-orange-500" />}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-tight">
                <span className="font-bold">{notif.user.name}</span> {notif.text}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{notif.time}</p>
              {notif.hasActions && (
                <div className="mt-2 flex gap-2">
                  <button className="rounded-lg bg-blue-500 px-3 py-1 text-xs font-bold text-white hover:bg-blue-500/90">Accept</button>
                  <button className="rounded-lg bg-secondary px-3 py-1 text-xs font-bold text-foreground hover:bg-muted">Decline</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full border-t border-border pt-3 text-center text-xs font-bold text-blue-500 hover:underline">
        View all notifications →
      </button>
    </div>
  );
}
