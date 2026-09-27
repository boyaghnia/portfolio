import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      <main className="container mx-auto px-4 pb-20 max-w-7xl relative z-10 animate-pulse">
        {/* Hero Section Placeholder */}
        <div className="pt-16 pb-8 flex flex-col items-center text-center">
          <div className="h-8 w-48 bg-muted rounded-none mb-3" />
          <div className="h-4 w-72 bg-muted/60 rounded-none" />
        </div>

        {/* Featured Post Skeleton */}
        <div className="mt-4 mb-6 rounded-none border border-border/40 bg-card/40 p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-[420px] bg-muted/70" />
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-muted" />
                  <div className="h-4 w-24 bg-muted/60" />
                </div>
                <div className="h-8 w-full bg-muted/80" />
                <div className="h-8 w-3/4 bg-muted/80" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full bg-muted/50" />
                  <div className="h-4 w-5/6 bg-muted/50" />
                </div>
              </div>
              <div className="h-4 w-32 bg-muted/60" />
            </div>
          </div>
        </div>

        {/* 8 Cols Articles + 4 Cols Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Articles Skeleton */}
          <div className="lg:col-span-8 space-y-6">
            <div className="pb-3 border-b border-border/40 flex justify-between items-center">
              <div className="h-6 w-44 bg-muted" />
              <div className="h-4 w-24 bg-muted/50" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-none border border-border/40 bg-card/40 p-4 space-y-4"
                >
                  <div className="h-48 w-full bg-muted/70" />
                  <div className="h-5 w-3/4 bg-muted" />
                  <div className="h-4 w-full bg-muted/50" />
                  <div className="h-4 w-2/3 bg-muted/50" />
                  <div className="flex justify-between pt-2">
                    <div className="h-3 w-16 bg-muted/40" />
                    <div className="h-3 w-16 bg-muted/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="lg:col-span-4 space-y-5">
            {/* Search Skeleton */}
            <div className="p-4 rounded-none border border-border/40 bg-card/40 space-y-3">
              <div className="h-4 w-24 bg-muted" />
              <div className="h-9 w-full bg-muted/60" />
            </div>

            {/* Coffee Skeleton */}
            <div className="p-4 rounded-none border border-rose-500/20 bg-rose-500/5 h-14" />

            {/* Categories Skeleton */}
            <div className="p-4 rounded-none border border-border/40 bg-card/40 space-y-3">
              <div className="h-4 w-28 bg-muted" />
              <div className="h-8 w-full bg-muted/40" />
              <div className="h-8 w-full bg-muted/40" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
