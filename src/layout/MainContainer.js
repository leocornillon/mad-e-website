import React, {Component} from 'react';

import './MainContainer.css';

export default class MainContainer extends Component {

    render() {

        const { children } = this.props;

        return (
            <div className={'mainContainer'}>
                {children}
            </div>
        )
    }
}