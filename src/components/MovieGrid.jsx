import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies, onEdit, onDelete }) {
  if (!movies?.length) {
    return (
      <div className="text-white/60 text-sm">No movies yet. Add your first one above!</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onEdit={onEdit} onDelete={onDelete} />)
      )}
    </div>
  );
}
