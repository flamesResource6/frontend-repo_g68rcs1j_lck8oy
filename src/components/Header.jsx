import { Film, Search, SortAsc, SortDesc } from 'lucide-react';

export default function Header({ query, onQueryChange, sortBy, onSortChange }) {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-1.5 rounded-md">
            <Film className="w-5 h-5" />
          </div>
          <span className="font-semibold tracking-tight text-lg">FlixLite</span>
        </div>

        <div className="flex items-center gap-3 w-full max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by title…"
              className="w-full bg-neutral-900 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-600/60"
            />
          </div>
          <button
            onClick={() => onSortChange(sortBy === 'rating' ? 'title' : sortBy === 'title' ? 'newest' : 'rating')}
            className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm hover:bg-neutral-800"
            title="Toggle sort: rating → title → newest"
          >
            {sortBy === 'rating' ? <SortDesc className="w-4 h-4" /> : sortBy === 'title' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4 rotate-180" />}
            <span className="hidden sm:inline">{sortBy === 'rating' ? 'Rating' : sortBy === 'title' ? 'Title' : 'Newest'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
