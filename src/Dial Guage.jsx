import React from 'react';

const DialGauge = ({ deflection }) => {
  const needleAngle = deflection * 100; // scale to degrees

  return (
    <div className="dial-gauge">
      <div className="gauge-face">
        <div className="needle" style={{ transform: `rotate(${needleAngle}deg)` }} />
      </div>
      <p>Deflection: {deflection} mm</p>
    </div>
  );
};

export default DialGauge;