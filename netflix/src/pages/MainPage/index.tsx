import React from 'react';

import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';

const MainPage: React.FC = () => {
  return (
    <div>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movices" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movices" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

export default MainPage;
