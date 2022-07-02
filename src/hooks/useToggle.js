import { useState } from "react";

function useToggle(defaultState) {
  const [state, setState] = useState(defaultState);
  const toggleState = () => {
    setState(!state);
  };
  return [state, toggleState];
}

export default useToggle;
