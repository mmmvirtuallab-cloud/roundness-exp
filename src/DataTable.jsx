import React from 'react';

const DataTable = ({ readings }) => (
  <table>
    <thead>
      <tr><th>Angle (°)</th><th>Roundness (mm)</th></tr>
    </thead>
    <tbody>
      {readings.map((r, i) => (
        <tr key={i}><td>{r.angle}</td><td>{r.value}</td></tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;