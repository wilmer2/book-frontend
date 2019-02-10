/**
* Action Helpers
*/
const asyncTypes = {
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const createAsyncTypes = (typeString) => {
  const newAsyncTypes = {};
  
  Object.values(asyncTypes).reduce((newAsyncTypes, asyncValue) => {
    newAsyncTypes[asyncValue] = `${typeString}_${asyncValue}`;
    
    return newAsyncTypes;
  }, newAsyncTypes)

  return newAsyncTypes;
};
