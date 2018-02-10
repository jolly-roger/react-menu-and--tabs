import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { store, loadSection, Filter } from './store';

import style from './Section.css';

export default class SectionText extends Component {
  constructor(props) {
    super(props);

    const {
      parentRoute,
      childRoute,
      section,
    } = props;

    this.unsubscribeStore = store.subscribe(() => {
      const filter = new Filter();
      const state = filter.findSection(parentRoute, childRoute, section.route);

      this.setState(state);
    });
  }

  componentWillMount() {
    const {
      parentRoute,
      childRoute,
      section,
    } = this.props;
    store.dispatch(loadSection(parentRoute, childRoute, section.route));
  }

  componentWillReceiveProps(newProps) {
    const {
      parentRoute,
      childRoute,
      section,
      collapse,
    } = newProps;
    if (this.props.parentRoute !== parentRoute ||
      this.props.childRoute !== childRoute ||
      this.props.section.route !== section.route ||
      this.props.collapse !== collapse) {
      store.dispatch(loadSection(parentRoute, childRoute, section.route, this.getInactivity()));
    }
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  getInactivity() {
    const {
      collapse,
      section,
    } = this.props;
    let isInactive = false;
    const indexOfSection = collapse.indexOf(section.route);

    if (indexOfSection >= 0) {
      isInactive = true;
    }

    return isInactive;
  }

  render() {
    const {
      parentRoute,
      childRoute,
      section,
      collapse,
      location,
    } = this.props;
    const fullRoute = `${parentRoute}/${childRoute}/${section.route}`;
    let isInactive = '';
    const sectionCollapse = [...collapse];
    const indexOfSection = sectionCollapse.indexOf(section.route);

    if ((!location.search && this.state.isInactive) || this.getInactivity()) {
      isInactive = style.inactive;
      sectionCollapse.splice(indexOfSection, 1);
    } else {
      sectionCollapse.push(section.route);
    }

    return (
      <div>
        <Link
          to={{ pathname: location.pathname, search: `collapse=${JSON.stringify(sectionCollapse)}` }}
        >
          {section.name}
        </Link>
        <div className={isInactive}>
          {fullRoute}
          <br />
          {this.state.text}
        </div>
      </div>
    );
  }
}

SectionText.propTypes = {
  parentRoute: PropTypes.object,
  childRoute: PropTypes.object,
  section: PropTypes.object,
  collapse: PropTypes.array,
  location: PropTypes.object,
};
