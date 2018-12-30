import React, { Component } from 'react';

import MainContainer from "./layout/MainContainer";
import CanvasHeader from "./component/CanvasHeader";

import './App.css';

class App extends Component {
  render() {
    return (
      <MainContainer>
        <CanvasHeader />

      </MainContainer>
    );
  }
}

export default App;
