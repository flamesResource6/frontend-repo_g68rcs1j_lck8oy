import { useEffect, useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

export default function MovieForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [poster_url, setPosterUrl] = useState('');
  const [genres, setGenres] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setRating(initialData.rating?.toString() || '');
      setPosterUrl(initialData.poster_url || '');
      setGenres(initialData.genres?.join(', ') || '');
    }
  }, [initialData]);

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    const r = Number(rating);
    if (Number.isNaN(r) || r < 0 || r > 10) errs.rating = 'Rating must be between 0 and 10';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title: title.trim(),
      description: description.trim(),
      rating: Number(rating),
      poster_url: poster_url.trim() || undefined,
      genres: genres
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean),
    };
    if (payload.genres.length === 0) delete payload.genres;
    onSubmit(payload);
    if (!initialData) {
      // reset after create
      setTitle('');
      setDescription('');
      setRating('');
      setPosterUrl('');
      setGenres('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900/60 border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-white/70">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/60"
            placeholder="e.g. Inception"
          />
          {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Rating (0-10)</label>
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/60"
            placeholder="8.7"
          />
          {errors.rating && <p className="text-xs text-red-400">{errors.rating}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm text-white/70">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/60"
            placeholder="A mind-bending thriller..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Poster URL (optional)</label>
          <input
            value={poster_url}
            onChange={(e) => setPosterUrl(e.target.value)}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/60"
            placeholder="https://...jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Genres (comma separated)</label>
          <input
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/60"
            placeholder="Action, Sci-Fi"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-colors rounded-lg px-4 py-2 text-sm font-medium">
          {initialData ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {initialData ? 'Save Changes' : 'Add Movie'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg px-4 py-2 text-sm">
            <X className="w-4 h-4" /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}
