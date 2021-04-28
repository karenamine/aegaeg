import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  cache: {},
  data: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'person',
  initialState,

  reducers: {
    resetState(state) {
      return { ...initialState, cache: state.cache };
    },

    fetchDataStart(state) {
      state.isLoading = true;
    },

    fetchDataSuccess(state, { payload }) {
      state.isLoading = false;
      state.data = payload;
      state.cache[payload.id] = payload;
    },

    fetchCached(state, { payload }) {
      state.data = payload;
    },
  },
});

const fetchData = (id) => async (dispatch, getState) => {
  const state = getState().person;

  if (state.cache[id]) {
    dispatch(slice.actions.fetchCached(state.cache[id]));

    return;
  }

  dispatch(slice.actions.fetchDataStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `person/${id}`,
      append_to_response: 'movie_credits,tv_credits,external_ids',
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const personActions = { ...slice.actions, fetchData };
export default slice.reducer;
