import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onEdit, onDelete }) => {
  if (!movies.length) {
    return (
      <div className="text-center text-white/70 py-16">No movies found. Try adding some!</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((m) => (
        <MovieCard key={m.id || m._id} movie={m} onEdit={onEdit} onDelete={onDelete} />)
      )}
    </div>
  );
};

export default MovieGrid;
