import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";

import Coffee1 from "../../assets/images/Coffee-3.jpg";
import Coffee2 from "../../assets/images/Coffee-4.webp";
import Coffee3 from "../../assets/images/Coffee-13.jpg";

import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const carouselImages = [Coffee1, Coffee2, Coffee3];

  const messageCards = [
    { title: "Freshly Brewed", msg: "We serve coffee made from the finest beans, freshly brewed every day." },
    { title: "Premium Quality", msg: "Only the best quality coffee beans for the perfect cup every time." },
    { title: "Cozy Atmosphere", msg: "Enjoy your coffee in a relaxing and warm environment." },
    { title: "Expert Baristas", msg: "Our skilled baristas craft every cup to perfection." },
  ];

  const productCards = [
    {
      title: "Espresso Delight",
      price: "$12.99",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Cappuccino Heaven",
      price: "$14.99",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Mocha Magic",
      price: "$13.99",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=60",
    },
  ];

  const handleExplore = () => {
    if (currentUser) navigate("/products");
    else alert("Please login to explore products!");
  };

  const handleViewProduct = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  // ✅ FINAL Add to Cart Logic
  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please login to add products to cart!");
      navigate("/login");
      return;
    }

    if (currentUser.role !== "user") {
      alert("Only customers can add products to cart!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.title} added to cart successfully!`);
    closeModal();
  };

  return (
    <>
      <Navbar />
      <Carousel images={carouselImages} interval={4000} />

      {/* WHY CHOOSE US */}
      <section className="cards-section">
        <h2>Why Choose Us?</h2>
        <div className="cards-container message-cards">
          {messageCards.map((card, index) => (
            <div className="card message-card" key={index}>
              <h3>{card.title}</h3>
              <p>{card.msg}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="section-card">
        <h2>Welcome to Coffee Lovers</h2>
        <p>
          Discover the finest coffees from around the world. Explore, enjoy, and share your love for coffee!
        </p>
        <button onClick={handleExplore}>Explore Products</button>
      </section>

      {/* PRODUCTS */}
      <section className="cards-section">
        <h2>Our Coffees</h2>
        <div className="cards-container product-cards">
          {productCards.map((coffee, index) => (
            <div className="card product-card" key={index}>
              <img src={coffee.img} alt={coffee.title} />
              <h3>{coffee.title}</h3>
              <p>{coffee.price}</p>
              <button onClick={() => handleViewProduct(coffee)}>View Product</button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProduct.title}</h3>
            <img src={selectedProduct.img} alt={selectedProduct.title} />
            <p>Price: {selectedProduct.price}</p>
            <p>Description: Premium handcrafted coffee prepared with passion.</p>

            <div className="modal-buttons">
              <button onClick={closeModal}>Close</button>

              {/* ✅ Always visible */}
              <button onClick={() => handleAddToCart(selectedProduct)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Home;
