import './App.css';
import Index from './pages/Index'
import About from './pages/About'
import Repo from './pages/Repo'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/:user/:repo">
          <Repo/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
