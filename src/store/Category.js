/**
* Category Actions
*/
import { createAction } from 'redux-actions';
import { GET_CATEGORIES_ASYNC, PUT_CATEGORIES_IDS } from './category/types';

export const getCategoriesSuccess = createAction(GET_CATEGORIES_ASYNC.SUCCESS);
export const getCategoriesError = createAction(GET_CATEGORIES_ASYNC.ERROR);
export const getCategoriesPending = createAction(GET_CATEGORIES_ASYNC.PENDING);
export const putCategories = createAction(PUT_CATEGORIES_IDS);
