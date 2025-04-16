import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/authContext.js";
import { FaPencilAlt, FaSave } from "react-icons/fa"; 
import { showErrorToast } from "../Toastify/toast.jsx";
import "./profile.css";

const Profile = () => {
    const { user, setUser } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${user.uid}`)
                .then((response) => {
                    setProfileData(response.data);
                    setNewUsername(response.data.username);
                })
                .catch((error) => {
                    console.error("Error fetching profile data:", error);
                    showErrorToast("Failed to load profile. Please try again.");
                });
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        try {
            setUploading(true);
            let updatedPhotoURL = profileData.photoURL;

            // ✅ Upload new profile picture if changed
            if (newProfilePic) {
                const formData = new FormData();
                formData.append("file", newProfilePic);
                formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );

                updatedPhotoURL = cloudinaryResponse.data.secure_url;
            }

            // ✅ Update profile if username or profile picture is changed
            if (newUsername !== profileData.username || newProfilePic) {
                await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.uid}`, {
                    username: newUsername,
                    photoURL: updatedPhotoURL,
                });

                // ✅ Update Local State
                setProfileData((prev) => ({ ...prev, username: newUsername, photoURL: updatedPhotoURL }));
                setUser((prev) => ({ ...prev, username: newUsername, photoURL: updatedPhotoURL }));
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            showErrorToast("Failed to update profile.");
        } finally {
            setUploading(false);
        }
    };

    if (!user) return <div>Please log in to view your profile.</div>;
    if (!profileData) return <div>Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-pic-container">
                    <label htmlFor="profilePicInput" className="profile-pic-label">
                        <img src={profileData.photoURL} alt="Profile" className="profile-pic" />
                        {isEditing && <FaPencilAlt className="edit-icon" />}
                    </label>
                    <input
                        type="file"
                        id="profilePicInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => setNewProfilePic(e.target.files[0])}
                        disabled={!isEditing}
                    />
                </div>

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

                    {/* Edit & Save Button Toggle */}
                    {isEditing ? (
                        <FaSave
                            className="edit-icon save-icon"
                            onClick={handleProfileUpdate}
                            title="Save"
                        />
                    ) : (
                        <FaPencilAlt
                            className="edit-icon"
                            onClick={() => setIsEditing(true)}
                            title="Edit Profile"
                        />
                    )}
                </div>

                <p>{profileData.email}</p>
                <p>❤️ Total Likes Received: <strong>{profileData.totalLikes}</strong></p>
                {uploading && <p className="uploading-text">Updating profile...</p>}

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
