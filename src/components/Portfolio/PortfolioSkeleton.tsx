import { Skeleton } from "@/components/ui/skeleton";
export const PortfolioSkeleton = () => (
  <div
    className="page-width portfolio-loading"
    role="status"
    aria-label="Loading portfolio"
  >
    <div className="skeleton-header">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-48" />
    </div>
    <div className="hero-layout">
      <div className="space-y-6">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-3/4" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-40" />
      </div>
      <Skeleton className="aspect-square w-full" />
    </div>
    <span className="sr-only">Loading portfolio…</span>
  </div>
);
