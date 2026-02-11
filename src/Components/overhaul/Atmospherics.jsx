import React from "react";

const Atmospherics = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden">
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      
      {/* Scanline / Vignette effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none"
        style={{ backgroundSize: "100% 4px" }}
      />
    </div>
  );
};

export default Atmospherics;
