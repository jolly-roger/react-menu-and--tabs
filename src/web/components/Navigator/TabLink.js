import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './TabLink.css';

export default function TabLink(props) {
  const {
    link,
    parentTabRoute,
    childTabRoute,
    currentRoute,
  } = props;
  let route = `/${link.route}`;
  let isActive = '';

  if (parentTabRoute) {
    route = `/${parentTabRoute}/${link.route}`;
  } else if (childTabRoute) {
    route = `/${link.route}/${childTabRoute}`;
  }

  if (currentRoute && currentRoute === link.route) {
    isActive = style.active;
  }

  return (
    <li className={isActive}>
      <Link to={route}>{link.name}</Link>
    </li>
  );
}

TabLink.propTypes = {
  link: PropTypes.object,
  parentTabRoute: PropTypes.string,
  childTabRoute: PropTypes.string,
  currentRoute: PropTypes.string,
};
