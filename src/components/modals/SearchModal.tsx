import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ChevronDown } from 'lucide-react';
import Modal from '../ui/Modal';
import { initialPosts } from '../../data/posts';
import { useAchievements } from '../../context/AchievementsContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<('user' | 'achievement' | 'post')[]>(['user', 'achievement', 'post']);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'popularity'>('relevance');
  const { achievements } = useAchievements();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const toggleFilter = (filter: 'user' | 'achievement' | 'post') => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    
    const query = debouncedQuery.toLowerCase();
    
    let results: any[] = [];

    if (selectedFilters.includes('user')) {
      const users = initialPosts
        .map(post => post.user)
        .filter((user, index, self) => 
          user?.name &&
          index === self.findIndex((u) => u.name === user.name) &&
          user.name.toLowerCase().includes(query)
        )
        .map(user => ({
          id: user.name,
          type: 'user' as const,
          title: user.name,
          subtitle: 'User',
          avatar: user.avatar,
          date: 0,
          popularity: 0
        }));
      results = [...results, ...users];
    }

    if (selectedFilters.includes('achievement')) {
      const foundAchievements = achievements
        .filter(ach => ach?.title && ach.title.toLowerCase().includes(query))
        .map(ach => ({
          id: ach.id,
          type: 'achievement' as const,
          title: ach.title,
          subtitle: 'Achievement',
          date: 0,
          popularity: 0
        }));
      results = [...results, ...foundAchievements];
    }

    if (selectedFilters.includes('post')) {
      const foundPosts = initialPosts
        .filter(post => post.description.toLowerCase().includes(query))
        .map(post => ({
          id: post.id,
          type: 'post' as const,
          title: post.title,
          subtitle: 'Post',
          date: Date.now(),
          popularity: post.likes
        }));
      results = [...results, ...foundPosts];
    }

    return results.sort((a, b) => {
      if (sortBy === 'date') return b.date - a.date;
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      return 0;
    });
  }, [debouncedQuery, achievements, selectedFilters, sortBy]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search Flinki..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-full border border-border bg-secondary/30 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['user', 'achievement', 'post'] as const).map(filter => (
              <button 
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  selectedFilters.includes(filter) ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {filter}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-bold">Sort By</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['relevance', 'date', 'popularity'] as const).map(sort => (
              <button 
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  sortBy === sort ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[40vh] overflow-y-auto space-y-2">
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {debouncedQuery ? 'No results found.' : 'Start typing to search...'}
            </div>
          ) : (
            searchResults.map((result) => (
              <Link
                key={result.id}
                to={result.type === 'user' ? `/profile/${result.title}` : result.type === 'achievement' ? `/profile#achievements` : `/post/${result.id}`}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-secondary rounded-lg transition-colors"
              >
                {result.avatar && (
                  <img src={result.avatar} alt={result.title} className="h-8 w-8 rounded-full object-cover" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-bold">{result.title}</p>
                  <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
