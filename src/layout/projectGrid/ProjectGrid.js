import React, {Component} from 'react';

import './ProjectGrid.css';

export default class ProjectGrid extends Component {

    render() {

        return (
            <div className={'projectGridContainer'}>
                {this.props.children}
            </div>
        )
    }
}