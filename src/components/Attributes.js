import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { fetchAttributes, selectAttribute } from '../actions/attributes-actions';

class Attributes extends Component {
	componentWillMount() {
		this.props.dispatch(fetchAttributes());
	}

	handleAttributeClick = (attribute) => {
		this.props.dispatch(selectAttribute(attribute));
	}

	render() {
		const delimiter = ', ';
		const {attributes} = this.props;

		let listItems = attributes.map(attribute => {
			let values = attribute.values.map(value => value.name);
			
			return <ListGroupItem key={attribute.id} active={attribute.selected} onClick={() => {this.handleAttributeClick(attribute)}}>
				{attribute.name}: {values.join(delimiter)}
			</ListGroupItem>
		});

		return (
			<ListGroup>{listItems}</ListGroup>
		);
	}
}

const mapStoreToProps = store => {
  return {
    attributes: store.attributes.data
  }
}

export default connect(mapStoreToProps)(Attributes);