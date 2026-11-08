"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

type Page = "home" | "us" | "collaborate" | "foundry";
const navigation = [
  { id: "us", label: "Us", href: "/us" },
  { id: "collaborate", label: "Collaborate", href: "/collaborate" },
  { id: "foundry", label: "The Foundry", href: "/foundry" },
];
const photographs = [
  {
    src: "grid/01.webp",
    alt: "Steve Jobs",
    name: "Steve Jobs",
  },
  {
    src: "grid/02.webp",
    alt: "Starship \u2014 floodlights and vapor",
    name: "Starship \u2014 floodlights and vapor",
  },
  {
    src: "grid/03.webp",
    alt: "Young Jensen Huang",
    name: "Young Jensen Huang",
  },
  {
    src: "grid/04.webp",
    alt: "Super Heavy \u2014 33 Raptor engines",
    name: "Super Heavy \u2014 33 Raptor engines",
  },
  {
    src: "grid/05.webp",
    alt: "Elon at his computer",
    name: "Elon at his computer",
  },
  {
    src: "grid/06.webp",
    alt: "Wendelstein 7-X \u2014 red and blue chamber",
    name: "Wendelstein 7-X \u2014 red and blue chamber",
  },
  {
    src: "grid/07.webp",
    alt: "Stripe founders",
    name: "Stripe founders",
  },
  {
    src: "grid/08.webp",
    alt: "IBM \u2014 quantum chandelier",
    name: "IBM \u2014 quantum chandelier",
  },
  {
    src: "grid/09.webp",
    alt: "Zuckerberg in his dorm",
    name: "Zuckerberg in his dorm",
  },
  {
    src: "grid/10.webp",
    alt: "Starship \u2014 ignition close-up",
    name: "Starship \u2014 ignition close-up",
  },
  {
    src: "grid/11.webp",
    alt: "Bill Gates \u2014 early days",
    name: "Bill Gates \u2014 early days",
  },
  {
    src: "grid/12.webp",
    alt: "CERN \u2014 ALICE detector",
    name: "CERN \u2014 ALICE detector",
  },
  {
    src: "grid/13.webp",
    alt: "Google founders",
    name: "Google founders",
  },
  {
    src: "grid/14.webp",
    alt: "Falcon Heavy \u2014 twin booster landing",
    name: "Falcon Heavy \u2014 twin booster landing",
  },
  {
    src: "grid/15.webp",
    alt: "Etched founders",
    name: "Etched founders",
  },
  {
    src: "grid/16.webp",
    alt: "ASML EUV Lithography Machine Interior",
    name: "ASML EUV Lithography Machine Interior",
  },
  {
    src: "grid/17.webp",
    alt: "Elon \u2014 PayPal",
    name: "Elon \u2014 PayPal",
  },
  {
    src: "grid/18.webp",
    alt: "Super\u2011Kamiokande Detector Interior",
    name: "Super\u2011Kamiokande Detector Interior",
  },
  {
    src: "grid/19.webp",
    alt: "YouTube founders",
    name: "YouTube founders",
  },
  {
    src: "grid/20.webp",
    alt: "James Webb Space Telescope Mirror Integration",
    name: "James Webb Space Telescope Mirror Integration",
  },
  {
    src: "grid/21.webp",
    alt: "Z Fellows candid",
    name: "Z Fellows candid",
  },
  {
    src: "grid/22.webp",
    alt: "Wendelstein 7-X \u2014 metallic chamber",
    name: "Wendelstein 7-X \u2014 metallic chamber",
  },
  {
    src: "grid/23.webp",
    alt: "Mercor founders",
    name: "Mercor founders",
  },
  {
    src: "grid/24.webp",
    alt: "RS-25 \u2014 engine firing at night",
    name: "RS-25 \u2014 engine firing at night",
  },
  {
    src: "grid/25.webp",
    alt: "Google \u2014 dorm room",
    name: "Google \u2014 dorm room",
  },
  {
    src: "grid/26.webp",
    alt: "Starship \u2014 booster catch",
    name: "Starship \u2014 booster catch",
  },
  {
    src: "grid/27.webp",
    alt: "Bill Gates \u2014 archival",
    name: "Bill Gates \u2014 archival",
  },
  {
    src: "grid/28.webp",
    alt: "National Ignition Facility \u2014 laser machinery",
    name: "National Ignition Facility \u2014 laser machinery",
  },
  {
    src: "grid/29.webp",
    alt: "Early Facebook team",
    name: "Early Facebook team",
  },
  {
    src: "grid/30.webp",
    alt: "Perseverance rover assembly",
    name: "Perseverance rover assembly",
  },
  {
    src: "grid/31.webp",
    alt: "Ethan \u2014 Z Fellows",
    name: "Ethan \u2014 Z Fellows",
  },
  {
    src: "grid/32.webp",
    alt: "Falcon Heavy \u2014 twilight landing",
    name: "Falcon Heavy \u2014 twilight landing",
  },
  {
    src: "grid/33.webp",
    alt: "Etched founders 2",
    name: "Etched founders 2",
  },
  {
    src: "grid/34.webp",
    alt: "Z Fellows around a table",
    name: "Z Fellows around a table",
  },
  {
    src: "grid/35.webp",
    alt: "Z Fellows at work",
    name: "Z Fellows at work",
  },
  {
    src: "grid/36.webp",
    alt: "Z Fellows candid 2",
    name: "Z Fellows candid 2",
  },
];

