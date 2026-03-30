import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { LINKS } from "../config/placeholders";
import { useResumeModal } from "./ResumeModal";

const Contact = () => {
  const { openResume } = useResumeModal();
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Direct</h4>
            <p>
              <a
                href={LINKS.email}
                data-cursor="disable"
              >
                ai3926@rit.edu
              </a>
            </p>
            <p>Rochester, New York, United States</p>
            <p>+1 585 286 7073</p>
            <h4>Education</h4>
            <p>
              M.S. Engineering Management, Rochester Institute of Technology,
              Aug 2025 – Aug 2027
            </p>
            <p>
              B.Tech Mechatronics Engineering, Manipal Institute of
              Technology, Jul 2019 – Jul 2023
            </p>
            <h4>Certifications</h4>
            <p>
              LLMs with Google Cloud &amp; Python (Udemy) · International Wealth
              Management (Moody&apos;s) · Linear Algebra for ML &amp; Data
              Science (DeepLearning.AI) · Mutual Fund Distributors (NISM) ·
              Project Management &amp; Data Analytics (Google) · Data Science
              (IBM)
            </p>
            <h4>Leadership &amp; lane</h4>
            <p>
              Graduate Student Government collaborator, Accessibility
              Committee (RIT) · Core committee head, Art, Revels (MIT Manipal)
              · Management head, IE Mechatronics Students&apos; Chapter (MIT
              Manipal).
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href={LINKS.email}
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href={LINKS.resumePdf}
              data-cursor="disable"
              className="contact-social"
              onClick={(e) => {
                e.preventDefault();
                openResume();
              }}
            >
              Résumé <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Built for momentum, <br /> <span>Aryan Irani</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
            <p className="contact-tagline">
              Product · strategy · consulting · ops · innovation ·
              leadership tracks. Cricket-hardened execution, house-music
              energy, research-grade curiosity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
