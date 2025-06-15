import React, { useState } from "react";
import "../assets/styles.css";

const products = [
  { id: 1, name: "T-Handle Tool", price: "1400", image: "/img1.png" },
  { id: 2, name: "Cyber$3x!2K!Tee", price: "2200", image: "/img2.png", soldOut: true },
  { id: 3, name: "T-Handle Tool", price: "1400", image: "/img3.png" },
  { id: 4, name: "T-Handle Tool", price: "1400", image: "/img1.png" },
];

export default function Home() {
  const [visibleInstructionId, setVisibleInstructionId] = useState(null);

  const handleBuy = (product) => {
    if (product.soldOut) {
      alert("Sorry, this product is sold out!");
      return;
    }
    setVisibleInstructionId(prev =>
      prev === product.id ? null : product.id
    );
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Navbar */}
    <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
  <nav className="space-x-8 text-sm font-medium text-white">
    <a href="https://christo4ryoung.store/">Home</a>
    <a href="https://soundcloud.com/slpnbeauty/sets/cybers3x2k">Catalog</a>
    <a href="https://www.instagram.com/slpn.beauty">Contact</a>
  </nav>
</header>

      {/* Hero */}
      <section className="relative h-[80vh] bg-black">
        <img
          src="/banner.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 flex h-full w-full items-center justify-between px-10 max-w-7xl mx-auto">
          <h1 className="text-7xl font-extrabold max-w-xl">My Merch</h1>
          <p className="text-right max-w-sm text-gray-300 text-lg">
            From Chrx! Latest Album! Shop Some lovely Merch!
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white text-black p-3 rounded-lg shadow-sm relative">
              <div className="w-full h-44 bg-gray-100 rounded overflow-hidden mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-semibold mb-1">{product.name}</h4>
              <p className="text-gray-600 text-sm">KES {product.price}</p>
              {product.soldOut && (
                <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                  Sold out
                </span>
              )}
              <button
                onClick={() => handleBuy(product)}
                disabled={product.soldOut}
                className={`mt-3 w-full py-2 rounded text-white font-semibold ${
                  product.soldOut ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {product.soldOut ? "Sold Out" : "Buy Now"}
              </button>

              {visibleInstructionId === product.id && (
                <div className="mt-4 p-4 bg-black text-white text-sm rounded-lg border border-green-700 space-y-2">
                  <p className="font-semibold">Manual M-PESA Payment</p>
                  <p>1. Go to <strong>Lipa na M-PESA</strong></p>
                  <p>2. Select <strong>Paybill</strong></p>
                  <p>
                    3. Business Number: <span className="font-semibold">123456</span>{" "}
                    <button onClick={() => navigator.clipboard.writeText("123456")} className="text-blue-400 underline text-xs ml-1">Copy</button>
                  </p>
                  <p>
                    4. Account Number: <span className="font-semibold">ORDER{product.id}</span>{" "}
                    <button onClick={() => navigator.clipboard.writeText(`ORDER${product.id}`)} className="text-blue-400 underline text-xs ml-1">Copy</button>
                  </p>
                  <p>
                    5. Amount: <span className="font-semibold">KES {product.price}</span>{" "}
                    <button onClick={() => navigator.clipboard.writeText(product.price)} className="text-blue-400 underline text-xs ml-1">Copy</button>
                  </p>
                  <p>6. Send confirmation to <strong>0700 000 000</strong> (WhatsApp)</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