// Irregular positions surround the headline; no rows or rectangular frame.
const desktopPositions = [
  [95.11, 33.37],
  [4.93, 65.89],
  [50.1, 26.54],
  [50.45, 88.73],
  [12.59, 14.37],
  [86.98, 84.57],
  [27.65, 88.55],
  [72.6, 20.16],
  [31.32, 26.66],
  [5.43, 40.05],
  [90.98, 58.99],
  [68.61, 80.63],
  [47.9, 6.8],
  [27.22, 6.81],
  [13.09, 86.42],
  [85.87, 13.3],
  [17.72, 58.79],
  [17.69, 38.74],
  [60.17, 8.56],
  [39.02, 84.33],
  [61.48, 24.55],
  [57.6, 73.27],
  [27.49, 73.64],
  [84.73, 38.31],
  [37.4, 9.77],
  [16.91, 72.27],
  [75.61, 6.82],
  [5.25, 27.19],
  [40.61, 26.33],
  [21.92, 21.76],
  [90.05, 71.73],
  [94.82, 46.11],
  [77.81, 75.6],
  [5.31, 52.99],
  [48.41, 75.92],
  [77.71, 92.37],
];
const mobilePositions = [
  [92.95, 77.51],
  [48.44, 4.3],
  [7.29, 68.84],
  [88.82, 37.08],
  [12.09, 36.51],
  [42.77, 95.67],
  [49.99, 68.54],
  [50.26, 31.45],
  [85.9, 13.54],
  [12.8, 14.58],
  [74.15, 95.7],
  [14.18, 86.63],
  [78.2, 63.83],
  [54.89, 17.86],
  [63.03, 82.11],
  [38.55, 82.05],
  [29.17, 65.54],
  [33.99, 18.42],
  [80.91, 25.31],
  [31.26, 37.01],
  [68.97, 36.96],
  [66.39, 5.25],
  [11.33, 25.57],
  [30.64, 5.69],
  [65.55, 27.26],
  [58.85, 95.05],
  [22.72, 77.32],
  [32.46, 27.6],
  [75.24, 72.98],
  [70.17, 15.53],
  [77.86, 83.63],
  [25.44, 95.68],
  [91.89, 68.06],
  [8.43, 77.95],
  [64.94, 64.38],
  [62.64, 72.69],
];
function waveStyle(position: number[], prefix: string) {
  const [x, y] = position;
  const dx = x - 50,
    dy = y - 50,
    distance = Math.hypot(dx, dy);
  return {
    [`--${prefix}x`]: `${x}%`,
    [`--${prefix}y`]: `${y}%`,
    [`--${prefix}delay`]: `${distance * 12}ms`,
    [`--${prefix}push-x`]: `${dx * 0.45}px`,
    [`--${prefix}push-y`]: `${dy * 0.45}px`,
  };
}

