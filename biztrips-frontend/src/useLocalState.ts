import { useState } from "react";

export function useLocalState<T>(
  init: T,
  key: string
): [T, (value: T) => void] {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key);
    if (item === null) {
      localStorage.setItem(key, JSON.stringify(init));
      return init;
    } else {
      return JSON.parse(item);
    }
  });

  const setStorage = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, setStorage];
}