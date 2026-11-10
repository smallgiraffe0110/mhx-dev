"use client";

import Link from "next/link";
import { FoundryApplication } from "@/components/FoundryApplication";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

type Page = "home" | "us" | "collaborate" | "foundry" | "apply";
const navigation = [
  { id: "us", label: "Us", href: "/us" },
  { id: "collaborate", label: "Collaborate", href: "/collaborate" },
  { id: "foundry", label: "The Foundry", href: "/foundry" },
];
const photographs = [
  {
    "src": "grid/01.webp",
    "alt": "Steve Jobs",
    "name": "Steve Jobs"
  },
  {
    "src": "grid/02.webp",
    "alt": "Starship \u2014 floodlights and vapor",
    "name": "Starship \u2014 floodlights and vapor"
  },
  {
    "src": "grid/03.webp",
    "alt": "Young Jensen Huang",
    "name": "Young Jensen Huang"
  },
  {
    "src": "grid/04.webp",
    "alt": "Super Heavy \u2014 33 Raptor engines",
    "name": "Super Heavy \u2014 33 Raptor engines"
  },
  {
    "src": "grid/05.webp",
    "alt": "Elon at his computer",
    "name": "Elon at his computer"
  },
  {
    "src": "grid/06.webp",
    "alt": "Wendelstein 7-X \u2014 red and blue chamber",
    "name": "Wendelstein 7-X \u2014 red and blue chamber"
  },
  {
    "src": "grid/07.webp",
    "alt": "Stripe founders",
    "name": "Stripe founders"
  },
  {
    "src": "grid/08.webp",
    "alt": "IBM \u2014 quantum chandelier",
    "name": "IBM \u2014 quantum chandelier"
  },
  {
    "src": "grid/09.webp",
    "alt": "Zuckerberg in his dorm",
    "name": "Zuckerberg in his dorm"
  },
  {
    "src": "grid/10.webp",
    "alt": "Starship \u2014 ignition close-up",
    "name": "Starship \u2014 ignition close-up"
  },
  {
    "src": "grid/11.webp",
    "alt": "Bill Gates \u2014 early days",
    "name": "Bill Gates \u2014 early days"
  },
  {
    "src": "grid/12.webp",
    "alt": "CERN \u2014 ALICE detector",
    "name": "CERN \u2014 ALICE detector"
  },
  {
    "src": "grid/13.webp",
    "alt": "Google founders",
    "name": "Google founders"
  },
  {
    "src": "grid/14.webp",
    "alt": "Falcon Heavy \u2014 twin booster landing",
    "name": "Falcon Heavy \u2014 twin booster landing"
  },
  {
    "src": "grid/15.webp",
    "alt": "Voyager 2 Encapsulation",
    "name": "Voyager 2 Encapsulation"
  },
  {
    "src": "grid/16.webp",
    "alt": "ASML EUV Lithography Machine Interior",
    "name": "ASML EUV Lithography Machine Interior"
  },
  {
    "src": "grid/17.webp",
    "alt": "Elon \u2014 PayPal",
    "name": "Elon \u2014 PayPal"
  },
  {
    "src": "grid/18.webp",
    "alt": "Super\u2011Kamiokande Detector Interior",
    "name": "Super\u2011Kamiokande Detector Interior"
  },
  {
    "src": "grid/19.webp",
    "alt": "YouTube founders",
    "name": "YouTube founders"
  },
  {
    "src": "grid/20.webp",
    "alt": "James Webb Space Telescope Mirror Integration",
    "name": "James Webb Space Telescope Mirror Integration"
  },
  {
    "src": "grid/21.webp",
    "alt": "Making Room for Hubble's New Camera",
    "name": "Making Room for Hubble's New Camera"
  },
  {
    "src": "grid/22.webp",
    "alt": "Wendelstein 7-X \u2014 metallic chamber",
    "name": "Wendelstein 7-X \u2014 metallic chamber"
  },
  {
    "src": "grid/23.webp",
    "alt": "NASA's Ingenuity Mars Helicopter",
    "name": "NASA's Ingenuity Mars Helicopter"
  },
  {
    "src": "grid/24.webp",
    "alt": "RS-25 \u2014 engine firing at night",
    "name": "RS-25 \u2014 engine firing at night"
  },
  {
    "src": "grid/25.webp",
    "alt": "Google \u2014 dorm room",
    "name": "Google \u2014 dorm room"
  },
  {
    "src": "grid/26.webp",
    "alt": "Starship \u2014 booster catch",
    "name": "Starship \u2014 booster catch"
  },
  {
    "src": "grid/27.webp",
    "alt": "Bill Gates \u2014 archival",
    "name": "Bill Gates \u2014 archival"
  },
  {
    "src": "grid/28.webp",
    "alt": "National Ignition Facility \u2014 laser machinery",
    "name": "National Ignition Facility \u2014 laser machinery"
  },
  {
    "src": "grid/29.webp",
    "alt": "View of Apollo 14 Lunar Module on the Moon",
    "name": "View of Apollo 14 Lunar Module on the Moon"
  },
  {
    "src": "grid/30.webp",
    "alt": "Perseverance rover assembly",
    "name": "Perseverance rover assembly"
  },
  {
    "src": "grid/31.webp",
    "alt": "STS-38 Atlantis, OV-104, lifting off from KSC LC Pad during night launch",
    "name": "STS-38 Atlantis, OV-104, lifting off from KSC LC Pad during night launch"
  },
  {
    "src": "grid/32.webp",
    "alt": "Falcon Heavy \u2014 twilight landing",
    "name": "Falcon Heavy \u2014 twilight landing"
  },
  {
    "src": "grid/33.webp",
    "alt": "Parker Solar Probe Heat Shield Installation",
    "name": "Parker Solar Probe Heat Shield Installation"
  },
  {
    "src": "grid/34.webp",
    "alt": "Robonaut 2 on its Centaur base",
    "name": "Robonaut 2 on its Centaur base"
  },
  {
    "src": "grid/35.webp",
    "alt": "James Webb Space Telescope Mirror Halfway Complete",
    "name": "James Webb Space Telescope Mirror Halfway Complete"
  },
  {
    "src": "grid/36.webp",
    "alt": "Curiosity Self-Portrait at Okoruso Drill Hole",
    "name": "Curiosity Self-Portrait at Okoruso Drill Hole"
  },
  {
    "src": "grid/37.webp",
    "alt": "Neuralink \u2014 R1 robot",
    "name": "Neuralink \u2014 R1 robot"
  },
  {
    "src": "grid/38.webp",
    "alt": "ITER Tokamak Assembly Hall",
    "name": "ITER Tokamak Assembly Hall"
  },
  {
    "src": "grid/39.webp",
    "alt": "ITER Tokamak Assembly Hall",
    "name": "ITER Tokamak Assembly Hall"
  },
  {
    "src": "grid/40.webp",
    "alt": "Ion Thruster Vacuum Test",
    "name": "Ion Thruster Vacuum Test"
  },
  {
    "src": "grid/41.webp",
    "alt": "Ion Thruster Firing",
    "name": "Ion Thruster Firing"
  },
  {
    "src": "grid/42.webp",
    "alt": "Super-Kamiokande Detector Interior",
    "name": "Super-Kamiokande Detector Interior"
  },
  {
    "src": "grid/43.webp",
    "alt": "SR-71 Blackbird at Edwards AFB Airshow",
    "name": "SR-71 Blackbird at Edwards AFB Airshow"
  },
  {
    "src": "grid/44.webp",
    "alt": "Rocket Lab Electron\u2019s 70th Mission",
    "name": "Rocket Lab Electron\u2019s 70th Mission"
  },
  {
    "src": "grid/45.webp",
    "alt": "Z Machine Electrical Discharges",
    "name": "Z Machine Electrical Discharges"
  },
  {
    "src": "grid/46.webp",
    "alt": "Jet Engine Test Stand Firing",
    "name": "Jet Engine Test Stand Firing"
  },
  {
    "src": "grid/47.webp",
    "alt": "Boston Dynamics Atlas in Industrial Testing Enclosure",
    "name": "Boston Dynamics Atlas in Industrial Testing Enclosure"
  },
  {
    "src": "grid/48.webp",
    "alt": "Large Hadron Collider Tunnel",
    "name": "Large Hadron Collider Tunnel"
  },
  {
    "src": "grid/49.webp",
    "alt": "Space Shuttle Main Engine Display",
    "name": "Space Shuttle Main Engine Display"
  },
  {
    "src": "grid/50.webp",
    "alt": "NASA\u2019s Valkyrie Humanoid Robot Testing",
    "name": "NASA\u2019s Valkyrie Humanoid Robot Testing"
  },
  {
    "src": "grid/51.webp",
    "alt": "Starman\u2019s Cosmic Roadster",
    "name": "Starman\u2019s Cosmic Roadster"
  },
  {
    "src": "grid/52.webp",
    "alt": "NEA Scout Solar Sail Deployment",
    "name": "NEA Scout Solar Sail Deployment"
  },
  {
    "src": "grid/53.webp",
    "alt": "Linear Aerospike Engine Hot-Fire Test",
    "name": "Linear Aerospike Engine Hot-Fire Test"
  }
];

