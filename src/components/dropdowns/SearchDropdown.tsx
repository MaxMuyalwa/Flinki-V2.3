import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'user' | 'achievement' | 'post';
  title: string;
  subtitle: string;
  avatar?: string;
}

interface SearchDropdownProps {
  results: SearchResult[];
  onClose: () => void;
  filterType: 'all' | 'user' | 'achievement' | 'post';
  setFilterType: (type: 'all' | 'user' | 'achievement' | 'post') => void;
  sortBy: 'relevance' | 'date' | 'popularity';
  setSortBy: (sort: 'relevance' | 'date' | 'popularity') => void;
}

const CustomSelect = ({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: { label: string, value: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 rounded bg-secondary p-1 text-xs hover:bg-secondary/80">
        {options.find(o => o.value === value)?.label}
        <ChevronDown className="h-3 w-3" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 z-50 mt-1 w-32 rounded-lg border border-border bg-card shadow-xl">
            {options.map(o => (
              <button key={o.value} onClick={() => { onChange(o.value); setIsOpen(false); }} className="block w-full px-4 py-2 text-left text-xs hover:bg-secondary">
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchDropdown({ results, onClose, filterType, setFilterType, sortBy, setSortBy }: SearchDropdownProps) {
  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-card shadow-xl">
      <div className="flex items-center gap-2 border-b border-border p-2 text-xs sticky top-0 bg-card z-10">
        <CustomSelect 
          value={filterType} 
          onChange={setFilterType} 
          options={[
            { label: 'All', value: 'all' },
            { label: 'Users', value: 'user' },
            { label: 'Achievements', value: 'achievement' },
            { label: 'Posts', value: 'post' }
          ]}
        />
        <CustomSelect 
          value={sortBy} 
          onChange={setSortBy} 
          options={[
            { label: 'Relevance', value: 'relevance' },
            { label: 'Date', value: 'date' },
            { label: 'Popularity', value: 'popularity' }
          ]}
        />
      </div>
      {results.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No results found.
        </div>
      ) : (
        results.map((result) => (
          <Link
            key={result.id}
            to={result.type === 'user' ? `/profile/${result.title}` : result.type === 'achievement' ? `/profile#achievements` : `/post/${result.id}`}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
          >
            {result.avatar && (
              <img src={result.avatar} alt={result.title} className="h-8 w-8 rounded-full object-cover" />
            )}
            <div>
              <p className="text-sm font-bold">{result.title}</p>
              <p className="text-xs text-muted-foreground">{result.subtitle}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
