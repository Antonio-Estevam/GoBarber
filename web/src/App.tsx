import React from 'react';
import GlobaStyle from './styles/global';
import SignIn from './pages/SignIn';
//import SignUp from './pages/SignUp';
import AppProvider from './hooks/index';
const App:React.FC = () => (
  <>
    <AppProvider>
        <SignIn/>
    </AppProvider>
    <GlobaStyle/>
  </>
);

export default App;
