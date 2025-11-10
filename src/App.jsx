import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import MovieForm from './components/MovieForm.jsx';
import MovieGrid from './components/MovieGrid.jsx';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // movie object when editing
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest | rating | title

  async function fetchMovies() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/movies`);
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Unable to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  async function addMovie(movie) {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });
      if (!res.ok) throw new Error('Failed to add movie');
      const newMovie = await res.json();
      setMovies((prev) => [newMovie, ...prev]);
    } catch (e) {
      setError('Could not add movie. Check your inputs and try again.');
    }
  }

  async function updateMovie(id, updates) {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update movie');
      const updated = await res.json();
      setMovies((prev) => prev.map((m) => (m.id === id ? updated : m)));
      setEditing(null);
    } catch (e) {
      setError('Could not update movie.');
    }
  }

  async function deleteMovie(id) {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/movies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      setError('Could not delete movie.');
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? movies.filter((m) => m.title.toLowerCase().includes(q))
      : movies.slice();

    if (sortBy === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    // newest is default order from fetch/add (created_at desc by insertion)
    return list;
  }, [movies, query, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header query={query} onQueryChange={setQuery} sortBy={sortBy} onSortChange={setSortBy} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured banner (optional Netflix vibe) */}
        <section className="relative overflow-hidden rounded-2xl mb-8">
          <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-red-600/40 via-red-500/20 to-transparent flex items-end">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                Your Personal Movie Library
              </h2>
              <p className="text-white/70 mt-2 max-w-2xl">
                Add, edit, and curate movies like a pro. Clean UI, smooth interactions, and full control.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="mb-10">
          <MovieForm
            key={editing ? editing.id : 'create'}
            initialData={editing}
            onCancel={() => setEditing(null)}
            onSubmit={(data) =>
              editing ? updateMovie(editing.id, data) : addMovie(data)
            }
          />
          {error && (
            <div className="mt-4 rounded-md bg-red-600/10 border border-red-600/30 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </section>

        {/* Grid */}
        <section>
          {loading ? (
            <div className="text-white/70">Loading movies…</div>
          ) : (
            <MovieGrid
              movies={filtered}
              onEdit={setEditing}
              onDelete={deleteMovie}
            />
          )}
        </section>
      </main>
    </div>
  );
}
