import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../Ui/FormFields";
import { validate } from "../../Ui/misc";
import { firebaseDB, firebasePlayers, firebase } from "../../../firebase";

class AddOrEditPlayers extends Component {
    state = {
        playerId: "",
        formType: "",
        formError: false,
        formSuccess: "",
        defaultImg: "",
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Nome do Jogador",
                    name: "player_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            lastname: {
                element: "input",
                value: "",
                config: {
                    label: "Sobrenome",
                    name: "lastname_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            number: {
                element: "input",
                value: "",
                config: {
                    label: "Número",
                    name: "number_input",
                    type: "text"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
            },
            position: {
                element: "select",
                value: "",
                config: {
                    label: "Posição",
                    name: "select_position",
                    type: "select",
                    options: [
                        { key: "Keeper", value: "Goleiro" },
                        { key: "Defence", value: "Zagueiro" },
                        { key: "Midfield", value: "Meio Campo" },
                        { key: "Striker", value: "Atacante" }
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

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            // submit player
        } else {
            this.setState({
                formError: true
            });
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState({
                formType: "Adicionar Jogador"
            });
        } else {
        }
    }

    render() {
        const { formType } = this.state;
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>{formType}</h2>
                    <form onSubmit={event => this.submitForm(event)}>
                        <FormField
                            id={"name"}
                            formdata={this.state.formData.name}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"lastname"}
                            formdata={this.state.formData.lastname}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"number"}
                            formdata={this.state.formData.number}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"position"}
                            formdata={this.state.formData.position}
                            change={element => this.updateForm(element)}
                        />

                        <div className="success_label">
                            {this.state.formSuccess}
                        </div>
                        {this.state.formError ? (
                            <div className="error_label">Algo deu errado</div>
                        ) : (
                            ""
                        )}

                        <div className="admin_submit">
                            <button onClick={event => this.submitForm(event)}>
                                {this.state.formType}
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        );
    }
}

export default AddOrEditPlayers;
