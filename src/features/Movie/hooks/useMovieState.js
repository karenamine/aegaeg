import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { movieActions } from '../movieSlice';

const useMovieState = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const data = useSelector((state) => state.movie.data);

  useEffect(() => {
    dispatch(movieActions.fetchData(id));

    return () => {
      dispatch(movieActions.resetState());
    };
  }, [dispatch, id]);

  return { data };
};

export default useMovieState;
