
"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const add = () => {
    dispatch({
      type: "ADD",
      payload: { id: product.id, title: product.title, price: product.price, image: product.image },
    });
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col">
      <Link href={`/product/${product.id}`} className="mb-2">
        <div className="h-40 w-full flex items-center justify-center bg-gray-100 rounded">
          <img src={product.image} alt={product.title} className="max-h-36 object-contain" />
        </div>
      </Link>

      <Link href={`/product/${product.id}`} className="mt-3 flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={add}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <Link href={`/product/${product.id}`} className="px-3 py-2 border rounded text-sm">
          View
        </Link>
      </div>
    </div>
  );
}
