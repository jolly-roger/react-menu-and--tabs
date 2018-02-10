import React from 'react';
import PropTypes from 'prop-types';

import { Filter } from './store';
import Sections from './Sections';
import TabLink from './TabLink';

import s from './Tabs.css';

export default function ChildTabs(props) {
  const filter = new Filter();
  const { parentTabRoute, childTabRoute } = props;
  const tabs = filter.getChildTabs(parentTabRoute);

  return (
    <div className={s.tabs}>
      <ul className={s.child_tabs}>
        {tabs.map(val => (
          <TabLink
            link={val}
            currentRoute={childTabRoute}
            parentTabRoute={parentTabRoute}
            key={val.route}
          />
        ))}
      </ul>
      <div>
        <Sections
          parentTabRoute={parentTabRoute}
          childTabRoute={childTabRoute}
          location={props.location}
        />
      </div>
    </div>
  );
}

ChildTabs.propTypes = {
  parentTabRoute: PropTypes.string,
  childTabRoute: PropTypes.string,
  location: PropTypes.object,
};
