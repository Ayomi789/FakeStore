import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          <ul>
            {products.map(product => (
              <li key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <div className="img-content">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="content">
                    <h3 className="heading">{product.title}</h3>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductList;

