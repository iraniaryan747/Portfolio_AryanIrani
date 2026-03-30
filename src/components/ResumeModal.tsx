import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { LINKS } from "../config/placeholders";
import "./styles/ResumeEmbed.css";

function ResumeEmbedOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="resume-embed-root">
      <div
        className="resume-embed-backdrop"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="resume-embed-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-embed-title"
      >
        <div className="resume-embed-toolbar">
          <h2 id="resume-embed-title" className="resume-embed-title">
            Résumé
          </h2>
          <div className="resume-embed-actions">
            <a
              href={LINKS.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="resume-embed-link"
            >
              Open in new tab
            </a>
            <button
              type="button"
              className="resume-embed-close"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <iframe
          className="resume-embed-frame"
          title="Aryan Irani résumé PDF"
          src={LINKS.resumePdf}
        />
      </div>
    </div>
  );
}

type ResumeModalContextValue = {
  openResume: () => void;
  closeResume: () => void;
};

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openResume = useCallback(() => setOpen(true), []);
  const closeResume = useCallback(() => setOpen(false), []);

  return (
    <ResumeModalContext.Provider value={{ openResume, closeResume }}>
      {children}
      <ResumeEmbedOverlay open={open} onClose={closeResume} />
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used within ResumeModalProvider");
  }
  return ctx;
}
