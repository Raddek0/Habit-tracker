import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "components/Welcome/Welcome";
import MyHabits from "components/MyHabits/MyHabits";
import { GoalsProvider } from "./GoalsContext"; // Import the GoalsProvider from your context file

function App() {
  return (
    <GoalsProvider>
      {" "}
      {/* Wrap your entire app with the GoalsProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/habits" element={<MyHabits />} />
        </Routes>
      </Router>
    </GoalsProvider>
  );
}

export default App;
