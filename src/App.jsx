import React from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Intro from "./intro";
import RoundnessVirtualLab from "./RoundnessVirtualLab";

function NavigationWrapper() {
  const navigate = useNavigate();

  // Functionality to trigger navigation after quiz completion
  const handleStart = () => {
    navigate("/experiment");
  };

  return (
    <Routes>
      {/* Base path uses HashRouter, so paths will look like /#/ and /#/experiment */}
      <Route path="/" element={<Intro onStart={handleStart} />} />
      <Route path="/experiment" element={<RoundnessVirtualLab />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <NavigationWrapper />
    </HashRouter>
  );
}
