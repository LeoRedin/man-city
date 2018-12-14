import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../Ui/FormFields";
import { validate } from "../../Ui/misc";
import { firebaseTeams, firebaseDB, firebaseMatches } from "../../../firebase";
import { firebaseLooper } from "../../Ui/misc";

class AddOrEditMatch extends Component {
    state = {
        matchId: "",
        formType: "",
        formError: false,
        formSuccess: "",
        teams: [],
        formdata: {
            date: {
                element: "input",
                value: "",
                config: {
                    label: "Data do Jogo",
                    name: "date_input",
                    type: "date"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            local: {
                element: "select",
                value: "",
                config: {
                    label: "Time da Casa",
                    name: "select_local",
                    type: "select",
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: false
            },
            resultLocal: {
                element: "input",
                value: "",
                config: {
                    label: "Resultado Casa",
                    name: "result_local_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: false
            },
            away: {
                element: "select",
                value: "",
                config: {
                    label: "Time Visitante",
                    name: "select_away",
                    type: "select",
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: false
            },
            resultAway: {
                element: "input",
                value: "",
                config: {
                    label: "Resultado Visitante",
                    name: "result_away_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: false
            },
            referee: {
                element: "input",
                value: "",
                config: {
                    label: "Árbitro",
                    name: "referee_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            stadium: {
                element: "input",
                value: "",
                config: {
                    label: "Estádio",
                    name: "estadio_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            result: {
                element: "select",
                value: "",
                config: {
                    label: "Resultado",
                    name: "select_result",
                    type: "select",
                    options: [
                        { key: "V", value: "V" },
                        { key: "E", value: "E" },
                        { key: "D", value: "D" },
                        { key: "n/d", value: "n/d" }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            final: {
                element: "select",
                value: "",
                config: {
                    label: "Encerrado ?",
                    name: "select_played",
                    type: "select",
                    options: [
                        { key: "Yes", value: "Sim" },
                        { key: "No", value: "Não" }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            }
        }
    };

    updateForm(element) {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    updatefields(match, teamOptions, teams, type, matchId) {
        const newFormData = {
            ...this.state.formdata
        };

        for (let key in newFormData) {
            if (match) {
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }
            if (key === "local" || key === "away") {
                newFormData[key].config.options = teamOptions;
            }
        }

        this.setState({
            matchId,
            formType: type,
            formdata: newFormData,
            teams
        });
    }

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ""
            });
        }, 2500);
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        this.state.teams.forEach(team => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit["localThmb"] = team.thmb;
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit["awaylThmb"] = team.thmb;
            }
        });

        if (formIsValid) {
            const { matchId } = this.state;
            if (this.state.formType === "Editar Partida") {
                firebaseDB
                    .ref(`matches/${matchId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm("Dados atualizados");
                    });
            } else {
                // adicionar partida
                firebaseMatches
                    .push(dataToSubmit)
                    .then(() => {
                        this.props.history.push("/admin_partidas");
                    })
                    .catch(e => {
                        this.setState({
                            formError: true
                        });
                    });
            }
        } else {
            this.setState({
                formError: true
            });
        }
    }

    componentDidMount() {
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            firebaseTeams.once("value").then(snapshot => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];

                snapshot.forEach(childSnapshot => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    });
                });

                this.updatefields(match, teamOptions, teams, type, matchId);
            });
        };

        if (!matchId) {
            getTeams(false, "Adicionar Partida");
        } else {
            firebaseDB
                .ref(`matches/${matchId}`)
                .once("value")
                .then(snapshot => {
                    const match = snapshot.val();
                    getTeams(match, "Editar Partida");
                });
        }
    }

    render() {
        const { formType } = this.state;
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>{formType}</h2>
                    <div>
                        <form onSubmit={event => this.submitForm(event)}>
                            <FormField
                                id={"date"}
                                formdata={this.state.formdata.date}
                                change={element => this.updateForm(element)}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Casa</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={"local"}
                                            formdata={this.state.formdata.local}
                                            change={element =>
                                                this.updateForm(element)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={"resultLocal"}
                                            formdata={
                                                this.state.formdata.resultLocal
                                            }
                                            change={element =>
                                                this.updateForm(element)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Visitante</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={"away"}
                                            formdata={this.state.formdata.away}
                                            change={element =>
                                                this.updateForm(element)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={"resultAway"}
                                            formdata={
                                                this.state.formdata.resultAway
                                            }
                                            change={element =>
                                                this.updateForm(element)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={"referee"}
                                    formdata={this.state.formdata.referee}
                                    change={element => this.updateForm(element)}
                                />
                                <FormField
                                    id={"stadium"}
                                    formdata={this.state.formdata.stadium}
                                    change={element => this.updateForm(element)}
                                />
                            </div>

                            <div className="split_fields_last">
                                <FormField
                                    id={"result"}
                                    formdata={this.state.formdata.result}
                                    change={element => this.updateForm(element)}
                                />
                                <FormField
                                    id={"final"}
                                    formdata={this.state.formdata.final}
                                    change={element => this.updateForm(element)}
                                />
                            </div>

                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>
                            {this.state.formError ? (
                                <div className="error_label">
                                    Algo deu errado
                                </div>
                            ) : (
                                ""
                            )}

                            <div className="admin_submit">
                                <button
                                    onClick={event => this.submitForm(event)}
                                >
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddOrEditMatch;
