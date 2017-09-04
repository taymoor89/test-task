import {sortBy, find} from 'lodash';
import { 
	ADD_ATTRIBUTE_VALUE, REMOVE_ATTRIBUTE_VALUE 
} from './attributes-actions';

export const FETCH_VALUES_PENDING = 'FETCH_VALUES_PENDING';
export const FETCH_VALUES_FULLFILLED = 'FETCH_VALUES_FULLFILLED';
export const FETCH_VALUES_REJECTED = 'FETCH_VALUES_REJECTED';
export const SELECT_VALUES = 'SELECT_VALUES';
export const DESELECT_VALUES = 'DESELECT_VALUES';

export function fetchValues() {
	return function(dispatch) {
		const url = 'http://demo0113689.mockable.io/values';
		
		//Just to show some loader while values are being fetched
		dispatch({type: FETCH_VALUES_PENDING});

		fetch(url)
			.then(response => {
				var contentType = response.headers.get("content-type");
				if(contentType && contentType.includes("application/json")) {
					return response.json();
				}
				throw new TypeError("Oops, we haven't got JSON!");
			})
			.then(data => {
				data = sortBy(data, item => {
					return item.rank;
				})
				dispatch({
					type: FETCH_VALUES_FULLFILLED,
					payload: data
				});
			})
			.catch(err => {
				dispatch({
					type: FETCH_VALUES_REJECTED,
					payload: err
				});
			});
	}
}

export function updateValue(attribute, value){
	return function(dispatch) {
		const url = 'http://demo0113689.mockable.io/attribute_values?attribute_id=1&value_id=2';
		const {id, values} = attribute;
		const found = find(values, {id: value.id});

		//Optimistically update UI
		if(!found) {
			dispatch({type: ADD_ATTRIBUTE_VALUE, payload: {id, value}});
			dispatch({type: SELECT_VALUES, payload: [...values, value]});
		}
		else{
			dispatch({type: REMOVE_ATTRIBUTE_VALUE, payload: {id, value}});
			dispatch({type: DESELECT_VALUES, payload: [value]});
		}

		const options = {method: 'PATCH'};
		
		fetch(url, options)
			.then(response => {
				var contentType = response.headers.get("content-type");
				if(contentType && contentType.includes("application/json")) {
					return response.json();
				}
				throw new TypeError("Oops, we haven't got JSON!");
			})
			.then(response => {
				//TODO: Dispatch some action
			})
			.catch(error => {
				//TODO: Dispatch some action
			});
	}
}