function Home({ onImage }: { onImage: (index: number) => void }) {
  return (
    <main id="main" className="home-stage">
      <div
        className="photo-field"
        aria-label="People and technology that inspire us"
      >
        {photographs.map((photo, i) => (
          <button
            key={photo.src}
            className="photo"
            style={
              {
                ...waveStyle(desktopPositions[i], "d"),
                ...waveStyle(mobilePositions[i], "m"),
              } as CSSProperties
            }
            onClick={() => onImage(i)}
            aria-label={`View ${photo.name}`}
          >
            <img src={`/images/${photo.src}`} alt={photo.alt} loading="eager" />
            <span>{photo.name}</span>
          </button>
        ))}
        <div className="home-statement">
          <p className="overline">Exceptional from nothing.</p>
          <h1>
            forged in
            <br />a new era.
          </h1>
        </div>
      </div>
      <aside className="home-intro">
        <p className="overline">The thesis</p>
        <h2>
          A new generation.
          <br />
          Building from zero.
        </h2>
        <p>
          New tools. Bad odds. An unreasonable belief in what we can build.
          We’re here for the people who start anyway.
        </p>
        <Link href="/us" className="inline-link">
          Meet MHX <span aria-hidden="true">↗</span>
        </Link>
        <div className="home-paths">
          <Link href="/collaborate">
            Collaborate <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/foundry">
            Apply to the Foundry <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </aside>
    </main>
  );
}

function Us() {
  return (
    <main id="main" className="us-stage">
      <p className="overline us-overline">
        Different beginnings. A shared direction.
      </p>
      <h1 className="belief">
        <span>belief</span>
        <span>that</span>
        <span>compounds.</span>
      </h1>
      <div className="founder-pair">
        <figure className="founder founder-mikey">
          <img src="/images/reference/mikey.webp" alt="Mikey Wessman" />
          <figcaption>
            <span>Mikey Wessman</span>
            <a
              href="https://github.com/MikWess"
              target="_blank"
              rel="noreferrer"
              aria-label="Mikey Wessman on GitHub"
            >
              ↗
            </a>
          </figcaption>
        </figure>
        <figure className="founder founder-hunter">
          <img
            src="/images/reference/hunter.webp"
            alt="Hunter Earls speaking into a microphone"
          />
          <figcaption>
            <span>Hunter Earls</span>
            <a
              href="https://github.com/smallgiraffe0110"
              target="_blank"
              rel="noreferrer"
              aria-label="Hunter Earls on GitHub"
            >
              ↗
            </a>
          </figcaption>
        </figure>
      </div>
      <div className="us-story">
        <h2>
          We started by
          <br />
          betting on ourselves.
        </h2>
        <p>
          No inherited playbook. Just curiosity, a willingness to look stupid,
          and the conviction that we could figure it out.
        </p>
        <p>
          We kept building. We found our people. And we learned that belief
          grows when you put it to work.
        </p>
        <p>MHX is what comes next.</p>
        <Link href="/foundry" className="pill">
          Meet the foundry <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <p className="us-endnote">
        Start small.
        <br />
        Think unreasonably big.
      </p>
    </main>
  );
}

