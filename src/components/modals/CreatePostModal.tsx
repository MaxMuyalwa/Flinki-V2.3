import { useState } from 'react';
import { Send, Activity, Trophy, Image as ImageIcon, MapPin, Sparkles, Link as LinkIcon, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../ui/Modal';
import SelectTargetModal from './SelectTargetModal';
import { SARAH_AVATAR } from '../../constants/images';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState('post');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [isSelectTargetModalOpen, setIsSelectTargetModalOpen] = useState(false);

  const [content, setContent] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [achievementName, setAchievementName] = useState('');

  const handlePost = () => {
    // Dispatch event to add post to feed
    const event = new CustomEvent('add-post', {
      detail: {
        type: activeTab,
        content: activeTab === 'post' ? content : (activeTab === 'activity' ? activityTitle : achievementName),
        description: content,
        image: selectedImage,
        targets: selectedTargets,
        timestamp: 'Just now'
      }
    });
    window.dispatchEvent(event);
    onClose();
    
    toast.success('Post shared successfully!');
  };

  const addTarget = (target: string) => {
    if (!selectedTargets.includes(target)) {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  const removeTarget = (target: string) => {
    setSelectedTargets(selectedTargets.filter(t => t !== target));
  };

  const simulateImageUpload = () => {
    const images = [
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80',
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&q=80',
      'https://images.unsplash.com/photo-1530549387074-d56a99e142e0?w=1200&q=80'
    ];
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Post">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('post')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 text-[10px] font-bold uppercase tracking-wider transition-all sm:flex-row sm:text-xs ${
              activeTab === 'post' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            <Send className="h-4 w-4" />
            Update
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 text-[10px] font-bold uppercase tracking-wider transition-all sm:flex-row sm:text-xs ${
              activeTab === 'activity' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            <Activity className="h-4 w-4" />
            Activity
          </button>
          <button
            onClick={() => setActiveTab('achievement')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 text-[10px] font-bold uppercase tracking-wider transition-all sm:flex-row sm:text-xs ${
              activeTab === 'achievement' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            <Trophy className="h-4 w-4" />
            Achievement
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={SARAH_AVATAR}
            alt="Abigail Ndala"
            className="h-10 w-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold">Abigail Ndala</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Everyone</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          {activeTab === 'activity' && (
            <input
              type="text"
              placeholder="Activity title (e.g. Morning Run)"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          )}
          {activeTab === 'achievement' && (
            <input
              type="text"
              placeholder="Achievement name"
              value={achievementName}
              onChange={(e) => setAchievementName(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          )}
          
          {activeTab === 'activity' && (
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs font-bold text-muted-foreground">Distance</div>
              <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs font-bold text-muted-foreground">Duration</div>
              <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs font-bold text-muted-foreground">Pace</div>
            </div>
          )}

          <textarea
            placeholder={
              activeTab === 'post' ? "What's happening in your training?" :
              activeTab === 'activity' ? "How did it go? Any reflections..." :
              "Tell the story behind this achievement..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] w-full resize-none rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          {selectedImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
              <img src={selectedImage} alt="Selected" className="h-full w-full object-cover" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Linking To */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <LinkIcon className="h-3.5 w-3.5" />
              Linking to*
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedTargets.map(target => (
                <div key={target} className="flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900/5 px-3 py-1.5">
                  <span className="text-[10px] font-bold text-slate-900">{target}</span>
                  <button onClick={() => removeTarget(target)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setIsSelectTargetModalOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-dashed border-border bg-secondary/30 px-3 py-1.5 text-[10px] font-bold text-muted-foreground hover:border-slate-900 hover:text-slate-900 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Link
              </button>
            </div>
            
            {selectedTargets.length === 0 && (
              <p className="text-[10px] text-muted-foreground italic">Every post builds momentum toward a target. Link a goal or achievement.</p>
            )}
          </div>
        </div>

        {/* Trust Level Warning */}
        {(activeTab === 'activity' || activeTab === 'achievement') && (
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <p className="text-xs text-orange-800 leading-relaxed">
                This will be posted as <span className="font-bold">SELF-REPORTED</span> — Connect a device or get peer confirmation to increase trust.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-1.5">
            <button 
              onClick={simulateImageUpload}
              className="shrink-0 rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <button className="shrink-0 rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
            </button>
            <button className="shrink-0 rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Trophy className="h-4 w-4" />
            </button>
          </div>
          <button 
            onClick={handlePost}
            className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-500/90 transition-all shadow-lg shadow-orange-500/20"
          >
            Post
          </button>
        </div>
      </div>
      
      <SelectTargetModal
        isOpen={isSelectTargetModalOpen}
        onClose={() => setIsSelectTargetModalOpen(false)}
        onSelect={addTarget}
      />
    </Modal>
  );
}

