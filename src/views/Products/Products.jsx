import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import useConfirmDelete from '../../hooks/useConfirmDelete';
import Footer from '../../components/Footer/Footer';
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterDropdown, setFilterDropdown] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const confirmDelete = useConfirmDelete("CoffeeWorld");

  // 🔐 Current user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isSeller = currentUser?.role === "seller"; // Only seller sees CRUD
  const isCustomer = currentUser?.role === "user"; // Customer sees only View

  // Load products from API
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()))
    .filter(p => filterDropdown === "" ? true : p.category === filterDropdown);

  // ➕ Add Product (Seller only)
  const addProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      title: form.title.value,
      price: Number(form.price.value),
      description: form.description.value,
      category: form.category.value,
      image: "https://i.pravatar.cc/300",
    };
    axios.post("https://fakestoreapi.com/products", newProduct).then(res => {
      setProducts([...products, res.data]);
      form.reset();
      alert("Product Added");
    });
  };

  // ✏️ Update Product (Seller only)
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      title: form.title.value,
      price: Number(form.price.value),
      description: form.description.value,
      category: form.category.value,
      image: "https://i.pravatar.cc/300",
    };
    axios.put(`https://fakestoreapi.com/products/${editProduct.id}`, updatedProduct)
      .then(res => {
        setProducts(products.map(p => p.id === editProduct.id ? res.data : p));
        setEditProduct(null);
        alert("Product Updated");
      });
  };

  // ❌ Delete Product (Seller only)
  const handleDelete = (id, title) => {
    if (confirmDelete(title)) {
      axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
        setProducts(products.filter(p => p.id !== id));
        alert("Product Deleted");
      });
    }
  };

  return (
    <div>
      <Navbar />

      {/* Search + Filter */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
        <input
          type="text"
          className='inputBox searchbar'
          placeholder="Search Product..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className='inputBox searchbar'
          value={filterDropdown}
          onChange={(e) => setFilterDropdown(e.target.value)}
        >
          <option value="">Filter by Category</option>
          {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Add Product Form (Seller only) */}
      {isSeller && (
        <form onSubmit={addProduct} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", margin: "20px 0" }}>
          <input className='inputBox' name="title" placeholder="Title" required />
          <input className='inputBox' name="price" type="number" placeholder="Price" required />
          <input className='inputBox' name="description" placeholder="Description" required />
          <input className='inputBox' name="category" placeholder="Category" required />
          <Button type="submit" text="Add Product" />
        </form>
      )}

      {/* Products Table */}
      <table border="1" style={{ margin: "20px", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>{p.category}</td>
              <td>
                {/* Everyone can view */}
                <Button text="View" onClick={() => setViewProduct(p)} />

                {/* Only seller can edit/delete */}
                {isSeller && (
                  <>
                    <Button text="Edit" onClick={() => setEditProduct(p)} />
                    <Button text="Delete" onClick={() => handleDelete(p.id, p.title)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewProduct && (
        <Modal onClose={() => setViewProduct(null)}>
          <h3>Product Details</h3>
          <p><b>Title:</b> {viewProduct.title}</p>
          <p><b>Price:</b> {viewProduct.price}</p>
          <p><b>Description:</b> {viewProduct.description}</p>
          <p><b>Category:</b> {viewProduct.category}</p>
          <img src={viewProduct.image} width="120" />
          <Button text="Close" onClick={() => setViewProduct(null)} />
        </Modal>
      )}

      {/* Edit Modal (Seller only) */}
      {isSeller && editProduct && (
        <Modal onClose={() => setEditProduct(null)}>
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdate}>
            <input name="title" defaultValue={editProduct.title} required />
            <input name="price" type="number" defaultValue={editProduct.price} required />
            <input name="description" defaultValue={editProduct.description} required />
            <input name="category" defaultValue={editProduct.category} required />
            <Button type="submit" text="Update" />
            <Button text="Cancel" onClick={() => setEditProduct(null)} />
          </form>
        </Modal>
      )}

      <Footer />
    </div>
  );
}

export default Products;