function Collaborate({ onOpen }: { onOpen: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduced.matches) video.current?.play().catch(() => setPlaying(false));
    const onChange = () => {
      if (reduced.matches) video.current?.pause();
    };
    reduced.addEventListener("change", onChange);
    return () => reduced.removeEventListener("change", onChange);
  }, []);
  function toggle() {
    if (video.current?.paused)
      video.current.play().catch(() => setPlaying(false));
    else video.current?.pause();
  }
  return (
    <main id="main" className="cinema collaborate-stage">
      <video
        ref={video}
        className="cinema-media"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/reference/starship-ignition.webp"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="A montage of technology, builders, and scientific progress"
      >
        <source src="/video/build-reference.mp4" type="video/mp4" />
      </video>
      <div className="cinema-shade" />
      <div className="cinema-content">
        <div className="cinema-heading">
          <p className="overline">Work with MHX.</p>
          <h1>
            What do you
            <br />
            want to build?
          </h1>
        </div>
        <div className="cinema-copy">
          <p className="intro">
            AI-native from day one.
            <br />A fresh, scrappy perspective.
          </p>
          <p>
            For people who want to build with a generation that grew up with
            these tools. Bring a problem or a rough brief. We bring the
            perspective, skills, and young builder network.
          </p>
          <button className="pill" onClick={onOpen}>
            Let’s collaborate <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <div className="cinema-meta">
        <span>Products. Prototypes. New possibilities.</span>
        <div>
          <a href="https://a16z.com/" target="_blank" rel="noreferrer">
            Film reference: a16z
          </a>
          <button
            className="media-toggle"
            onClick={toggle}
            aria-label={
              playing ? "Pause background film" : "Play background film"
            }
          >
            {playing ? "Pause film" : "Play film"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Foundry({ onOpen }: { onOpen: () => void }) {
  return (
    <main id="main" className="cinema foundry-stage">
      <img
        className="earth-photo"
        src="/images/earth-closeup.jpg"
        alt="Earth photographed by the Apollo 8 crew, shown in black and white"
      />
      <div className="cinema-shade" />
      <div className="foundry-heading">
        <p className="overline">The MHX Foundry</p>
        <h1>
          Why
          <br />
          not you?
        </h1>
      </div>
      <div className="foundry-copy">
        <h2>
          We bet on ourselves.
          <br />
          Now we’re betting on
          <br />
          the rest of our generation.
        </h2>
        <p>
          For young builders starting from zero. The Foundry is a place to find
          your people, put your ambition to work, and be taken seriously early.
        </p>
        <button className="pill" onClick={onOpen}>
          Apply to the Foundry <span aria-hidden="true">↗</span>
        </button>
        <span className="foundry-invitation">
          Tell us what you’re building. Or what you want to.
        </span>
      </div>
      <div className="cinema-meta">
        <span>Big ideas don’t ask where you came from.</span>
        <a
          href="https://science.nasa.gov/earth/earth-observatory/earth-viewed-by-apollo-8-36019/"
          target="_blank"
          rel="noreferrer"
        >
          Earth / Apollo 8 · NASA
        </a>
      </div>
    </main>
  );
}

export function Experience({ page }: { page: Page }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const imageDialog = useRef<HTMLDialogElement>(null);
  const successButton = useRef<HTMLButtonElement>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [complete, setComplete] = useState(false);
  const dark = page === "collaborate" || page === "foundry";
  const isFoundry = page === "foundry";
  useEffect(() => {
    if (complete) successButton.current?.focus();
  }, [complete]);
  function openForm() {
    setComplete(false);
    dialog.current?.showModal();
  }
  function openImage(index: number) {
    setSelectedImage(index);
    imageDialog.current?.showModal();
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setComplete(true);
  }
  return (
    <div className={`site page-${page} ${dark ? "is-dark" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="MHX home">
          mhx.
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={page === item.id ? "active" : ""}
              aria-current={page === item.id ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {page === "home" ? (
        <Home onImage={openImage} />
      ) : page === "us" ? (
        <Us />
      ) : page === "collaborate" ? (
        <Collaborate onOpen={openForm} />
      ) : (
        <Foundry onOpen={openForm} />
      )}
      {!dark && (
        <footer className="site-footer">
          <span>Independent minds. Shared ambition.</span>
          <span>MHX © 2026</span>
        </footer>
      )}
      <dialog
        ref={dialog}
        className="contact-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="dialog-title"
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Close form"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        {complete ? (
          <div className="form-success">
            <p className="overline">Preview complete</p>
            <h2 id="dialog-title">A good beginning.</h2>
            <p role="status">
              This is a local prototype. Your details haven’t been sent or
              saved.
            </p>
            <button
              ref={successButton}
              className="pill"
              onClick={() => dialog.current?.close()}
            >
              Back to {isFoundry ? "the foundry" : "collaborating"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="overline">
              {isFoundry ? "The MHX Foundry" : "Let’s build something"}
            </p>
            <h2 id="dialog-title">
              {isFoundry ? "Find your people." : "What’s on your mind?"}
            </h2>
            <p className="form-note">
              Local form preview. Nothing will be sent.
            </p>
            <label>
              Your name
              <input
                autoFocus
                required
                name="name"
                autoComplete="name"
                placeholder="First and last name"
                maxLength={120}
              />
            </label>
            <label>
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
              />
            </label>
            <label>
              {isFoundry
                ? "What are you building or curious about?"
                : "What would you like to build together?"}
              <textarea
                required
                name="idea"
                rows={4}
                maxLength={4000}
                placeholder="A rough idea is a great place to start."
              />
            </label>
            <button className="pill" type="submit">
              {isFoundry
                ? "Preview application"
                : "Preview collaboration request"}
              <span aria-hidden="true">↗</span>
            </button>
          </form>
        )}
      </dialog>
      <dialog
        ref={imageDialog}
        className="image-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) imageDialog.current?.close();
        }}
        aria-labelledby="image-title"
      >
        <button
          className="dialog-close"
          aria-label="Close image"
          onClick={() => imageDialog.current?.close()}
        >
          ×
        </button>
        <img
          src={`/images/${photographs[selectedImage].src}`}
          alt={photographs[selectedImage].alt}
        />
        <h2 id="image-title">{photographs[selectedImage].name}</h2>
        <p>From our inspiration board.</p>
      </dialog>
    </div>
  );
}