// Uniform squares fill the viewport. A radial delay carries the wake from the
// headline through the field; the shuffled cycle avoids adjacent duplicates.
const fieldPhotos = Array.from({ length: 126 }, (_, i) => (i * 23) % photographs.length);

function Home({ onImage }: { onImage: (index: number) => void }) {
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>(".photo"));
    let active = true;
    let entranceFrame = 0;
    // Measure the actual text after fonts load so the one-shot wave starts at
    // "forged in a new era." on desktop and mobile, not a guessed grid cell.
    document.fonts.ready.then(() => {
      if (!active) return;
      const heading = root.querySelector("h1");
      if (!heading) return;
      const text = document.createRange();
      text.selectNodeContents(heading);
      const origin = text.getBoundingClientRect();
      const centerX = origin.left + origin.width / 2;
      const centerY = origin.top + origin.height / 2;
      const bounds = tiles.map((tile) => tile.getBoundingClientRect());
      tiles.forEach((tile, index) => {
        const rect = bounds[index];
        const dx = rect.left + rect.width / 2 - centerX;
        const dy = rect.top + rect.height / 2 - centerY;
        tile.style.setProperty("--delay", `${Math.hypot(dx, dy) * 0.85}ms`);
        tile.style.setProperty("--push-x", `${dx * 0.035}px`);
        tile.style.setProperty("--push-y", `${dy * 0.035}px`);
      });
      entranceFrame = requestAnimationFrame(() => root.classList.add("wake-ready"));
    });
    let frame = 0;
    let cursor: { x: number; y: number } | null = null;
    const paint = () => {
      frame = 0;
      if (!cursor) return;
      const { x, y } = cursor;
      // Read moving tile bounds together before writing styles. Each tile clips
      // the same soft circle, so color flows across its neighbors without seams.
      const bounds = tiles.map((tile) => tile.getBoundingClientRect());
      tiles.forEach((tile, index) => {
        const rect = bounds[index];
        const dx = Math.max(rect.left - x, 0, x - rect.right);
        const dy = Math.max(rect.top - y, 0, y - rect.bottom);
        const near = Math.hypot(dx, dy) < 155;
        tile.classList.toggle("is-near", near);
        if (near) {
          tile.style.setProperty("--spot-x", `${(x - rect.left) / rect.width * 100}%`);
          tile.style.setProperty("--spot-y", `${(y - rect.top) / rect.height * 100}%`);
        }
      });
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cursor = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      cursor = null;
      cancelAnimationFrame(frame);
      frame = 0;
      tiles.forEach((tile) => tile.classList.remove("is-near"));
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    return () => {
      active = false;
      cancelAnimationFrame(entranceFrame);
      leave();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <main ref={stage} id="main" className="home-stage">
      <div
        className="photo-field"
        aria-label="People and technology that inspire us"
      >
        {fieldPhotos.map((photoIndex, i) => {
          const photo = photographs[photoIndex];
          return (
          <button
            key={i}
            className="photo"
            onClick={() => onImage(photoIndex)}
            aria-label={`View ${photo.name}`}
          >
            <img src={`/images/${photo.src}`} alt={photo.alt} loading="eager" />
            <img className="photo-color" src={`/images/${photo.src}`} alt="" aria-hidden="true" loading="eager" />
            <span>{photo.name}</span>
          </button>
          );
        })}
      </div>
      <div className="photo-fade" aria-hidden="true" />
        <div className="home-statement">
          <h1>forged in a new era.</h1>
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
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduced.matches) video.current?.play().catch(() => {});
    const onChange = () => {
      if (reduced.matches) video.current?.pause();
    };
    reduced.addEventListener("change", onChange);
    return () => reduced.removeEventListener("change", onChange);
  }, []);
  return (
    <main id="main" className="cinema collaborate-stage">
      <video
        ref={video}
        className="cinema-media"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/collab-computing-poster.jpg"
        aria-label="1950s engineers and operators at early computers, switchboards, and relay racks, shown in black and white"
      >
        <source src="/video/collab-computing.mp4" type="video/mp4" />
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
          <a
            href="https://archive.org/details/OnGuard1956"
            target="_blank"
            rel="noreferrer"
          >
            Footage: Prelinger Archives
          </a>
        </div>
      </div>
    </main>
  );
}

