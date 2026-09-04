export default function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="A preview of a Yugam Labs product dashboard showing an AI assistant, live metrics, and shipped releases"
      className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-surface px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="mx-auto hidden rounded-full bg-white px-4 py-1 text-xs text-muted sm:block">
          app.yugamlabs.in
        </div>
        <span className="hidden w-14 sm:block" />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 text-left md:grid-cols-[1fr_1.4fr] md:p-6">
        {/* AI assistant panel */}
        <div className="flex flex-col rounded-2xl border border-black/5 bg-surface p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
              Y
            </span>
            <p className="text-sm font-semibold">Yugam assistant</p>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              live
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-3 text-xs text-foreground shadow-sm">
              Invoice sync finished. 1,284 records reconciled, 3 flagged for
              review.
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-accent p-3 text-xs text-white">
              Schedule the review and notify finance.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-3 text-xs text-foreground shadow-sm">
              Done. Review booked for Friday 10:30, summary sent to 4 people.
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-white px-3 py-2">
            <p className="text-xs text-muted">Ask anything…</p>
            <span className="ml-auto h-5 w-5 rounded-full bg-accent" />
          </div>
        </div>

        {/* Metrics + releases */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
              <p className="text-xs text-muted">Automations run</p>
              <p className="mt-1 text-xl font-semibold tracking-tight">
                12,847
              </p>
              <p className="mt-1 text-xs font-semibold text-[#1a9c46]">
                +18.4%
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
              <p className="text-xs text-muted">Hours saved</p>
              <p className="mt-1 text-xl font-semibold tracking-tight">642</p>
              <p className="mt-1 text-xs font-semibold text-[#1a9c46]">
                +9.2%
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
              <p className="text-xs text-muted">Uptime</p>
              <p className="mt-1 text-xl font-semibold tracking-tight">
                99.98%
              </p>
              <p className="mt-1 text-xs text-muted">30 days</p>
            </div>
          </div>

          {/* Activity bars */}
          <div className="flex-1 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Weekly activity</p>
              <p className="text-xs text-muted">Mar 2 – Mar 8</p>
            </div>
            <div className="mt-4 flex h-24 items-end gap-2 md:h-28">
              {[38, 62, 46, 78, 58, 92, 70, 84, 52, 96, 66, 74].map(
                (h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-full ${
                      i === 9 ? "bg-accent" : "bg-accent/15"
                    }`}
                  />
                ),
              )}
            </div>
          </div>

          {/* Release row */}
          <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-xs font-semibold text-foreground">
              v2.4
            </span>
            <div>
              <p className="text-xs font-semibold">Payments release shipped</p>
              <p className="text-xs text-muted">
                42 commits · staging to production in 11 minutes
              </p>
            </div>
            <span className="ml-auto rounded-full bg-[#e7f6ec] px-2 py-1 text-xs font-semibold text-[#1a9c46]">
              Deployed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
