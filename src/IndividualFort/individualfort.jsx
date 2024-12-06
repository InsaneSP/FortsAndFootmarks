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
import React, { useEffect, useState } from "react";
import coastalFort from "../images/Coastal.jfif";
import hillFort from "../images/Hill.jfif";
import inlandFort from "../images/Inland.jfif";
import mountainFort from "../images/Mountain.jfif";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./individualfort.css";

const IndividualFort = () => {
    const { fortName } = useParams();
    const [fortData, setFortData] = useState(null); // State to store fetched data
    const [activeSection, setActiveSection] = useState("keyPoints");
    const navigate = useNavigate();

    const toggleSection = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/fort/${fortName}`)  // Adjust the path to match the backend
            .then((response) => {
                console.log("Fetched data:", response.data);
                setFortData(response.data);
            })
            .catch((err) => {
                console.error("Error fetching fort details:", err);
                setFortData(null);
            });
    }, [fortName]);

    if (!fortData) return <div>Fort not found or loading...</div>;  // Handle missing data


    return (
        <div className="container-fluid">
            {/* <div className="image-section">
                <img src={coastalFort} alt={`${fortData.name} 1`} className="image-1" />
                <div className="image-2-3-4">
                    <div className="image-2-3">
                        <img src={mountainFort} alt={`${fortData.name} 2`} className="image-2" />
                        <img src={inlandFort} alt={`${fortData.name} 3`} className="image-3" />
                    </div>
                    <img src={hillFort} alt={`${fortData.name} 4`} className="image-4" />
                </div>
            </div> */}

            <div className="head">
                <h1>{fortData.name}</h1>
                <h3 className="subhead">{fortData.historicalSignificance}</h3>
                <div className="imp-icons">
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
                        <p>{fortData.durationOfTrek}</p>
                    </div>
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faTachometerAlt} className="info-icon" />
                        <p>{fortData.difficulty} Difficulty</p>
                    </div>
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faRoad} className="info-icon" />
                        <p>{fortData.distance}</p>
                    </div>
                </div>
            </div>

            <div className="history">
                <h2>History of {fortData.name}</h2>
                <p>{fortData.history.summary}</p>
                {fortData.history.detailed.map((section, index) => (
                    <div key={index}>
                        <h5>{section.title}</h5>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>

            <div className="button-container">
                <button
                    className={activeSection === "keyPoints" ? "active" : ""}
                    onClick={() => toggleSection("keyPoints")}
                >
                    Key Points
                </button>
                <button
                    className={activeSection === "planYourVisit" ? "active" : ""}
                    onClick={() => toggleSection("planYourVisit")}
                >
                    Plan Your Visit
                </button>
            </div>

            <div className="other-info">
                {activeSection === "keyPoints" && (
                    <ul>
                        {fortData.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}

                {activeSection === "planYourVisit" && (
                    <>
                        <div className="other-info-item-container">
                            <FontAwesomeIcon
                                icon={faHome}
                                className="other-info-icon"
                                style={{ color: "Green" }}
                            />
                            <div className="other-info-item">
                                <p>Local Accommodations</p>
                                {fortData.localAccommodation.map((accommodation, index) => (
                                    <p key={index}>{accommodation}</p>
                                ))}
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
                                <p>Nearest Bus Stop: {fortData.howToReach.nearestBusStop}</p>
                                {fortData.howToReach.busesAvailable.map((bus, index) => (
                                    <p key={index}>{bus}</p>
                                ))}
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
                                <p>{fortData.nearestRailwayStation}</p>
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
                                <p>{fortData.approximateBudget}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="location-section">
                <h2>Location</h2>
                <a href={fortData.map.googleMaps} target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                </a>
                <h2>Best Time to Visit</h2>
                <p>Best months: {fortData.bestTimeToVisit.months.join(", ")}</p>
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
                <div className="accordion" id="accordionExample">
                    {fortData.faqs.map((faq, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse${index}`}
                                >
                                    {faq.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sponsored-section">
                <h2>Sponsored Treks</h2>
                <ul>
                    {fortData.sponsoredTreks.map((trek, index) => (
                        <li key={index}>{trek}</li>
                    ))}
                </ul>
            </div>

            <div className="similar-section">
                <h2>Similar / Nearby Forts</h2>
                <div className="forts-card-section">
                    {fortData.similarNearbyForts.map((fort, index) => (
                        <div className="card fort-card no-hover" key={index}>
                            <div className="card-body">
                                <h5>{fort}</h5>
                                <img src={mountainFort} className="card-img-top" alt="..." /><br />
                                <button
                                    className="btn fbutton"
                                    onClick={() => {
                                        const fortSlug = slugify(fort, { lower: true, strict: true });
                                        const firstWordSlug = fortSlug.split('-')[0];  // Get the first word before the hyphen
                                        navigate(`/fort/${firstWordSlug}`);  // Navigate to the first word of the slug
                                    }}
                                >
                                    Explore More
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="safety-section">
                <h2>Safety Information</h2>
                <div className="card safety-card no-hover">
                    <div className="card-body season">
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
                            <li>Check weather conditions before starting</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualFort;
