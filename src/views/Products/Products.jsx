import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterDropdown, setFilterDropdown] = useState("");

  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  // Load Products
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((p) =>
      filterDropdown === "" ? true : p.category === filterDropdown
    );

  // Add Product
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

    axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then((res) => {
        setProducts([...products, res.data]);
        form.reset();
        alert("Product Added");
      });
  };

  // Update
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

    axios
      .put(`https://fakestoreapi.com/products/${editProduct.id}`, updatedProduct)
      .then((res) => {
        setProducts(products.map((p) => (p.id === editProduct.id ? res.data : p)));
        setEditProduct(null);
        alert("Updated");
      });
  };

  // Delete
  const handleDelete = (id) => {
    axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
      setProducts(products.filter((p) => p.id !== id));
      alert("Deleted");
    });
  };

  return (
    <div>
      <h2>Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Product..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Filter */}
      <select
        value={filterDropdown}
        onChange={(e) => setFilterDropdown(e.target.value)}
      >
        <option value="">Filter by Category</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Add Product */}
      <form onSubmit={addProduct}>
        <input type="text" name="title"  placeholder="Title" required />
        <input type="number" name="price" placeholder="Price" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="text" name="category" placeholder="Category" required />
        <Button type="submit" text="Add Product" />
      </form>

      {/* Products Table */}
      <table border="1">
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
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>{p.category}</td>

              <td>
                <Button onClick={() => setViewProduct(p)} text="View" />
                <Button onClick={() => setEditProduct(p)} text="Edit" />
                <Button onClick={() => handleDelete(p.id)} text="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- VIEW MODAL ---------- */}
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

      {/* ---------- EDIT MODAL ---------- */}
      {editProduct && (
        <Modal onClose={() => setEditProduct(null)}>
          <h3>Edit Product</h3>

          <form onSubmit={handleUpdate}>
            <input type="text" name="title" className='input-box' defaultValue={editProduct.title} required />
            <input type="number" name="price" className='input-box'defaultValue={editProduct.price} required />
            <input type="text" name="description" className='input-box' defaultValue={editProduct.description} required />
            <input type="text" name="category" className='input-box' defaultValue={editProduct.category} required />

            <Button type="submit" text="Update" />
            <Button type="button" text="Cancel" onClick={() => setEditProduct(null)} />
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Products;
