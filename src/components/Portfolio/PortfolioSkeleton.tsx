
import { Skeleton } from "@/components/ui/skeleton";

export const PortfolioSkeleton = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Skeleton */}
            <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md">
                <Skeleton className="h-8 w-32" />
                <div className="hidden md:flex gap-6">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
            </div>

            {/* Hero Skeleton */}
            <section className="min-h-screen flex items-center justify-center pt-20">
                <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-8">
                    {/* Profile Image */}
                    <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-full" />

                    {/* Title */}
                    <div className="space-y-4 w-full max-w-3xl flex flex-col items-center">
                        <Skeleton className="h-10 md:h-16 w-3/4" />
                        <Skeleton className="h-10 md:h-16 w-1/2" />
                    </div>

                    {/* Subtitle */}
                    <Skeleton className="h-6 md:h-8 w-2/3 max-w-2xl" />

                    {/* Description */}
                    <div className="space-y-2 w-full max-w-xl flex flex-col items-center">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
                        <Skeleton className="h-12 w-32 rounded-full" />
                        <Skeleton className="h-12 w-32 rounded-full" />
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-6 mt-8">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            </section>
        </div>
    );
};
