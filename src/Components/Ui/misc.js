import React from "react";
import { Link } from "react-router-dom";

export const Tag = props => {
    const { bck, color, size, add } = props;
    const template = (
        <div
            style={{
                background: bck,
                fontSize: size,
                color,
                padding: "5px 10px",
                display: "inline-block",
                fontFamily: "Righteous",
                ...add
            }}
        >
            {props.children}
        </div>
    );
    const { link } = props;

    if (link) {
        return <Link to={link}>{template}</Link>;
    } else {
        return template;
    }
};

export const firebaseLooper = snapshot => {
    const data = [];
    snapshot.forEach(childSnapshot => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        });
    });
    return data;
};

export const reverseArray = array => {
    const reversedArray = [];

    for (let i = array.length - 1; i > 0; i--) reversedArray.push(array[i]);

    return reversedArray;
};

export const validate = element => {
    let error = [true, ""];

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? "Informe um email válido" : ""}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== "";
        const message = `${!valid ? "Campo obrigatório" : ""}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
};
