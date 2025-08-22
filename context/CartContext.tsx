"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { CartItem } from "@/lib/types";

type State = { items: CartItem[] };
type Action =
  | { type: "INIT"; payload: CartItem[] }
  | { type: "ADD"; payload: Omit<CartItem, "qty"> }
  | { type: "REMOVE"; payload: number }
  | { type: "UPDATE_QTY"; payload: { id: number; qty: number } }
  | { type: "CLEAR" };

const CartContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return { items: action.payload };
    case "ADD": {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      } else {
        return {
          items: [...state.items, { ...action.payload, qty: 1 }],
        };
      }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch (e) {
     
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.items));
    } catch (e) {
    
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
