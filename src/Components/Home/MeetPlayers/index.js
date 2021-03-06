import React, { Component } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../Ui/misc";
import Reveal from "react-reveal";
import HomeCards from "./Cards";

class MeetPlayers extends Component {
    state = {
        show: false
    };

    render() {
        const { show } = this.state;
        return (
            <Reveal
                fraction={0.7}
                onReveal={() => {
                    this.setState({ show: true });
                }}
            >
                <div
                    className="home_meetplayers"
                    style={{
                        background: `#fff url(${Stripes})`
                    }}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <HomeCards show={show} />
                            </div>
                            <div className="home_text_wrapper">
                                <div>
                                    <Tag
                                        bck="#0e1731"
                                        size="100px"
                                        color="#fff"
                                        add={{
                                            display: "inline-block",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Conheça
                                    </Tag>
                                </div>
                                <div>
                                    <Tag
                                        bck="#0e1731"
                                        size="100px"
                                        color="#fff"
                                        add={{
                                            display: "inline-block",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Os
                                    </Tag>
                                </div>
                                <div>
                                    <Tag
                                        bck="#0e1731"
                                        size="100px"
                                        color="#fff"
                                        add={{
                                            display: "inline-block",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Jogadores
                                    </Tag>
                                </div>
                                <div>
                                    <Tag
                                        bck="#fff"
                                        size="27px"
                                        color="#0e1731"
                                        link="/time"
                                        add={{
                                            display: "inline-block",
                                            marginBottom: "27px",
                                            border: "1px solid 0e1731"
                                        }}
                                    >
                                        Conheça o time aqui
                                    </Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
}

export default MeetPlayers;
