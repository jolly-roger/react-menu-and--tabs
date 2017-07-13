import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'

import ParentTabs from './ParentTabs';


export default class Navigator extends Component {    
    render() {
      return (
          <BrowserRouter>
            <Route path={'/:parentTabRoute?/:childTabRoute?'} component={ParentTabs} />
          </BrowserRouter>
      );
    }
}