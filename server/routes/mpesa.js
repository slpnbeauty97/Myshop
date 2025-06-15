import React, { useState } from "react";
import "../assets/styles.css";

const products = [
  { id: 1, name: "T-Handle Tool", price: 1400, image: "/img1.png" },
  { id: 2, name: "Cyber$3x!2K!Tee", price: 2200, image: "/img2.png", soldOut: true },
  { id: 3, name: "T-Handle Tool", price: 1400, image: "/img3.png" },
  { id: 4, name: "T-Handle Tool", price: 1400, image: "/img1.png" },
];

export default function Home() {
  const [phones, setPhones] = useState({});
  const [messages, setMessages] = useState({});

  async function handleBuyNow(productId) {
    const phone = phones[productId];
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    const product = products.find((p) => p.id === productId);

    try {
      const res = await fetch("http://localhost:3001/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: product.price }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((msgs) => ({ ...msgs, [productId]: "Check your phone for M-Pesa prompt!" }));
      } else {
        setMessages((msgs) => ({ ...msgs, [productId]: data.error || "Failed to initiate payment" }));
      }
    } catch (error) {
      setMessages((msgs) => ({ ...msgs, [productId]: "Network error" }));
    }
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <nav className="space-x-8 text-sm font-medium text-white">
          <a href="#" className="text-white hover:text-gray-400 no-underline">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-400 no-underline">
            Catalog
          </a>
          <a href="#" className="text-white hover:text-gray-400 no-underline">
            Contact
          </a>
        </nav>
        <div className="space-x-5 text-xl relative">
          <i
            className="ri-search-line"
            aria-label="Search"
            role="button"
            tabIndex={0}
          ></i>
          <i
            className="ri-user-line"
            aria-label="User account"
            role="button"
            tabIndex={0}
          ></i>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-black">
        <img
          src="/banner.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0 bg-black opacity-25"></div>

        <div className="relative z-10 flex h-full w-full items-center justify-between px-10 max-w-7xl mx-auto">
          <h1 className="text-7xl font-extrabold leading-none max-w-xl">My Store</h1>
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
              className="bg-white text-black p-3 rounded-lg shadow-sm hover:shadow-md transition relative flex flex-col items-center"
            >
              {/* Image */}
              <div className="w-full h-44 overflow-hidden rounded-md mb-3 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h4 className="text-sm font-semibold mb-1">{product.name}</h4>
              <p className="text-gray-600 text-sm mb-2">KES {product.price}</p>

              {product.soldOut ? (
                <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                  Sold out
                </span>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter phone (07XXXXXXXX)"
                    value={phones[product.id] || ""}
                    onChange={(e) =>
                      setPhones((prev) => ({ ...prev, [product.id]: e.target.value }))
                    }
                    className="mb-2 px-3 py-2 rounded text-black w-full"
                  />

                  <button
                    onClick={() => handleBuyNow(product.id)}
                    className="mt-1 w-full py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700"
                  >
                    Buy Now
                  </button>

                  {messages[product.id] && (
                    <p className="mt-2 text-sm text-green-600">{messages[product.id]}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-900 rounded-xl text-white mt-16">
        <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
        <p className="mb-6 text-gray-300 max-w-xl">
          Subscribe to our newsletter for the latest updates, exclusive offers, and more.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-grow px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
