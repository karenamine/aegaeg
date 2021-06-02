import { combineReducers } from 'redux';

import moviesReducer from '~features/Movies/moviesSlice';
import movieReducer from '~features/Movie/movieSlice';
import tvShowsReducer from '~features/TVShows/tvShowsSlice';
import tvShowReducer from '~features/TVShow/tvShowSlice';
import seasonReducer from '~features/Season/seasonSlice';
import peopleReducer from '~features/People/peopleSlice';
import personReducer from '~features/Person/personSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  tvShows: tvShowsReducer,
  tvShow: tvShowReducer,
  season: seasonReducer,
  people: peopleReducer,
  person: personReducer,
});

export default rootReducer;
