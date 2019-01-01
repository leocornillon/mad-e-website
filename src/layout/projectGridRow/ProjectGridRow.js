import React from 'react';

import {PROJECT_ROW_HEIGHT} from '../../utils/constantes';

import './ProjectGridRow.css';

export default class ProjectGridRow extends React.Component {

    render() {

        const projectHeight = parseInt(PROJECT_ROW_HEIGHT.substring(0, PROJECT_ROW_HEIGHT.length - 2), 10) / 2;
        const projectWidth = window.innerWidth < 1200 ? (window.innerWidth / 3) : (1200 / 3);

        return(
          <div className={'projectGridRowContainer'} style={{
              height: PROJECT_ROW_HEIGHT,
              gridAutoColumns: projectWidth,
              gridAutoRows: projectHeight
          }}>
              {this.props.children}
          </div>
        );
    }
}