import React, { useState, useEffect } from 'react'
import Button from '../../components/Button/Button';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterDropdown, setFilterDropdown] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  //for unique category of product
  const categories = [...new Set(products.map((p) => p.category))];

  //filter is added............
  const filteredProducts = products.filter((p) =>
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
      price: parseFloat(form.price.value),
      description: form.description.value,
      category: form.category.value,
      image: "https://i.pravatar.cc/300",
    };

    axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then((res) => {
        setProducts([...products, res.data]); 
        form.reset();
        alert("Product added successfully!!!!");
      })
      .catch((err) => console.error("Error adding product:", err));
  };



  return (
    <div>
      <h2>Products</h2>
      {/* Search Input............ */}
      <input
        type="text"
        placeholder="Search Product..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {/* dropdown... */}
      <select
        value={filterDropdown}
        onChange={(e) => setFilterDropdown(e.target.value)}>

        <option value="">Filter By Category</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>



 {/* Add Product Form */}
      <form onSubmit={addProduct}>
        <input type="text" name="title" placeholder="Product Title" required />
        <input type="number" name="price" placeholder="Product Price" required />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          required
        />
        <input type="text" name="category" placeholder="Product Category" required />
        <button type="submit">Add Product</button>
      </form>



      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products