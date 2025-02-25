import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
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
            const response = await axios.get(`http://localhost:3001/fort/${searchQuery.trim()}`);
            const fortData = response.data;

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
                            className="form-control hero-search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={this.state.searchQuery}
                            onChange={this.handleSearchChange}
                            style={{ width: "300px" }}
                        />
                        <button class="button">
                            <svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                            Explore
                        </button>
                    </form>
                </div>
                <div className="mt-12 flex justify-center space-x-8">
                    <div className="icon-text">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6" />
                        <span>60+ Locations</span>
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

function HeroWithNavigate(props) {
    const navigate = useNavigate();
    return <Hero {...props} navigate={navigate} />;
}

export default HeroWithNavigate;
