import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Products = ({ updateItemCount }) => {
  const [orderDatas, , updateProductsData] = useContext(OrderContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        updateProductsData(data);
      } catch (err) {
        console.error('상품을 가져오는 중 오류 발생:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div>상품을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div>오류: {error}</div>
        <button onClick={() => window.location.reload()} style={styles.retryButton}>
          다시 시도
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div>등록된 상품이 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <h3 style={styles.productTitle}>{product.title}</h3>
            <p style={styles.productDescription}>{product.description}</p>
            <p style={styles.productPrice}>
              <strong>가격:</strong> {product.price.toLocaleString()}원
            </p>
            <div style={styles.quantityContainer}>
              <label style={styles.quantityLabel}>수량:</label>
              <input
                style={styles.quantityInput}
                type="number"
                min="0"
                defaultValue={0}
                name="quantity"
                onChange={(e) => updateItemCount(product.title, parseInt(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 스타일 객체들
const styles = {
  container: {
    width: '100%'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  },
  productCard: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  productTitle: {
    margin: '0 0 8px 0',
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#333'
  },
  productDescription: {
    margin: '0 0 10px 0',
    fontSize: '0.9em',
    color: '#666',
    lineHeight: '1.4'
  },
  productPrice: {
    margin: '0 0 12px 0',
    fontSize: '1em',
    color: '#007bff',
    fontWeight: 'bold'
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  quantityLabel: {
    fontSize: '0.9em',
    color: '#555',
    fontWeight: '500'
  },
  quantityInput: {
    width: '60px',
    padding: '4px 8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '20px',
    color: '#666'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '20px',
    color: 'red'
  },
  retryButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '20px',
    color: '#666'
  }
};

export default Products;
