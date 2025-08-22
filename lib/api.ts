import axios from "axios";
import { Product } from "./types";

const BASE = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${BASE}/products`);
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`${BASE}/products/${id}`);
  return res.data;
};

export const getCategories = async (): Promise<string[]> => {
  const res = await axios.get<string[]>(`${BASE}/products/categories`);
  return res.data;
};
