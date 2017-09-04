import React, { Component } from 'react';

class Value extends Component {
	render() {
		return (
			<div className={'rank-' + this.props.rank}>{this.props.value}</div>
		);
	}
}

export default  Value;