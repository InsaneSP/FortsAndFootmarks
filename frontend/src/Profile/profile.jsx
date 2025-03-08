import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/authContext.js";
import { FaPencilAlt } from "react-icons/fa";
import "./profile.css";

const Profile = () => {
    const { user, setUser } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${user.uid}`)
                .then((response) => {
                    setProfileData(response.data);
                    setNewUsername(response.data.username);
                })
                .catch((error) => {
                    console.error("Error fetching profile data:", error);
                    setError("Failed to load profile. Please try again.");
                });
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.uid}`, {
                username: newUsername
            });

            // Update local profile state
            setProfileData(prev => ({ ...prev, username: newUsername }));

            // 🔹 Update the global user state in AuthContext
            setUser(prev => ({ ...prev, username: newUsername }));

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!user) return <div>Please log in to view your profile.</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!profileData) return <div>Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={profileData.photoURL} alt="Profile" className="profile-pic" />
                <div className="username-container">
                    {isEditing ? (
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="edit-username-input"
                        />
                    ) : (
                        <h2>{profileData.username}</h2>
                    )}
                    <FaPencilAlt
                        className="edit-icon"
                        onClick={() => setIsEditing(!isEditing)}
                        title="Edit Username"
                    />
                </div>

                {isEditing && (
                    <button onClick={handleProfileUpdate} className="save-button">Save</button>
                )}

                <p>{profileData.email}</p>
                <p>❤️ Total Likes Received: <strong>{profileData.totalLikes}</strong></p>
                
                {/* <div className="profile-achievements">
                    <h3>🏅 Your Achievements</h3>
                    <div className="badge-container">
                        {profileData.totalLikes > 50 && <span className="badge">🔥 Popular Explorer</span>}
                        {profileData.comments.length > 20 && <span className="badge">💬 Active Commenter</span>}
                        {profileData.replies.length > 30 && <span className="badge">🔄 Discussion Leader</span>}
                    </div>
                </div> */}

                {/* <div className="most-active-fort">
                    <h3>🏰 Most Active Fort</h3>
                    {profileData.comments.length > 0 ? (
                        <p>📍 {profileData.comments[0].fortId.name}</p>
                    ) : (
                        <p>You haven't commented on any fort yet.</p>
                    )}
                </div> */}
            </div>

            <div className="profile-comments">
                <h3>Your Comments</h3>
                {profileData.comments.length === 0 ? (
                    <p>You haven't commented on any forts yet.</p>
                ) : (
                <div className="comment-grid">
                    {profileData.comments.map((comment, index) => (
                        <div key={index} className="comment-card">
                            <p className="fort-name">🏰 {comment.fortId.name}</p>
                            <p>🗨️ {comment.comment}</p>
                            <p>❤️ {comment.likes.length} Likes</p>
                            <p>📅 {new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                )}
            </div>

            <div className="profile-comments">
            <h3>Your Replies on Forts</h3>
                {profileData.replies.length === 0 ? (
                    <p>You haven't replied to any comments yet.</p>
                ) : (
                <div className="comment-grid">
                    {profileData.comments.map((comment, index) => (
                        <div key={index} className="comment-card">
                            <p className="fort-name">🏰 {comment.fortId.name}</p>
                            <p>🗨️ {comment.comment}</p>
                            <p>❤️ {comment.likes.length} Likes</p>
                        </div>
                    ))}
                </div>
                )}
            </div>

        </div>
    );
};

export default Profile;
