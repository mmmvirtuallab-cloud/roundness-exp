import React, { useState } from "react";

const Lab = () => {
  const [step, setStep] = useState("quiz");
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (selected === "roundness") {
      setResult("சரியான பதில் ✅");
      setTimeout(() => setStep("animation"), 1500);
    } else {
      setResult("தவறு ❌ மறுபடியும் முயற்சி செய்யவும்");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      {step === "quiz" && (
        <div>
          <h2>Roundness Virtual Lab - Quiz</h2>
          <p>கீழ்க்கண்டவற்றில் எது Roundness-க்கு தொடர்பானது?</p>
          <div>
            <label>
              <input
                type="radio"
                name="q1"
                value="flatness"
                onChange={(e) => setSelected(e.target.value)}
              />
              Flatness
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="q1"
                value="roundness"
                onChange={(e) => setSelected(e.target.value)}
              />
              Roundness
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="q1"
                value="straightness"
                onChange={(e) => setSelected(e.target.value)}
              />
              Straightness
            </label>
          </div>
          <button
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p>{result}</p>
        </div>
      )}

      {step === "animation" && (
        <div>
          <h2>Roundness Experiment Animation</h2>
          <div
            style={{
              margin: "20px auto",
              width: "200px",
              height: "200px",
              border: "2px solid black",
              borderRadius: "50%",
              position: "relative",
              animation: "spin 4s linear infinite",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "100px",
                background: "red",
                position: "absolute",
                top: "0",
                left: "95px",
              }}
            ></div>
          </div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
};

export default Lab;
