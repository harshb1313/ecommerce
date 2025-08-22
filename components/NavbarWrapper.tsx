// components/NavbarWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

// Loading fallback for Navbar
function NavbarSkeleton() {
  return (
    <nav className="w-full bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="text-2xl font-bold text-blue-600">ShopEase</div>
        <div className="flex-1 h-10 bg-gray-100 rounded-full animate-pulse"></div>
        <div className="w-20 h-10 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </nav>
  );
}

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <Navbar />
    </Suspense>
  );
}