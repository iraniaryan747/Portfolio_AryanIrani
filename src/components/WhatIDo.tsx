import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO" id="what-i-build">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> BUILD</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>INTELLIGENCE &amp; EXECUTION</h3>
              <h4>From executive intent to operational systems</h4>
              <p>
                I build dashboards, AI tools, and knowledge systems that convert
                strategy into KPIs, reporting pipelines, and decision support
                that actually gets used.
              </p>
              <h5>Capability stack</h5>
              <div className="what-content-flex">
                <div className="what-tags">Power BI</div>
                <div className="what-tags">SQL &amp; ETL</div>
                <div className="what-tags">KPI &amp; reporting design</div>
                <div className="what-tags">AI assistants</div>
                <div className="what-tags">Knowledge systems</div>
                <div className="what-tags">Exec office cadence</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>VISION &amp; HUMAN FACTORS</h3>
              <h4>Human-robot collaboration and AI-driven ergonomics</h4>
              <p>
                I design sensing and analysis pipelines using RealSense, OpenCV,
                and motion-based modeling to study posture, interaction, and
                human intent in real-world environments.
              </p>
              <h5>Capability stack</h5>
              <div className="what-content-flex">
                <div className="what-tags">Intel RealSense</div>
                <div className="what-tags">OpenCV</div>
                <div className="what-tags">Multi-camera calibration</div>
                <div className="what-tags">Posture &amp; motion modeling</div>
                <div className="what-tags">Human–robot collaboration</div>
                <div className="what-tags">Lab-scale validation</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>SYSTEMS &amp; PRODUCT THINKING</h3>
              <h4>Connecting data, models, and execution</h4>
              <p>
                I think across systems, linking business goals, technical
                architecture, and real-world constraints to build solutions
                that hold up outside ideal conditions.
              </p>
              <h5>Capability stack</h5>
              <div className="what-content-flex">
                <div className="what-tags">End-to-end scoping</div>
                <div className="what-tags">Architecture tradeoffs</div>
                <div className="what-tags">Data–model linkage</div>
                <div className="what-tags">Constraint mapping</div>
                <div className="what-tags">Operator feedback loops</div>
                <div className="what-tags">Field-ready delivery</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
