import React, { Component } from 'react';
import { connect } from "react-redux";

import Layout from './Layout';
import Navigation from '../components/Navigation';

const menu = Navigation();

function MasterLayoutHOC(WrappedComponent, pageName, storesToMap) {
  class MasterLayoutImpl extends Component {
    render() {

      const layoutProps = {
        menu,
        pageName
      };

      return (
        <Layout {...layoutProps}>
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  }

  // Pluck out specified parts of the store
  const mapStateToProps = state => (storesToMap => storesToMap)(state);

  const mapDispatchToProps = dispatch => ({
    dispatch
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(MasterLayoutImpl);
}

export default MasterLayoutHOC;
