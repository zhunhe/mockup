import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";
import { Movie } from "../../interface/Movie";
import { getBackdropUrl } from "../../constants/api";

const DetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (movieId) {
        const request = await axios.get(`/movie/${movieId}`);
        setMovie(request.data);
      }
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={getBackdropUrl(movie.backdrop_path || '')}
        alt="poster"
      />
    </section>
  );
}

export default DetailPage;
