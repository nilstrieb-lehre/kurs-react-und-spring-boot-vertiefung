import Wishlist from "./Wishlist";
import TripList from "./TripList";
import { WishlistProvider } from "./wishlistContext";

export default function Biztrips() {
  return (
    <div className="container">
      <WishlistProvider>
        <header className="container h3">
          Business Trips - Wishlist functional with JAVA & REACT
          <h4>
            Version-2 (using useReducer with pure functions instead of useState
            (8))
          </h4>
        </header>
        <Wishlist />
        <TripList />

        <footer>@AXA 2023</footer>
      </WishlistProvider>
    </div>
  );
}
