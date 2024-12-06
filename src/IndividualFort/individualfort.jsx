import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faRoad,
    faHome,
    faCalendarAlt,
    faBus,
    faTrain,
    faRupee,
    faSun,
    faCloud,
    faSnowflake,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import coastalFort from "../images/Coastal.jfif";
import hillFort from "../images/Hill.jfif";
import inlandFort from "../images/Inland.jfif";
import mountainFort from "../images/Mountain.jfif";
import "./individualfort.css";

class IndividualFort extends Component {
    state = {
        activeSection: "keyPoints",
        summer: false,
        winter: false,
        monsoon: false,
    };

    toggleSection = (section) => {
        this.setState({ activeSection: section });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="image-section">
                    <img src={coastalFort} alt="Rajgad Fort 1" className="image-1" />
                    <div className="image-2-3-4">
                        <div className="image-2-3">
                            <img src={mountainFort} alt="Rajgad Fort 2" className="image-2" />
                            <img src={inlandFort} alt="Rajgad Fort 3" className="image-3" />
                        </div>
                        <img src={hillFort} alt="Rajgad Fort 4" className="image-4" />
                    </div>
                </div>

                <div className="head">
                    <h1>Rajgad Fort</h1>
                    <h3 className="subhead">
                        The King of Forts - Chhatrapati Shivaji Maharaj's First Capital
                    </h3>
                    <div className="imp-icons">
                        <div className="icon-item">
                            <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
                            <p>2-3 days trek</p>
                        </div>
                        <div className="icon-item">
                            <FontAwesomeIcon icon={faTachometerAlt} className="info-icon" />
                            <p>Moderate Difficulty</p>
                        </div>
                        <div className="icon-item">
                            <FontAwesomeIcon icon={faRoad} className="info-icon" />
                            <p>40km from Pune</p>
                        </div>
                    </div>
                </div>

                <div className="history">
                    <h2>History of Rajgad Fort</h2>
                    <p>
                        Rajgad, located in Maharashtra's Pune district, was originally known
                        as Murumbdev. It served as the first capital of the Maratha Empire
                        under Chhatrapati Shivaji Maharaj from 1645 to 1670 before the
                        capital moved to Raigad. Perched atop a hill, Rajgad was
                        strategically designed for defense. Its high elevation and rugged
                        terrain offered a natural advantage, allowing for effective
                        surveillance and military strategy. The fort houses key structures
                        like the Bale Killa and several machis (terraces), such as
                        Sanjeevani Machi, Suvela Machi, and Padmavati Machi. These terraces
                        were critical for defense and communication, offering panoramic
                        views of the surrounding regions. Rajgad was not just a military
                        base but also the center of governance. Shivaji Maharaj used it as a
                        hub for military campaigns and administrative decisions, laying the
                        foundation for the Maratha Empire’s expansion. The fort is
                        historically significant for being the site of the coronation of
                        Shivaji's son, Chhatrapati Sambhaji Maharaj, which solidified the
                        Maratha royal lineage. Rajgad withstood numerous attacks, especially
                        from the Mughal Empire, due to its strategic location, secret paths,
                        and self-sustaining features like hidden water reservoirs. Today,
                        Rajgad stands as a symbol of Maratha strength and resilience,
                        attracting trekkers and history enthusiasts who come to explore its
                        ruins and learn about its rich past.
                    </p>
                </div>

                <div className="button-container">
                    <button
                        className={this.state.activeSection === "keyPoints" ? "active" : ""}
                        onClick={() => this.toggleSection("keyPoints")}
                    >
                        Key Points
                    </button>
                    <button
                        className={
                            this.state.activeSection === "planYourVisit" ? "active" : ""
                        }
                        onClick={() => this.toggleSection("planYourVisit")}
                    >
                        Plan Your Visit
                    </button>
                </div>

                <div className="other-info">
                    {this.state.activeSection === "keyPoints" && (
                        <ul>
                            <li>Bale Killa</li>
                            <li>Sanjeevani Machi </li>
                            <li>Suvela Machi</li>
                            <li>Padmavati Machi</li>
                        </ul>
                    )}

                    {this.state.activeSection === "planYourVisit" && (
                        <>
                            <div className="other-info-item-container">
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className="other-info-icon"
                                    style={{ color: "Green" }}
                                />
                                <div className="other-info-item">
                                    <p>Local Accommodations</p>
                                    <p>
                                        Stay with Sanjay Patil (Ph: +91 98765 43210) - Homely meals
                                        and clean rooms
                                    </p>
                                    <p>
                                        Vijay's Homestay - Traditional Maharashtrian experience (Ph:
                                        +91 98765 43211)
                                    </p>
                                </div>
                            </div>
                            <div className="other-info-item-container">
                                <FontAwesomeIcon
                                    icon={faBus}
                                    className="other-info-icon"
                                    style={{ color: "Red" }}
                                />
                                <div className="other-info-item">
                                    <p>How to Reach</p>
                                    <p>Nearest Bus Stop: Rajgad Base (2 km from fort entrance)</p>
                                    <p>
                                        Buses available from Pune Central Bus Station every 2 hours
                                    </p>
                                </div>
                            </div>
                            <div className="other-info-item-container">
                                <FontAwesomeIcon
                                    icon={faTrain}
                                    className="other-info-icon"
                                    style={{ color: "Blue" }}
                                />
                                <div className="other-info-item">
                                    <p>Nearest Railway Station</p>
                                    <p>
                                        Pune Junction (45 km) - Take a taxi or local bus from here
                                    </p>
                                </div>
                            </div>
                            <div className="other-info-item-container">
                                <FontAwesomeIcon
                                    icon={faRupee}
                                    className="other-info-icon"
                                    style={{ color: "Gold" }}
                                />
                                <div className="other-info-item">
                                    <p>Approximate Budget</p>
                                    <p>
                                        ₹1500 - ₹2000 per person per day (including accommodation,
                                        food, and local transport)
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="location-section">
                        <h2>Location</h2>
                        <h2>Best Time to Visit</h2>
                    </div>
                    <div className="time-to-visit-section">
                        <div class="card season-card no-hover">
                            <div class="card-body season">
                                <div className="season-name">
                                    <FontAwesomeIcon icon={faSun} />
                                    <h6>Summer</h6>
                                </div>
                                <p>Hot during the day, cooler nights. Less crowded.</p>
                            </div>
                        </div>
                        <div class="card season-card no-hover">
                            <div class="card-body season">
                                <div className="season-name">
                                    <FontAwesomeIcon icon={faCloud} />
                                    <h6>Monsoon</h6>
                                </div>
                                <p>Lush green surroundings, but trails can be slippery.</p>
                            </div>
                        </div>
                        <div class="card season-card no-hover">
                            <div class="card-body season">
                                <div className="season-name">
                                    <FontAwesomeIcon icon={faSnowflake} />
                                    <h6>Winter</h6>
                                </div>
                                <p>
                                    Pleasant weather, ideal for trekking. Peak tourist season.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="faq-section">
                        <h2>Frequently Asked Questions</h2>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Is it a difficult trek?
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div class="accordion-body">
                                        The trek to Rajgad Fort is considered moderate in
                                        difficulty. It takes about 3-4 hours to reach the top. Basic
                                        fitness is required, but it's manageable for most people
                                        with some trekking experience.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Are guides available?
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    class="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div class="accordion-body">
                                        Yes, The guides are available.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        Is Food Available?
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    class="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div class="accordion-body">
                                        No, the food is not available on the fort.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sponsored-section">
                        <h2>Sponsored Treks</h2>
                    </div>
                    <div className="similar-section">
                        <h2>Similar / Nearby Forts</h2>
                        <div className="forts-card-section">
                            <div class="card fort-card no-hover">
                                    <div class="card-body">
                                        <h5>Sinhagad Fort</h5>
                                        <p>The Lion Fort</p>
                                        <img src={mountainFort} class="card-img-top" alt="..." /><br />
                                        <a href="#" class="btn fbutton">Learn More</a>
                                    </div>
                            </div>
                            <div class="card fort-card no-hover">
                                    <div class="card-body">
                                        <h5>Sinhagad Fort</h5>
                                        <p>The Lion Fort</p>
                                        <img src={mountainFort} class="card-img-top" alt="..." /><br />
                                        <a href="#" class="btn fbutton">Learn More</a>
                                    </div>
                            </div>
                                                        <div class="card fort-card no-hover">
                                    <div class="card-body">
                                        <h5>Sinhagad Fort</h5>
                                        <p>The Lion Fort</p>
                                        <img src={mountainFort} class="card-img-top" alt="..." /><br />
                                        <a href="#" class="btn fbutton">Learn More</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="safety-section">
                        <h2>Safety Information</h2>
                        <div class="card safety-card no-hover">
                            <div class="card-body season">
                                <div className="season-name">
                                    <FontAwesomeIcon
                                        icon={faWarning}
                                        style={{ color: "red", marginRight: 15 }}
                                    />
                                    <h4>Important Safety Tips</h4>
                                </div>
                                <ul>
                                    <li>Inform someone about your trek plans</li>
                                    <li>Carry enough water and stay hydrated</li>
                                    <li>Be cautious near cliff edges</li>
                                    <li>Check weather conditions before starting the trek</li>
                                    <li>Carry a basic first-aid kit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndividualFort;
