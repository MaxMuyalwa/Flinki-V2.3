import FeedPost from '../profile/FeedPost';
import { SARAH_AVATAR } from '../../constants/images';

const myActivities = [
  {
    id: 101,
    user: {
      name: 'Abigail Ndala',
      avatar: SARAH_AVATAR,
      isFollowing: true,
    },
    timestamp: '1d ago',
    tag: { label: 'Garmin Sync', color: 'blue' as const },
    linkedGoal: 'Dubai Marathon 2026',
    title: 'Long Run Sunday',
    description: 'Beautiful morning for a 25k. Legs felt a bit heavy after yesterday\'s session but managed to keep a steady pace.',
    metrics: [
      { label: 'Distance', value: '25.2', unit: 'km' },
      { label: 'Time', value: '2:05:12' },
      { label: 'Avg Pace', value: '4:58', unit: '/km' },
    ],
    likes: 124,
    comments: 12,
  },
  {
    id: 102,
    user: {
      name: 'Abigail Ndala',
      avatar: SARAH_AVATAR,
      isFollowing: true,
    },
    timestamp: '3d ago',
    tag: { label: 'Garmin Sync', color: 'blue' as const },
    linkedGoal: 'Dubai Marathon 2026',
    title: 'Interval Training',
    description: '8x800m intervals. Hard work but the splits were consistent. Getting faster!',
    metrics: [
      { label: 'Distance', value: '8.4', unit: 'km' },
      { label: 'Time', value: '38:45' },
      { label: 'Avg Pace', value: '4:36', unit: '/km' },
    ],
    likes: 89,
    comments: 5,
  },
  {
    id: 103,
    user: {
      name: 'Abigail Ndala',
      avatar: SARAH_AVATAR,
      isFollowing: true,
    },
    timestamp: '5d ago',
    tag: { label: 'Garmin Sync', color: 'blue' as const },
    linkedGoal: 'Tokyo Marathon',
    title: 'Tokyo Prep Run',
    description: 'Steady run to test the new shoes. Feeling good about the upcoming race.',
    metrics: [
      { label: 'Distance', value: '12.5', unit: 'km' },
      { label: 'Time', value: '1:02:15' },
      { label: 'Avg Pace', value: '4:58', unit: '/km' },
    ],
    likes: 156,
    comments: 18,
  },
];

export default function ActivitiesView({ achievement }: { achievement?: any }) {
  const filteredActivities = achievement 
    ? myActivities.filter(activity => activity.linkedGoal === achievement.title)
    : myActivities;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="mb-6 flex items-center justify-center">
        <div className="h-px flex-1 bg-border" />
        <span className="mx-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {achievement ? `${achievement.title} Activities` : 'Your Activities'}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      
      <div className="space-y-6">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((post) => (
            <FeedPost 
              key={post.id}
              id={post.id.toString()}
              user={post.user}
              timestamp={post.timestamp}
              tag={post.tag}
              linkedGoal={post.linkedGoal}
              title={post.title}
              description={post.description}
              metrics={post.metrics}
              likes={post.likes}
              comments={post.comments}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-base text-muted-foreground">No activities found for this achievement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
