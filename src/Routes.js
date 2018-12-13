import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoute from "./Components/AuthRoutes/PublicRoutes";

import Home from "./Components/Home";
import Login from "./Components/Login";

import Dashboard from "./Components/Admin/Dashboard";
import AdminMatches from "./Components/Admin/Matches";
import AddOrEditMatch from "./Components/Admin/Matches/AddOrEditMatch";

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
                    path="/admin_partidas/editar_partida/:id"
                    exact
                    component={AddOrEditMatch}
                />
                <PrivateRoute
                    {...props}
                    path="/dashboard"
                    exact
                    component={Dashboard}
                />
                <PublicRoute
                    {...props}
                    restricted={true}
                    path="/login"
                    exact
                    component={Login}
                />
                <PublicRoute
                    {...props}
                    restricted={false}
                    path="/"
                    exact
                    component={Home}
                />
            </Switch>
        </Layout>
    );
};

export default Routes;
