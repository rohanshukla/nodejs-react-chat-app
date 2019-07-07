import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ScrollToTop from './component/utils/ScrollToTop';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import { theme } from './theme';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ScrollToTop>
          <MuiThemeProvider theme={theme}>
            <Route path="/" component={Register} exact />
            <Route path="/dashboard" component={Dashboard} exact />
          </MuiThemeProvider>
        </ScrollToTop>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
