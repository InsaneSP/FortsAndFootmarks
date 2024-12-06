import React, { useState } from "react";
import coastalFort from "../images/Coastal.jfif";
import hillFort from "../images/Hill.jfif";
import inlandFort from "../images/Inland.jfif";
import mountainFort from "../images/Mountain.jfif";
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import slugify from 'slugify';  // Import slugify
import "./featured.css";

const Featured = () => {
    const navigate = useNavigate();  // Initialize navigate hook

    // Define the forts data to avoid repeating similar structures
    const forts = [
        {
            name: "Sindhudurg",
            image: coastalFort,
            description: "One of the oldest forts on the Sindhudurg coast, later strengthened by Shivaji Maharaj."
        },
        {
            name: "Rajmachi",
            image: hillFort,
            description: "A beautiful fort located in the Sahyadri mountains, known for its historical significance."
        },
        {
            name: "Panhala",
            image: inlandFort,
            description: "A famous fort near Kolhapur, surrounded by scenic landscapes and historical relevance."
        },
        {
            name: "Lohagad",
            image: mountainFort,
            description: "A popular fort known for its strategic location and scenic views of the surrounding region."
        }
    ];

    return (
        <div className="container-fluid">
            <h1 style={{ marginTop: "10px" }}>Featured Locations</h1>
            <br />
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    {forts.map((fort, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={fort.name}>
                            <img src={fort.image} className="d-block w-100" alt={fort.name} />
                            <h5 className="card-text">{fort.name}</h5>
                            <p className="card-text">{fort.description}</p>
                            <button
                                className="btn fbutton"
                                onClick={() => {
                                    const fortSlug = slugify(fort.name, { lower: true, strict: true });
                                    navigate(`/fort/${fortSlug}`);
                                }}
                            >
                                Explore More
                            </button>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <br />
        </div>
    );
};

export default Featured;