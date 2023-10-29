import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "components/Welcome/Welcome";
import MyHabits from "components/MyHabits/MyHabits";
import MyCharts from "components/MyCharts/MyCharts";
import { GoalsProvider } from "./GoalsContext";

function App() {
  return (
    <GoalsProvider>
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/habits" element={<MyHabits />} />
          <Route path="/charts" element={<MyCharts />} />
        </Routes>
      </Router>
    </GoalsProvider>
  );
}

export default App;
