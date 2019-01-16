import typeToReducer from 'type-to-reducer';
import mergeEntities from '../../actions/EntitiesActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: {},
  categories: {},
  readinglists: {},
  books: {},
});

const entities =  typeToReducer({
  [mergeEntities]: (state, action) => state.mergeDeep(fromJS(action.payload)),
}, initialState);

export default entities;
