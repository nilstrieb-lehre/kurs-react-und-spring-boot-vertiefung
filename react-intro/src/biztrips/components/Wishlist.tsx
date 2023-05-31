import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trip } from "./tripsService";

export default function Wishlist({ wishlist }: { wishlist: Array<Trip> }) {
  // as constant variant 2

  const empty = (
    <tr>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <td colSpan="4">
        {" "}
        <p className="alert alert-info">Wishlist of Businesstrips is empty</p>
      </td>
    </tr>
  );

  return (
    <div className="container">
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            <div className="card table-responsive">
              <table className="table table-hover shopping-cart-wrap">
                <thead className="text-muted">
                  <tr>
                    <th scope="col">Trip</th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="200">
                      Title
                    </th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="200">
                      Like
                    </th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="120">
                      Description
                    </th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="200" className="text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody />
                <tfoot>
                  {wishlist.length === 0
                    ? empty
                    : wishlist.map((trip) => <Wish trip={trip} />)}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

function padn2(num: number): string {
  return `${num.toString().padStart(2, "0")}`;
}

function formatTime(time: Trip["startTrip"]): string {
  const hours = ` ${padn2(time[3])}:${padn2(time[4])}`;
  return `${time[0]}-${padn2(time[1])}-${padn2(time[2])} ${hours}`;
}

function Wish({ trip }: { trip: Trip }) {
  // deconstruct props

  // props

  const start = trip.startTrip;

  return (
    <tr>
      <td>
        <figure className="media">
          <div className="img-wrap">
            <img
              className="img-thumbnail img-xs"
              src={"images/items/" + trip.id + ".jpg"}
              alt={trip.title}
            />
          </div>
          <figcaption className="media-body">
            <h6 className="h6" />
            <dl className="dlist-inline small">
              <dt>Start: {formatTime(trip.startTrip)}</dt>
              <dd />
            </dl>
            <dl className="dlist-inline small">
              <dt>End: {formatTime(trip.endTrip)}</dt>
              <dd />
            </dl>
          </figcaption>
        </figure>
      </td>
      <td>
        <span className="media-body">
          <div>{trip.title}</div>
        </span>
      </td>
      <td>
        <span className="media-body">
          <div>
            <button className="btn btn-outline-success fa fa-heart fa-xs" />
          </div>
        </span>
      </td>

      <td className="price-wrap price">
        <span className="media-body">
          <div>{trip.description}</div>
        </span>
      </td>
      <td className="text-right">
        <button
          className="btn btn-outline-danger"
          // App deleteItem
        >
          delete Trip
        </button>
      </td>
    </tr>
  );
}