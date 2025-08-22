"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const qCategory = params?.get("category") ?? "";
  const qPrice = params?.get("price") ?? ""; 
  const [category, setCategory] = useState(qCategory);
  const [price, setPrice] = useState(qPrice);

  useEffect(() => {
    setCategory(qCategory);
    setPrice(qPrice);
  }, [qCategory, qPrice]);

  const apply = () => {
    const qp = new URLSearchParams(Array.from(params.entries()));
    if (category) qp.set("category", category);
    else qp.delete("category");

    if (price) qp.set("price", price);
    else qp.delete("price");

    router.push("/" + (qp.toString() ? "?" + qp.toString() : ""));
  };

  const clearAll = () => {
    const qp = new URLSearchParams(Array.from(params.entries()));
    qp.delete("category");
    qp.delete("price");
    router.push("/" + (qp.toString() ? "?" + qp.toString() : ""));
  };

  return (
    <div className="p-4 border rounded space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`px-3 py-1 rounded ${category === "" ? "bg-blue-600 text-white" : "border"}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded ${category === c ? "bg-blue-600 text-white" : "border"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Price range</h4>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border px-2 py-1 rounded">
          <option value="">All</option>
          <option value="0-25">Under $25</option>
          <option value="25-50">$25 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-1000">Above $100</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={apply} className="flex-1 bg-blue-600 text-white px-3 py-2 rounded">
          Apply
        </button>
        <button onClick={clearAll} className="flex-1 border px-3 py-2 rounded">
          Clear
        </button>
      </div>
    </div>
  );
}
