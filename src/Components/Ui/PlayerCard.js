import React from "react";

const PlayerCard = props => {
    const { name, bck, number, lastName } = props;
    return (
        <div className="player_card_wrapper">
            <div
                className="player_card_thmb"
                style={{
                    background: `#f2f9ff url(${bck})`
                }}
            />
            <div className="player_card_nfo">
                <div className="player_card_number">{number}</div>
                <div className="player_card_name">
                    <span> {name} </span>
                    <span> {lastName} </span>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
