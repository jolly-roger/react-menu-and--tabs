import React, {Component} from 'react';
import { Link } from 'react-router'
import BaseTabs from './BaseTabs';


export default class App extends BaseTabs {
    constructor () {
        super();
        
        this.tabItemsId = 'menuItems';
    }
    
    render() {
        let {menuItemRoute} = this.props.params;
        let menuItems = this.props.route.menuConfig.getMenuItems();
        let binbedHandleTabItemClick = this.handleTabItemClick.bind(this);

        return (
            <div className="row collapse">
                <div id={this.tabItemsId} className="small-3 columns">
                    <ul className="tabs vertical" onClick={binbedHandleTabItemClick}>
                        {menuItems.map((val, i) => {
                            let props = {};
                            
                            if (menuItemRoute && val.route == menuItemRoute) {
                                props[this.ariaSelectedAttr] = true;
                            }
                            
                            return (
                                <li className="tabs-title">
                                    <Link to={"/" + val.route} {...props} >{val.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="columns">
                    <div className="tabs-content vertical">
                        <div className="tabs-panel is-active">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
