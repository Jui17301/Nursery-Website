
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const { data } = await axios.get(`http://localhost:3000/products/category/${category}`);
  console.log(data);
  return data;
};

export const ProductList = () => {
  const { category } = useParams();
  const { data: products=[], isLoading, error } = useQuery({
    queryKey:['products', category],
    queryFn: () => fetchProductsByCategory(category)
  });

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Added to cart:", product);
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products :{`${error}`}
  </div>;

  return (
    <div>
      <h2>Products in : {category}</h2>
     {Array.isArray(products) && products.length>0 ? (
       products.map((product)=> (
        <li key={product._id}>
           <Link to={`/product/${product._id}`}>
          <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={product.image}
      alt="Product" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
    {product.title}
    </h2>
    <p>Price : ${product.price}</p>
    <p>Quantity: {product.quantity}</p>
    <p>Rating: {product.rating}</p>
  </div>
</div>
</Link>
        </li>
      ))
     )  : "No Data Available" } <ul>
       
      </ul>
    </div>
  );
};
