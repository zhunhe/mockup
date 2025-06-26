import React, { useRef } from 'react';

import useOnClickOutside from '../../hooks/useOnClickOutside';
import { getBackdropUrl } from '../../constants/api';

import './MovieModal.css';

interface MovieModalProps {
  backdrop_path?: string;
  title?: string;
  overview?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  setModalOpen: (open: boolean) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  })

  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span onClick={() => setModalOpen(false)} className='modal-close'>
            X
          </span>

          <img
            className='modal__poster-img'
            src={getBackdropUrl(backdrop_path || '')}
            alt='modal__poster-img'
          />

          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__user_perc'> 100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__overview'>평점: {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
