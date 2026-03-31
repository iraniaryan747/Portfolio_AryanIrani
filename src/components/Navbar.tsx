import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

/** Section `id`s in scroll order (must match `data-href` without #). */
const NAV_SECTIONS = [
  { id: "about", href: "#about" },
  { id: "what-i-build", href: "#what-i-build" },
  { id: "experience", href: "#experience" },
  { id: "work", href: "#work" },
  { id: "research", href: "#research" },
  { id: "skills", href: "#skills" },
  { id: "contact", href: "#contact" },
] as const;

const Navbar = () => {
  const [activeHref, setActiveHref] = useState<string>("");

  const updateActiveNav = useCallback(() => {
    // ScrollSmoother scrolls `window` and keeps `#smooth-wrapper` scrollTop at 0.
    const scrollY =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollY < 72) {
      setActiveHref("");
      return;
    }
    const marker = window.innerHeight * 0.4;
    let current = "";
    for (const { id, href } of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= marker) {
        current = href;
      }
    }
    setActiveHref(current);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveNav);
    };

    updateActiveNav();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    ScrollTrigger.addEventListener("refresh", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ScrollTrigger.removeEventListener("refresh", onScroll);
    };
  }, [updateActiveNav]);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header header-aryan">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AI
        </a>
        <ul>
          <li className={activeHref === "#about" ? "nav-item-active" : ""}>
            <a
              data-href="#about"
              href="#about"
              aria-current={activeHref === "#about" ? "location" : undefined}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li
            className={activeHref === "#what-i-build" ? "nav-item-active" : ""}
          >
            <a
              data-href="#what-i-build"
              href="#what-i-build"
              aria-current={
                activeHref === "#what-i-build" ? "location" : undefined
              }
            >
              <HoverLinks text="WHAT I BUILD" />
            </a>
          </li>
          <li className={activeHref === "#experience" ? "nav-item-active" : ""}>
            <a
              data-href="#experience"
              href="#experience"
              aria-current={activeHref === "#experience" ? "location" : undefined}
            >
              <HoverLinks text="PATH" />
            </a>
          </li>
          <li className={activeHref === "#work" ? "nav-item-active" : ""}>
            <a
              data-href="#work"
              href="#work"
              aria-current={activeHref === "#work" ? "location" : undefined}
            >
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li className={activeHref === "#research" ? "nav-item-active" : ""}>
            <a
              data-href="#research"
              href="#research"
              aria-current={activeHref === "#research" ? "location" : undefined}
            >
              <HoverLinks text="RESEARCH" />
            </a>
          </li>
          <li className={activeHref === "#skills" ? "nav-item-active" : ""}>
            <a
              data-href="#skills"
              href="#skills"
              aria-current={activeHref === "#skills" ? "location" : undefined}
            >
              <HoverLinks text="STACK" />
            </a>
          </li>
          <li className={activeHref === "#contact" ? "nav-item-active" : ""}>
            <a
              data-href="#contact"
              href="#contact"
              aria-current={activeHref === "#contact" ? "location" : undefined}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
