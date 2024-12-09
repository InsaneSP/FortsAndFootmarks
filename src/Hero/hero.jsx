import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from "react-router-dom";
import "./herostyles.css";

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
        };
    }

    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    handleSearchSubmit = async (e) => {
        e.preventDefault();
        const { searchQuery } = this.state;

        if (!searchQuery.trim()) {
            alert("Please enter a search query.");
            return;
        }

        try {
            // Make an API call to the backend
            const response = await axios.get(`http://localhost:3001/fort/${searchQuery.trim()}`);
            const fortData = response.data;

            // Navigate to a detailed fort page or show fort data
            this.props.navigate(`/fort/${fortData.name}`, { state: fortData });
        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert("Fort not found. Please try another search term.");
            } else {
                console.error("Error fetching fort:", err);
                alert("An error occurred while searching. Please try again.");
            }
        }
    };

    render() {
        return (
            <div className="hero-container">
                <h1>Discover the Legacy, Trek the History</h1>
                <h3>
                    Discover the rich history and breathtaking views of Chhatrapati Shivaji Maharaj's forts
                </h3>
                <div className="d-flex align-items-center">
                    <form className="d-flex" onSubmit={this.handleSearchSubmit}>
                        <input
                            className="form-control me-2 mw-50"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={this.state.searchQuery}
                            onChange={this.handleSearchChange}
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

// Wrap the Hero component with a hook for navigation
function HeroWithNavigate(props) {
    const navigate = useNavigate();
    return <Hero {...props} navigate={navigate} />;
}

export default HeroWithNavigate;
