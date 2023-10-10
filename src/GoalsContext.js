import React, { createContext, useContext, useState } from "react";

const GoalsContext = createContext();

export const useGoalsContext = () => {
  return useContext(GoalsContext);
};

export const GoalsProvider = ({ children }) => {
  const [AllGoals, setAllGoals] = useState([]);

  return (
    <GoalsContext.Provider value={{ AllGoals, setAllGoals }}>
      {children}
    </GoalsContext.Provider>
  );
};
