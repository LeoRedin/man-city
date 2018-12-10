import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const AdminNav = () => {
    const links = [
        {
            title: "Partidas",
            linkTo: "/admin_partidas"
        },
        {
            title: "Adicionar Partida",
            linkTo: "/admin_partidas/adicionar"
        },
        {
            title: "Jogadores",
            linkTo: "/admin_jogadores"
        },
        {
            title: "Adicionar Jogadores",
            linkTo: "/admin_jogadores/adicionar"
        }
    ];

    const buttonStyle = {
        color: "#fff",
        fontWeight: "300",
        borderBottom: "1px solid #353535"
    };

    const renderItems = () =>
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={buttonStyle}>
                    {link.title}
                </ListItem>
            </Link>
        ));

    const logoutHandler = () => {
        firebase
            .auth()
            .signOut()
            .then(
                () => {
                    console.log("logout");
                },
                error => {
                    console.log("deu ruim");
                }
            );
    };

    return (
        <div>
            {renderItems()}
            <ListItem
                button
                style={buttonStyle}
                onClick={() => logoutHandler()}
            >
                Sair
            </ListItem>
        </div>
    );
};

export default AdminNav;
