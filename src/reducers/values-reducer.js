import {
	FETCH_VALUES_PENDING, FETCH_VALUES_FULLFILLED,
	FETCH_VALUES_REJECTED, SELECT_VALUES,
	DESELECT_VALUES
} from '../actions/values-actions';
  
export default function (state = {
	data: [],
	fetching: true,
	error: null
}, action) {
	
	switch(action.type) {
		case FETCH_VALUES_PENDING: {
				return {...state, fetching: true};
		}

		case FETCH_VALUES_REJECTED: {
				return {...state, fetching: false, error: action.payload};
		}

		case FETCH_VALUES_FULLFILLED: {
				return {...state, fetching: false, data: action.payload};
		}

		case SELECT_VALUES: {
			const idsToSelect = action.payload.map(value => value.id);
			const data = state.data.map(value => {
				const selected = idsToSelect.indexOf(value.id) > -1;
				return {...value, selected};
			});
			return {...state, data};
		}

		case DESELECT_VALUES: {
			const idsToSelect = action.payload.map(value => value.id);
			console.log(idsToSelect);
			const data = state.data.map(value => {
				let selected = value.selected;
				if(idsToSelect.indexOf(value.id) > -1)
					selected = false;
				return {...value, selected};
			});
			return {...state, data};
		}

		default: {
				return state;
		}
	}
}