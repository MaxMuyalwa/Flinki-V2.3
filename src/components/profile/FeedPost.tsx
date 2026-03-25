import { useState, useEffect } from 'react';
import { Heart, MessageSquare, Share2, Send, MoreHorizontal, Link2, ThumbsUp, Repeat2, Trash2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface FeedPostProps {
  key?: string | number;
  id: string;
  user: {
    name: string;
    avatar: string;
    headline?: string;
    isFollowing?: boolean;
  };
  timestamp: string;
  tag: {
    label: string;
    color: 'blue' | 'orange';
  };
  linkedGoal: string;
  title: string;
  description: string;
  image?: string;
  metrics: {
    label: string;
    value: string;
    unit?: string;
  }[];
  likes: number;
  comments: number;
}

export default function FeedPost({
  id,
  user,
  timestamp,
  tag,
  linkedGoal,
  title,
  description,
  image,
  metrics,
  likes: initialLikes,
  comments: initialComments,
}: FeedPostProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isCopied, setIsCopied] = useState(false);
  const [commentsCount, setCommentsCount] = useState(initialComments);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleCommentAdded = (e: any) => {
      if (e.detail.postTitle === title) {
        setCommentsCount(prev => prev + 1);
      }
    };
    window.addEventListener('comment-added', handleCommentAdded);
    return () => window.removeEventListener('comment-added', handleCommentAdded);
  }, [title]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    const event = new CustomEvent('open-modal', { 
      detail: { 
        type: 'comment', 
        data: { title } 
      } 
    });
    window.dispatchEvent(event);
  };

  const handleShare = () => {
    const safeTitle = title?.toLowerCase() || 'post';
    const postUrl = `${window.location.origin}/post/${safeTitle.replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    window.dispatchEvent(new CustomEvent('open-modal', { 
      detail: { 
        type: 'delete-confirmation', 
        data: { id, title } 
      } 
    }));
  };

  return (
    <div className="mb-4 rounded-lg border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between p-4">
        <div className="flex gap-3">
          <Link to={`/profile/${user.name}`}>
            <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" referrerPolicy="no-referrer" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold hover:text-flinki-blue hover:underline cursor-pointer">
                <Link to={`/profile/${user.name}`}>{user.name}</Link>
              </h4>
              {!isFollowing ? (
                <>
                  <span className="text-muted-foreground">•</span>
                  <button 
                    onClick={() => setIsFollowing(true)}
                    className="text-sm font-bold text-flinki-blue hover:underline"
                  >
                    Follow
                  </button>
                </>
              ) : (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm font-bold text-muted-foreground">Following</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{user.headline || 'Endurance Athlete'}</p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              {timestamp} • 🌍
            </p>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-muted-foreground hover:bg-secondary p-1.5 rounded-full transition-colors"
          >
             <MoreHorizontal className="h-5 w-5" />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <Bookmark className="h-4 w-4" />
                  Save Post
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <div className="mb-2 flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Journey: <span className="text-foreground">{linkedGoal}</span>
        </div>
        <h3 className="mb-1 text-base sm:text-lg font-bold">{title}</h3>
        <p className="text-sm sm:text-base text-foreground whitespace-pre-wrap">{description}</p>
      </div>

      {/* Metrics (Subtle) */}
      {metrics && metrics.length > 0 && (
        <div className="mx-4 mb-3 flex flex-wrap gap-3 sm:gap-4 rounded-lg bg-secondary/30 p-3">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">{metric.label}</span>
              <span className="text-sm sm:text-base font-bold">
                {metric.value} {metric.unit && <span className="text-xs sm:text-sm font-medium text-muted-foreground">{metric.unit}</span>}
              </span>
            </div>
          ))}
        </div>
      )}

      {image && (
        <div className="mt-2 bg-muted">
          <img 
            src={image} 
            alt="" 
            className="max-h-[500px] w-full object-contain" 
            referrerPolicy="no-referrer" 
          />
        </div>
      )}

      {/* Social Counts */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground border-b border-border mx-4">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="bg-blue-500 rounded-full p-0.5 border border-card"><ThumbsUp className="h-3 w-3 text-white" /></div>
            <div className="bg-red-500 rounded-full p-0.5 border border-card"><Heart className="h-3 w-3 text-white" /></div>
          </div>
          <span className="ml-1 hover:text-flinki-blue hover:underline cursor-pointer">{likes}</span>
        </div>
        <div className="flex gap-2">
          <span onClick={handleComment} className="hover:text-flinki-blue hover:underline cursor-pointer">{commentsCount} comments</span>
          <span>•</span>
          <span className="hover:text-flinki-blue hover:underline cursor-pointer">3 reposts</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-2 py-1">
        <button 
          onClick={handleLike}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors ${
            isLiked ? 'text-flinki-blue' : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} /> 
          <span className="hidden sm:inline">Like</span>
        </button>
        <button 
          onClick={handleComment}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
        >
          <MessageSquare className="h-5 w-5" /> 
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button 
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Repeat2 className="h-5 w-5" /> 
          <span className="hidden sm:inline">Repost</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Share2 className="h-5 w-5" /> 
          <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Share'}</span>
        </button>
      </div>
    </div>
  );
}
