import React, { Component } from "react";
import { Link } from "react-router-dom";
import coastalFort from "../images/Coastal.jfif";
import hillFort from "../images/Hill.jfif";
import inlandFort from "../images/Inland.jfif";
import mountainFort from "../images/Mountain.jfif";
import './categories.css';

class Categories extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid background">
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>Unveil the Heritage</h1>
        <br />
        <br />
        <div className="row">
          {[{
            img: coastalFort,
            title: "Coastal Fort",
            backText: "Coastal forts, like Sindhudurg Fort, were built to protect the western coastline of Maharashtra from foreign invasions and pirate attacks. Strategically located on the coast, these forts were crucial for controlling sea routes and ensuring maritime security.",
            path: "/forts/coastal",
          },
          {
            img: hillFort,
            title: "Hill Fort",
            backText: "Hill forts, such as Rajgad Fort, were constructed on elevated terrain to provide a strategic vantage point. These forts were used for administrative purposes, military defense, and as a base for managing the surrounding regions. Their height and rugged terrain made them challenging for enemies to conquer.",
            path: "/forts/hill",
          },
          {
            img: inlandFort,
            title: "Inland Fort",
            backText: "Inland forts, like Panhala Fort, were situated in the interior regions, often on high plateaus or hills. These forts played a key role in controlling land routes, securing trade paths, and serving as strongholds in the heart of Shivaji Maharaj's empire.",
            path: "/forts/inland",
          },
          {
            img: mountainFort,
            title: "Mountain Fort",
            backText: "Mountain forts, such as Anjaneri Fort, were built on steep, mountainous terrain. These forts provided excellent defensive positions due to their natural elevation and ruggedness, making them ideal for withstanding sieges and launching counter-attacks.",
            path: "/forts/mountain",
          }
          ].map((item, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card-container">
                <Link to={item.path} className="card">
                  <div className="card-face card-front">
                    <img src={item.img} className="card-img" alt={item.title} />
                    <div className="card-title">{item.title}</div>
                  </div>
                  <div className="card-face card-back">
                    <h5>{item.backText}</h5>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;