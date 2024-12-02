import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; 
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import "./herostyles.css";

class Hero extends Component {
    render() {
        return (
            <div className="hero-container">
                <h1>Discover the Legacy, Trek the History</h1>
                <h3>
                    Discover the rich history and breathtaking views of Chhatrapati Shivaji Maharaj's forts
                </h3>
                <div className="d-flex align-items-center">
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2 mw-50"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{ width: "300px" }}
                        />
                        <button className="btn btn-outline-danger" type="submit">
                            Explore
                        </button>
                    </form>
                </div>
                <div className="mt-12 flex justify-center space-x-8">
                    <div className="icon-text">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6" />
                        <span>50+ Locations</span>
                    </div>
                    <div className="icon-text">
                        <FontAwesomeIcon icon={faFortAwesome} className="w-6 h-6" />
                        <span>Rich History</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hero;
