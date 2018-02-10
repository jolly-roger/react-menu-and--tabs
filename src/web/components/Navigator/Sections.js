import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Section from './Section';
import { Filter } from './store';


export default function Sections(props) {
  const filter = new Filter();
  const {
    parentTabRoute,
    childTabRoute,
    location,
  } = props;
  const sections = filter.getSections(parentTabRoute, childTabRoute);
  const query = queryString.parse(location.search);
  let collapse = query.collapse ? JSON.parse(query.collapse) : [];

  if (!location.search) {
    collapse = sections.reduce((res, section) => {
      if (section.isInactive) {
        res.push(section.route);
      }

      return res;
    }, []);
  }

  return (
    <div>
      <ul>
        {sections.map(val => (
          <li key={val.route}>
            <Section
              parentRoute={parentTabRoute}
              childRoute={childTabRoute}
              section={val}
              collapse={collapse}
              location={location}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

Sections.propTypes = {
  parentTabRoute: PropTypes.string,
  childTabRoute: PropTypes.string,
  location: PropTypes.object,
};
