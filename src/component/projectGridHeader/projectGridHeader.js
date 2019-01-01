import React from 'react';

import {PRIMARY_COLOR} from '../../utils/colors';
import {PROJECT_HEADER_HEIGHT} from '../../utils/constantes';

import './projectGridHeader.css';

export default class ProjectGridHeader extends React.Component {

    render() {
        return (
            <div className={'projectGridHeaderContainer'} style={{height: PROJECT_HEADER_HEIGHT}}>
                <div className={'projectGridHeaderTitle'} style={{color: PRIMARY_COLOR}}>
                    MES PROJETS
                </div>
                <div className={'projectGridHeaderContent'}>
                    Découvrez quelques-uns de mes projets
                </div>
                <div className={'projectGridHeaderEmphasis'}>
                    Design
                </div>
            </div>
        )
    }

}