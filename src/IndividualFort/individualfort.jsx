import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faRoad,
    faHome,
    faCalendarAlt,
    faBus,
    faTrain,
    faRupee,
    faSun,
    faCloud,
    faSnowflake,
    faWarning,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./individualfort.css";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const IndividualFort = () => {
    const { user } = useAuth();
    const { fortName } = useParams();
    const [fortData, setFortData] = useState(null);
    const [activeSection, setActiveSection] = useState("keyPoints");
    const [comments, setComments] = useState(fortData?.comments || []);
    const [newCommentText, setNewCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [weather, setWeather] = useState(null);
    const [fortImages, setFortImages] = useState([]);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("You must be logged in to comment.");
            return;
        }

        if (!newCommentText.trim()) {
            alert("Comment cannot be empty!");
            return;
        }

        const newComment = { username: user.username, photoURL: user.photoURL, comment: newCommentText };
        try {
            const response = await axios.post(`http://localhost:3001/fort/${fortName}`, newComment)

            setComments(response.data);
            setNewCommentText("");
        } catch (error) {
            console.error("Error saving comment:", error);
        }
    };

    const replyHandler = async (commentId) => {
        if (!user) {
            alert("You must be logged in to reply.");
            return;
        }
    
        if (!replyText.trim()) {
            alert("Reply cannot be empty!");
            return;
        }
    
        try {
            console.log(`Sending request to: http://localhost:3001/fort/${fortName}/${commentId}/reply`);
    
            const reply = {
                username: user.username,
                photoURL: user.photoURL,
                comment: replyText,
            };
    
            const response = await axios.post(
                `http://localhost:3001/fort/${fortName}/${commentId}/reply`,
                reply
            );
    
            console.log("Reply posted successfully:", response.data);
            setComments(response.data); // Update the state with the new comments
            setReplyText("");
            setReplyingTo(null);
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    const toggleReplyingTo = (commentId) => {
        setReplyingTo((prevState) => (prevState === commentId ? null : commentId));
    };

    const toggleSection = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/fort/${fortName}`)
            .then((response) => {
                setFortData(response.data);
                setComments(response.data.comments || []);
            })
            .catch((err) => {
                console.error("Error fetching fort details:", err);
                setFortData(null);
            });
    }, [fortName, fortData?.comments]);

    useEffect(() => {
        if (fortData && fortData.map && fortData.map.coordinates) {
            const { latitude, longitude } = fortData.map.coordinates;
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac8f7980f1ccd2115fec2a8538b84913&units=metric`
                )
                .then((response) => {
                    setWeather(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                });
        }
    }, [fortData]);

    useEffect(() => {
        if (!fortData || !fortData.similarNearbyForts) return;
        const fetchNearbyFortsData = async () => {
            const images = {};
            await Promise.all(
                fortData.similarNearbyForts.map(async (fort) => {
                    try {
                        const response = await axios.get(`http://localhost:3001/fort/${fort.toLowerCase()}`);
                        images[fort] = response.data.photos?.[0];
                    } catch (error) {
                        images[fort] = "";
                    }
                })
            );
            setFortImages(images);
        };

        fetchNearbyFortsData();
    }, [fortData]);

    if (!fortData) return <div>Fort not found or loading...</div>;

    const fortSeasons = fortData.season.split(",");
    const displaySeasons = fortSeasons.filter((season) =>
        fortData.season.includes(season)
    );

    return (
        <div className="container-fluid individual-container">
            <div className="image-section">
                <img
                    src={fortData.photos[0]}
                    alt={`${fortData.name} 1`}
                    className="image-1"
                    onError={(e) => console.log("Image failed to load:", e.target.src)}
                />
                <div className="image-2-3-4">
                    <div className="image-2-3">
                        <img
                            src={fortData.photos[1]}
                            alt={`${fortData.name} 2`}
                            className="image-2"
                            onError={(e) =>
                                console.log("Image failed to load:", e.target.src)
                            }
                        />
                        <img
                            src={fortData.photos[2]}
                            alt={`${fortData.name} 3`}
                            className="image-3"
                            onError={(e) =>
                                console.log("Image failed to load:", e.target.src)
                            }
                        />
                    </div>
                    <img
                        src={fortData.photos[3]}
                        alt={`${fortData.name} 4`}
                        className="image-4"
                        onError={(e) => console.log("Image failed to load:", e.target.src)}
                    />
                </div>
            </div>

            <div className="head">
                <div className="name-rating">
                    <h1>{fortData.name}</h1>
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} className="info-icon" />
                        <p>{fortData.rating}</p>{" "}
                    </div>
                </div>
                <h3 className="subhead">{fortData.historicalSignificance}</h3>
                <div className="imp-icons">
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
                        <p>{fortData.durationOfTrek}</p>
                    </div>
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faTachometerAlt} className="info-icon" />
                        <p>{fortData.difficulty} Difficulty</p>
                    </div>
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faRoad} className="info-icon" />
                        <p>{fortData.distance}</p>
                    </div>
                </div>
            </div>

            <div className="history block">
                <h2>History of {fortData.name}</h2>
                <p>{fortData.history.summary}</p>
                {fortData.history.detailed.map((section, index) => (
                    <div key={index}>
                        <h5>{section.title}</h5>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>

            <div className="custom-button-container">
                <button
                    className={`custom-button ${activeSection === "keyPoints" ? "custom-button-active" : ""
                        }`}
                    onClick={() => toggleSection("keyPoints")}
                >
                    Key Points
                </button>
                <button
                    className={`custom-button ${activeSection === "planYourVisit" ? "custom-button-active" : ""
                        }`}
                    onClick={() => toggleSection("planYourVisit")}
                >
                    Plan Your Visit
                </button>
            </div>

            <div className="other-info block">
                {activeSection === "keyPoints" && (
                    <ul>
                        {fortData.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}

                {activeSection === "planYourVisit" && (
                    <>
                        <div className="other-info-item-container">
                            <FontAwesomeIcon
                                icon={faHome}
                                className="other-info-icon"
                                style={{ color: "Green" }}
                            />
                            <div className="other-info-item">
                                <h6>Local Accommodations</h6>
                                {fortData.localAccommodation.map((accommodation, index) => (
                                    <p key={index}>{accommodation}</p>
                                ))}
                            </div>
                        </div>
                        <div className="other-info-item-container">
                            <FontAwesomeIcon
                                icon={faBus}
                                className="other-info-icon"
                                style={{ color: "Red" }}
                            />
                            <div className="other-info-item">
                                <h6>How to Reach</h6>
                                <p>Nearest Bus Stop: {fortData.howToReach.nearestBusStop}</p>
                                {fortData.howToReach.busesAvailable.map((bus, index) => (
                                    <p key={index}>{bus}</p>
                                ))}
                            </div>
                        </div>
                        <div className="other-info-item-container">
                            <FontAwesomeIcon
                                icon={faTrain}
                                className="other-info-icon"
                                style={{ color: "Blue" }}
                            />
                            <div className="other-info-item">
                                <h6>Nearest Railway Station</h6>
                                <p>{fortData.nearestRailwayStation}</p>
                            </div>
                        </div>
                        <div className="other-info-item-container">
                            <FontAwesomeIcon
                                icon={faRupee}
                                className="other-info-icon"
                                style={{ color: "Gold" }}
                            />
                            <div className="other-info-item">
                                <h6>Approximate Budget</h6>
                                <p>{fortData.approximateBudget}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="location-section">
                <h2>Location</h2>
                <a
                    href={`https://www.google.com/maps?q=${fortData.map.coordinates.latitude},${fortData.map.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on Google Maps
                </a>
                <MapContainer
                    center={[
                        fortData.map.coordinates.latitude,
                        fortData.map.coordinates.longitude,
                    ]} // Replace with lat/lng from the database
                    zoom={13}
                    style={{ height: "600px", width: "100%", marginTop: "20px" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                        position={[
                            fortData.map.coordinates.latitude,
                            fortData.map.coordinates.longitude,
                        ]}
                    >
                        <Popup>{fortData.name}</Popup>
                    </Marker>
                </MapContainer>
                <h2>Best Time to Visit</h2>
                <p>Best months: {fortData.bestTimeToVisit.months.join(", ")}</p>
            </div>
            <div className="time-to-visit-section">
                {/* {displaySeasons.includes("Summer") && ( */}
                <div className="card season-card no-hover block1">
                    <div className="card-body season">
                        <div className="season-name">
                            <FontAwesomeIcon icon={faSun} />
                            <h6>Summer</h6>
                        </div>
                        <p>Hot during the day, cooler nights. Less crowded.</p>
                    </div>
                </div>
                {/* )} */}
                {/* {displaySeasons.includes("Monsoon") && ( */}
                <div className="card season-card no-hover block1">
                    <div className="card-body season">
                        <div className="season-name">
                            <FontAwesomeIcon icon={faCloud} />
                            <h6>Monsoon</h6>
                        </div>
                        <p>Lush green surroundings, but trails can be slippery.</p>
                    </div>
                </div>
                {/* )} */}
                {/* {displaySeasons.includes("Winter") && ( */}
                <div className="card season-card no-hover block1">
                    <div className="card-body season">
                        <div className="season-name">
                            <FontAwesomeIcon icon={faSnowflake} />
                            <h6>Winter</h6>
                        </div>
                        <p>Pleasant weather, ideal for trekking. Peak tourist season.</p>
                    </div>
                </div>
                {/* )} */}
            </div>
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="accordion" id="accordionExample">
                    {fortData.faqs.map((faq, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse${index}`}
                                >
                                    {faq.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sponsored-section">
                <h2>Sponsored Treks</h2>
                <ul>
                    {fortData.sponsoredTreks.map((trek, index) => (
                        <li key={index}>{trek}</li>
                    ))}
                </ul>
            </div>

            {weather && (
                <div className="weather-section gradient-background">
                    <h2 className="weather-title">Current Weather</h2>
                    <div className="weather-info">
                        <div className="weather-item">
                            <img
                                className="weather-icon-large"
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                            />
                            <p className="weather-description">{weather.weather[0].description}</p>
                        </div>
                        <div className="weather-stats">
                            <p className="stat">🌡️ Temperature: <strong>{weather.main.temp}°C</strong></p>
                            <p className="stat">💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
                            <p className="stat">💨 Wind: <strong>{weather.wind.speed} km/h</strong></p>
                            <p className="stat">📊 Status: <strong>{weather.main.temp < 10 ? 'Cold' : weather.main.temp <= 20 ? 'Moderate' : 'Hot'}</strong></p>
                        </div>
                    </div>
                </div>
            )}

            <div className="comment-section">
                <h2>Comments</h2>
                <div className="comments-list">
                    <ul>
                        {comments.length > 0 ? (
                            comments.map((c, index) => (
                                <li key={index}>
                                    <img src={c.photoURL} alt={`${c.username}'s profile`} />
                                    <div className="comment-content">
                                        <div className="username">{c.username}</div>
                                        <div className="comment-text">{c.comment}</div>
                                        <div className="comment-actions">
                                            <button className="reply" onClick={() => toggleReplyingTo(c._id)}>Reply</button>
                                            <div className="created-time">{new Date(c.createdAt).toLocaleString()}</div>
                                        </div>
                                        {/* Reply Input Field */}
                                        {replyingTo === c._id && (
                                            <div className="reply-input">
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Write a reply..."
                                                />
                                                <button onClick={() => replyHandler(c._id)}>Post Reply</button>
                                            </div>
                                        )}

                                        {/* Display Replies */}
                                        {c.replies && c.replies.length > 0 && (
                                            <ul className="replies-list">
                                                {c.replies.map((reply, replyIndex) => (
                                                    <li key={replyIndex} className="reply no-hover">
                                                        <img src={reply.photoURL} alt={`${reply.username}'s profile`} />
                                                        <div className="comment-content">
                                                            <div className="username">{reply.username}</div>
                                                            <div className="comment-text">{reply.comment}</div>
                                                            <div className="comment-actions">
                                                                <button className="reply" onClick={() => toggleReplyingTo(reply._id)}>Reply</button>
                                                                <div className="created-time">{new Date(reply.createdAt).toLocaleString()}</div>
                                                            </div>
                                                            {replyingTo === reply._id && (
                                                                <div className="reply-input">
                                                                    <textarea
                                                                        value={replyText}
                                                                        onChange={(e) => setReplyText(e.target.value)}
                                                                        placeholder="Write a reply..."
                                                                    />
                                                                    <button onClick={() => replyHandler(reply._id)}>Post Reply</button>
                                                                </div>
                                                            )}
                                                            {reply.replies && reply.replies.length > 0 && (
                                                                <ul className="replies-list">
                                                                    {reply.replies.map((reply, replyIndex) => (
                                                                        <li key={replyIndex} className="reply no-hover">
                                                                            <img src={reply.photoURL} alt={`${reply.username}'s profile`} />
                                                                            <div className="comment-content">
                                                                                <div className="username">{reply.username}</div>
                                                                                <div className="comment-text">{reply.comment}</div>
                                                                                <div className="comment-actions">
                                                                                    <button className="reply" onClick={() => toggleReplyingTo(reply._id)}>Reply</button>
                                                                                    <div className="created-time">{new Date(reply.createdAt).toLocaleString()}</div>
                                                                                </div>
                                                                                {replyingTo === reply._id && (
                                                                                    <div className="reply-input">
                                                                                        <textarea
                                                                                            value={replyText}
                                                                                            onChange={(e) => setReplyText(e.target.value)}
                                                                                            placeholder="Write a reply..."
                                                                                        />
                                                                                        <button onClick={() => replyHandler(reply._id)}>Post Reply</button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="no-comments">No comments yet.</p>
                        )}
                    </ul>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <form onSubmit={submitHandler}>
                        <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button style={{ marginTop: "10px" }}>
                            Post Comment
                        </button>
                    </form>
                </div>
            </div>

            <div className="safety-section">
                <h2 className="safety-title">Safety Information</h2>
                <div className="card safety-card no-hover">
                    <div className="card-body season">
                        <div className="season-name">
                            <FontAwesomeIcon
                                icon={faWarning}
                                style={{ color: "red", marginRight: "10px", height: "24px" }}
                            />
                            <h4>Important Safety Tips</h4>
                        </div>
                        <ul>
                            <li>Inform someone about your trek plans</li>
                            <li>Carry enough water and stay hydrated</li>
                            <li>Be cautious near cliff edges</li>
                            <li>Check weather conditions before starting</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="similar-section">
                <h2>Similar / Nearby Forts</h2>
                <div className="forts-card-section">
                    {fortData.similarNearbyForts.map((fort, index) => (
                        <div className="card fort-card no-hover" key={index}>
                            <div className="card-body">
                                <h5>{fort}</h5>
                                <img
                                    src={fortImages[fort] || fortData.photos[0]}
                                    className="card-img-top"
                                    alt="..."
                                />
                                <br />
                                <button
                                    className="btn fbutton"
                                    onClick={() => {
                                        navigate(`/fort/${fort}`);
                                    }}
                                >
                                    Explore More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndividualFort;
