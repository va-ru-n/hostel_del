import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Today's special", "#special"],
  ["How it works", "#how-it-works"],
  ["Feedback", "#feedback"],
];

export default function Navbar({ onOrder }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let animationFrame = 0;
    let hideTimer = 0;

    const clearHideTimer = () => {
      window.clearTimeout(hideTimer);
      hideTimer = 0;
    };

    const hideNavigation = () => {
      clearHideTimer();
      setNavHidden(true);
      setMenuOpen(false);
    };

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;

        if (currentScrollY <= 80) {
          clearHideTimer();
          setNavHidden(false);
        } else if (scrollDelta < -4) {
          setNavHidden(false);
          clearHideTimer();
          hideTimer = window.setTimeout(hideNavigation, 1800);
        } else if (scrollDelta > 4) {
          hideNavigation();
        }

        lastScrollY.current = currentScrollY;
        animationFrame = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrame);
      clearHideTimer();
    };
  }, []);

  const navigate = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`site-header${navHidden ? " nav-hidden" : ""}`}>
      <a
        className="brand"
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          navigate("#home");
        }}
      >
        <img
          className="brand-logo"
          src="/hostelhome-logo.png"
          alt="HostelHome rice bowl and house logo"
        />
      </a>
      <span className="location-badge">
        <span aria-hidden="true" />
        Available in BH 10 only
      </span>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav
        className={`main-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={(event) => {
              event.preventDefault();
              navigate(href);
            }}
          >
            {label}
          </a>
        ))}
        <button
          className="button button-red nav-order"
          type="button"
          onClick={() => {
            setMenuOpen(false);
            onOrder();
          }}
        >
          Order today <span aria-hidden="true">↗</span>
        </button>
      </nav>
    </header>
  );
}
