import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import Navbar from './components/Navbar';
import Home from './components/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: red[900]
    },
    text: {
      primary: "#000000"
    }
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;