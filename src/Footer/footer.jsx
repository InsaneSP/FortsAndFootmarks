import React, { useState } from "react";
import season from "../images/Season.png";
import clock from "../images/Clock.png";
import difficulty from "../images/Difficulty.png";
import telescope from "../images/Telescope.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faYoutube,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        const formData = new FormData(event.target);

        formData.append("access_key", "956c91fc-d724-4000-932f-49ef2414c10e"); // Replace with your actual Web3Forms access key

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                event.target.reset();
            } else {
                console.error("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            console.error("Submission Error", error);
            setResult("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="container-fluid bg-body-tertiary">
            <h1 style={{ paddingTop: "10px" }}>Trek by Categories</h1>
            <div className="custom-hr"></div>
            <div className="categories-card">
                <div className="card footer-card">
                    <div className="card-body">
                        <h4>Trek by Season</h4>
                        <div className="card-hr"></div>
                        <Link to="/forts/summer" className="p-link">
                            Summer
                        </Link>
                        <Link to="/forts/monsoon" className="p-link">
                            Monsoon
                        </Link>
                        <Link to="/forts/winter" className="p-link">
                            Winter
                        </Link>
                        <img src={season} />
                    </div>
                </div>
                <div className="card footer-card">
                    <div className="card-body">
                        <h4>Trek by Duration</h4>
                        <div className="card-hr"></div>
                        <Link to="/forts/1 day" className="p-link">
                            1 day
                        </Link>
                        <Link to="/forts/2 days" className="p-link">
                            2 days
                        </Link>
                        <Link to="/forts/3 days" className="p-link">
                            3 days
                        </Link>
                        <img src={clock} />
                    </div>
                </div>
                <div className="card footer-card">
                    <div className="card-body">
                        <h4>Trek by Difficulty</h4>
                        <div className="card-hr"></div>
                        <Link to="/forts/easy" className="p-link">
                            Easy
                        </Link>
                        <Link to="/forts/moderate" className="p-link">
                            Moderate
                        </Link>
                        <Link to="/forts/difficult" className="p-link">
                            Difficult
                        </Link>
                        <img src={difficulty} />
                    </div>
                </div>
                <div className="card footer-card">
                    <div className="card-body">
                        <h4>Trek by Experience</h4>
                        <div className="card-hr"></div>
                        <Link to="/forts/stargazing" className="p-link">
                            Stargazing
                        </Link>
                        <Link to="/forts/family" className="p-link">
                            Family
                        </Link>
                        <Link to="/forts/youth" className="p-link">
                            Youth
                        </Link>
                        <img src={telescope} />
                    </div>
                </div>
            </div>
            <br />
            <div className="other-footer">
                <div className="left-screen">
                    <h4>Follow Us On</h4>
                    <div className="social-icons">
                        <a
                            href="https://www.facebook.com/smit.potkar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="social-icon"
                                title="Facebook"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/smit_potkar/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="social-icon"
                                title="Instagram"
                            />
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faYoutube}
                                className="social-icon"
                                title="YouTube"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/smit-potkar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className="social-icon"
                                title="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className="contact-us">
                        <h4>Contact Us</h4>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faClock} className="contact-icon" />
                            <span>Monday to Friday: 9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faClock} className="contact-icon" />
                            <span>Saturday: 10:00 AM - 2:00 PM</span>
                        </div>
                    </div>
                    <div className="agreements">
                    <Link to="/privacy" className="p-link">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="p-link">
                            Terms of Service
                        </Link>
                        <Link to="/aboutus" className="p-link">
                            About Us
                        </Link>
                    </div>
                </div>
                <div className="right-screen">
                    <h4>Email Us</h4>
                    <form onSubmit={onSubmit}>
                    <input type="hidden" name="access_key" value="956c91fc-d724-4000-932f-49ef2414c10e" />
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Your Name</label>
                            <input type="text" className="form-control" id="nameInput" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Your Email</label>
                            <input type="email" className="form-control" id="emailInput" name="email" placeholder="Enter your email" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="messageInput" className="form-label">Your Message</label>
                            <textarea
                                className="form-control"
                                id="messageInput"
                                name="message"
                                rows="4"
                                placeholder="Enter your message"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn fbutton">Send Message</button>
                    </form>
                    <span className="form-result">{result}</span>
                </div>
            </div>
            <div className="copyrights">
                <p>© 2024 FortsAndFootmarks Private Limited.</p>
                <p>
                    All images are subjected to copyrights by their respective authors.
                </p>
            </div>
        </div>
    );
};

export default Footer;
