import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import LandingHeadlineRotator from "./LandingHeadlineRotator";
import LandingScrollHint from "./LandingScrollHint";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I&apos;m</h2>
            <h1>
              ARYAN <span>IRANI</span>
            </h1>
            <p className="landing-intro-subline">
              i build systems across ai, data, and human-robot collaboration
            </p>
          </div>
          <div className="landing-info">
            <h3>
              <span className="landing-degree">M.S. Engineering Management</span>
              <span className="landing-school">
                Rochester Institute of Technology
              </span>
            </h3>
            <LandingHeadlineRotator />
          </div>
        </div>
        <LandingScrollHint />
        {children}
      </div>
    </>
  );
};

export default Landing;
