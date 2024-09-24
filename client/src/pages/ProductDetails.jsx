import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchProductDetails = async (productId) => {
  const { data } = await axios.get(`http://localhost:3000/products/${productId}`);
  return data;
};

const ProductDetails = () => {
  const { productId } = useParams(); 
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductDetails(productId)
  });

  if (isLoading) return <div>Loading product details...</div>;
  if (error) return <div>Error loading product details: {`${error}`}</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Category: {product.category}</p>
      <button className="btn" onClick={() => { }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;



