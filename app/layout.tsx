import "./globals.css";
import "./components/main.css";

import Navbar from "./components/navbar";
import Footer from "./components/Footer/Footer";

import { CartDrawerProvider } from "@/app/context/CartDrawerContext";
import CartDrawer from "@/app/components/cart/cartDrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartDrawerProvider>

          <Navbar />

          {children}

          <Footer />

          <CartDrawer />

        </CartDrawerProvider>
      </body>
    </html>
  );
}