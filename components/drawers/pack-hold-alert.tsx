"use client"

import { useState } from "react"
import type { Campaign } from "@/lib/types"
import { GREY, TYPE } from "@/components/mid-fidelity"

/**
 * Incomplete pack hold. Sits at the top of the right column, matching the
 * metric panels' width.
 *
 * Approve → a spinner runs in the button's place → the banner turns green with
 * a confirmation → after three seconds it wipes out left to right and collapses,
 * so the panels below move up. The banner holds its height throughout, so only
 * the final collapse moves anything.
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function PackHoldAlert({
  campaign,
  onApproveSubstitute,
  onStockUpMissingSku,
}: {
  campaign: Campaign
  onApproveSubstitute: (campaign: Campaign) => void
  onStockUpMissingSku: (campaign: Campaign) => void
}) {
  type Phase = "hold" | "working" | "approved" | "leaving" | "gone"
  const [phase, setPhase] = useState<Phase>("hold")

  if (!campaign.onHold || !campaign.holdMessage) return null
  if (phase === "gone") return null

  const approve = () => {
    setPhase("working")
    // Spinner runs, then the result lands.
    setTimeout(() => {
      onApproveSubstitute(campaign)
      setPhase("approved")
      // Sit on the confirmation before clearing.
      setTimeout(() => setPhase("leaving"), 3000)
    }, 1400)
  }

  const approved = phase === "approved" || phase === "leaving"

  return (
    <div
      className={`overflow-hidden ${phase === "leaving" ? "banner-dismissing" : ""}`}
      onAnimationEnd={(e) => {
        if (e.animationName === "banner-collapse") setPhase("gone")
      }}
    >
      <div
        className="flex items-center gap-3 rounded-[10px] px-4 py-3"
        style={{
          background: approved ? "var(--color-success)" : "#000000",
          transition: "background 260ms ease-out",
          /* Held so the message swap never resizes the banner — only the
             final collapse moves the panels below. */
          minHeight: 72,
        }}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.18)", color: "#FFFFFF" }}
        >
          {approved ? (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m5 12.5 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 8v5" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
              <path d="M10.3 3.9 2.6 17.5a1.8 1.8 0 0 0 1.6 2.7h15.6a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
            </svg>
          )}
        </span>

        <p className={`min-w-0 flex-1 ${TYPE.meta}`} style={{ color: "#FFFFFF" }}>
          {approved ? "Substitute approved — packs released to dispatch." : campaign.holdMessage}
        </p>

        {/* The slot keeps the button's footprint so nothing reflows when the
            label becomes a spinner and then clears. */}
        {!approved && (
          <span className="flex h-7 w-[72px] shrink-0 items-center justify-center">
            {phase === "working" ? (
              <svg
                className="banner-spinner"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Approving"
              >
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                <path
                  d="M12 3a9 9 0 0 1 9 9"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <button
                type="button"
                onClick={approve}
                className={`h-7 w-full rounded-lg transition-opacity hover:opacity-80 ${TYPE.control}`}
                style={{ background: GREY.well, color: GREY.text }}
              >
                Approve
              </button>
            )}
          </span>
        )}
      </div>
    </div>
  )
}
