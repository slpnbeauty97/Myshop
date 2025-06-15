import React from "react";
import "../assets/styles.css";

const products = [
  { id: 1, name: "T-Handle Tool", price: "KES 1,400", image: "/img1.png"},
  { id: 2, name: "Chrome Earrings", price: "KES 2,200", image: "/img2.png", soldOut:true},

  // duplicates
  { id: 3, name: "T-Handle Tool", price: "KES 1,400", image: "/img1.png"},
];

export default function Home() {
  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <nav className="space-x-8 text-sm font-medium text-white">
          <a href="#" className="text-white hover:text-gray-400 no-underline">Home</a>
          <a href="#" className="text-white hover:text-gray-400 no-underline">Catalog</a>
          <a href="#" className="text-white hover:text-gray-400 no-underline">Contact</a>
        </nav>
        <div className="space-x-5 text-xl">
          <i className="ri-search-line" aria-label="Search" role="button" tabIndex={0}></i>
          <i className="ri-user-line" aria-label="User account" role="button" tabIndex={0}></i>
          <i className="ri-shopping-bag-line" aria-label="Shopping bag" role="button" tabIndex={0}></i>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-black">
        <img
          src="/banner.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }} // Medium brightness
        />
        <div className="absolute inset-0 bg-black opacity-25"></div> {/* Subtle overlay */}

        <div className="relative z-10 flex h-full w-full items-center justify-between px-10 max-w-7xl mx-auto">
          <h1 className="text-7xl font-extrabold leading-none max-w-xl">
            My Store
          </h1>
          <p className="text-right max-w-sm text-gray-300 text-lg">
            With a focus on quality and design, we curate products that enhance your everyday.
          </p>
        </div>
      </section>

      {/* Product Grid */}
<section className="px-4 py-12 max-w-7xl mx-auto">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white text-black p-3 rounded-lg shadow-sm hover:shadow-md transition relative"
      >
        {/* 🔒 Tight Image Frame */}
        <div className="w-full h-44 overflow-hidden rounded-md mb-3 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <h4 className="text-sm font-semibold mb-1">{product.name}</h4>
        <p className="text-gray-600 text-sm">{product.price}</p>

        {product.soldOut && (
          <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
            Sold out
          </span>
        )}
      </div>
    ))}
  </div>
</section>

    </div>
  );
}
