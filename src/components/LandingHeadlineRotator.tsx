import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/** Expand anytime; each tick picks a random word (not sequential through this list). */
const HEADLINE_WORDS = [
  "Systems",
  "Research",
  "Execution",
  "Analytics",
  "Strategy",
  "Operations",
  "Product",
  "Leadership",
  "Innovation",
] as const;

function pickRandomDifferent(
  current: string,
  pool: readonly string[]
): string {
  if (pool.length <= 1) return pool[0];
  let next = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (next === current && guard++ < 32) {
    next = pool[Math.floor(Math.random() * pool.length)];
  }
  return next;
}

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

const LandingHeadlineRotator = () => {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const w1 = useRef("");
  const w2 = useRef("");
  const mountedRef = useRef(true);

  const [initial1, initial2] = useMemo(() => {
    const a = pickRandomDifferent("", [...HEADLINE_WORDS]);
    const b = pickRandomDifferent(a, [...HEADLINE_WORDS]);
    return [a, b];
  }, []);

  useEffect(() => {
    w1.current = initial1;
    w2.current = initial2;
  }, [initial1, initial2]);

  useEffect(() => {
    mountedRef.current = true;
    const alive = () => mountedRef.current;
    const interval1 = { current: undefined as number | undefined };
    const interval2 = { current: undefined as number | undefined };

    const startTimer = window.setTimeout(() => {
      interval1.current = window.setInterval(() => {
        const el = line1Ref.current;
        if (!el) return;
        const next = pickRandomDifferent(w1.current, HEADLINE_WORDS);
        w1.current = next;
        animateWordSwap(el, next, alive);
      }, 4200);

      interval2.current = window.setInterval(() => {
        const el = line2Ref.current;
        if (!el) return;
        const next = pickRandomDifferent(w2.current, HEADLINE_WORDS);
        w2.current = next;
        animateWordSwap(el, next, alive);
      }, 5100);
    }, LOOP_START_MS);

    return () => {
      mountedRef.current = false;
      window.clearTimeout(startTimer);
      if (interval1.current !== undefined) window.clearInterval(interval1.current);
      if (interval2.current !== undefined) window.clearInterval(interval2.current);
    };
  }, []);

  return (
    <div className="landing-rotator" aria-live="polite">
      <h2 className="landing-rotator-line landing-rotator-line--accent">
        <span ref={line1Ref} className="landing-rotator-inner">
          {initial1}
        </span>
      </h2>
      <h2 className="landing-rotator-line landing-rotator-line--light">
        <span ref={line2Ref} className="landing-rotator-inner">
          {initial2}
        </span>
      </h2>
    </div>
  );
};

export default LandingHeadlineRotator;
