"use client"

import Image from "next/image"
import { GREY } from "@/components/mid-fidelity"

/**
 * Left rail. Workflow sections at the top, account items below a divider,
 * profile pinned last. Icons are inline paths at 1.5px to match the panel
 * filter/expand icons.
 * Mid-fidelity greyscale pass. Not final styling.
 */

type Section = { id: string; label: string; path: React.ReactNode }

/** Daily-use navigation. */
const WORK: Section[] = [
  {
    id: "home",
    label: "Home",
    path: <path d="M3 9.5 11 3l8 6.5V19a1 1 0 0 1-1 1h-4v-6H8v6H4a1 1 0 0 1-1-1V9.5Z" />,
  },
  {
    id: "campaigns",
    label: "Campaigns & events",
    path: (
      <>
        <rect x="3" y="4.5" width="16" height="15" rx="2" />
        <path d="M3 9h16M7.5 2.5v4M14.5 2.5v4" />
        <circle cx="11" cy="14" r="1.6" fill="var(--rail-ink)" stroke="none" />
      </>
    ),
  },
  {
    id: "recipients",
    label: "Recipients",
    path: (
      <>
        <circle cx="8.5" cy="8" r="3.25" />
        <path d="M2.5 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
        <path d="M15 5.2a3.25 3.25 0 0 1 0 5.6M16.5 13.9c1.9.6 3 2.3 3 4.1" />
      </>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    path: (
      <>
        <path d="M3 19h16" />
        <path d="M6 19v-6M11 19V5M16 19v-9" />
      </>
    ),
  },
]

/** Account and housekeeping. */
const ACCOUNT: Section[] = [
  {
    id: "settings",
    label: "Settings",
    path: (
      <>
        <circle cx="11" cy="11" r="2.6" />
        <path d="M17.4 13.4a1.4 1.4 0 0 0 .3 1.55l.05.05a1.7 1.7 0 1 1-2.4 2.4l-.05-.05a1.4 1.4 0 0 0-1.55-.3 1.4 1.4 0 0 0-.85 1.29v.14a1.7 1.7 0 1 1-3.4 0v-.07a1.4 1.4 0 0 0-.92-1.29 1.4 1.4 0 0 0-1.55.3l-.05.05a1.7 1.7 0 1 1-2.4-2.4l.05-.05a1.4 1.4 0 0 0 .3-1.55 1.4 1.4 0 0 0-1.29-.85h-.14a1.7 1.7 0 1 1 0-3.4h.07a1.4 1.4 0 0 0 1.29-.92 1.4 1.4 0 0 0-.3-1.55l-.05-.05a1.7 1.7 0 1 1 2.4-2.4l.05.05a1.4 1.4 0 0 0 1.55.3h.07a1.4 1.4 0 0 0 .85-1.29v-.14a1.7 1.7 0 1 1 3.4 0v.07a1.4 1.4 0 0 0 .85 1.29 1.4 1.4 0 0 0 1.55-.3l.05-.05a1.7 1.7 0 1 1 2.4 2.4l-.05.05a1.4 1.4 0 0 0-.3 1.55v.07a1.4 1.4 0 0 0 1.29.85h.14a1.7 1.7 0 1 1 0 3.4h-.07a1.4 1.4 0 0 0-1.29.85Z" />
      </>
    ),
  },
  {
    id: "admin",
    label: "Admin",
    path: (
      <>
        <path d="M11 2.75 4 5.5v5.2c0 4.3 2.9 7.6 7 8.55 4.1-.95 7-4.25 7-8.55V5.5l-7-2.75Z" />
        <path d="M8.2 11.1 10.3 13.2 14 9.5" />
      </>
    ),
  },
  {
    id: "archive",
    label: "Archive",
    path: (
      <>
        <rect x="3" y="4" width="16" height="4" rx="1" />
        <path d="M4.5 8v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8" />
        <path d="M9 11.5h4" />
      </>
    ),
  },
]

/** The only section with a screen behind it; the rest are hover-only for now. */
const ACTIVE_SECTION = "home"

export function IconRail() {
  const Item = ({ section }: { section: Section }) => {
    const isActive = section.id === ACTIVE_SECTION
    return (
      <button
        type="button"
        aria-label={section.label}
        aria-current={isActive ? "page" : undefined}
        title={section.label}
        /* Only the active section is reachable; the rest have no screen yet,
           so they show the hover fill but take no click or focus. */
        disabled={!isActive}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
          isActive ? "" : "cursor-default bg-transparent hover:bg-[#F7F7F7]"
        }`}
        style={isActive ? { background: GREY.well } : undefined}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="var(--rail-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ "--rail-ink": isActive ? GREY.text : GREY.faint } as React.CSSProperties}
          aria-hidden
        >
          {section.path}
        </svg>
      </button>
    )
  }

  return (
    <nav
      className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-2.5 py-4"
      style={{ background: GREY.panel }}
      aria-label="Main navigation"
    >
      {/* Brand mark heads the rail; the gap below separates it from the nav. */}
      <Image
        src="/logo/swag-logo-box.png"
        alt="Go Swag"
        width={128}
        height={128}
        priority
        className="mb-8 h-11 w-11 shrink-0 rounded-xl"
      />

      {/* Scrolls rather than overflowing: on a short viewport the icon list is
          what gives way, never the profile pinned below it. */}
      <div className="rail-scroll flex min-h-0 flex-1 flex-col items-center gap-1.5 overflow-y-auto">
        {WORK.map((s) => (
          <Item key={s.id} section={s} />
        ))}

        <span className="my-1.5 h-px w-6 shrink-0" style={{ background: GREY.hairline }} />

        {ACCOUNT.map((s) => (
          <Item key={s.id} section={s} />
        ))}
      </div>

      {/* Profile sits last, an avatar rather than another icon slot. */}
      <button
        type="button"
        aria-label="Profile"
        title="Profile"
        className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-80"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium"
          style={{ background: GREY.text, color: GREY.panel }}
        >
          DQ
        </span>
      </button>
    </nav>
  )
}
