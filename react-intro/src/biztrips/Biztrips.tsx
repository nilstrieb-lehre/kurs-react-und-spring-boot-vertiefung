import { useEffect, useReducer, useState } from "react";

import Wishlist from "./components/Wishlist";
import TripList from "./components/TripList";
import { Trip, getWishlistItems } from "./components/tripsService";
import tripsReducer from "./components/tripsReducer";

const initialWishlist: Trip[] = [
  {
    id: 1,
    title: "BT01",
    description: "San Francisco World Trade Center on new Server/IOT/Client ",
    startTrip: [2021, 2, 13, 9, 0],
    endTrip: [2021, 2, 15, 16, 56],
    meetings: [
      {
        id: 1,
        title: "One Conference",
        description: "Key Note on One Conference",
      },
      {
        id: 2,
        title: "Zero Conference",
        description: "Workshop Zero on One Conference",
      },
    ],
  },
  {
    id: 2,
    title: "BT02",
    description: "Santa Clara Halley on new Server/IOT/Client",
    startTrip: [2021, 6, 23, 9, 0],
    endTrip: [2021, 6, 27, 16, 56],
    meetings: [
      {
        id: 3,
        title: "One Conference",
        description: "HandsOn on One Conference",
      },
      {
        id: 4,
        title: "One Conference",
        description: "Key Note on One Conference",
      },
    ],
  },
  {
    id: 3,
    title: "BT03",
    description: "San Cose City Halley on Docker/IOT/Client",
    startTrip: [2021, 12, 13, 9, 0],
    endTrip: [2021, 12, 15, 16, 56],
    meetings: [
      {
        id: 5,
        title: "One Conference",
        description: "Key Note on One Conference",
      },
    ],
  },
];

export default function Biztrips() {
  const [wishlist, wishlistDispatch] = useReducer(
    tripsReducer,
    initialWishlist
  );

  useEffect(() => {
    getWishlistItems().then((data) => wishlistDispatch({ type: "set", data }));
  }, []);

  return (
    <div className="container">
      <header className="container h3">
        Business Trips - Wishlist functional with JAVA & REACT
        <h4>
          Version-2 (using useReducer with pure functions instead of useState
          (8))
        </h4>
      </header>
      <Wishlist wishlist={wishlist} />
      <TripList />

      <footer>@AXA 2023</footer>
    </div>
  );
}
