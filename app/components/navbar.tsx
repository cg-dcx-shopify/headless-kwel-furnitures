"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import { useCartDrawer } from "@/app/context/CartDrawerContext";

export default function Navbar() {
  const { openDrawer } = useCartDrawer();

  return (
    <nav className="w-full border-b mb-0">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Kwel Furniture
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link
            href="/"
            className="hover:text-gray-600"
          >
            Home
          </Link>

          <Link
            href="/collections"
            className="hover:text-gray-600"
          >
            Collections
          </Link>

          <Link
            href="/products"
            className="hover:text-gray-600"
          >
            Products
          </Link>

          <Link
            href="/lookbook"
            className="hover:text-gray-600"
          >
            Lookbook
          </Link>

          <Link
            href="/login"
            className="hover:text-gray-600"
          >
            Login
          </Link>
         
          <button
            onClick={openDrawer}
            className="relative"
          >
            <FaShoppingCart size={20} />
          </button>

        </div>
      </div>
    </nav>
  );
}