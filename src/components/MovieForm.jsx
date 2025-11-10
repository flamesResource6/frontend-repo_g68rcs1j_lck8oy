import React, { useEffect, useState } from 'react';

const emptyForm = { title: '', description: '', rating: '', poster_url: '', genres: '' };

const MovieForm = ({ onSubmit, editingMovie, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingMovie) {
      setForm({
        title: editingMovie.title || '',
        description: editingMovie.description || '',
        rating: editingMovie.rating?.toString() || '',
        poster_url: editingMovie.poster_url || '',
        genres: Array.isArray(editingMovie.genres) ? editingMovie.genres.join(', ') : '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) return setError('Title is required.');

    const ratingNum = form.rating === '' ? null : Number(form.rating);
    if (ratingNum !== null && (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10)) {
      return setError('Rating must be a number between 0 and 10.');
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      rating: ratingNum,
      poster_url: form.poster_url.trim(),
      genres: form.genres
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-white/70">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="Movie title"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/70">Rating (0-10)</label>
          <input
            value={form.rating}
            onChange={(e) => setForm((s) => ({ ...s, rating: e.target.value }))}
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="8.5"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-white/70">Poster URL</label>
        <input
          value={form.poster_url}
          onChange={(e) => setForm((s) => ({ ...s, poster_url: e.target.value }))}
          className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          placeholder="https://...jpg"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-white/70">Genres (comma separated)</label>
        <input
          value={form.genres}
          onChange={(e) => setForm((s) => ({ ...s, genres: e.target.value }))}
          className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          placeholder="Action, Drama"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-white/70">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          className="w-full h-28 px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          placeholder="Short synopsis"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition font-medium">{editingMovie ? 'Save Changes' : 'Add Movie'}</button>
        {editingMovie && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-white/10 border border-white/10 hover:bg-white/20 transition">Cancel</button>
        )}
      </div>
    </form>
  );
};

export default MovieForm;
