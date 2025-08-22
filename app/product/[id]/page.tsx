import { getProductById } from "@/lib/api";
import { Product } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  let product: Product | null = null;
  try {
    product = await getProductById(resolvedParams.id);
  } catch (e) {
    console.error("Failed to fetch product", e);
  }

  if (!product) {
    return <div className="p-8">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-100 flex items-center justify-center p-4 rounded">
       
        <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
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
  );
}