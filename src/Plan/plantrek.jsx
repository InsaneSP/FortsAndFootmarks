import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faMinus,
    faShareAlt,
    faSave,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./plantrek.css";

const Plan = () => {
    return (
        <div className="container-fluid about-us-container">
            <h1 className="heading">Plan Your Trek</h1>
            <div className="section">
                {/* Left Container - Itinerary */}
                <div className="left-container">
                    <div className="card plan-card itinerary no-hover">
                        <h4 className="card-heading">Itinerary</h4>
                        <div className="itinerary-day">
                            <div className="day-header">
                                <span>Day 1</span>
                                <button className="btn delete">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            <div className="activity-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Activity ..."
                                />
                                <button className="btn delete">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <button className="btn add-activity">+ Add Activity</button>
                        </div>
                        <button className="btn add-day">+ Add Day</button>
                    </div>
                </div>

                {/* Right Container */}
                <div className="right-container">
                    <div className="notes">
                        <div className="card plan-card no-hover">
                            <h4 className="card-heading">Notes</h4>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Enter your Trek Notes Here...."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Left Container - Itinerary */}
                <div className="left-container">
                <div className="card plan-card itinerary no-hover">

                <h4 className="timeline-heading">Historical Timeline</h4>
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search Forts..."
                    />
                </div>
                <div className="timeline-content">
                    <h5 className="fort-name">Raigad</h5>
                    <ul className="timeline-list">
                        <li className="timeline-item">
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                            <span>
                                <strong>1656:</strong> Shivaji Maharaj captures Raigad
                            </span>
                        </li>
                        <li className="timeline-item">
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                            <span>
                                <strong>1674:</strong> Coronation of Shivaji Maharaj
                            </span>
                        </li>
                        <li className="timeline-item">
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                            <span>
                                <strong>1680:</strong> Shivaji Maharaj passes away at Raigad
                            </span>
                        </li>
                    </ul>
                </div>
                </div>
                </ div>

                {/* Right Container */}
                <div className="right-container">
                    <div className="expense">
                        <div className="card plan-card no-hover">
                            <h4 className="card-heading">Expense Tracker</h4>
                            <div className="input-fields">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Item"
                                />
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Amount"
                                />
                                <button className="btn delete">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            <button className="btn add-expense">+ Add Expense</button>
                            <div className="total-expense">Total: ₹ 0.00</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="action-buttons">
                    <button className="btn action-btn share">
                        <FontAwesomeIcon icon={faShareAlt} /> Share Trek Plan
                    </button>
                    <button className="btn action-btn save">
                        <FontAwesomeIcon icon={faSave} /> Save Trek Plan
                    </button>
                </div>
        </div>
    );
};

export default Plan;
