import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getBusinessTrips, type Trip } from "./tripsService.ts";

// functional component ProductList, deconstruct props!
function TripList() {
  const [trips, setTrips] = useState([]);
  // State

  useEffect(() => {
    getBusinessTrips().then(setTrips);
  }, []);

  return (
    <div className="container">
      <section>
        <h4 className="h4">Business Trips - Planned 2021</h4>
        <div className="row">
          {trips.map((trip) => (
            <Trip trip={trip} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Trip({ trip }: { trip: Trip }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <figure className="card card-product">
        <div className="img-wrap">
          <img src={"images/items/" + trip.id + ".jpg"} alt={trip.title} />
        </div>
        <figcaption className="info-wrap">
          <a href="#. . . " className="title">
            {trip.title}
          </a>
          <div className="price-wrap">
            <span className="price-new">{trip.description}</span>
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
