import React from 'react';
import {render} from 'react-dom';
import Navigator from './components/Navigator';


fetch('/menu-config')
.then((data) => data.json())
.then((menuConfig) => {
    render(
      <Navigator menuConfig={menuConfig} />,
      document.getElementById('app')
    )
})
.catch((err) => console.log(err));
