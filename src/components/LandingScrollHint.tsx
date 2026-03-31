import { useEffect, useState } from "react";

const SCROLL_HIDE_PX = 40;

/**
 * Subtle “scroll” cue on first paint; hides after the user scrolls the smooth wrapper.
 */
const LandingScrollHint = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const wrap = document.getElementById("smooth-wrapper");
    let raf = 0;

    const dismiss = () => setHidden(true);

    const check = () => {
      const wrapTop = wrap?.scrollTop ?? 0;
      const winTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      if (wrapTop > SCROLL_HIDE_PX || winTop > SCROLL_HIDE_PX) {
        dismiss();
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) dismiss();
    };

    wrap?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      wrap?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="landing-scroll-hint"
      aria-hidden="true"
    >
      <span className="landing-scroll-hint-label">Scroll</span>
      <span className="landing-scroll-hint-chevron" />
    </div>
  );
};

export default LandingScrollHint;
