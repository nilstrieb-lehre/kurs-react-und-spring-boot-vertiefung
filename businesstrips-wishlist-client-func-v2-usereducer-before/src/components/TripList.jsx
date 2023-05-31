/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getBusinessTrips } from "./tripsService.js";

// functional component ProductList, deconstruct props!
function TripList() {
  // State

  // componentDidMount .. didUpdate etc.
  useEffect(() => {
    // fetch products from api
  }, []);

  return (
    <div className="container">
      <section>
        <h4 className="h4">Business Trips - Planned 2021</h4>
        <div className="row" />
      </section>
    </div>
  );
}
// deconstruct ...props
function Trip() {
  // Props

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <figure className="card card-product">
        <div className="img-wrap">
          <img src={"images/items/" + ".jpg"} alt="name " />
        </div>
        <figcaption className="info-wrap">
          <a href="#. . . " className="title" />
          <div className="price-wrap">
            <span className="price-new" />
          </div>
          <p className="card-text" />
          <div className="info-wrap row">
            <button type="button" className="btn btn-link btn-outline">
              <i className="fa fa-luggage-cart" /> Add to Triplist
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default TripList;
