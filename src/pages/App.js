import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

import Attributes from '../components/Attributes';
import Values from '../components/Values';

class App extends Component {

  render() {
    return (
      <Grid>
			<PageHeader>Test Task</PageHeader>
      <Row>
				<Col sm={8} md={8}>
          <h3>Attributes</h3>
        </Col>
				<Col sm={4} md={4}>
          <h3>Values</h3>
        </Col>
			</Row>
			<Row>
				<Col sm={8} md={8}><Attributes/></Col>
				<Col sm={4} md={4}><Values/></Col>
			</Row>
      </Grid>
    );
  }
}

export default App;
