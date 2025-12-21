import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./RoundnessVirtualLab.module.css";

export default function RoundnessVirtualLab() {
  const [angle, setAngle] = useState(0);
  const [tableData, setTableData] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      angle: (i + 1) * 30,
      deviation: null,
    }))
  );
  const [showGraph, setShowGraph] = useState(false);
  const canvasRef = useRef(null);

  const amplitude = 20;
  const minDeviation = -5;

  const vBlockY = 220;
  const vBlockCX = 120;
  const ballR = 38;
  const ballCX = vBlockCX;
  const ballCY = vBlockY - 10;
  const dialX = vBlockCX;
  const dialY = ballCY - ballR - 60;

  const degToRad = (d) => (d * Math.PI) / 180;

  const deviationAtDeg = (d) => {
    const rad = degToRad(d);
    let val = amplitude * (0.6 * Math.sin(2 * rad) + 0.4 * Math.sin(5 * rad));
    if (val < minDeviation) val = minDeviation;
    return Number(val.toFixed(2));
  };

  const needleAngle = (val) => {
    const maxDeg = 50;
    const clamped = Math.max(minDeviation, Math.min(amplitude, val));
    return (clamped / amplitude) * maxDeg;
  };

  const handleStart = () => {
    setTableData((prevTable) => {
      const nextAngle = angle + 30;

      if (nextAngle > 360) {
        setShowGraph(true);
        return prevTable;
      }

      const updatedTable = prevTable.map((row) =>
        row.angle === nextAngle
          ? { ...row, deviation: deviationAtDeg(row.angle) }
          : row
      );

      setAngle(nextAngle);
      if (nextAngle >= 360) {
        setShowGraph(true);
      }
      return updatedTable;
    });
  };

  const handleReset = () => {
    setAngle(0);
    setShowGraph(false);
    setTableData((prev) => prev.map((row) => ({ ...row, deviation: null })));
  };

  const currentVal = deviationAtDeg(angle);
  const needleDeg = needleAngle(currentVal);

  useEffect(() => {
    if (showGraph && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = 90; // Slightly reduced radius to fit smaller canvas

      ctx.clearRect(0, 0, w, h);

      // Circular grid
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = 1;
      for (let r = 20; r <= R; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Axes
      ctx.beginPath();
      ctx.moveTo(cx - R - 10, cy);
      ctx.lineTo(cx + R + 10, cy);
      ctx.moveTo(cx, cy - R - 10);
      ctx.lineTo(cx, cy + R + 10);
      ctx.stroke();

      // Roundness error pattern
      ctx.beginPath();
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 2;

      for (let theta = 0; theta <= 360; theta++) {
        const rad = (theta * Math.PI) / 180;
        let val =
          amplitude * (0.6 * Math.sin(2 * rad) + 0.4 * Math.sin(5 * rad));
        if (val < minDeviation) val = minDeviation;
        const r = R + val;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }, [showGraph, minDeviation]);

  return (
    <div className={styles["lab-container"]}>
      {/* 1. Header Section */}
      <header className={styles["lab-header"]}>
        <h1 className={styles["header-title"]}>Roundness Virtual Lab</h1>
        <Link to="/" onClick={handleReset} className={styles["back-btn"]}>
          ← Back
        </Link>
      </header>

      {/* 2. Main Content Grid */}
      <main className={styles["main-content"]}>
        {/* Left Side - Simulation */}
        <section className={styles["simulation-section"]}>
          <div className={styles["svg-container"]}>
            <svg
              viewBox="0 0 240 340"
              height="100%"
              width="auto"
              style={{ maxHeight: "400px" }}
            >
              {/* V-block */}
              <image
                href="https://assets.pinshape.com/uploads/image/file/33936/container_V-Block_display_large.jpg"
                x={vBlockCX - 95}
                y={vBlockY - 50}
                width={200}
                height={160}
              />

              {/* Workpiece */}
              <g
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: `${ballCX}px ${ballCY}px`,
                  transition: "transform 0.5s ease",
                }}
              >
                <circle
                  cx={ballCX}
                  cy={ballCY}
                  r={ballR}
                  fill="url(#metalShade)"
                />
                <ellipse
                  cx={ballCX - ballR * 0.3}
                  cy={ballCY - ballR * 0.3}
                  rx={ballR * 0.25}
                  ry={ballR * 0.18}
                  fill="white"
                  opacity="0.3"
                />
                <path
                  d={`M ${ballCX - ballR} ${ballCY} A ${ballR} ${ballR} 0 0 0 ${
                    ballCX + ballR
                  } ${ballCY}`}
                  stroke="#333"
                  strokeWidth="1.5"
                  opacity="0.5"
                  strokeDasharray="6 4"
                  fill="none"
                />
              </g>

              {/* Dial gauge */}
              <g>
                <circle
                  cx={dialX}
                  cy={dialY}
                  r={42}
                  fill="url(#bezel)"
                  stroke="#aaa"
                  strokeWidth={3}
                />
                <circle
                  cx={dialX}
                  cy={dialY}
                  r={38}
                  fill="#f8fafd"
                  stroke="#bbb"
                  strokeWidth={2}
                />
                {Array.from({ length: 100 }).map((_, i) => {
                  const ang = i * 3.6 - 90;
                  const rad = (ang * Math.PI) / 180;
                  const len = i % 10 === 0 ? 12 : i % 5 === 0 ? 8 : 4;
                  const sw = i % 10 === 0 ? 2.2 : i % 5 === 0 ? 1.2 : 0.7;
                  const x1 = dialX + (38 - len) * Math.cos(rad);
                  const y1 = dialY + (38 - len) * Math.sin(rad);
                  const x2 = dialX + 36 * Math.cos(rad);
                  const y2 = dialY + 36 * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#222"
                      strokeWidth={sw}
                    />
                  );
                })}
                {Array.from({ length: 10 }).map((_, i) => {
                  const val = i * 10 === 0 ? 100 : i * 10;
                  const ang = i * 36 - 90;
                  const rad = (ang * Math.PI) / 180;
                  const r = 25;
                  const x = dialX + r * Math.cos(rad);
                  const y = dialY + r * Math.sin(rad) + 5;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="bold"
                      fill="#222"
                    >
                      {val}
                    </text>
                  );
                })}
                <line
                  x1={dialX}
                  y1={dialY}
                  x2={dialX + 32 * Math.cos(((needleDeg - 90) * Math.PI) / 180)}
                  y2={dialY + 32 * Math.sin(((needleDeg - 90) * Math.PI) / 180)}
                  stroke="#d00"
                  strokeWidth={3.5}
                  style={{ transition: "all 0.3s ease-out" }}
                />
                <circle
                  cx={dialX}
                  cy={dialY}
                  r={5.5}
                  fill="#bbb"
                  stroke="#888"
                  strokeWidth={1.2}
                />
                <circle cx={dialX} cy={dialY} r={2.5} fill="#222" />
                <defs>
                  <radialGradient id="metalShade" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#b0c4de" />
                    <stop offset="70%" stopColor="#5b7fa3" />
                    <stop offset="100%" stopColor="#2c3e50" />
                  </radialGradient>
                  <radialGradient id="bezel" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e0e0e0" />
                    <stop offset="80%" stopColor="#b0bec5" />
                    <stop offset="100%" stopColor="#90a4ae" />
                  </radialGradient>
                </defs>
              </g>

              {/* Probe rod & tip */}
              <rect
                x={dialX - 2}
                y={dialY + 38}
                width={4}
                height={ballCY - ballR - (dialY + 38) + currentVal * 0.7}
                fill="#222"
              />
              <circle
                cx={dialX}
                cy={ballCY - ballR + currentVal * 0.7}
                r={5}
                fill="#222"
              />
            </svg>
          </div>

          <div className={styles["controls"]}>
            <button
              className={`${styles["btn"]} ${styles["btn-primary"]}`}
              onClick={handleStart}
              disabled={angle >= 360}
            >
              {angle >= 360 ? "Done" : "Start"}
            </button>
            <button
              className={`${styles["btn"]} ${styles["btn-secondary"]}`}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </section>

        {/* Right Side - Table + Polar Graph */}
        <section className={styles["data-section"]}>
          <h3 className={styles["section-title"]}>Results</h3>

          <div className={styles["data-grid"]}>
            {/* Table Wrapper (Scrollable) */}
            <div className={styles["table-wrapper"]}>
              <table className={styles["data-table"]}>
                <thead>
                  <tr>
                    <th>Angle (°)</th>
                    <th>Deviation (µm)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.angle}</td>
                      <td>{row.deviation !== null ? row.deviation : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Polar Graph Canvas */}
            {showGraph && (
              <div className={styles["graph-container"]}>
                <h4 className={styles["graph-title"]}>Polar Plot</h4>
                <canvas
                  ref={canvasRef}
                  width={220}
                  height={220}
                  className={styles["graph-canvas"]}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
