import { Reducer } from "react";
import { Trip } from "./tripsService";

type Action =
  | { type: "empty" }
  | { type: "set"; data: Trip[] }
  | { type: "add" }
  | { type: "deleteItem" };

const tripsReducer: Reducer<Trip[], Action> = (wishlist, action): Trip[] => {
  switch (action.type) {
    case "empty":
      return [];
    case "set":
      return action.data;
    case "add":
      // deconstruing props
      return [];
    case "deleteItem": {
      // deconstructing action

      return [];
    }
    default: {
      const unreachable = (_: never): never => _;
      return unreachable(action);
    }
  }
};

export default tripsReducer;
