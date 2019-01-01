import React, {Component} from 'react';

import './MainContainer.css';

export default class MainContainer extends Component {

    render() {

        return (
            <div className={'mainContainer'}>
                {this.props.children}
            </div>
        )
    }
}