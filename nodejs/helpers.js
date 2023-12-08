import lodash from 'lodash';
const { sample: _sample } = lodash

export const eitherValOrNull = (val) => {
    if (!Array.isArray(val)) {
        val = [val]
    }
    // If val is not an array or is an empty array, return null
    return _sample([null, ...val]);
};

export default { eitherValOrNull }
