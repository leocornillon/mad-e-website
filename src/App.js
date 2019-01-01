import React, { Component } from 'react';

import CanvasHeader from "./component/CanvasHeader";
import MainContainer from "./layout/mainContainer/MainContainer";
import ProjectGrid from "./layout/projectGrid/ProjectGrid";
import ProjectGridHeader from "./component/projectGridHeader/projectGridHeader";
import ProjectGridRow from "./layout/projectGridRow/ProjectGridRow";
import ProjectGridComponent from "./component/projectGridComponent/ProjectGridComponent";
import ProjectsPictures from "./utils/projects";

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CanvasHeader />
        <MainContainer>
            <ProjectGrid>
                <ProjectGridHeader />
                <ProjectGridRow>
                    <ProjectGridComponent height={'1 / 3'} width={'1 / 1'} img={ProjectsPictures.project1}/>
                    <ProjectGridComponent height={'1 / 1'} width={'2 / 2'} img={ProjectsPictures.project2}/>
                    <ProjectGridComponent height={'1 / 1'} width={'3 / 3'} img={ProjectsPictures.project3}/>
                    <ProjectGridComponent height={'2 / 2'} width={'2 / 4'} img={ProjectsPictures.project4}/>
                </ProjectGridRow>
            </ProjectGrid>
        </MainContainer>
      </React.Fragment>
    );
  }
}

export default App;
