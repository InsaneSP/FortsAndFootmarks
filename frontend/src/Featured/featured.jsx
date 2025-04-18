import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from "../Toastify/toast.jsx";
import slugify from 'slugify';
import "./featured.css";

const Featured = () => {
    const navigate = useNavigate();
    const [forts, setForts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/forts?limit=4`)
            .then(response => response.json())
            .then(data => setForts(data))
            .catch(error => showErrorToast("Error fetching forts:", error));
    }, []);

    return (
        <div className="container-fluid padding-container background">
            <h1>Featured Locations</h1>
            <br />
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {forts.map((fort, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={fort.name}>
                            <img src={fort.photos[0]} className="d-block w-100" alt={fort.name} />
                            <h4 className="card-text" style={{marginTop: 10}}>{fort.name}</h4>
                            <p className="card-text">{fort.historicalSignificance}</p>
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