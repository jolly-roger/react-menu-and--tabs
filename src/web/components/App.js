import React, { Component } from 'react';

import Navigator, { store, loadNavigation } from './Navigator';

export default class App extends Component {
  componentDidMount() {
    this.serverRequest = fetch('/navigation-config')
      .then(data => data.json())
      .then((navigationConfig) => {
        store.dispatch(loadNavigation(navigationConfig));
        this.setState(navigationConfig);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (store.getState()) {
      return (
        <div>
          <div className="top-bar row">
            <div className="top-bar-title">
              <strong>React-menubar-and-tabs Example</strong>
            </div>
          </div>
          <Navigator />
        </div>
      );
    }
    return null;
  }
}
