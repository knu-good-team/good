import './App.css';
import React from 'react';
import MapComponent from './components/map/map';
import Logo from './components/logo/logo';

import MainVisual from './components/mainVisual/MainVisual';
import NavigationBar from './components/nav/Navigation';
import Search from './components/search/Search';
import Statistics from './components/statistics/statistics';


function App() {

  return (
    <div className="App">

      <header className="header">
        <Logo />
        <NavigationBar />
        <Search />
      </header>

      <container>
        <MainVisual />
      </container>

      <footer className="footer">
        <MapComponent />
        <Statistics />
      </footer>

    </div>
  );
}

export default App;
