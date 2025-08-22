"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts, getCategories } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import { parsePriceParam } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function ProductList() {
  const [all, setAll] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();


  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([getProducts(), getCategories()]);
        if (!mounted) return;
        setAll(productsRes);
        setCategories(categoriesRes);
      } catch (e) {
        console.error("Failed to fetch products or categories", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const qCategory = searchParams?.get("category") ?? "";
  const qPrice = searchParams?.get("price") ?? "";
  const qSearch = searchParams?.get("search") ?? "";


  const filtered = useMemo(() => {
    if (!all) return [];
    let list = all;

 
    if (qCategory) {
      list = list.filter((p) => p.category.toLowerCase() === qCategory.toLowerCase());
    }

 
    const { min, max } = parsePriceParam(qPrice);
    list = list.filter((p) => p.price >= min && p.price <= max);


    if (qSearch) {
      const q = qSearch.toLowerCase();
      list = list.filter((p) => (p.title + " " + p.description).toLowerCase().includes(q));
    }

    return list;
  }, [all, qCategory, qPrice, qSearch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">

      <aside className="md:col-span-1">
        <Filters categories={categories} />
      </aside>

      <main className="md:col-span-3">
        {loading ? (
          <p>Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No products found for selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
