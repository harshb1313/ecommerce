// app/product/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Product } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Client-side: Fetching product with ID:", productId);
        const fetchedProduct = await getProductById(productId);
        console.log("Client-side: Successfully fetched product:", fetchedProduct.title);
        setProduct(fetchedProduct);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.error("Client-side: Failed to fetch product:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 h-96 rounded animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3"></div>
            <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-100 rounded animate-pulse w-1/4"></div>
            <div className="h-12 bg-gray-100 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-sm">
          <strong>Debug Info:</strong> ID: {productId} | Found: {!!product} | Client-side rendered
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 flex items-center justify-center p-4 rounded">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-96 object-contain"
            onError={(e) => {
              console.error("Image failed to load:", product.image);
              e.currentTarget.src = "/placeholder-image.jpg";
            }}
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-sm text-gray-500">Category: {product.category}</p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}