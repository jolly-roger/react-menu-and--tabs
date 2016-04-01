import React, {Component} from 'react';
import loremIpsum from 'lorem-ipsum-react-native';

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
                    <Navigator navigationConfig={this.state.navigationConfig}
                        sectionDataProvider={(params) => {
                                let fullRoute = `${params.parentTabRoute}/${params.childTabRoute}/${params.section}`;
                                
                                return (
                                    <div>
                                        {fullRoute}
                                        <br />
                                        {loremIpsum({
                                            units: 'paragraphs'
                                        })}
                                    </div>
                                );
                            }} />
                </div>
            );
        } else {
            return false;
        }
    }
}