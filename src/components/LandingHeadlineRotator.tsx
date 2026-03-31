import { useEffect, useRef } from "react";
import gsap from "gsap";

const HEADLINE_PAIRS = [
  ["AI SYSTEMS", "REAL-WORLD EXECUTION"],
  ["DATA SYSTEMS", "FROM DATA TO DECISION"],
  ["HUMANS <> ROBOTS", "SYSTEMS THINKING"],
  ["COMPUTER VISION", "BUILD > THEORY"],
  ["INTELLIGENT SYSTEMS", "OPERATOR MINDSET"],
  ["DECISION SYSTEMS", "END-TO-END OWNERSHIP"],
] as const;

function animateWordSwap(
  el: HTMLElement,
  nextText: string,
  alive: () => boolean
) {
  gsap.to(el, {
    y: -28,
    opacity: 0,
    duration: 0.42,
    ease: "power2.in",
    onComplete: () => {
      if (!alive()) return;
      el.textContent = nextText;
      gsap.fromTo(
        el,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.52,
          ease: "power2.out",
        }
      );
    },
  });
}

const LOOP_START_MS = 5600;
const ROTATE_EVERY_MS = 4600;
const SECOND_LINE_OFFSET_MS = 900;

const LandingHeadlineRotator = () => {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const pairIndex = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const alive = () => mountedRef.current;
    const interval = { current: undefined as number | undefined };
    const line2SwapTimeout = { current: undefined as number | undefined };

    const startTimer = window.setTimeout(() => {
      interval.current = window.setInterval(() => {
        pairIndex.current = (pairIndex.current + 1) % HEADLINE_PAIRS.length;
        const [next1, next2] = HEADLINE_PAIRS[pairIndex.current];
        const el1 = line1Ref.current;
        const el2 = line2Ref.current;

        if (el1) animateWordSwap(el1, next1, alive);
        line2SwapTimeout.current = window.setTimeout(() => {
          if (el2) animateWordSwap(el2, next2, alive);
        }, SECOND_LINE_OFFSET_MS);
      }, ROTATE_EVERY_MS);
    }, LOOP_START_MS);

    return () => {
      mountedRef.current = false;
      window.clearTimeout(startTimer);
      if (line2SwapTimeout.current !== undefined) {
        window.clearTimeout(line2SwapTimeout.current);
      }
      if (interval.current !== undefined) window.clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="landing-rotator" aria-live="polite">
      <h2 className="landing-rotator-line landing-rotator-line--accent">
        <span ref={line1Ref} className="landing-rotator-inner">
          {HEADLINE_PAIRS[0][0]}
        </span>
      </h2>
      <h2 className="landing-rotator-line landing-rotator-line--light">
        <span ref={line2Ref} className="landing-rotator-inner">
          {HEADLINE_PAIRS[0][1]}
        </span>
      </h2>
    </div>
  );
};

export default LandingHeadlineRotator;
