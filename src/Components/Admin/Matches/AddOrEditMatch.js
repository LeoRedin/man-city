import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../Ui/FormFields";
import { validate } from "../../Ui/misc";

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
                        { key: "Sim", value: "Sim" },
                        { key: "Não", value: "Não" }
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