function Foundry() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduced.matches) video.current?.play().catch(() => {});
    const onChange = () => {
      if (reduced.matches) video.current?.pause();
    };
    reduced.addEventListener("change", onChange);
    return () => reduced.removeEventListener("change", onChange);
  }, []);
  return (
    <main id="main" className="cinema foundry-stage">
      <video
        ref={video}
        className="cinema-media"
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/foundry-orbit-reel-poster.jpg"
        aria-label="NASA space footage: Orion approaching the Moon, the station above Earth, Earthset behind the Moon, and orbital sunrise, shown in black and white"
      >
        <source src="/video/foundry-orbit-reel.mp4" type="video/mp4" />
      </video>
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
        <Link className="pill" href="/foundry/apply">
          Apply to the Foundry <span aria-hidden="true">↗</span>
        </Link>
        <span className="foundry-invitation">
          Tell us what you’re building. Or what you want to.
        </span>
      </div>
      <div className="cinema-meta">
        <span>Big ideas don’t ask where you came from.</span>
        <div>
          <a
            href="/video/credits.json"
            target="_blank"
            rel="noreferrer"
          >
            Footage: NASA
          </a>
        </div>
      </div>
    </main>
  );
}

function Apply() {
  const [complete, setComplete] = useState(false);
  const received = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!complete) return;
    window.scrollTo({ top: 0 });
    received.current?.focus();
  }, [complete]);
  if (complete) {
    return (
      <main id="main" className="apply-stage apply-received">
        <p className="overline">Application received</p>
        <h1 ref={received} tabIndex={-1}>
          A good beginning.
        </h1>
        <p role="status">
          Thanks for showing us your work. The MHX team has received your
          application.
        </p>
        <Link className="pill" href="/foundry">
          Back to the Foundry <span aria-hidden="true">↗</span>
        </Link>
      </main>
    );
  }
  return (
    <main id="main" className="apply-stage">
      <div className="apply-intro">
        <Link className="apply-back" href="/foundry">
          <span aria-hidden="true">←</span> The Foundry
        </Link>
        <p className="overline">MHX Foundry · Application</p>
        <h1 id="apply-title">
          Show us what
          <br />
          you’re building.
        </h1>
        <p className="application-intro">
          What you’ve made. What you’re figuring out. What comes next.
        </p>
        <p className="form-note">
          Short, specific answers are best. Include links wherever you can. All
          fields are required.
        </p>
      </div>
      <FoundryApplication onComplete={() => setComplete(true)} />
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
              className={
                page === item.id || (page === "apply" && item.id === "foundry")
                  ? "active"
                  : ""
              }
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
      ) : page === "foundry" ? (
        <Foundry />
      ) : (
        <Apply />
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
              Back to collaborating <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="overline">Let’s build something</p>
            <h2 id="dialog-title">What’s on your mind?</h2>
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
              What would you like to build together?
              <textarea
                required
                name="idea"
                rows={4}
                maxLength={4000}
                placeholder="A rough idea is a great place to start."
              />
            </label>
            <button className="pill" type="submit">
              Preview collaboration request
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
