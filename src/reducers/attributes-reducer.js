import {
  FETCH_ATTRIBUTES_PENDING, FETCH_ATTRIBUTES_FULLFILLED,
	FETCH_ATTRIBUTES_REJECTED, SELECT_ATTRIBUTE,
	ADD_ATTRIBUTE_VALUE, REMOVE_ATTRIBUTE_VALUE
} from '../actions/attributes-actions';

export default function (state = {
	data: [],
	fetching: true,
	error: null
}, action) {

	switch(action.type) {
		case FETCH_ATTRIBUTES_PENDING: {
			return {...state, fetching: true};
		}

		case FETCH_ATTRIBUTES_REJECTED: {
			return {...state, fetching: false, error: action.payload};
		}

		case FETCH_ATTRIBUTES_FULLFILLED: {
			return {...state, fetching: false, data: action.payload};
		}

		case SELECT_ATTRIBUTE: {
			const data = state.data.map(attribute => {
				const selected = attribute.id === action.payload;
				return {...attribute, selected};
			});
			return {...state, data};
		}

		case ADD_ATTRIBUTE_VALUE: {
			const data = state.data.map(attribute => {
				if(attribute.id !== action.payload.id) return attribute;
				const values = [...attribute.values, action.payload.value];
				return {...attribute, values};
			});
			return {...state, data};
		}

		case REMOVE_ATTRIBUTE_VALUE: {
			const {id, value} = action.payload;

			const data = state.data.map(attribute => {
				if(attribute.id !== id) return attribute;
				const values = attribute.values.filter(item => item.id !== value.id);
				return {...attribute, values};
			});
			return {...state, data};
		}

		default: {
			return state;
		}
	}
}