import React,{useState,useEffect} from 'react'
import Button from '../../components/Button/Button';


function Products() {
    const [products, setProducts] = useState([]);

useEffect(() => {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  setProducts(storedProducts);
}, []);


const addProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: Date.now(),
      title: form.title.value,
      price: form.price.value,
      description: form.description.value,
      category: form.category.value,
    };

}
  return (
    <div>
          <form onSubmit={addProduct}>
        <input type="text" name="title" placeholder="Product Title" required />
        <input type="number" name="price" placeholder="Product Price" required />
        <input type="text" name="description" placeholder="Product Description" required />
        <input type="text" name="category" placeholder="Product Category" required />
        <Button type="submit" text="Add Product" />
      </form>
    </div>
  )
}

export default Products