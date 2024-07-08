import { useState, createContext } from "react";


export const GlobalStateContext = createContext();
export default function GlobalStateProvider ({ children }) {
    
    const [state, setState] = useState({
      // initial state
      walletAddress: "",
      theme: 'light',
      // other state variables
    });
  
    return (
      <GlobalStateContext.Provider value={{state, setState}}>
        {children}
      </GlobalStateContext.Provider>
    );
};