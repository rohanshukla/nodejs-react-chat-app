import React, { Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import Index from './component/index';

function App() {
  return (
    <Fragment>
      <MuiThemeProvider theme={theme}>
        <Index />
      </MuiThemeProvider>
    </Fragment>
  );
}

export default App;
