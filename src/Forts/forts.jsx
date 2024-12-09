import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "slugify";
import "./forts.css";

const Forts = () => {
    const [forts, setForts] = useState([]);
    const [filteredForts, setFilteredForts] = useState([]); // State for filtered forts
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const { type } = useParams(); // This gets the category from the URL (e.g., "hill")
    const navigate = useNavigate();

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter forts based on search query
        const filtered = forts.filter(fort => 
            fort.name.toLowerCase().includes(query) || 
            fort.location.toLowerCase().includes(query) || 
            (fort.bestTimeToVisit.season && fort.bestTimeToVisit.season.toLowerCase().includes(query)) || // Filter by season
            (fort.durationOfTrek && fort.durationOfTrek.toLowerCase().includes(query)) || // Filter by duration
            (fort.experience && fort.experience.toLowerCase().includes(query))
        );
        setFilteredForts(filtered); // Update filtered forts
    };

    // Fetch forts from backend based on type
    useEffect(() => {
        const fetchForts = async () => {
            try {
                const response = type ? 
                    await axios.get(`http://localhost:3001/forts/${type}`) : 
                    await axios.get('http://localhost:3001/forts');
                setForts(response.data); // Set all forts
                setFilteredForts(response.data); // Initialize filtered forts
            } catch (error) {
                console.error("Error fetching forts:", error);
            }
        };

        fetchForts();
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
                    value={searchQuery}
                    onChange={handleSearchChange} // Handle search input change
                />
            </form>

            <div className="accordion accordion-flush" id="accordionFlushExample">
                {filteredForts.length > 0 ? (
                    filteredForts.map((fort, index) => (
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
                                        <img
                                            src={fort.photos[0]}
                                            alt={fort.name}
                                            className="fortimg"
                                        />
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
                                            src={fort.photos[0]}
                                            alt={fort.name}
                                            className="fort-details-img"
                                        />
                                        <div className="fort-info">
                                            <p>{fort.historicalSignificance}</p>
                                            <p className="history-text">{fort.history.summary}</p>
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
