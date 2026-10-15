import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

export function SpatialScene() {
  const scene = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(-18);
  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--pointer-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 10}deg`,
    );
    scene.current?.style.setProperty(
      "--pointer-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * -6}deg`,
    );
  };
  return (
    <div
      className="spatial-stage"
      onPointerMove={tilt}
      onPointerLeave={() => {
        scene.current?.style.setProperty("--pointer-x", "0deg");
        scene.current?.style.setProperty("--pointer-y", "0deg");
      }}
    >
      <div className="scene-halo" aria-hidden="true" />
      <div className="scene-perspective" aria-hidden="true">
        <div
          ref={scene}
          className="scene-world"
          style={{ "--scene-angle": `${angle}deg` } as React.CSSProperties}
        >
          <div className="scene-platform" />
          <div className="laptop">
            <div className="laptop-screen">
              <div className="screen-camera" />
              <div className="screen-ui">
                <div className="screen-top">
                  <i />
                  <i />
                  <i />
                  <span>ideas → reality</span>
                </div>
                <div className="screen-content">
                  <div className="screen-sidebar">
                    ⌘<span />
                    <span />
                    <span />
                  </div>
                  <div className="screen-editor">
                    <span className="code-muted">
                      // a little curiosity goes a long way
                    </span>
                    <p>
                      <b>const</b> developer = {"{"}
                    </p>
                    <p className="code-indent">
                      mindset: <em>"always building"</em>,
                    </p>
                    <p className="code-indent">
                      focus: [<em>"web"</em>, <em>"AI"</em>],
                    </p>
                    <p className="code-indent">
                      details: <em>"matter"</em>
                    </p>
                    <p>{"};"}</p>
                    <div className="screen-prompt">
                      <span>↳</span> make something meaningful
                      <span className="cursor-block" />
                    </div>
                  </div>
                </div>
                <div className="screen-status">
                  <span>● creative mode</span>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
            <div className="laptop-base">
              <div className="keyboard">
                {Array.from({ length: 40 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <div className="trackpad" />
            </div>
          </div>
          <div className="floating-tile tile-code">
            <span>&lt;/&gt;</span>
            <small>DEVELOP</small>
          </div>
          <div className="floating-tile tile-design">
            <span>✳</span>
            <small>CREATE</small>
          </div>
          <div className="floating-tile tile-ai">
            <span>AI</span>
            <small>EXPLORE</small>
          </div>
          <div className="scene-orb" />
          <div className="scene-ring" />
        </div>
      </div>
      <div className="scene-controls">
        <span>A small corner of my world</span>
        <div>
          <button
            aria-label="Rotate scene left"
            onClick={() => setAngle((a) => Math.max(-40, a - 10))}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            aria-label="Reset scene rotation"
            onClick={() => setAngle(-18)}
          >
            <RotateCcw size={14} />
          </button>
          <button
            aria-label="Rotate scene right"
            onClick={() => setAngle((a) => Math.min(30, a + 10))}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
