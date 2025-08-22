import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import NavbarWrapper from "@/components/NavbarWrapper";

export const metadata = {
  title: "ShopEase",
  description: "Ecommerce prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <NavbarWrapper/>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
