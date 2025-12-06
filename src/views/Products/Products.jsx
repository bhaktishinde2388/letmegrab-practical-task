import React,{useState,useEffect} from 'react'
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
        onChange={(e) => setFilterDropdown(e.target.value)}
      >
        <option value="">Filter By Category</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
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