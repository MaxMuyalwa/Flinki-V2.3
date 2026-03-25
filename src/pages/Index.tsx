import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ActiveGoalBanner from '../components/profile/ActiveGoalBanner';
import PostComposer from '../components/profile/PostComposer';
import FeedPost from '../components/profile/FeedPost';
import RightWidgets from '../components/profile/RightWidgets';
import CreateGoalModal from '../components/modals/CreateGoalModal';
import { initialPosts } from '../data/posts';
import { SARAH_AVATAR } from '../constants/images';

export default function Index() {
  const [posts, setPosts] = useState(initialPosts);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Top');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      if (e.detail === 'create-goal') {
        setGoalModalOpen(true);
      }
    };
    window.addEventListener('open-modal', handleOpenModal);
    return () => window.removeEventListener('open-modal', handleOpenModal);
  }, []);

  const handleCreateGoal = (newGoal: any) => {
    // In a real app, this would be a global state or API call
    console.log('New goal created:', newGoal);
    // For now, we'll just show a success message or add it to a local list if needed
    // But the user specifically asked for it to be added to achievements on the profile page
    // So we'll assume the profile page will pick it up from a shared source or just handle it there.
  };

  useEffect(() => {
    const handleAddPost = (e: any) => {
      const newPost = {
        id: Date.now().toString(),
        user: {
          name: 'Abigail Ndala',
          avatar: SARAH_AVATAR,
          headline: 'Endurance Athlete | Marathoner | Trail Runner',
          isFollowing: true,
        },
        tag: { 
          label: e.detail.type === 'activity' ? 'Activity Log' : e.detail.type === 'achievement' ? 'Achievement' : 'Update', 
          color: 'blue' as const 
        },
        linkedGoal: 'Dubai Marathon 2026',
        title: e.detail.type === 'activity' ? 'New Activity' : 'Training Update',
        description: e.detail.content,
        image: e.detail.image,
        metrics: e.detail.type === 'activity' ? [
          { label: 'Distance', value: '10.2', unit: 'km' },
          { label: 'Pace', value: '5:10', unit: '/km' },
          { label: 'Time', value: '52:40' },
        ] : [],
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
      };
      setPosts([newPost, ...posts]);
    };

    window.addEventListener('add-post', handleAddPost);
    return () => window.removeEventListener('add-post', handleAddPost);
  }, [posts]);

  useEffect(() => {
    const handleDeletePost = (e: any) => {
      setPosts(prev => prev.filter(post => post.id !== e.detail.id));
    };

    window.addEventListener('delete-post', handleDeletePost);
    return () => window.removeEventListener('delete-post', handleDeletePost);
  }, []);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-2 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_300px]">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-[72px] self-start">
            <ProfileSidebar />
          </div>
        </div>

        {/* Main Feed */}
        <div className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm mb-6">
            <div className="hidden sm:block">
              <ActiveGoalBanner />
            </div>
            <div className="border-t border-border">
              <PostComposer />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <hr className="flex-1 border-border" />
            <div className="relative">
              <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-transparent outline-none cursor-pointer hover:text-foreground"
              >
                Sort by: {sortBy}
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isSortDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsSortDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                    {['Top', 'Newest', 'Oldest'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`flex w-full items-center px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-secondary ${
                          sortBy === option ? 'text-slate-900 bg-secondary/50' : 'text-muted-foreground'
                        }`}
                      >
                        Sort by: {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {posts
              .sort((a, b) => {
                if (sortBy === 'Newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                if (sortBy === 'Oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
                return b.likes - a.likes; // Default Top
              })
              .map((post) => (
                <FeedPost
                  key={post.id}
                  id={post.id}
                  user={post.user}
                  tag={post.tag}
                  linkedGoal={post.linkedGoal}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  metrics={post.metrics}
                  likes={post.likes}
                  comments={post.comments}
                  timestamp={post.timestamp}
                />
              ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden xl:block">
          <div className="sticky top-[72px] self-start">
            <RightWidgets />
          </div>
        </div>
      </div>

      <CreateGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onSave={handleCreateGoal}
      />
    </div>
  );
}

