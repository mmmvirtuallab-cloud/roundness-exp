import React, { useState } from "react";

export default function Intro({ onStart }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the main purpose of using a V-block in this experiment?",
      options: [
        "To rotate the workpiece automatically",
        "To support and hold the cylindrical workpiece securely",
        "To measure the workpiece diameter",
        "To record deviations digitally",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "Which instrument measures the deviation in the roundness of a workpiece?",
      options: ["Micrometer", "Vernier Caliper", "Dial Gauge", "Protractor"],
      correct: 2,
    },
    {
      id: 3,
      question: "Roundness indicates how close the surface is to:",
      options: ["A perfect circle", "A square", "A triangle", "A rectangle"],
      correct: 0,
    },
    {
      id: 4,
      question: "Which parameter is typically recorded when measuring roundness?",
      options: ["Diameter only", "Deviation from ideal circle", "Surface roughness only", "Weight of workpiece"],
      correct: 1,
    },
    {
      id: 5,
      question: "Why is roundness measurement important in machining?",
      options: [
        "To check visual appeal only",
        "To ensure proper fit and function in assemblies",
        "To measure weight of components",
        "To calculate material density",
      ],
      correct: 1,
    },
  ];

  const handleOptionChange = (qId, optionIndex) => {
    setQuizAnswers((prev) => {
      const updated = { ...prev, [qId]: optionIndex };
      const anyWrongLeft = questions.some((q) => updated[q.id] !== q.correct);
      setReadyToSubmit(!anyWrongLeft);
      return updated;
    });
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const anyWrongLeft = questions.some((q) => quizAnswers[q.id] !== q.correct);
    setReadyToSubmit(!anyWrongLeft);
  };

  const allCorrect = questions.every((q) => quizAnswers[q.id] === q.correct);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        padding: 20,
        backgroundImage: `url("https://www.mitindia.edu/src/assets/mit-front.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#111827",
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.85)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 850, margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "#1e3a8a", marginBottom: 20 }}>
          Roundness Measurement Virtual Lab
        </h1>

        <div style={{ fontSize: 16, lineHeight: 1.7 }}>
          <p>
            In this experiment, we focus on the concept of <strong>roundness</strong>, which is a
            critical geometric property of cylindrical components. Roundness defines how closely a
            measured surface matches a <strong>perfect circle</strong>. In precision engineering,
            even small deviations can cause vibration, wear, leakage, or improper assembly of
            components.
          </p>

          <p>
            <strong>Historical background:</strong> The need for accurate roundness measurement
            became important with the development of high-precision industries such as aerospace,
            automotive, and machine tools. Engineers realized that simply checking diameter or
            surface finish was not enough to ensure the proper functioning of rotating components.
          </p>

          <p>
            <strong>Principle of experiment:</strong> The workpiece is supported on a{" "}
            <strong>V-block</strong>, which holds the cylindrical part securely while allowing free
            rotation. As the workpiece rotates, a <strong>dial gauge</strong> is positioned in
            contact with the surface. The dial gauge detects minute deviations in radial distance
            from the ideal circle and records them as variations.
          </p>

          <p>
            <strong>Why it matters:</strong> Roundness errors can cause imbalance in shafts,
            misalignment in bearings, leakage in sealing parts, and loss of efficiency in rotating
            machines. Therefore, industries like <em>automotive engines, turbines, pumps,
            compressors, and hydraulic systems</em> rely heavily on roundness checks during quality
            control.
          </p>

          <p>
            <strong>Applications:</strong> Common applications of roundness measurement include:
            <ul>
              <li>Checking crankshafts and camshafts in engines</li>
              <li>Evaluating rolling elements in ball/roller bearings</li>
              <li>Testing precision gauges and reference standards</li>
              <li>Ensuring accuracy in aerospace shafts and landing gear parts</li>
            </ul>
          </p>

          <p>
            <strong>Learning outcome:</strong> By completing this experiment, you will understand:
            <ol>
              <li>The principle of V-block and dial gauge setup</li>
              <li>How to detect roundness deviation</li>
              <li>Importance of precision in quality control</li>
              <li>Industrial relevance of geometric accuracy</li>
            </ol>
          </p>

          <p style={{ fontWeight: "bold", marginTop: 15 }}>
            Before proceeding to the simulation, attempt the following quiz to test your
            understanding of roundness measurement!
          </p>
        </div>

        {/* Quiz Section */}
        <div
          style={{
            margin: "25px 0",
            padding: 20,
            background: "#ffffff",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        >
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: 18 }}>
              <p style={{ fontWeight: "600" }}>{q.id}. {q.question}</p>
              {q.options.map((opt, idx) => {
                let bgColor = "#fff";
                if (quizSubmitted && quizAnswers[q.id] === idx) {
                  bgColor = quizAnswers[q.id] === q.correct ? "#d1fae5" : "#fee2e2";
                }
                const disabled = quizSubmitted && quizAnswers[q.id] === q.correct;
                return (
                  <label
                    key={idx}
                    style={{
                      display: "block",
                      margin: "5px 0",
                      padding: "4px 8px",
                      borderRadius: 6,
                      cursor: disabled ? "default" : "pointer",
                      backgroundColor: bgColor,
                    }}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={idx}
                      checked={quizAnswers[q.id] === idx}
                      onChange={() => handleOptionChange(q.id, idx)}
                      disabled={disabled}
                      style={{ marginRight: 8 }}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          ))}

          {!quizSubmitted || readyToSubmit ? (
            <button
              onClick={handleQuizSubmit}
              style={{
                marginTop: 10,
                padding: "10px 20px",
                fontSize: 16,
                backgroundColor: "#1e3a8a",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
              }}
            >
              {quizSubmitted ? "Submit Corrected Answers" : "Submit Quiz"}
            </button>
          ) : null}

          {quizSubmitted && (
            <div style={{ marginTop: 15 }}>
              {questions.map((q) => (
                <p key={q.id} style={{ margin: 4, fontWeight: 500 }}>
                  Q{q.id}:{" "}
                  {quizAnswers[q.id] === q.correct ? (
                    <span style={{ color: "#16a34a" }}>✅ Correct</span>
                  ) : (
                    <span style={{ color: "#dc2626" }}>❌ Incorrect</span>
                  )}
                </p>
              ))}

              {allCorrect && (
                <button
                  onClick={onStart}
                  style={{
                    marginTop: 20,
                    padding: "12px 24px",
                    fontSize: 16,
                    backgroundColor: "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  Start Experiment
                </button>
              )}

              {!allCorrect && quizSubmitted && (
                <p style={{ marginTop: 20, color: "#dc2626", fontWeight: "bold" }}>
                  ❌ Please correct the wrong answers to enable Submit button.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
