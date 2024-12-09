import React, { Component } from "react";
import season from "../images/Season.png";
import clock from "../images/Clock.png";
import difficulty from "../images/Difficulty.png";
import telescope from "../images/Telescope.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./footer.css";

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid bg-body-tertiary">
                <h1 style={{ paddingTop: "10px" }}>Trek by Categories</h1>
                <div className="custom-hr"></div>
                <div className="categories-card">
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Season</h4>
                            <div className="card-hr"></div>
                            <Link to="/forts/summer" className="p-link">Summer</Link>
                            <Link to="/forts/monsoon" className="p-link">Monsoon</Link>
                            <Link to="/forts/winter" className="p-link">Winter</Link>
                            <img src={season} />
                        </div>
                    </div>
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Duration</h4>
                            <div className="card-hr"></div>
                            <Link to="/forts/1 day" className="p-link">1 day</Link>
                            <Link to="/forts/2 days" className="p-link">2 days</Link>
                            <Link to="/forts/3 days" className="p-link">3 days</Link>
                            <img src={clock} />
                        </div>
                    </div>
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Difficulty</h4>
                            <div className="card-hr"></div>
                            <Link to="/forts/easy" className="p-link">Easy</Link>
                            <Link to="/forts/moderate" className="p-link">Moderate</Link>
                            <Link to="/forts/difficult" className="p-link">Difficult</Link>
                            <img src={difficulty} />
                        </div>
                    </div>
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Experience</h4>
                            <div className="card-hr"></div>
                            <Link to="/forts/stargazing" className="p-link">Stargazing</Link>
                            <Link to="/forts/family" className="p-link">Family</Link>
                            <Link to="/forts/youth" className="p-link">Youth</Link>
                            <img src={telescope} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="other-footer">
                    <div className="left-screen">
                        <h4>Follow Us On</h4>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="social-icon" title="Facebook" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="social-icon" title="Instagram" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faYoutube} className="social-icon" title="YouTube" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className="social-icon" title="LinkedIn" />
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
                            <p>Privacy Policy</p>
                            <p>Terms of Service</p>
                            <p>About Us</p>
                        </div>
                    </div>
                    <div className="right-screen">
                        <h4>Email Us</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Your Name</label>
                                <input type="text" className="form-control" id="nameInput" placeholder="Enter your name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="messageInput" className="form-label">Your Message</label>
                                <textarea
                                    className="form-control"
                                    id="messageInput"
                                    rows="4"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <button type="submit" class="btn fbutton">Send Message</button>
                        </form>
                    </div>
                </div>
                <div className="copyrights">
                    <p>© 2024 FortsAndFootmarks Private Limited.</p>
                    <p>All images are subjected to copyrights by their respective authors.</p>
                </div>
            </div>
        );
    }
}

export default Footer;