import { combineReducers } from 'redux';

import authentication from './authentication';
import time from './time';

export default combineReducers({
    authentication,
    time
})
