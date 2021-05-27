import { ROUTE_NAMES } from '~common/constants';
import MoviePage from '.';
import MovieAllVideos from './MovieAllVideos';
import MovieCredits from './MovieCredits';

const movieRoutes = {
  movie: {
    to: `${ROUTE_NAMES.movie}/:id`,
    component: MoviePage,
    exact: true,
  },

  movieCredits: {
    to: `${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.credits}`,
    component: MovieCredits,
    exact: true,
  },

  movieVideos: {
    to: `${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.videos}`,
    component: MovieAllVideos,
    exact: true,
  },
};

export default movieRoutes;
