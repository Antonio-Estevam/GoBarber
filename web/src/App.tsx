import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobaStyle from './styles/global';

import AppProvider from './hooks/index';

import Routes from './routes';

const App:React.FC = () => (
  <BrowserRouter>
    <AppProvider>
        <Routes/> 
    </AppProvider>
    <GlobaStyle/>
  </BrowserRouter>
);

export default App;
