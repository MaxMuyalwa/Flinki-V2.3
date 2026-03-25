import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all"
      >
        Back to Feed
      </Link>
    </div>
  );
}
