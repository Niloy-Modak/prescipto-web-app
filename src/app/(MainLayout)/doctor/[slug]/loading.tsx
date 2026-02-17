import React from "react";

const SkeletonCard = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white/50 p-6 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const SkeletonLine = ({ className = "" }: { className?: string }) => (
  <div className={`bg-slate-200 animate-pulse rounded-md ${className}`} />
);

const DoctorLoading = () => {
  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN - Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-6">
          <SkeletonCard className="flex flex-col items-center text-center p-8">
            {/* Profile Image Skeleton */}
            <div className="w-32 h-32 rounded-full bg-slate-200 animate-pulse mb-6" />

            {/* Name and Title Skeleton */}
            <SkeletonLine className="h-6 w-3/4 mb-2" />
            <SkeletonLine className="h-4 w-1/2 mb-6" />

            <div className="w-full pt-4 border-t border-slate-100">
              <SkeletonLine className="h-3 w-1/3 mx-auto mb-2" />
              <SkeletonLine className="h-8 w-1/4 mx-auto" />
            </div>
          </SkeletonCard>

          {/* Clinic Location Skeleton */}
          <SkeletonCard>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded bg-primary/20 animate-pulse" />
              <SkeletonLine className="h-5 w-1/2" />
            </div>
            <SkeletonLine className="h-4 w-3/4 mb-2" />
            <SkeletonLine className="h-3 w-full" />
          </SkeletonCard>
        </div>

        {/* RIGHT COLUMN - Main Content Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          {/* About Section Skeleton */}
          <SkeletonCard className="p-8">
            <SkeletonLine className="h-7 w-1/3 mb-6" />
            <div className="space-y-3 mb-8">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-2/3" />
            </div>

            <SkeletonLine className="h-3 w-20 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 w-28 rounded-full bg-slate-200 animate-pulse"
                />
              ))}
            </div>
          </SkeletonCard>

          {/* Booking Section Skeleton */}
          <SkeletonCard className="h-48 border-primary/10 bg-primary/[0.02]">
            <div className="flex justify-between items-center mb-6">
              <SkeletonLine className="h-6 w-1/4" />
              <SkeletonLine className="h-6 w-1/4" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl bg-white border border-slate-200 animate-pulse"
                />
              ))}
            </div>
          </SkeletonCard>

          {/* Bottom Grid: Experience & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Skeleton */}
            <SkeletonCard className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-slate-100 rounded-lg w-10 h-10 animate-pulse" />
                <SkeletonLine className="h-6 w-1/2" />
              </div>
              <div className="space-y-8 pl-4 border-l-2 border-slate-100">
                {[1, 2].map((i) => (
                  <div key={i} className="relative space-y-2">
                    <SkeletonLine className="h-4 w-3/4" />
                    <SkeletonLine className="h-3 w-1/2" />
                    <SkeletonLine className="h-2 w-1/4" />
                  </div>
                ))}
              </div>
            </SkeletonCard>

            {/* Education/Awards Skeleton */}
            <div className="space-y-6">
              <SkeletonCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg w-10 h-10 animate-pulse" />
                  <SkeletonLine className="h-6 w-1/2" />
                </div>
                <div className="space-y-4">
                  <SkeletonLine className="h-4 w-full" />
                  <SkeletonLine className="h-3 w-2/3" />
                </div>
              </SkeletonCard>

              <SkeletonCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg w-10 h-10 animate-pulse" />
                  <SkeletonLine className="h-6 w-1/2" />
                </div>
                <div className="space-y-3">
                  <SkeletonLine className="h-3 w-full" />
                  <SkeletonLine className="h-3 w-5/6" />
                </div>
              </SkeletonCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoading;
