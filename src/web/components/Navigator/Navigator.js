import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ParentTabs from './ParentTabs';

export default function Navigator() {
  return (
    <BrowserRouter>
      <Route
        path="/:parentTabRoute?/:childTabRoute?"
        component={ParentTabs}
      />
    </BrowserRouter>
  );
}
