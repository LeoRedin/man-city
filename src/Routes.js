import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoute from "./Components/AuthRoutes/PublicRoutes";

import Home from "./Components/Home";
import Login from "./Components/Login";

import Dashboard from "./Components/Admin/Dashboard";
import AdminMatches from "./Components/Admin/Matches";

const Routes = props => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute
                    {...props}
                    path="/admin_partidas"
                    exact
                    component={AdminMatches}
                />

                <PrivateRoute
                    {...props}
                    path="/dashboard"
                    exact
                    component={Dashboard}
                />

                <PublicRoute
                    {...props}
                    restricted={false}
                    path="/"
                    exact
                    component={Home}
                />
                <PublicRoute
                    {...props}
                    restricted={true}
                    path="/"
                    exact
                    component={Login}
                />
            </Switch>
        </Layout>
    );
};

export default Routes;
