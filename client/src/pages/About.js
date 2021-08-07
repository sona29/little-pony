import React from "react";
import Earn from "../assets/cash-payment.png";
import Planet from "../assets/planet-earth.png";
import Piggy from "../assets/piggy-bank.png";

function About() {
  return (
    <div className="container">
      <h2 className="text-center mt-5">Why Little Pony</h2>

      <div className="row justify-content-around mt-4">
        <div className="col-md-4">
          <img
            src={Earn}
            className="img-responsive about-image float-left mx-auto d-block"
            alt=""
          />
          <p className="mt-3 text-center">
            Earn money by selling unused clothes. Plus you extend a garment's
            life cycle.
          </p>
        </div>

        <div className="col col-md-offset-4">
          <img
            src={Planet}
            className="img-responsive about-image float-left text-center mx-auto d-block"
            alt=""
          />
          <p className="mt-3 text-center">
            Buying used clothing saves resources, doing the environment a solid
            favor.
          </p>
        </div>

        <div className="col-md-4">
          <img
            src={Piggy}
            className="img-responsive about-image float-left mx-auto d-block"
            alt=""
          />
          <p className="mt-3 text-center">
            Save money by buying used clothes. You’ll never pay anywhere near
            full price
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
