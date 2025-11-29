import React, { useState } from "react";
import Intro from "./intro";
import RoundnessVirtualLab from "./RoundnessVirtualLab";

export default function App() {
  const [showExperiment, setShowExperiment] = useState(false);

  return (
    <div>
      {showExperiment ? (
        <RoundnessVirtualLab />
      ) : (
        <Intro onStart={() => setShowExperiment(true)} />
      )}
    </div>
  );
}
