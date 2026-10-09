import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";
const Scene = lazy(() => import("./Scene"));
function Diagram() {
  return (
    <svg
      className="core-fallback"
      viewBox="0 0 600 560"
      role="img"
      aria-label="Engineering Core: three interconnected modules"
    >
      <g transform="translate(300 270) rotate(-28)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${(i - 1) * 38} ${(i - 1) * 48})`}>
            <rect
              x="-130"
              y="-130"
              width="260"
              height="260"
              rx="45"
              fill="var(--panel)"
              stroke={i === 1 ? "var(--accent)" : "var(--steel)"}
              strokeWidth="26"
            />
            <rect
              x="-102"
              y="-102"
              width="204"
              height="204"
              rx="28"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            {[-1, 1].map((n) => (
              <circle key={n} cx={n * 112} cy={-112} r="5" fill="var(--ink)" />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
class CoreBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? <Diagram /> : this.props.children;
  }
}
CoreBoundary.propTypes = {
  children: PropTypes.node,
  onFailure: PropTypes.func.isRequired,
};
export default function Core() {
  const reduced = useReducedMotion();
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(false);
  const [failed, setFailed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting && !document.hidden),
    );
    observer.observe(ref.current);
    const visibility = () =>
      setVisible(
        !document.hidden && ref.current.getBoundingClientRect().bottom > 0,
      );
    document.addEventListener("visibilitychange", visibility);
    let canvas;
    let removeEligibility = () => {};
    try {
      canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      const eligible = window.matchMedia(
        "(min-width: 768px) and (pointer: fine)",
      );
      const updateEligibility = () =>
        setSupported(
          !!gl && eligible.matches && !navigator.connection?.saveData,
        );
      updateEligibility();
      eligible.addEventListener("change", updateEligibility);
      removeEligibility = () =>
        eligible.removeEventListener("change", updateEligibility);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    return () => {
      observer.disconnect();
      removeEligibility();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const live = supported && !reduced && !failed;
  return (
    <div className="core-stage" ref={ref}>
      <div className="core-crosshair" aria-hidden="true" />
      {live && visible ? (
        <CoreBoundary onFailure={() => setFailed(true)}>
          <Suspense fallback={<Diagram />}>
            <Scene
              resetCount={resetCount}
              rotation={rotation}
              onFailure={() => setFailed(true)}
            />
          </Suspense>
        </CoreBoundary>
      ) : (
        <Diagram />
      )}
      <div className="core-controls">
        {live ? (
          <>
            <button
              onClick={() => setRotation((x) => x - 0.4)}
              aria-label="Rotate core left"
            >
              ←
            </button>
            <span>DRAG TO INSPECT</span>
            <button
              onClick={() => setRotation((x) => x + 0.4)}
              aria-label="Rotate core right"
            >
              →
            </button>
            <button
              onClick={() => {
                setRotation(0);
                setResetCount((value) => value + 1);
              }}
              aria-label="Reset core rotation"
            >
              ↺
            </button>
          </>
        ) : (
          <span>ENGINEERING CORE / STATIC VIEW</span>
        )}
      </div>
    </div>
  );
}
