import { Edit, Trash2, Star } from 'lucide-react';

export default function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <div className="group bg-neutral-900/60 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
      <div className="aspect-[3/4] bg-neutral-800 overflow-hidden">
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">No Poster</div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight line-clamp-2">{movie.title}</h3>
          <div className="flex items-center gap-1 text-yellow-400 shrink-0">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-sm">{Number(movie.rating ?? 0).toFixed(1)}</span>
          </div>
        </div>
        {movie.genres?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {movie.genres.map((g) => (
              <span key={g} className="text-[10px] px-2 py-1 rounded-full bg-neutral-800 border border-white/10 text-white/70">
                {g}
              </span>
            ))}
          </div>
        ) : null}
        <p className="text-sm text-white/70 line-clamp-3">{movie.description}</p>
        <div className="pt-2 flex items-center justify-end gap-2">
          <button onClick={() => onEdit(movie)} className="inline-flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 rounded-md px-3 py-1.5">
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => onDelete(movie.id)} className="inline-flex items-center gap-1.5 text-xs bg-red-600/90 hover:bg-red-600 rounded-md px-3 py-1.5">
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
