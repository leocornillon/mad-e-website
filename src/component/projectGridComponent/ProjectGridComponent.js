import React from 'react';

import './ProjectGridComponent.css';

export default class ProjectGridComponent extends React.Component {

    render() {

        const {height, width, img, style} = this.props;

        return(
            <div className={'projectGridComponentContainer'} style={{...style, gridColumn: width, gridRow: height}}>
                <img src={img} alt={img}/>
            </div>
        );
    }
}