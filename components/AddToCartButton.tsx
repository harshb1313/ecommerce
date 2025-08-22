"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";


type AddToCartButtonProps = 
  | {
      id: number;
      title: string;
      price: number;
      image?: string;
      product?: never;
    }
  | {
      product: Product;
      id?: never;
      title?: never;
      price?: never;
      image?: never;
    };

export default function AddToCartButton(props: AddToCartButtonProps) {
  const { dispatch } = useCart();


  const productData = props.product 
    ? {
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        image: props.product.image
      }
    : {
        id: props.id,
        title: props.title,
        price: props.price,
        image: props.image
      };

  const handleAddToCart = () => {
    dispatch({ 
      type: "ADD", 
      payload: productData
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
    >
      Add to Cart
    </button>
  );
}