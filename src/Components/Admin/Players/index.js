import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { firebasePlayers } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../Ui/misc";

class AdminPlayers extends Component {
    state = {
        isLoading: true,
        players: []
    };

    componentDidMount() {
        firebasePlayers.once("value").then(snapshot => {
            const players = firebaseLooper(snapshot);

            this.setState({
                isLoading: false,
                players: reverseArray(players)
            });
        });
    }

    render() {
        const { players, isLoading } = this.state;
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Sobrenome</TableCell>
                                    <TableCell>Número</TableCell>
                                    <TableCell>Posição</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players
                                    ? players.map((player, i) => (
                                          <TableRow key={i}>
                                              <TableCell>
                                                  <Link
                                                      to={`/admin_jogadores/adicionar/${
                                                          player.id
                                                      }`}
                                                  >
                                                      {player.name}
                                                  </Link>
                                              </TableCell>
                                              <TableCell>
                                                  <Link
                                                      to={`/admin_jogadores/adicionar/${
                                                          player.id
                                                      }`}
                                                  >
                                                      {player.lastname}
                                                  </Link>
                                              </TableCell>
                                              <TableCell>
                                                  {player.number}
                                              </TableCell>
                                              <TableCell>
                                                  {player.position}
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        {isLoading ? (
                            <CircularProgress
                                thickness={7}
                                style={{
                                    color: "#98c5e9"
                                }}
                            />
                        ) : null}
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminPlayers;