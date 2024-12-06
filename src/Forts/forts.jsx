import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom"; // Import useParams
import slugify from "slugify";
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import "./forts.css";

const Forts = () => {
    const [forts, setForts] = useState([]);
    const { type } = useParams(); // This gets the category from the URL (e.g., "hill")
    const navigate = useNavigate();

    useEffect(() => {
        const trimmedType = type.trim().toLowerCase(); // Trim and normalize type
        console.log("Fetching forts for type:", trimmedType); // Log the type

        axios
            .get(`http://localhost:3001/forts/${trimmedType}`)
            .then((response) => {
                console.log("Response data:", response.data); // Log the response
                setForts(response.data);
            })
            .catch((err) => console.error("Error fetching forts:", err));
    }, [type]);

    return (
        <div className="container-fluid">
            <br />
            <h1>{type} Forts</h1>
            <form className="d-flex search" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn fbutton" type="submit">
                    Search
                </button>
            </form>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {forts.length > 0 ? (
                    forts.map((fort, index) => (
                        <div className="accordion-item" key={fort._id}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#flush-collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse${index}`}
                                >
                                    <div className="fort">
                                        {/* Image and details */}
                                        <div className="fortname">
                                            <h5>{fort.name}</h5>
                                            <h6>
                                                <FontAwesomeIcon
                                                    icon={faMapMarkerAlt}
                                                    className="icon"
                                                />
                                                {fort.location}
                                            </h6>
                                        </div>
                                    </div>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapse${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    <div className="fort-details">
                                        <img
                                            src={`http://localhost:5000/uploads/${fort.photos[0]}`} // Assuming the photo is stored on your server
                                            alt={fort.name}
                                            className="fort-details-img"
                                        />
                                        <div className="fort-info">
                                            <div className="fort-date">
                                                {/* <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    className="calendar-icon"
                                                /> */}
                                                <p>{fort.historicalSignificance}</p>
                                            </div>
                                            <p className="history-text">{fort.history.summary}</p>
                                            <button
                                                className="btn fbutton"
                                                onClick={() => {
                                                    const fortSlug = slugify(fort.name, { lower: true, strict: true });
                                                    navigate(`/fort/${fortSlug}`);  // Use navigate instead of window.location.href
                                                }}
                                            >
                                                Explore More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No forts found for the selected category.</p>
                )}
            </div>
            <br />
        </div>
    );
};

export default Forts;
