import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { firebaseMatches } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../Ui/misc";

class AdminMatches extends Component {
    state = {
        isLoading: true,
        matches: []
    };

    componentDidMount() {
        firebaseMatches.once("value").then(snapshot => {
            const matches = firebaseLooper(snapshot);

            this.setState({
                isLoading: false,
                matches: reverseArray(matches)
            });
        });
    }

    render() {
        const { isLoading, matches } = this.state;
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Partida</TableCell>
                                    <TableCell>Resultado</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matches
                                    ? matches.map((match, i) => (
                                          <TableRow key={i}>
                                              <TableCell>
                                                  {match.date}
                                              </TableCell>
                                              <TableCell>
                                                  <Link
                                                      to={`/admin_partidas/editar_partida/${
                                                          match.id
                                                      }`}
                                                  >
                                                      {match.away}{" "}
                                                      <strong>-</strong>{" "}
                                                      {match.local}
                                                  </Link>
                                              </TableCell>
                                              <TableCell>
                                                  {match.resultAway}{" "}
                                                  <strong>-</strong>{" "}
                                                  {match.resultLocal}
                                              </TableCell>
                                              <TableCell>
                                                  {match.final === "Yes" ? (
                                                      <span className="matches_tag_red">
                                                          Encerrado
                                                      </span>
                                                  ) : (
                                                      <span className="matches_tag_green">
                                                          Não jogado
                                                      </span>
                                                  )}
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

export default AdminMatches;
