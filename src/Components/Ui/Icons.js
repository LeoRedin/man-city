import React from "react";
import { Link } from "react-router-dom";

import manCityLogo from "../../Resources/images/logos/w.png";

export const CityLogo = props => {
    const { link, linkTo, width, height } = props;

    const template = (
        <div
            className="img_cover"
            style={{
                width: width,
                height: height,
                background: `url(${manCityLogo}) no-repeat`
            }}
        />
    );

    if (link) {
        return (
            <Link to={linkTo} className="link_logo">
                {template}
            </Link>
        );
    } else {
        return template;
    }
};
