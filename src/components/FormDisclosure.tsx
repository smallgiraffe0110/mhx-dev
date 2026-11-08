"use client";

import { useEffect, useId, useRef, useState } from "react";

type FormDisclosureProps = {
  buttonLabel: string;
  children: React.ReactNode;
};

// A single button that opens the form in place, so the page stays short
// until someone has decided to reach out.
export function FormDisclosure({ buttonLabel, children }: FormDisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
  }, [open]);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`rounded-full border px-8 py-3.5 font-display text-2xl transition-colors ${
          open
            ? "border-starlight/20 text-starlight/70 hover:text-starlight"
            : "border-sodium bg-sodium text-night hover:bg-[#ffb860]"
        }`}
      >
        {open ? "Close" : buttonLabel}
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="pt-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
