export default function tripsReducer(wishlist: any, action: any) {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      // deconstruing props
      return null;
    case "deleteItem": {
      // deconstructing action

      return null;
    }
    default:
      throw new Error("Unhandled action: " + action.type);
  }
}
