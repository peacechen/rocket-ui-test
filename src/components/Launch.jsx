import React, { Component } from 'react';

class Launch extends Component {

  render() {

    let launch = this.props.launch || {};
    let rocket = this.props.rocket || {};

    return (
      <React.Fragment>
        <p><strong>Flight Number:</strong> { launch.flight_number}</p>
        <p><strong>ID:</strong> { rocket.rocket_id }</p>
        <p><strong>Cost per launch:</strong> { rocket.cost_per_launch }</p>
        <p><strong>Description:</strong> { rocket.description }</p>
      </React.Fragment>
    );
  }
}

export default Launch;
