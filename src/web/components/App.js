import React, {Component} from 'react';

import Navigator from './Navigator';


export default class App extends Component {    
    constructor() {
        super();
        
        this.state = {
            navigationConfig: null
        };
    }
    
    componentDidMount() {
        this.serverRequest = fetch('/navigation-config')
            .then((data) => data.json())
            .then((navigationConfig) => {
                this.setState({
                    navigationConfig: navigationConfig
                });
            })
            .catch((err) => console.log(err));
    }
    
    render() {
        if (this.state.navigationConfig) {
            return (
                <div>
                    <div className="top-bar row">
                        <div className="top-bar-title">
                            <strong>React-menubar-and-tabs Example</strong>
                        </div>
                    </div>
                    <Navigator navigationConfig={this.state.navigationConfig} />
                </div>
            );
        } else {
            return false;
        }
    }
}