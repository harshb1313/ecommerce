import axios from "axios";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string; // Fake Store API uses `image`, not `thumbnail`
};

export default async function Home() {
  try {
    // Fetch products (returns an array directly)
    const res = await axios.get("https://fakestoreapi.com/products");
    const products: Product[] = res.data;

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.image} // ✅ use `image`
                alt={product.title}
                className="w-full h-40 object-contain rounded mb-2 bg-gray-100"
              />
              <h2 className="font-semibold text-lg line-clamp-2">
                {product.title}
              </h2>
              <p className="text-gray-600">${product.price}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="p-8">
        <p className="text-red-500">⚠️ Failed to load products.</p>
      </div>
    );
  }
}
