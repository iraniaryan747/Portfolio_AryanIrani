import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { LINKS } from "../config/placeholders";

type Project = {
  title: string;
  category: string;
  tools: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: "AI Trainer",
    category: "Autoencoder-Based Squat Analysis · IEEE Xplore",
    tools:
      "Deep learning, pose estimation, ergonomic QA, publication-grade validation",
    link: LINKS.projectAiTrainer || undefined,
  },
  {
    title: "FundIQ",
    category: "Executive-grade AI assistant on intranet + CRM",
    tools:
      "NLP orchestration, knowledge retrieval, workflow automation, adoption design",
    link: LINKS.projectFundiq || undefined,
  },
  {
    title: "Knowledge Management System",
    category: "Power BI spine inside the MD office",
    tools:
      "Semantic data model, governed metrics, exec-ready visual narratives",
    link: LINKS.projectKms || undefined,
  },
  {
    title: "Enterprise Intranet Redesign",
    category: "Eight departments · single source of truth",
    tools:
      "Information architecture, engagement analytics, cross-functional program leadership",
    link: LINKS.projectIntranet || undefined,
  },
  {
    title: "RealSense Calibration Stack",
    category: "Multi-camera depth fidelity for ergonomic capture",
    tools:
      "Charuco calibration, OpenCV tuning, multi-sensor synchronization",
    link: LINKS.projectRealSense || undefined,
  },
];

const slideCount = Math.ceil(projects.length / 2);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const numLabel = String(index + 1).padStart(2, "0");
  return (
    <article className="carousel-card">
      <div className="carousel-info">
        <div className="carousel-number">
          <h3>{numLabel}</h3>
        </div>
        <div className="carousel-details">
          <h4>{project.title}</h4>
          <p className="carousel-category">{project.category}</p>
          <div className="carousel-tools">
            <span className="tools-label">Scope &amp; craft</span>
            <p>{project.tools}</p>
          </div>
          {project.link && (
            <a
              className="carousel-external"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
            >
              Open link <MdArrowOutward />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? slideCount - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === slideCount - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous slide"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next slide"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: slideCount }, (_, slideIdx) => {
                const leftIdx = slideIdx * 2;
                const rightIdx = leftIdx + 1;
                const left = projects[leftIdx];
                const right = projects[rightIdx];
                return (
                  <div className="carousel-slide" key={slideIdx}>
                    {right ? (
                      <div className="carousel-dual">
                        <ProjectCard project={left} index={leftIdx} />
                        <ProjectCard project={right} index={rightIdx} />
                      </div>
                    ) : (
                      <div className="carousel-dual carousel-dual--single">
                        <ProjectCard project={left} index={leftIdx} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="carousel-dots">
            {Array.from({ length: slideCount }, (_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
