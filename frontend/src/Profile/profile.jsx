import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/authContext.js";
import "./profile.css";

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${user.uid}`)
                .then((response) => {
                    setProfileData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching profile data:", error);
                    setError("Failed to load profile. Please try again.");
                });
        }
    }, [user]);

    if (!user) return <div>Please log in to view your profile.</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!profileData) return <div>Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={profileData.photoURL} alt="Profile" className="profile-pic" />
                <h2>{profileData.username}</h2>
                <p>{profileData.email}</p>
                <p>Total Likes Received: <strong>{profileData.totalLikes}</strong></p>
            </div>

            <div className="profile-comments">
                <h3>Your Comments on Forts</h3>
                {profileData.comments.length === 0 ? (
                    <p>You haven't commented on any forts yet.</p>
                ) : (
                    <ul>
                        {profileData.comments.map((comment, index) => (
                            <li key={index} className="comment-card">
                                <h4>🏰 {comment.fortId.name}</h4>
                                <p>🗨️ {comment.comment}</p>
                                <p>❤️ {comment.likes.length} Likes</p>
                                <p>📅 {new Date(comment.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="profile-replies">
                <h3>Your Replies on Forts</h3>
                {profileData.replies.length === 0 ? (
                    <p>You haven't replied to any comments yet.</p>
                ) : (
                    <ul>
                        {profileData.replies.map((reply, index) => (
                            <li key={index} className="comment-card reply-card">
                                <h4>🏰 {reply.fortId.name}</h4>
                                <p>💬 {reply.comment}</p>
                                <p>❤️ {reply.likes.length} Likes</p>
                                <p>📅 {new Date(reply.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;
