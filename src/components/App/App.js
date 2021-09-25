import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  if (1 === 0) {
    setIsLoggedIn(true);
  }
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn}/>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
