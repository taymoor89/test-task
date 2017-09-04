import { combineReducers } from 'redux';

import attributes from './attributes-reducer';
import values from './values-reducer';

export default combineReducers({
	attributes,
	values
})