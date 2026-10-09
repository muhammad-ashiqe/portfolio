
const Atmospherics = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] h-full w-full overflow-hidden">
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ opacity: "var(--noise-opacity)" }}
      >
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

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, transparent 0%, transparent 48%, var(--color-overlay-soft) 100%)",
        }}
      />
    </div>
  );
};

export default Atmospherics;
