import React, { Component } from 'react';
import { Trail } from 'react-spring';

import FrontLines from "./component/frontLines/FrontLines";
import CanvasHeader from "./component/CanvasHeader";
import MainContainer from "./layout/mainContainer/MainContainer";
import ProjectGrid from "./layout/projectGrid/ProjectGrid";
import ProjectGridHeader from "./component/projectGridHeader/projectGridHeader";
import ProjectGridRow from "./layout/projectGridRow/ProjectGridRow";
import ProjectGridComponent from "./component/projectGridComponent/ProjectGridComponent";
import SeeMore from "./component/seeMore/SeeMore";
import ProjectsPictures from "./utils/projects";

import './App.css';

class App extends Component {


  render() {

      const projects = [
          {key: 1, height: '1 / 3', width: '1 / 1', img: ProjectsPictures.project1},
          {key: 2, height: '1 / 1', width: '2 / 2', img: ProjectsPictures.project2},
          {key: 3, height: '1 / 1', width: '3 / 3', img: ProjectsPictures.project3},
          {key: 4, height: '2 / 2', width: '2 / 4', img: ProjectsPictures.project4},
      ];

    return (
      <React.Fragment>
        <FrontLines/>
        <CanvasHeader />
        <MainContainer>
            <ProjectGrid>
                <ProjectGridHeader />
                <ProjectGridRow>
                    <Trail
                        items={projects} keys={item => item.key}
                        from={{ transform: 'scale(0)', opacity: 0,  }}
                        to={{ transform: 'scale(1)', opacity: 1 }}
                    >
                        {item => props =>
                            <ProjectGridComponent height={item.height} width={item.width} img={item.img} style={props}/>
                        }
                    </Trail>
                </ProjectGridRow>
            </ProjectGrid>
            <SeeMore />
        </MainContainer>
      </React.Fragment>
    );
  }
}

export default App;
