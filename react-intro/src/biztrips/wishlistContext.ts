import React from "react";
import { Trip } from "./components/tripsService";
import { TripAction } from "./components/tripsReducer";

export const WishlistContext = React.createContext<{
  wishlist: Trip[];
  wishlistDispatch: (action: TripAction) => void;
}>({
  wishlist: [],
  wishlistDispatch: () => {
    return;
  },
});
