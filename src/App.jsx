import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import MovieForm from './components/MovieForm';
import MovieGrid from './components/MovieGrid';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [editing, setEditing] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/movies`);
      if (!res.ok) throw new Error('Failed to load movies');
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const submitMovie = async (payload) => {
    try {
      setError('');
      if (editing) {
        const id = editing.id || editing._id;
        const res = await fetch(`${API_BASE}/api/movies/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update movie');
      } else {
        const res = await fetch(`${API_BASE}/api/movies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to add movie');
      }
      setEditing(null);
      await fetchMovies();
    } catch (e) {
      setError(e.message || 'Request failed');
    }
  };

  const requestDelete = async (movie) => {
    const id = movie.id || movie._id;
    if (!id) return;
    if (!confirm(`Delete \"${movie.title}\"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/movies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete movie');
      await fetchMovies();
    } catch (e) {
      setError(e.message || 'Delete failed');
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...movies];
    if (q) {
      list = list.filter((m) => m.title?.toLowerCase().includes(q));
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'title') {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else {
      // newest: rely on created_at if available, fallback to id string
      list.sort((a, b) => {
        const ad = new Date(a.created_at || 0).getTime();
        const bd = new Date(b.created_at || 0).getTime();
        return bd - ad;
      });
    }
    return list;
  }, [movies, search, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <Header
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">{editing ? 'Edit movie' : 'Add a new movie'}</h2>
          <MovieForm onSubmit={submitMovie} editingMovie={editing} onCancel={() => setEditing(null)} />
        </section>

        {error && (
          <div className="p-3 rounded-md bg-red-500/15 border border-red-500/30 text-red-200">
            {error}
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Library</h2>
            <button
              onClick={fetchMovies}
              className="px-3 py-1.5 rounded-md bg-white/10 border border-white/10 hover:bg-white/20 transition"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center text-white/70">Loading...</div>
          ) : (
            <MovieGrid movies={filtered} onEdit={setEditing} onDelete={requestDelete} />
          )}
        </section>
      </main>
    </div>
  );
}
