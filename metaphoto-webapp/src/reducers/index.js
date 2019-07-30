import { combineReducers } from 'redux';

import authentication from './authentication';
import feedback from './feedback';
import filmstocks from './filmstocks';
import time from './time';

export default combineReducers({
    authentication,
    feedback,
    filmstocks,
    time
})
