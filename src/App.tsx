import React from 'react';

import './App.css';

import { ActiveUserContextProvider } from './Contexts/ActiveUserContext';
import Router from './Router/Router';
import {createTheme, ThemeProvider} from "@mui/material";

function App() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

  return (
    <ActiveUserContextProvider>
        <ThemeProvider theme={darkTheme}>
            <Router />
        </ThemeProvider>
    </ActiveUserContextProvider>
  );
}

export default App;
