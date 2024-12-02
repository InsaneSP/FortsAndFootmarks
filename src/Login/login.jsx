import React, { Component } from "react";
import log from "../images/log.png";
import register from "../images/register.png";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUpMode: false,
        };
    }

    toggleSignUpMode = () => {
        this.setState((prevState) => ({ isSignUpMode: !prevState.isSignUpMode }));
    };

    render() {
        const { isSignUpMode } = this.state;
        return (
            <div className="login-body">
            <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* Sign In Form */}
                        <form action="#" className="sign-in-form login-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                                <input type="text" placeholder="Username" className="inp"/>
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faLock} className="icon"/>
                                <input type="password" placeholder="Password" className="inp"/>
                            </div>
                            <input type="submit" value="Login" className="login-btn solid inp" />
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faGoogle} />
                                </a>
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </div>
                        </form>

                        {/* Sign Up Form */}
                        <form action="#" className="sign-up-form login-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                                <input type="text"  placeholder="Username" className="inp"/>
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                                <input type="email" placeholder="Email" className="inp"/>
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faLock} className="icon"/>
                                <input type="password" placeholder="Password" className="inp"/>
                            </div>
                            <input type="submit" className="login-btn inp" value="Sign up" />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faGoogle} />
                                </a>
                                <a href="#" className="social-icon">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New to Our Trekking Community? Join Us!</h3>
                            <p>
                            Sign up to start your journey through the historical forts of Chhatrapati Shivaji Maharaj.
                            </p>
                            <button
                                className="login-btn transparent"
                                onClick={this.toggleSignUpMode}
                            >
                                Sign up
                            </button>
                        </div>
                        <img src={log} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Already a Trekker? Sign In to Continue!</h3>
                            <p>
                            Log in to continue exploring the majestic forts of Chhatrapati Shivaji Maharaj.
                            </p>
                            <button
                                className="login-btn transparent"
                                onClick={this.toggleSignUpMode}
                            >
                                Sign in
                            </button>
                        </div>
                        <img src={register} className="image" alt="" />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;
