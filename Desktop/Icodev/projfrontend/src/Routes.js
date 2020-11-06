import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home"
import Signup from "./user/Signup";
const Routes =()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/>
            {/* <PrivateRoute path="/user/dashboard" exact component={}/> */}
        </Switch>
        </BrowserRouter>
    );
};
export default Routes;
