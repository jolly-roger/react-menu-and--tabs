import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Filter } from './store';
import ChildTabs from './ChildTabs';
import TabLink from './TabLink';

import s from './Tabs.css';
import { navigator as navigatorClass } from './Navigator.css';

export default function ParentTabs(props) {
  const filter = new Filter();
  let { match: { params: { parentTabRoute, childTabRoute } } } = props;
  const parentTabs = filter.getParentTabs();

  if (!parentTabRoute) {
    parentTabRoute = (parentTabs.length > 0) ? parentTabs[0].route : null;
  }

  if (parentTabRoute && !childTabRoute) {
    const childTabs = filter.getChildTabs(parentTabRoute);

    childTabRoute = (childTabs.length > 0) ? childTabs[0].route : null;
  }

  return (
    <div className={navigatorClass}>
      <div className={cs(s.tabs, s.parent_tabs)}>
        <ul>
          {parentTabs.map((val) => {
            const localChildTabs = filter.getChildTabs(val.route);
            let localChildTabRoute = childTabRoute;

            if (localChildTabs.indexOf(childTabRoute) < 0) {
              localChildTabRoute = localChildTabs[0].route;
            }

            return (
              <TabLink
                link={val}
                currentRoute={parentTabRoute}
                childTabRoute={localChildTabRoute}
                key={val.route}
              />
            );
          })}
        </ul>
      </div>
      <div className={s.columns}>
        <div>
          <ChildTabs
            parentTabRoute={parentTabRoute}
            childTabRoute={childTabRoute}
            location={props.location}
          />
        </div>
      </div>
    </div>
  );
}

ParentTabs.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};
