export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-orange-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">SignalAhead</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Signal Squad &middot; Hack Malenadu &apos;26 &middot; Consumer &amp; Retail Track
          </p>
        </div>
      </div>
    </footer>
  )
}
