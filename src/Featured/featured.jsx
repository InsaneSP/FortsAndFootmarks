import React, { Component } from "react";
import coastalFort from "../images/Coastal.jfif";
import hillFort from "../images/Hill.jfif";
import inlandFort from "../images/Inland.jfif";
import mountainFort from "../images/Mountain.jfif";
import "./featured.css";

class Featured extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1 style={{ marginTop: "10px" }}>Featured Locations</h1>
                <br />
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={coastalFort} class="card-img-top" alt="..." />
                            <h5 class="card-text">Sindhudurg</h5>
                            <p class="card-text">One of the oldest forts on the Sindhudurg coast, later strengthened by Shivaji Maharaj..</p>
                            <a href="#" class="btn fbutton">Go somewhere</a>
                        </div>
                        <div className="carousel-item">
                            <img src={hillFort} className="d-block w-100" alt="Sindhudurg" />
                            <h5 class="card-text">Sindhudurg</h5>
                            <p class="card-text">One of the oldest forts on the Sindhudurg coast, later strengthened by Shivaji Maharaj..</p>
                            <a href="#" class="btn fbutton">Go somewhere</a>
                        </div>
                        <div className="carousel-item">
                            <img src={inlandFort} className="d-block w-100" alt="Sindhudurg" />
                            <h5 class="card-text">Sindhudurg</h5>
                            <p class="card-text">One of the oldest forts on the Sindhudurg coast, later strengthened by Shivaji Maharaj..</p>
                            <a href="#" class="btn fbutton">Go somewhere</a>
                        </div>
                        <div className="carousel-item">
                            <img src={mountainFort} className="d-block w-100" alt="Sindhudurg" />
                            <h5 class="card-text">Sindhudurg</h5>
                            <p class="card-text">One of the oldest forts on the Sindhudurg coast, later strengthened by Shivaji Maharaj..</p>
                            <a href="#" class="btn fbutton">Go somewhere</a>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <br />
            </div>
        );
    }
}

export default Featured;