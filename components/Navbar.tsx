"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react"; 
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params?.get("search") ?? "";
  const [search, setSearch] = useState(initial);
  const { state } = useCart();

  useEffect(() => {
   
    setSearch(params?.get("search") ?? "");
  }, [params]);

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const qp = new URLSearchParams(Array.from(params.entries()));
    if (search) qp.set("search", search);
    else qp.delete("search");
    router.push("/" + (qp.toString() ? "?" + qp.toString() : ""));
  };

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        
        <form onSubmit={submitSearch} className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>

        
        <Link
          href="/cart"
          className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-50"
        >
          <ShoppingCart size={20} />
          <span className="font-medium">Cart</span>
          <span className="bg-blue-600 text-white rounded-full px-2 text-sm">
            {state.items.reduce((s, i) => s + i.qty, 0)}
          </span>
        </Link>
      </div>
    </nav>
  );
}
