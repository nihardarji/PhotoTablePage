import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/layout/Navbar';
import ListViewComponent from './components/layout/ListViewComponent';
import ImageState from './contexts/images/ImageState'
import MapViewComponent from './components/layout/MapViewComponent';
import SearchModal from './components/SearchModal';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import Search from './components/layout/Search';

function App() {
  return (
    <ImageState>
      <Router>
        <div className="App">
          <Navbar/>   
          <div>       
            <Search/>
            <Switch>
              <Route exact path= '/maps' component ={() => <MapViewComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `1000px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />}
              />
              <Route exact path='/' component={ListViewComponent}/>
            </Switch>
          </div>
            <SearchModal/>
        </div>
      </Router>
    </ImageState>
  );
}

export default App;
