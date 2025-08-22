import axios from "axios";
import { Product } from "./types";

const BASE = "https://fakestoreapi.com";

// Add axios timeout and retry logic
const apiClient = axios.create({
  baseURL: BASE,
  timeout: 10000, // 10 second timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Add request/response interceptors for debugging
apiClient.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} for ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.message}`, {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const getProducts = async (): Promise<Product[]> => {
  try {
    console.log("Fetching all products...");
    const res = await apiClient.get<Product[]>("/products");
    console.log(`Successfully fetched ${res.data.length} products`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    console.log(`Fetching product with ID: ${id}`);
    
    // Validate ID format
    if (!id || id.trim() === '') {
      throw new Error('Product ID is required');
    }
    
    // Check if ID is numeric (Fake Store API expects numeric IDs)
    const numericId = parseInt(id);
    if (isNaN(numericId) || numericId <= 0) {
      throw new Error(`Invalid product ID format: ${id}`);
    }
    
    const res = await apiClient.get<Product>(`/products/${numericId}`);
    
    if (!res.data || Object.keys(res.data).length === 0) {
      throw new Error(`Product not found for ID: ${id}`);
    }
    
    console.log(`Successfully fetched product: ${res.data.title}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(`Product not found for ID: ${id}`);
      }
      if (error.response.status >= 500) {
        throw new Error(`Server error: ${error.response.status}`);
      }
    }
    
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    console.log("Fetching categories...");
    const res = await apiClient.get<string[]>("/products/categories");
    console.log(`Successfully fetched ${res.data.length} categories`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Utility function to test API connectivity
export const testApiConnection = async (): Promise<boolean> => {
  try {
    console.log("Testing API connection...");
    await apiClient.get("/products/1");
    console.log("API connection successful");
    return true;
  } catch (error) {
    console.error("API connection failed:", error);
    return false;
  }
};