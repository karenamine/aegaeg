export const IMG_BASE_URL = 'http://image.tmdb.org/t/p/'; // or https

export const IMG_SIZES = {
  poster: 'w500',
  backdrop: 'w1280',
  profile: 'h632',
  logo: 'w154', // Company logos (Netflix...)
  still: 'w300', // TV Show Episode img
};

export const SORT_MOVIES_BY_OPTIONS = {
  popularityDesc: {
    name: 'Popularity Descending',
    apiName: 'popularity.desc',
  },

  popularityAsc: {
    name: 'Popularity Ascending',
    apiName: 'popularity.asc',
  },

  releaseDateDesc: {
    name: 'Release Data Descending',
    apiName: 'primary_release_date.desc',
  },

  releaseDateAsc: {
    name: 'Release Data Ascending',
    apiName: 'primary_release_date.asc',
  },

  ratingDesc: {
    name: 'Rating Descending',
    apiName: 'vote_average.desc',
  },

  ratingAsc: {
    name: 'Rating Ascending',
    apiName: 'vote_average.asc',
  },
};

export const SORT_TV_BY_OPTIONS = {
  popularityDesc: {
    name: 'Popularity Descending',
    apiName: 'popularity.desc',
  },

  popularityAsc: {
    name: 'Popularity Ascending',
    apiName: 'popularity.asc',
  },

  firstAirDateDesc: {
    name: 'First Air Date Descending',
    apiName: 'first_air_date.gte',
  },

  firstAirDateAsc: {
    name: 'First Air Date Ascending',
    apiName: 'first_air_date.lte',
  },

  ratingDesc: {
    name: 'Rating Descending',
    apiName: 'vote_average.desc',
  },

  ratingAsc: {
    name: 'Rating Ascending',
    apiName: 'vote_average.asc',
  },
};

export const USER_SCORE_RANGE = { min: 0, max: 10 };

export const MOVIE_GENRES = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export const TV_GENRES = [
  {
    id: 10759,
    name: 'Action & Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 10762,
    name: 'Kids',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10763,
    name: 'News',
  },
  {
    id: 10764,
    name: 'Reality',
  },
  {
    id: 10765,
    name: 'Sci-Fi & Fantasy',
  },
  {
    id: 10766,
    name: 'Soap',
  },
  {
    id: 10767,
    name: 'Talk',
  },
  {
    id: 10768,
    name: 'War & Politics',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export const MOVIES_DEFAULT_OPTIONS = {
  sortBy: SORT_MOVIES_BY_OPTIONS.popularityDesc.apiName,
  userScoreRange: [0, 10],

  genres: MOVIE_GENRES.map((item) => {
    return { ...item, isSelected: false };
  }),

  releaseDates: {
    from: null,
    to: null,
  },
};

export const TV_DEFAULT_OPTIONS = {
  sortBy: SORT_TV_BY_OPTIONS.popularityDesc.apiName,
  userScoreRange: [0, 10],

  genres: TV_GENRES.map((item) => {
    return { ...item, isSelected: false };
  }),

  releaseDates: {
    from: null,
    to: null,
  },
};
