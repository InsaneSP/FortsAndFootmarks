import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "slugify";
import "./forts.css";

const Forts = () => {
    const [forts, setForts] = useState([]);
    const [filteredForts, setFilteredForts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { type } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const fortsPerPage = 5;
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = forts.filter(fort => 
            fort.name.toLowerCase().includes(query)
        );
        setFilteredForts(filtered);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchForts = async () => {
            try {
                const response = type
                    // ? await axios.get(`http://localhost:3001/forts/${type}`)
                    // : await axios.get('http://localhost:3001/forts');
                    ? await axios.get(`${process.env.REACT_APP_API_URL}/forts/${type}`)
                    : await axios.get(`${process.env.REACT_APP_API_URL}/forts`);
                setForts(response.data);
                setFilteredForts(response.data);
            } catch (error) {
                console.error("Error fetching forts:", error);
            }
        };

        fetchForts();
    }, [type]);

    const indexOfLastFort = currentPage * fortsPerPage;
    const indexOfFirstFort = indexOfLastFort - fortsPerPage;
    const currentForts = filteredForts.slice(indexOfFirstFort, indexOfLastFort);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <br />
            <h1 style={{ textTransform: "capitalize" }}>{type} Forts</h1>
            
            <form className="search" role="search">
                <input
                    className="form-control me-2 search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </form>

            <div className="accordion accordion-flush" id="accordionFlushExample">
                {currentForts.length > 0 ? (
                    currentForts.map((fort, index) => (
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

            {filteredForts.length > fortsPerPage && (
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredForts.length / fortsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}

            <br />
        </div>
    );
};

export default Forts;
