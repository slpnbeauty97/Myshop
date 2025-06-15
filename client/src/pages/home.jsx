import React from "react";
import "../assets/styles.css";

const products = [
  { id: 1, name: "T-Handle Tool", price: "KES 1,400", image: "/img1.jpg" },
  { id: 2, name: "Chrome Earrings", price: "KES 2,200", image: "/img2.jpg", soldOut: true },
];

export default function Home() {
  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />

        <nav className="space-x-6 text-sm font-medium text-white">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Catalog</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </nav>
        <div className="space-x-4 text-lg">
          <i className="ri-search-line"></i>
          <i className="ri-user-line"></i>
          <i className="ri-shopping-bag-line"></i>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-black">
        <img
          src="/banner.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex h-full w-full items-center justify-between px-10">
          <h1 className="text-7xl font-extrabold leading-none">My Store</h1>
          <p className="text-right max-w-sm text-gray-300 text-lg">
            With a focus on quality and design, we curate products that enhance your everyday.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md transition relative">
              <img src={product.image} alt={product.name} className="w-full h-72 object-cover rounded-md mb-4" />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.price}</p>
              {product.soldOut && (
                <span className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">Sold out</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
