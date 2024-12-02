import React, { Component } from "react";
import season from "../images/Season.png";
import clock from "../images/Clock.png";
import difficuty from "../images/Difficulty.png";
import telescope from "../images/Telescope.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
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
                            <p>Summer</p>
                            <p>Monsoon</p>
                            <p>Winter</p>
                            <img src={season} />
                        </div>
                    </div>
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Duration</h4>
                            <div className="card-hr"></div> 
                            <p>1 day</p>
                            <p>2 days</p>
                            <p>3 days</p>
                            <img src={clock} />
                        </div>
                    </div>
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Difficulty</h4>
                            <div className="card-hr"></div>
                            <p>Easy</p>
                            <p>Moderate</p>
                            <p>Difficult</p>
                            <img src={difficuty} />
                        </div>
                    </div>
                    <div className="card footer-card">
                        <div className="card-body">
                            <h4>Trek by Experience</h4>
                            <div className="card-hr"></div>
                            <p>Stargazing</p>
                            <p>Family</p>
                            <p>Youth</p>
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
                            <div class="mb-3">
                                <label for="nameInput" class="form-label">Your Name</label>
                                <input type="text" class="form-control" id="nameInput" placeholder="Enter your name" />
                            </div>
                            <div class="mb-3">
                                <label for="emailInput" class="form-label">Your Email</label>
                                <input type="email" class="form-control" id="emailInput" placeholder="Enter your email" />
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="messageInput" class="form-label">Your Message</label>
                                <textarea
                                    class="form-control"
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