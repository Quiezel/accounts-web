import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsuarioLista from './UsuarioLista';
import UsuarioEditar from './UsuarioEditar';

class App extends Component {
  render(){
    return(
      <Router>
        <Switch>
        <Route path='/' exact={true} component={Home}></Route>
          <Route path='/usuarios' exact={true} component={UsuarioLista} />
          <Route path='/usuarios/:id' component={UsuarioEditar} ></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
