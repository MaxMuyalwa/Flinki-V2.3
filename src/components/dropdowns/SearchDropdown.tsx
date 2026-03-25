import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'user' | 'achievement';
  title: string;
  subtitle: string;
  avatar?: string;
}

interface SearchDropdownProps {
  results: SearchResult[];
  onClose: () => void;
}

export default function SearchDropdown({ results, onClose }: SearchDropdownProps) {
  if (results.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-border bg-card p-4 text-center text-sm text-muted-foreground shadow-xl">
        No results found.
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
      {results.map((result) => (
        <Link
          key={result.id}
          to={result.type === 'user' ? `/profile` : `/profile#achievements`}
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
      ))}
    </div>
  );
}
