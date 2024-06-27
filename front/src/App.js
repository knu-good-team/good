import './App.css';
import React from 'react';
import Logo from './components/logo/logo';

import MainVisual from './components/mainVisual/MainVisual';


function App() {

  return (
    <div className="App">

      <header className="header">
        <Logo />
        {/* <NavigationBar /> */}
      </header>

      <div>
        <MainVisual />
      </div>

      <footer className="footer">
        {/* <MapComponent />
        <Statistics /> */}
      </footer>

    </div>
  );
}

export default App;
