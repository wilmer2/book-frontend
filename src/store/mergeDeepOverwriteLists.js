import { List } from 'immutable';
import isNull from 'lodash/isNull';

const isMergeable = a => (
  a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a)
);

const mergeDeepOverWriteLists = (a, b) => {
  if (isNull(b)) return b;

  if (isMergeable(a) && !List.isList(a)) {
    return a.mergeWith(mergeDeepOverWriteLists, b);
  }

  return b;
}

export default mergeDeepOverWriteLists;
