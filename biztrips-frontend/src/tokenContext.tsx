import React, { useContext, useMemo } from "react";
import { useLocalState } from "./useLocalState";

type TokenData = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const TokenContext = React.createContext<TokenData>({
  token: "",
  setToken: () => {
    return;
  },
});

export const WishlistProvider: React.FC<{ children: JSX.Element[] }> = ({
  children,
}) => {
  const [token, setToken] = useLocalState<string | null>(
    null,
    "biztrips-token"
  );

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token, setToken]
  );

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist(): TokenData {
  return useContext(TokenContext);
}
