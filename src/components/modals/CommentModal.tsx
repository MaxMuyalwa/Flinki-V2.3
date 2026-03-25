import { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import Modal from '../ui/Modal';
import { SARAH_AVATAR } from '../../constants/images';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
}

const initialComments = [
  {
    id: 1,
    user: {
      name: 'Mark Davies',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    },
    text: 'Incredible pace, Abigail! You are looking so ready for Dubai.',
    time: '1h ago',
    likes: 4,
  },
  {
    id: 2,
    user: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
    },
    text: 'That elevation gain is no joke. Box Hill is a beast! 🚴‍♂️',
    time: '3h ago',
    likes: 2,
  },
];

export default function CommentModal({ isOpen, onClose, postTitle }: CommentModalProps) {
  const [commentsByPost, setCommentsByPost] = useState<Record<string, typeof initialComments>>({});
  const [newComment, setNewComment] = useState('');

  const currentComments = commentsByPost[postTitle] || initialComments;

  const handleSend = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: {
        name: 'Abigail Ndala',
        avatar: SARAH_AVATAR,
      },
      text: newComment,
      time: 'Just now',
      likes: 0,
    };

    setCommentsByPost(prev => ({
      ...prev,
      [postTitle]: [comment, ...(prev[postTitle] || initialComments)]
    }));
    setNewComment('');

    const event = new CustomEvent('comment-added', {
      detail: { postTitle }
    });
    window.dispatchEvent(event);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Comments on "${postTitle}"`}>
      <div className="flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {currentComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.user.avatar}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs font-bold mb-1">{comment.user.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                </div>
                <div className="mt-1 flex items-center gap-4 px-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{comment.time}</p>
                  <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-flinki-orange transition-colors">
                    <Heart className="h-3 w-3" />
                    {comment.likes}
                  </button>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <div className="relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Add a comment..."
              className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSend}
              disabled={!newComment.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-flinki-navy p-2 text-white transition-all hover:bg-flinki-navy/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
