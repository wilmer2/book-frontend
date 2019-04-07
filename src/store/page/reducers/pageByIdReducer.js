/**
* object for page by id reducer
*/
import { GET_PAGE_BY_ID_ASYNC } from '../types';

const reducer = {
  [GET_PAGE_BY_ID_ASYNC.PENDING]: state => state.mergeDeep({
    byId: {
      fetchError: false,
      isFetching: true,
    },
  }),
  [GET_PAGE_BY_ID_ASYNC.ERROR]: (state, { payload: { errors } }) => state.mergeDeep({
    byId: {
      isFetching: false,
      fetchError: true,
      errorMessage: errors,
    },
  }),
  [GET_PAGE_BY_ID_ASYNC.SUCCESS]: (state, { payload : { id } }) => state.mergeDeep({
    byId: {
      isFetching: false,
      fetchError: false,
      id,
    },
  }),
};

export default reducer;
