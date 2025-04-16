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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { showErrorToast, showSuccessToast } from "../Toastify/toast.jsx";
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            showErrorToast("You must be logged in to comment.");
            return;
        }

        if (!newCommentText.trim()) {
            showErrorToast("Comment cannot be empty!");
            return;
        }

        const newComment = {
            uid: user.uid,
            username: user.username,
            photoURL: user.photoURL,
            comment: newCommentText
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/comments/fort/${fortName}/comment`,
                newComment
            );

            setComments([...comments, response.data]);
            setNewCommentText("");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showErrorToast(error.response.data.message || "Profanity detected. Please revise your comment.");
            } else {
                console.error("Error saving comment:", error);
                showErrorToast("Something went wrong while saving your comment.");
            }
        }
    };

    const replyHandler = async (commentId) => {
        if (!user) {
            showErrorToast("You must be logged in to reply.");
            return;
        }

        if (!replyText.trim()) {
            showErrorToast("Reply cannot be empty!");
            return;
        }

        try {
            const reply = {
                uid: user.uid,
                username: user.username,
                photoURL: user.photoURL,
                comment: replyText
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/comments/${commentId}/reply`,
                reply
            );

            console.log("Reply posted successfully:", response.data);

            // ✅ Fix: Update only the specific comment's replies without overwriting all comments
            setComments((prevComments) =>
                prevComments.map((c) =>
                    c._id === commentId
                        ? { ...c, replies: [...(c.replies || []), response.data] }
                        : c
                )
            );

            setReplyText("");
            setReplyingTo(null);
        } catch (error) {
            showErrorToast("Error posting reply:", error);
        }
    };

    const likeHandler = async (commentId, parentCommentId = null) => {
        if (!user) {
            showErrorToast("You must be logged in to like a comment.");
            return;
        }

        if (!commentId) {
            showErrorToast("Error: commentId is undefined");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/comments/${commentId}/like`,
                { uid: user.uid }
            );

            setComments(prevComments =>
                prevComments.map(c =>
                    c._id === commentId
                        ? { ...c, likes: c.likes?.includes(user.uid) ? c.likes.filter(id => id !== user.uid) : [...(c.likes || []), user.uid] }
                        : {
                            ...c,
                            replies: c.replies?.map(reply =>
                                reply._id === commentId
                                    ? { ...reply, likes: reply.likes?.includes(user.uid) ? reply.likes.filter(id => id !== user.uid) : [...(reply.likes || []), user.uid] }
                                    : reply
                            ),
                        }
                )
            );

            console.log(response.data.message);
        } catch (error) {
            showErrorToast("Error liking comment/reply:", error.response?.data || error.message);
        }
    };

    const deleteHandler = async (commentId, commentUserId, parentCommentId = null) => {
        if (!user) {
            showErrorToast("You must be logged in to delete a comment.");
            return;
        }

        if (!commentId) {
            showErrorToast("Error: commentId is undefined");
            return;
        }

        if (user.uid !== commentUserId) {
            showErrorToast("You can only delete your own comments.");
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
                data: { uid: user.uid }
            });

            setComments(prevComments =>
                prevComments
                    .map(c =>
                        c._id === commentId
                            ? null
                            : {
                                ...c,
                                replies: c.replies?.filter(reply => reply._id !== commentId),
                            }
                    )
                    .filter(Boolean)
            );

            console.log("Comment/Reply deleted successfully");
        } catch (error) {
            showErrorToast("Error deleting comment/reply:", error.response?.data || error.message);
        }
    };

    const handleFileChange = (event) => {
        if (!user) {
            showErrorToast("You must be logged in to select an image.");
            return;
        }
        setSelectedFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!user) {
            showErrorToast("You must be logged in to upload images.");
            return;
        }

        if (!selectedFile) {
            showErrorToast("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("username", user?.username || "Anonymous");
        formData.append("userPhoto", user?.photoURL || "");

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/forts/${fortName}/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            showSuccessToast(response.data.message);
            setGalleryImages((prevImages) => [...prevImages, response.data.image]);
        } catch (error) {
            showErrorToast("Error uploading image:", error);
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
            .get(`${process.env.REACT_APP_API_URL}/fort/${fortName}`)
            .then((response) => {
                setFortData(response.data);
                setComments(response.data.comments || []);
                setGalleryImages(response.data.gallery || []);
            })
            .catch((err) => {
                showErrorToast("Error fetching fort details:", err);
                setFortData(null);
            });
    }, [fortName]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/comments/fort/${fortName}/comments`)
            .then((response) => {
                const filteredComments = response.data.filter(comment => !comment.parentId);

                // Ensure all comments have a likes array
                const updatedComments = filteredComments.map(comment => ({
                    ...comment,
                    likes: Array.isArray(comment.likes) ? comment.likes : []
                }));

                setComments(updatedComments);
            })
            .catch((err) => {
                showErrorToast("Error fetching comments:", err);
                setComments([]);
            });
    }, [fortName, user]);


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
                    showErrorToast("Error fetching weather data:", error);
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
                        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fort/${fort.toLowerCase()}`);
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
        <div className="container-fluid padding-container individual-container">
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

            {/* <div className="sponsored-section">
                <h2>Sponsored Treks</h2>
                <ul>
                    {fortData.sponsoredTreks.map((trek, index) => (
                        <li key={index}>{trek}</li>
                    ))}
                </ul>
            </div> */}

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
                                            <button className="like" onClick={() => likeHandler(c._id)}>
                                                {Array.isArray(c.likes) && c.likes.includes(user?.uid) ? "❤️" : "🤍"}
                                                <span className="like-count"> {c.likes ? c.likes.length : 0}</span>
                                            </button>
                                            <button className="reply" onClick={() => toggleReplyingTo(c._id)}>Reply</button>
                                            {user?.uid === c.userId && (
                                                <button className="delete" onClick={() => deleteHandler(c._id, c.userId)}>Delete</button>
                                            )}
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
                                                                <button className="like" onClick={() => likeHandler(reply._id, c._id)}>
                                                                    {Array.isArray(reply.likes) && reply.likes.includes(user?.uid) ? "❤️" : "🤍"}
                                                                    <span className="like-count"> {reply.likes ? reply.likes.length : 0}</span>
                                                                </button>
                                                                <button className="reply" onClick={() => toggleReplyingTo(reply._id)}>Reply</button>
                                                                {user?.uid === reply.userId && (
                                                                    <button className="delete" onClick={() => deleteHandler(reply._id, reply.userId)}>Delete</button>
                                                                )}
                                                                <div className="created-time">{new Date(c.createdAt).toLocaleString()}</div>
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
                                                                    {reply.replies.map((nestedReply, nestedIndex) => (
                                                                        <li key={nestedIndex} className="reply no-hover">
                                                                            <img src={nestedReply.photoURL} alt={`${nestedReply.username}'s profile`} />
                                                                            <div className="comment-content">
                                                                                <div className="username">{nestedReply.username}</div>
                                                                                <div className="comment-text">{nestedReply.comment}</div>
                                                                                <div className="comment-actions">
                                                                                    <div className="like" onClick={() => likeHandler(nestedReply._id, reply._id)}>
                                                                                        {Array.isArray(nestedReply.likes) && nestedReply.likes.includes(user?.uid) ? "❤️" : "🤍"}
                                                                                        <span className="like-count">{nestedReply.likes ? nestedReply.likes.length : 0}</span>
                                                                                    </div>
                                                                                    <button className="reply" onClick={() => toggleReplyingTo(nestedReply._id)}>Reply</button>
                                                                                    {user?.uid === nestedReply.userId && (
                                                                                        <button className="delete" onClick={() => deleteHandler(nestedReply._id, nestedReply.userId)}>Delete</button>
                                                                                    )}
                                                                                    <div className="created-time">{new Date(nestedReply.createdAt).toLocaleString()}</div>
                                                                                </div>

                                                                                {replyingTo === nestedReply._id && (
                                                                                    <div className="reply-input">
                                                                                        <textarea
                                                                                            value={replyText}
                                                                                            onChange={(e) => setReplyText(e.target.value)}
                                                                                            placeholder="Write a reply..."
                                                                                        />
                                                                                        <button onClick={() => replyHandler(nestedReply._id)}>Post Reply</button>
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

            <div className="gallery-section">
                <h2>{fortName.charAt(0).toUpperCase() + fortName.slice(1)} Gallery</h2>

                <label htmlFor="file-upload" className="upload-label">Choose an Image</label>
                <input type="file" id="file-upload" onChange={handleFileChange} />
                <button className="upload-btn" onClick={uploadImage}>Upload Image</button>

                <div className="image-gallery">
                    {galleryImages.map((img, index) => (
                        <div key={index} className="gallery-item">
                            <img
                                src={img.url}
                                alt={`Uploaded by ${img.uploadedBy}`}
                                onClick={() => window.open(img.url, "_blank")}
                            />
                            <div className="uploader-info">
                                <img src={img.photoURL || "default-avatar.png"} alt="User" />
                                <p>Uploaded by {img.uploadedBy || "Anonymous"}</p>
                            </div>
                        </div>
                    ))}
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
