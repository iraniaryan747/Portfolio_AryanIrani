import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          Trajectory <span>&</span>
          <br /> execution
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graduate Research Assistant</h4>
                <h5>
                  Occupational Ergonomics &amp; Biomechanics Lab · RIT
                </h5>
              </div>
              <h3>NOW</h3>
            </div>
            <div className="career-copy">
              <p>
                Calibrated and aligned a multi-camera Intel RealSense D435 rig;
                lifted 3D depth fidelity roughly 40% via Charuco calibration,
                OpenCV tuning, and tight multi-sensor sync.
              </p>
              <p>
                Partnered on AI-led ergonomic assessments; helped push
                posture-classification quality up about 25% through dataset
                curation and disciplined validation support.
              </p>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Manager · MIS &amp; Analytics</h4>
                <h5>HDFC Asset Management Company · MD&apos;s Office</h5>
              </div>
              <h3>2023–25</h3>
            </div>
            <div className="career-copy">
              <p>
                Intern to full-time (Apr 2024) inside the MD &amp; CEO office.
              </p>
              <p>
                Led an intranet redesign spanning eight departments, with
                employee engagement and knowledge access up 35%.
              </p>
              <p>
                Designed and launched FundIQ, an AI assistant wired into intranet
                + CRM, cutting internal query resolution time roughly 60%.
              </p>
              <p>
                Built a Power BI knowledge operating system; executive reporting
                cadence improved about 50%.
              </p>
              <p>
                Delivered 25+ board-ready decks and data narratives across
                strategy, marketing, and ops; aligned 10+ teams around KPIs that
                actually tracked strategy, not theater.
              </p>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>R&amp;D Intern</h4>
                <h5>ACG Inspection Pvt. Ltd.</h5>
              </div>
              <h3>2021</h3>
            </div>
            <div className="career-copy">
              <p>
                Designed and documented an HMI module for a production
                inspection system; operator input time down 20%.
              </p>
              <p>
                Integrated and calibrated a servo motion stack; raised motion
                precision by about 15%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
