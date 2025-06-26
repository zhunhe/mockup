import React, { useEffect, useState } from 'react';

import axios from '../api/axios';
import MovieModal from './MovieModal/index';
import { Movie } from '../interface/Movie';
import { getBackdropUrl, getPosterUrl } from '../constants/api';

import './Row.css';

interface RowProps {
  isLargeRow?: boolean;
  title: string;
  id: string;
  fetchUrl: string;
}

const Row: React.FC<RowProps> = ({
  isLargeRow,
  title,
  id,
  fetchUrl,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<Movie | {}>({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  }

  const handleScroll = (direction: "left" | "right") => {
    const posters = document.getElementById(id);
    if (posters) {
      const scrollAmount = window.innerWidth - 80;
      posters.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const handleClick = (movie: Movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left" onClick={() => handleScroll("left")}>
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={isLargeRow ? getPosterUrl(movie.poster_path || '') : getBackdropUrl(movie.backdrop_path || '')}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right" onClick={() => handleScroll("right")}>
          <span className="arrow">{">"}</span>
        </div>
      </div>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}

export default Row;
