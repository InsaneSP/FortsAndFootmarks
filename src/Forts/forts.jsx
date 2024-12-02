import React, { Component } from "react";
import mountainFort from "../images/Mountain.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./forts.css";

class Forts extends Component {
    state = {};
    render() {
        return (
            <div className="container-fluid">
                <br />
                <h1>Forts</h1>
                <form class="d-flex search" role="search">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button class="btn fbutton" type="submit">
                        Search
                    </button>
                </form>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                            >
                                <div className="fort">
                                    <img
                                        src={mountainFort}
                                        alt="Mountain Fort"
                                        className="fortimg"
                                    />
                                    <div className="fortname">
                                        <h5>Rajgad</h5>
                                        <h6>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                                            Raigad District, Maharashtra
                                        </h6>
                                    </div>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="flush-collapseOne"
                            class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                <div className="fort-details">
                                    <img
                                        src={mountainFort}
                                        alt="Mountain Fort"
                                        className="fort-details-img"
                                    />
                                    <div className="fort-info">
                                        <div className="fort-date">
                                            <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                                className="calendar-icon"
                                            />
                                            <p>Built in 1656 by Chhatrapati Shivaji Maharaj</p>
                                        </div>
                                        <p className="history-text">
                                            Raigad was the capital of the Maratha Empire under
                                            Chhatrapati Shivaji Maharaj. It is located in the Sahyadri
                                            mountain range.
                                        </p>
                                        <button className="btn fbutton">Explore More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="flush-collapseTwo"
                            >
                                <div className="fort">
                                    <img
                                        src={mountainFort}
                                        alt="Mountain Fort"
                                        className="fortimg"
                                    />
                                    <div className="fortname">
                                        <h5>Rajgad</h5>
                                        <h6>
                                            {" "}
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className="icon"
                                            />{" "}
                                            Raigad District, Maharashtra
                                        </h6>
                                    </div>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="flush-collapseTwo"
                            class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                <div className="fort-details">
                                    <img
                                        src={mountainFort}
                                        alt="Mountain Fort"
                                        className="fort-details-img"
                                    />
                                    <div className="fort-info">
                                        <div className="fort-date">
                                            <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                                className="calendar-icon"
                                            />
                                            <p>Built in 1656 by Chhatrapati Shivaji Maharaj</p>
                                        </div>
                                        <p className="history-text">
                                            Raigad was the capital of the Maratha Empire under
                                            Chhatrapati Shivaji Maharaj. It is located in the Sahyadri
                                            mountain range.
                                        </p>
                                        <button className="btn fbutton">Explore More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree"
                                aria-expanded="false"
                                aria-controls="flush-collapseThree"
                            >
                                <div className="fort">
                                    <img
                                        src={mountainFort}
                                        alt="Mountain Fort"
                                        className="fortimg"
                                    />
                                    <div className="fortname">
                                        <h5>Rajgad</h5>
                                        <h6>
                                            {" "}
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className="icon"
                                            />{" "}
                                            Raigad District, Maharashtra
                                        </h6>
                                    </div>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="flush-collapseThree"
                            class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                <div className="fort-details">
                                    <img
                                        src={mountainFort}
                                        alt="Mountain Fort"
                                        className="fort-details-img"
                                    />
                                    <div className="fort-info">
                                        <div className="fort-date">
                                            <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                                className="calendar-icon"
                                            />
                                            <p>Built in 1656 by Chhatrapati Shivaji Maharaj</p>
                                        </div>
                                        <p className="history-text">
                                            Raigad was the capital of the Maratha Empire under
                                            Chhatrapati Shivaji Maharaj. It is located in the Sahyadri
                                            mountain range.
                                        </p>
                                        <button className="btn fbutton">Explore More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default Forts;
