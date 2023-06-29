import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { Trip, getWishlistItems } from "./components/tripsService";
import tripsReducer, { TripAction } from "./components/tripsReducer";

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

type WishlistData = {
  wishlist: Trip[];
  wishlistDispatch: (action: TripAction) => void;
};

const WishlistContext = React.createContext<WishlistData>({
  wishlist: [],
  wishlistDispatch: () => {
    return;
  },
});

export const WishlistProvider: React.FC<{ children: JSX.Element[] }> = ({
  children,
}) => {
  const [wishlist, wishlistDispatch] = useReducer(
    tripsReducer,
    initialWishlist
  );

  useEffect(() => {
    getWishlistItems().then((data) => wishlistDispatch({ type: "set", data }));
  }, []);

  useEffect(
    () => localStorage.setItem("biztrips-wishlist", JSON.stringify(wishlist)),
    [wishlist]
  );

  const contextValue = useMemo(
    () => ({
      wishlist,
      wishlistDispatch,
    }),
    [wishlist, wishlistDispatch]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist(): WishlistData {
  return useContext(WishlistContext);
}
