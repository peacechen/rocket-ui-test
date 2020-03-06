import React, { Component } from 'react';
import ConnectedView from './ConnectedView';
import {fetchLaunchesIfNeeded} from '../actions/Launches';
import {fetchRocketsIfNeeded} from '../actions/Rockets';
import Launch from '../components/Launch';
import Accordion from '../components/Accordion';

class LaunchesView extends Component {
  componentDidMount() {
    const { dispatch, launchCollection, rocketCollection } = this.props;
    fetchLaunchesIfNeeded({ dispatch, launchCollection });
    fetchRocketsIfNeeded({ dispatch, rocketCollection });
  }

  renderContent() {
    const { launchCollection, rocketCollection } = this.props;

    if (!launchCollection || launchCollection.fetching ||
        !rocketCollection || rocketCollection.fetching) {
      return <div> LOADING </div>;
    }

    if (launchCollection && launchCollection.error) {
      return <div> ERROR: {launchCollection.errorMessage} </div>;
    }

    if (rocketCollection && rocketCollection.error) {
      return <div> ERROR: {rocketCollection.errorMessage} </div>;
    }

    if (!launchCollection.launches.length && !rocketCollection.rockets.length) {
      return <div> NO DATA </div>;
    }

    let launches = launchCollection.launches.map(launch => {
      const rocket = rocketCollection.rockets.find(r => r.rocket_id === launch.rocket.rocket_id);
      return (
        <div
          key={launch.launch_id}
          label={launch.mission_name}
          content={<Launch launch={launch} rocket={rocket}/>}
        />
      );
    });

    return (
      <Accordion>
        {launches}
      </Accordion>
    );
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
