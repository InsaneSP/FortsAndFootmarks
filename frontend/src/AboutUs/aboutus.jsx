import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faScroll,
    faMountain,
    faUsers,
    faCamera,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/NewLogo.png";
import "./aboutus.css";

class AboutUs extends Component {
    state = {};
    render() {
        return (
            <div className="container-fluid padding-container about-us-container">
                <h1 className="heading">About FortsAndFootmarks</h1>
                <img src={logo} alt="Mountain Fort" className="about-image" />
                <div className="section">
                    <div className="mission-container">
                        <h4 className="subheading">Our Mission</h4>
                        <p>
                            At FortsAndFootmarks, we are passionate about preserving and
                            sharing the rich heritage of Maratha forts, which stand as
                            monumental symbols of courage, strategy, and resilience. Our
                            mission is to connect history enthusiasts, adventure seekers, and
                            curious minds with these awe-inspiring fortifications that dot the
                            landscape of Maharashtra. We aim to foster a deep understanding of
                            the historical, cultural, and architectural significance of each
                            fort, ensuring that the legacy of the Maratha Empire is celebrated
                            and remembered for generations to come.
                        </p>
                        <p>
                            These forts are not just stone structures; they are living,
                            breathing stories of bravery, battle, and triumph. By connecting
                            with these monuments, we are reminded of the incredible feats of
                            warriors like Chhatrapati Shivaji Maharaj and the relentless
                            spirit of the Maratha forces. Our goal is to bring this history to
                            life through guided treks, detailed educational content, and
                            community engagement that encourages active participation in the
                            preservation of these historic landmarks. We strive to create
                            immersive, unforgettable experiences for our visitors, blending
                            the thrill of adventure with the beauty of history. Our treks are
                            carefully planned to ensure both safety and education, providing
                            an authentic journey through time.
                        </p>
                    </div>
                    <div className="card-container">
                        <div className="card choose-card no-hover">
                            <h4 className="card-heading">Why Choose Us?</h4>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faScroll} className="icon" />
                                    Expert historical knowledge and storytelling
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faMountain} className="icon" />
                                    Safe and well-planned trekking experiences
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faUsers} className="icon" />
                                    Community-focused approach to heritage preservation
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCamera} className="icon" />
                                    Stunning photography opportunities at each fort
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="story">
                    <h4 className="subheading">Our Story</h4>
                    <p>
                        FortsAndFootmarks was born out of a deep, shared passion for
                        Maharashtra's history, its rich heritage, and a strong desire to
                        make its magnificent forts more accessible to all. The story began
                        in 2024, when a group of history buffs and trekking enthusiasts came
                        together, united by their love for these awe-inspiring historical
                        monuments. It is an initiative that would allow people from all
                        walks of life to experience the majesty and mystery of the Maratha
                        forts up close.
                    </p>
                    <p>
                        We realized that these forts were not only remarkable for their
                        architecture and natural surroundings but also for the stories they
                        held—stories of legendary warriors, strategic brilliance, and the
                        rich culture of the Maratha Empire. We wanted to share these stories
                        with a broader audience, to ensure that the legacy of Chhatrapati
                        Shivaji Maharaj and his warriors was never forgotten. Over the
                        years, FortsAndFootmarks has grown from a small project into a
                        comprehensive platform dedicated to the exploration and preservation
                        of Maharashtra’s historical forts.
                    </p>
                    <p>
                        Today, we are proud to be the go-to resource for anyone interested
                        in exploring the fascinating world of Maratha forts. Whether you are
                        a seasoned historian, an adventurous trekker, or a curious tourist,
                        FortsAndFootmarks has something for you. We continue to innovate and
                        expand our services to ensure that each visitor leaves with not only
                        a deeper understanding of the forts but also a personal connection
                        to the stories and experiences that shaped them.
                    </p>
                    <p>
                        Looking ahead, we remain committed to our mission of preserving and
                        sharing the rich legacy of Maharashtra’s forts, ensuring that the
                        stories of the past live on for future generations to experience,
                        learn from, and be inspired by.
                    </p>
                </div>
                <div className="team">
                    <div className="card no-hover team-card">
                        <h4 className="card-heading">Meet Our Team</h4>
                        <div className="team-members-container">
                            <div className="team-member">
                                <img src={logo} alt="Mountain Fort" className="pfp" />
                                <h6>Smit Potkar</h6>
                                <h5>Founder</h5>
                            </div>
                            <div className="team-member">
                                <img src={logo} alt="Mountain Fort" className="pfp" />
                                <h6>Smit Potkar</h6>
                                <h5>Co-Founder</h5>
                            </div>
                            <div className="team-member">
                                <img src={logo} alt="Mountain Fort" className="pfp" />
                                <h6>Smit Potkar</h6>
                                <h5>Team Lead</h5>
                            </div>
                            <div className="team-member">
                                <img src={logo} alt="Mountain Fort" className="pfp" />
                                <h6>Smit Potkar</h6>
                                <h5>Developer</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;
