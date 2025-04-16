import React from "react";
import season from "../images/Season.png";
import clock from "../images/Clock.png";
import difficulty from "../images/Difficulty.png";
import telescope from "../images/Telescope.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { showErrorToast, showSuccessToast } from "../Toastify/toast";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
    
        const name = event.target.name.value.trim();
        const email = event.target.email.value.trim();
        const message = event.target.message.value.trim();
    
        const inputs = [
            { field: "Name", value: name },
            { field: "Email", value: email },
            { field: "Message", value: message },
        ];
    
        const validateTextInput = (value) => {
            if (value.includes('"') || value.includes("'")) return "Quotes are not allowed.";
            if (value.length > 300) return "Maximum 300 characters allowed.";
            return null;
        };
    
        for (const input of inputs) {
            const error = validateTextInput(input.value);
            if (error) {
                showErrorToast(`${input.field} Error: ${error}`);
                return;
            }
        }
    
        showSuccessToast("Sending...");
    
        const formData = new FormData();
        formData.append("access_key", "956c91fc-d724-4000-932f-49ef2414c10e");
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);
    
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
    
            if (data.success) {
                showSuccessToast("Form Submitted Successfully");
                event.target.reset();
            } else {
                console.error("Error", data);
                showErrorToast(data.message);
            }
        } catch (error) {
            console.error("Submission Error", error);
            showErrorToast("Something went wrong. Please try again later.");
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
                        <Link to="/forts/short" className="p-link">
                            Short Treks
                        </Link>
                        <Link to="/forts/1 day" className="p-link">
                            1 day
                        </Link>
                        <Link to="/forts/2 days" className="p-link">
                            2 days
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
                        <Link to="/forts/challenging" className="p-link">
                            Challenging
                        </Link>
                        <img src={difficulty} />
                    </div>
                </div>
                <div className="card footer-card">
                    <div className="card-body">
                        <h4>Trek by Experience</h4>
                        <div className="card-hr"></div>
                        <Link to="/forts/trekking" className="p-link">
                            Trekking
                        </Link>
                        <Link to="/forts/family" className="p-link">
                            Family
                        </Link>
                        <Link to="/forts/photography" className="p-link">
                            Photography
                        </Link>
                        <img src={telescope} />
                    </div>
                </div>
            </div>
            <br />
            <div className="other-footer">
                <div className="left-screen">
                    <h4>Follow Us On</h4>
                    <div className="main">
                        <div className="up">
                            {/* Instagram Card */}
                            <button className="card1" onClick={() => window.open("https://www.instagram.com/smit_potkar/")}>
                                <svg
                                    className="instagram"
                                    fillRule="nonzero"
                                    height="30px"
                                    width="30px"
                                    viewBox="0 0 256 256"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        style={{ mixBlendMode: 'normal' }}
                                        textAnchor="none"
                                        fontSize="none"
                                        fontWeight="none"
                                        fontFamily="none"
                                        strokeDashoffset="0"
                                        strokeDasharray=""
                                        strokeMiterlimit="10"
                                        strokeLinejoin="miter"
                                        strokeLinecap="butt"
                                        strokeWidth="1"
                                        stroke="none"
                                        fillRule="nonzero"
                                    >
                                        <g transform="scale(8, 8)">
                                            <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>

                            {/* Facebook Card */}
                            <button className="card2" onClick={() => window.open("https://www.facebook.com/smit.potkar")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    height="24"
                                    className="facebook"
                                    width="24"
                                >
                                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="down">
                            {/* LinkedIn Card */}
                            <button className="card3" onClick={() => window.open("https://www.linkedin.com/in/smit-potkar")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="linkedin"
                                    height="1.6em"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                                    ></path>
                                </svg>
                            </button>

                            {/* YouTube Card */}
                            <button className="card4" onClick={() => window.open("https://youtube.com")}>
                                <svg
                                    height="50"
                                    width="50"
                                    viewBox="0 0 100 90"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="youtube"
                                >
                                    <path
                                        d="m120 60c0 33.1371-26.8629 60-60 60s-60-26.8629-60-60 26.8629-60 60-60 60 26.8629 60 60z"
                                        fill="#ffffff00"
                                    ></path>
                                    <path
                                        class="youtube"
                                        d="m25 49c0-7.732 6.268-14 14-14h42c7.732 0 14 6.268 14 14v22c0 7.732-6.268 14-14 14h-42c-7.732 0-14-6.268-14-14z"
                                        fill="#fff"
                                    ></path>
                                    <path
                                        class="youtube_center_Icon"
                                        d="m74 59.5-21 10.8253v-21.6506z"
                                        fill="white"
                                    ></path>
                                </svg>
                            </button>
                        </div>
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
