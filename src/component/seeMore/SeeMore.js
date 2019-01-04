import React, {Component} from 'react';

import {PRIMARY_COLOR} from "../../utils/colors";

import './SeeMore.css';

export default class SeeMore extends Component {


    render() {
        return (
            <button
                className={'seeMoreContainer'}
                style={{
                    color: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR
                }}
            >
                Voir +
            </button>
        )
    }
}