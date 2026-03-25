import { useState } from 'react';
import { UserPlus, Info, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PEXELS_IMAGES } from '../../constants/images';

export default function RightWidgets() {
  const [followedIndices, setFollowedIndices] = useState<number[]>([]);

  const handleFollow = (index: number) => {
    if (!followedIndices.includes(index)) {
      setFollowedIndices([...followedIndices, index]);
    }
  };

  const suggestions = [
    { 
      name: 'David Goggins', 
      role: 'Ultra Marathoner | Author | Speaker', 
      avatar: PEXELS_IMAGES[2] 
    },
    { 
      name: 'Eliud Kipchoge', 
      role: 'Olympic Champion | 1:59:40 Marathoner', 
      avatar: PEXELS_IMAGES[6] 
    },
    { 
      name: 'Courtney Dauwalter', 
      role: 'Ultra Trail Runner | Salomon Athlete', 
      avatar: PEXELS_IMAGES[7] 
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Add to your feed</h3>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          {suggestions.map((user, i) => {
            const isFollowing = followedIndices.includes(i);
            return (
              <div key={i} className="flex gap-3">
                <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="flex flex-col items-start justify-center">
                  <p className="text-sm font-bold leading-tight hover:text-blue-500 hover:underline cursor-pointer">
                    <Link to={`/profile/${user.name}`}>{user.name}</Link>
                  </p>
                  <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{user.role}</p>
                  <button 
                    onClick={() => handleFollow(i)}
                    disabled={isFollowing}
                    className={`flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm font-bold transition-all ${
                      isFollowing 
                        ? 'bg-secondary border-border text-muted-foreground cursor-default' 
                        : 'border-foreground hover:bg-secondary hover:border-2'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="mt-4 flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground">
          View all recommendations →
        </button>
      </div>
    </div>
  );
}
