import React, { Component } from 'react';
import ConnectedView from './ConnectedView';
import {fetchLaunchesIfNeeded} from "../actions/Launches";
import Launch from '../components/Launch';

class LaunchesView extends Component {
  componentDidMount() {
    const { dispatch, launchCollection } = this.props;
    fetchLaunchesIfNeeded({ dispatch, launchCollection });
  }

  renderContent() {
    const { launchCollection } = this.props;

    if (!launchCollection || launchCollection.fetching) {
      return <div> LOADING </div>;
    }

    if (!launchCollection.launches.length) {
      return <div> NO DATA </div>;
    }

    let launches = launchCollection.launches.map(launch =>
      <Launch {...{
        key: launch.launch_id,
        launch
      }} />
    );

    return <ul>{launches}</ul>;
  }

  render() {
    return (
      <div>
        <h2> SpaceX launches </h2>
        {this.renderContent()}
      </div>
    );
  }
}

export default ConnectedView(LaunchesView, 'launches');
