import { SELECT_VALUES } from './values-actions';

export const FETCH_ATTRIBUTES_PENDING = 'FETCH_ATTRIBUTES_PENDING';
export const FETCH_ATTRIBUTES_FULLFILLED = 'FETCH_ATTRIBUTES_FULLFILLED';
export const FETCH_ATTRIBUTES_REJECTED = 'FETCH_ATTRIBUTES_REJECTED';
export const SELECT_ATTRIBUTE = 'SELECT_ATTRIBUTE';
export const ADD_ATTRIBUTE_VALUE = 'ADD_VALUE';
export const REMOVE_ATTRIBUTE_VALUE = 'REMOVE_ATTRIBUTE_VALUE';

export function fetchAttributes() {
	return function(dispatch) {
		const url = 'http://demo0113689.mockable.io/attribute_values';
		
		//Just to show some loader while attributes are being fetched
		dispatch({type: FETCH_ATTRIBUTES_PENDING});

		fetch(url)
			.then(response => {
				var contentType = response.headers.get("content-type");
				if(contentType && contentType.includes("application/json")) {
					return response.json();
				}
				throw new TypeError("Oops, we haven't got JSON!");
			})
			.then(data => {
				dispatch({
					type: FETCH_ATTRIBUTES_FULLFILLED,
					payload: data
				});
			})
			.catch(err => {
				dispatch({
					type: FETCH_ATTRIBUTES_REJECTED,
					payload: err
				});
			});
	}
}

export function selectAttribute(attribute) {
	return function(dispatch) {
		dispatch({type: SELECT_ATTRIBUTE, payload: attribute.id});
		dispatch({type: SELECT_VALUES, payload: attribute.values});
	}
}