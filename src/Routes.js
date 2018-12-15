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
import AdminPlayers from "./Components/Admin/Players";

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
                    path="/admin_partidas/adicionar"
                    exact
                    component={AddOrEditMatch}
                />
                <PrivateRoute
                    {...props}
                    path="/admin_jogadores"
                    exact
                    component={AdminPlayers}
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
