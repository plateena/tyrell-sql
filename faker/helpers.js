import { sample as _sample } from 'lodash';

export const eitherValOrNull = (val) => {
    if (!Array.isArray(val)) {
        val = [val]
    }
    // If val is not an array or is an empty array, return null
    return _sample([null, ...val]);
};
