/**
* Entities Actions
*/
import { createAction } from 'redux-actions';
import { MERGER_ENTITIES } from './entities/types';

export const mergeEntities = createAction(MERGER_ENTITIES);
