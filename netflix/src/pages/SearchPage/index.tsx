import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import useDebounce from "../../hooks/useDebounce";
import { Movie } from '../../interface/Movie';
import { getPosterUrl } from '../../constants/api';

import "./SearchPage.css";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = useDebounce(query.get("q") || "", 500);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm: string) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie: Movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = getPosterUrl(movie.backdrop_path || '');
            return (
              <div className='movie' key={movie.id}>
                <div onClick={() => navigate(`/${movie.id}`)} className='movie__column-poster'>
                  <img src={movieImageUrl} alt="movie image" className="movie__poster" />
                </div>
              </div>
            );
          }
          return null;
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}

export default SearchPage;
