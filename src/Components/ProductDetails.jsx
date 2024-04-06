import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const productData = await response.json();
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='contain'>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} />
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
