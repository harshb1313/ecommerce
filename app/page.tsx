import { Suspense } from "react";
import ProductList from "@/components/ProductList";

function ProductListSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
    
      <aside className="md:col-span-1">
        <div className="p-4 border rounded space-y-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 rounded bg-gray-100 animate-pulse w-12 h-8"></div>
              <div className="px-3 py-1 rounded bg-gray-100 animate-pulse w-20 h-8"></div>
              <div className="px-3 py-1 rounded bg-gray-100 animate-pulse w-16 h-8"></div>
              <div className="px-3 py-1 rounded bg-gray-100 animate-pulse w-18 h-8"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="w-full h-8 bg-gray-100 animate-pulse rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 animate-pulse h-10 rounded"></div>
            <div className="flex-1 bg-gray-100 animate-pulse h-10 rounded"></div>
          </div>
        </div>
      </aside>

      
      <main className="md:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 space-y-3">
              <div className="w-full h-48 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2"></div>
              <div className="h-5 bg-gray-100 animate-pulse rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>

    </div>
  );
}
