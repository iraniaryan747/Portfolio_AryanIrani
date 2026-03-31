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
          </div>
          <div className="landing-info">
            <h3>M.S. Engineering Management · RIT &amp;</h3>
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
