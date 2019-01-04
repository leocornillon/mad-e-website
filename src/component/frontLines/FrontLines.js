import React, {Component} from 'react';

import { FRONT_LINES_COLOR_TRANSPARENT } from '../../utils/colors';

import './FrontLines.css';

export default class FrontLines extends Component{

    state = {
        x: 0,
        containerSize: 0
    };

    componentDidMount(){
        this.changeContainerSize();
        window.addEventListener("resize", this.changeContainerSize);
    }

    changeContainerSize = () => {
        const x = document.documentElement.clientWidth > 1200 ? (document.documentElement.clientWidth - 1200) / 2 : 0;
        this.setState({
            x : x,
            containerSize : document.documentElement.clientWidth - 2 * x
        });
    };

    render() {

        const {x, containerSize } = this.state;

        return(
            <React.Fragment>
                <div className={'frontLine'} style={{left: x, backgroundColor: FRONT_LINES_COLOR_TRANSPARENT}}/>
                <div className={'frontLine'} style={{left: x + containerSize / 3, backgroundColor: FRONT_LINES_COLOR_TRANSPARENT}}/>
                <div className={'frontLine'} style={{left: x + containerSize / 3 * 2, backgroundColor: FRONT_LINES_COLOR_TRANSPARENT}}/>
                <div className={'frontLine'} style={{left: x + containerSize, backgroundColor: FRONT_LINES_COLOR_TRANSPARENT}}/>
            </React.Fragment>
        )
    }
}