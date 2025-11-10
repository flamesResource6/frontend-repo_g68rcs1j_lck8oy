import React from 'react';
import { Star, Pencil, Trash2, ImageOff } from 'lucide-react';

const MovieCard = ({ movie, onEdit, onDelete }) => {
  const genres = Array.isArray(movie.genres) ? movie.genres : [];

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/40 transition">
      <div className="aspect-[2/3] bg-black/30 overflow-hidden">
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white/40">
            <ImageOff />
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <h3 className="font-semibold line-clamp-1 flex-1">{movie.title}</h3>
          {movie.rating !== undefined && movie.rating !== null && (
            <span className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-300">
              <Star size={14} /> {movie.rating}
            </span>
          )}
        </div>
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.map((g) => (
              <span key={g} className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">{g}</span>
            ))}
          </div>
        )}
        {movie.description && (
          <p className="text-sm text-white/70 line-clamp-3">{movie.description}</p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(movie)}
            className="px-3 py-1.5 rounded-md bg-red-600/90 hover:bg-red-600 text-white transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
