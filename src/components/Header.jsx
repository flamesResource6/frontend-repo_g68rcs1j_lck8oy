import React from 'react';
import { Search, Film } from 'lucide-react';

const Header = ({ search, onSearchChange, sortBy, onSortChange }) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-600 text-white shadow-md shadow-red-600/30">
            <Film size={22} />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Flix Manager</h1>
        </div>
        <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search movies..."
              className="w-full md:w-72 pl-9 pr-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60 placeholder:text-white/50"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          >
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
