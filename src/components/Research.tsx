import "./styles/Research.css";
import { LINKS } from "../config/placeholders";

const Research = () => {
  return (
    <div className="research-section section-container" id="research">
      <div className="research-container">
        <h2 className="title">
          Research <span>&</span>
          <br /> publications
        </h2>
        <div className="research-info">
          <div className="research-timeline">
            <div className="research-dot"></div>
          </div>
          <div className="research-info-box">
            <div className="research-info-in">
              <div>
                <h4>AI Trainer</h4>
                <h5>IEEE Xplore · Vol. 11 · Oct 2023</h5>
              </div>
              <h3>23</h3>
            </div>
            <p>
              Autoencoder-Based Approach for Squat Analysis and Correction:
              ergonomic assessment fused with representation learning.{" "}
              <a
                href={LINKS.ieeePublication}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                IEEE Xplore paper
              </a>
            </p>
          </div>
          <div className="research-info-box">
            <div className="research-info-in">
              <div>
                <h4>Archimedes&apos; Rocket Launch</h4>
                <h5>Int. Journal of Engineering Inventions · Oct 2017</h5>
              </div>
              <h3>17</h3>
            </div>
            <p>
              The New Age Proposal: systems thinking on propulsion narratives,
              anchored in classical intuition and modern design framing.{" "}
              <a
                href={LINKS.archimedesPaper}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Journal PDF
              </a>
            </p>
          </div>
          <div className="research-info-box">
            <div className="research-info-in">
              <div>
                <h4>Active Lab Threads</h4>
                <h5>RIT · Ergonomics &amp; human-robot collaboration</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Multi-camera RealSense calibration, depth fidelity pushes, and
              AI-assisted posture pipelines that have to survive messy rooms,
              not pristine datasets. Mapping how sensing, models, and operator
              trust co-evolve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
