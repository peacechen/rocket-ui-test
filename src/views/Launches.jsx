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

    if (launchCollection && launchCollection.error) {
      return <div> ERROR: {launchCollection.errorMessage} </div>;
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

const storesToMap = {launchCollection: null};

export default ConnectedView(LaunchesView, 'launches', storesToMap);
