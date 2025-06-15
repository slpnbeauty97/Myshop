import React, { useState } from "react";

const products = [
  { id: 1, name: "T-Handle Tool", price: 1400, image: "/img1.png" },
  { id: 2, name: "Cyber$3x!2K!Tee", price: 2200, image: "/img2.png", soldOut: true },
  { id: 3, name: "T-Handle Tool", price: 1400, image: "/img3.png" },
  { id: 4, name: "T-Handle Tool", price: 1400, image: "/img1.png" },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("");

  function formatPhone(input) {
    let formatted = input.trim();
    if (formatted.startsWith("0")) {
      formatted = "254" + formatted.slice(1);
    } else if (formatted.startsWith("+")) {
      formatted = formatted.slice(1);
    } else if (!formatted.startsWith("254")) {
      formatted = "254" + formatted;
    }
    return formatted;
  }

  function openModal(product) {
    setSelectedProduct(product);
    setPhone("");
    setMessage(null);
    setModalOpen(true);
  }

  async function submitPayment() {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formatPhone(phone),
          amount: selectedProduct.price,
          productName: selectedProduct.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Payment request sent for ${selectedProduct.name}. Check your phone to complete payment.`);
        setModalOpen(false);
      } else {
        setMessage(`❌ Payment failed: ${data.error || "Try again later."}`);
      }
    } catch (err) {
      setMessage("❌ Error connecting to server.");
    }
    setLoading(false);
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <nav className="space-x-8 text-sm font-medium text-white">
          <a href="#" className="text-white hover:text-gray-400 no-underline">Home</a>
          <a href="#" className="text-white hover:text-gray-400 no-underline">Catalog</a>
          <a href="#" className="text-white hover:text-gray-400 no-underline">Contact</a>
        </nav>
        <div className="space-x-5 text-xl relative">
          <i className="ri-search-line" aria-label="Search" role="button" tabIndex={0}></i>
          <i className="ri-user-line" aria-label="User account" role="button" tabIndex={0}></i>
          <div className="relative inline-block">
            <i className="ri-shopping-bag-line" aria-label="Shopping bag" role="button" tabIndex={0}></i>
            {/* Cart count - optional */}
          </div>
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
              className="bg-white text-black p-3 rounded-lg shadow-sm hover:shadow-md transition relative flex flex-col"
            >
              <div className="w-full h-44 overflow-hidden rounded-md mb-3 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h4 className="text-sm font-semibold mb-1">{product.name}</h4>
              <p className="text-gray-600 text-sm">KES {product.price.toLocaleString()}</p>

              {product.soldOut && (
                <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                  Sold out
                </span>
              )}

              <button
                onClick={() => openModal(product)}
                disabled={product.soldOut}
                className={`mt-auto w-full py-2 rounded text-white font-semibold ${
                  product.soldOut
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {product.soldOut ? "Sold Out" : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Toast / Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 text-center mb-6 text-lg text-green-400">
          {message}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => !loading && setModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded max-w-sm w-full text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Enter your phone number</h3>
            <input
              type="tel"
              placeholder="07XXXXXXXX or 2547XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 mb-4"
              disabled={loading}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => !loading && setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={submitPayment}
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
