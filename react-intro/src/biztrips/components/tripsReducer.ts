import { Reducer } from "react";
import { Trip } from "./tripsService";

export type TripAction =
  | { type: "set"; data: Trip[] }
  | { type: "add"; data: Trip }
  | { type: "deleteItem"; id: number };

const tripsReducer: Reducer<Trip[], TripAction> = (
  wishlist,
  action
): Trip[] => {
  console.log(action);

  switch (action.type) {
    case "set":
      return action.data;
    case "add":
      if (!wishlist.some((trip) => trip.id === action.data.id)) {
        return [...wishlist, action.data];
      } else {
        return wishlist;
      }
    case "deleteItem": {
      return wishlist.filter((trip) => trip.id !== action.id);
    }
    default: {
      const unreachable = (_: never): never => _;
      return unreachable(action);
    }
  }
};

export default tripsReducer;
