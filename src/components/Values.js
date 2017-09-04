import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { fetchValues, updateValue } from '../actions/values-actions';

import Value from './Value';

class Values extends Component {
	componentWillMount() {
		this.props.dispatch(fetchValues());
	}

	handleValueClick = (value) => {
		this.props.dispatch(
			updateValue(this.props.selectedAttribute, value)
		);
	}

	render() {
		let listItems = this.props.values.map(value => {
			return <ListGroupItem 
				key={value.id} 
				active={value.selected} 
				onClick={() => {this.handleValueClick(value)}}>
				<Value rank={value.rank} value={value.name}/>
			</ListGroupItem>
		});

		return (
			<ListGroup>{listItems}</ListGroup>
		);
	}
}

const mapStoreToProps = store => {
	return {
		values: store.values.data,
		selectedAttribute: find(store.attributes.data, {selected: true})
	};
}
  
export default connect(mapStoreToProps)(Values);