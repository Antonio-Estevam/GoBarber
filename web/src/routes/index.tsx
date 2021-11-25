import React from "react";
import { Switch } from 'react-router-dom';

import Route from "./Routes";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Deshbord from '../pages/Deshbord';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/deshbord" component={Deshbord} isPrivate/>
    </Switch>
);


export default Routes;
