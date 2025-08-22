// Create this as app/api-test/page.tsx temporarily for debugging
"use client";

import { useState } from "react";

interface TestResult {
  test: string;
  status: string;
  data?: string;
  fullResponse?: unknown;
}

export default function ApiTestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("1");

  const formatResponse = (response: unknown): string => {
    try {
      return JSON.stringify(response, null, 2);
    } catch {
      return String(response);
    }
  };

  const testDirectAPI = async () => {
    setLoading(true);
    const newResults: TestResult[] = [];

    try {
      // Test 1: Direct fetch to Fake Store API
      newResults.push({ test: "Direct API Call", status: "testing..." });
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      
      newResults[newResults.length - 1] = {
        test: "Direct API Call",
        status: response.ok ? "✅ SUCCESS" : "❌ FAILED",
        data: response.ok ? data.title : `Error: ${response.status}`,
        fullResponse: data
      };
    } catch (error) {
      newResults[newResults.length - 1] = {
        test: "Direct API Call",
        status: "❌ ERROR",
        data: error instanceof Error ? error.message : "Unknown error"
      };
    }

    try {
      // Test 2: Using your API function
      newResults.push({ test: "Your API Function", status: "testing..." });
      const { getProductById } = await import("@/lib/api");
      const product = await getProductById(productId);
      
      newResults[newResults.length - 1] = {
        test: "Your API Function",
        status: "✅ SUCCESS",
        data: product.title,
        fullResponse: product
      };
    } catch (error) {
      newResults[newResults.length - 1] = {
        test: "Your API Function",
        status: "❌ ERROR",
        data: error instanceof Error ? error.message : "Unknown error"
      };
    }

    try {
      // Test 3: Check all products
      newResults.push({ test: "Get All Products", status: "testing..." });
      const { getProducts } = await import("@/lib/api");
      const products = await getProducts();
      
      newResults[newResults.length - 1] = {
        test: "Get All Products",
        status: "✅ SUCCESS",
        data: `Found ${products.length} products`,
        fullResponse: products.slice(0, 3) // First 3 products
      };
    } catch (error) {
      newResults[newResults.length - 1] = {
        test: "Get All Products",
        status: "❌ ERROR",
        data: error instanceof Error ? error.message : "Unknown error"
      };
    }

    setResults([...newResults]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">API Debug Test</h1>
      
      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={testDirectAPI}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Run API Tests"}
        </button>
      </div>

      <div className="space-y-4">
        {results.map((result, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg">{result.test}</h3>
            <p className="text-lg mt-1">{result.status}</p>
            <p className="text-gray-600 mt-2">{result.data}</p>
            
            {result.fullResponse !== undefined && (
              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600">Show Full Response</summary>
                <pre className="bg-gray-100 p-3 mt-2 rounded text-xs overflow-auto">
                  {formatResponse(result.fullResponse)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold">Debug Info:</h3>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'Server'}</p>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Server'}</p>
      </div>
    </div>
  );
}