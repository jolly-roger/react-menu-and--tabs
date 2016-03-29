import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory, hashHistory} from 'react-router';
import {getRoutes} from './routes';
import MenuConfig from './MenuConfig';


fetch('/menu-config')
.then((data) => data.json())
.then((menuConfig) => {
    let routes = getRoutes(new MenuConfig(menuConfig));
    
    render(
      <Router routes={routes} history={browserHistory}/>,
      document.getElementById('app')
    )
})
.catch((err) => console.log(err));
