/**
* Category Actions
*/
import { createAction } from 'redux-actions';
import { GET_CATEGORIES_ASYNC } from './category/types';

export const getCategoriesSuccess = createAction(GET_CATEGORIES_ASYNC.SUCCESS);
