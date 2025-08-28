import React, { useContext, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { OrderContext } from '../../contexts/OrderContext';

const SummaryPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const productArray = Array.from(orderDatas.products);

  const productList = productArray.map(([productName, quantity]) => {
    const product = orderDatas.productsData?.find(p => p.title === productName);
    const price = product ? product.price : 0;
    const totalPrice = price * quantity;

    return (
      <div key={productName} style={styles.productCard}>
        <h3 style={styles.productCardTitle}>{productName}</h3>
        <div style={styles.productCardContent}>
          <div>
            <p style={styles.productInfo}>
              <strong>수량:</strong> {quantity}개
            </p>
            <p style={styles.productInfo}>
              <strong>단가:</strong> {price.toLocaleString()}원
            </p>
            <p style={styles.productInfo}>
              <strong>소계:</strong> {totalPrice.toLocaleString()}원
            </p>
          </div>
          {product && (
            <div style={styles.productDetails}>
              <p style={styles.productDetailText}>카테고리: {product.category}</p>
              <p style={styles.productDetailText}>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  });

  const hasOptions = orderDatas.options.size > 0;
  let optionsDisplay = null;

  if (hasOptions) {
    const optionArray = Array.from(orderDatas.options.keys());
    const optionList = optionArray.map((key) => (
      <div key={key} style={styles.optionCard}>
        <strong>{key}</strong> - {orderDatas.options.get(key)}개
      </div>
    ));
    optionsDisplay = (
      <div style={styles.optionsSection}>
        <h2 style={styles.optionsTitle}>
          추가 옵션: {orderDatas.totals.options.toLocaleString()}원
        </h2>
        {optionList}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        products: {},
        options: {},
        totals: orderDatas.totals
      };

      if (orderDatas.products && orderDatas.productsData) {
        for (const [productName, quantity] of orderDatas.products.entries()) {
          if (quantity > 0) {
            orderPayload.products[productName] = quantity;
          }
        }
      }

      if (orderDatas.options) {
        for (const [optionName, quantity] of orderDatas.options.entries()) {
          if (quantity > 0) {
            orderPayload.options[optionName] = quantity;
          }
        }
      }

      console.log('Sending order data:', orderPayload);

      const orderResponse = await fetch(`${API_BASE_URL}/api/cart/direct-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      });

      if (!orderResponse.ok) {
        throw new Error('주문 처리에 실패했습니다.');
      }

      const orderResult = await orderResponse.json();
      console.log('Order result:', orderResult);

      setStep(2);
    } catch (error) {
      console.error('주문 처리 중 오류:', error);
      alert('주문 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>주문 확인</h1>

      <div style={styles.productSection}>
        <h2 style={styles.productSectionTitle}>주문 상품 목록</h2>
        {productList.length > 0 ? productList : (
          <p style={styles.noProductsMessage}>선택된 상품이 없습니다.</p>
        )}
      </div>

      {optionsDisplay}

      <div style={styles.paymentSection}>
        <h2 style={styles.paymentTitle}>결제 정보</h2>
        <div style={styles.paymentContent}>
          <div>
            <p style={styles.paymentText}>
              <strong>상품 총액:</strong> {orderDatas.totals.products.toLocaleString()}원
            </p>
            {hasOptions && (
              <p style={styles.paymentText}>
                <strong>옵션 총액:</strong> {orderDatas.totals.options.toLocaleString()}원
              </p>
            )}
            <p style={styles.totalAmount}>
              <strong>총 결제 금액:</strong> {orderDatas.totals.total.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.checkboxContainer}>
          <input
            id="confirm-checkbox"
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={styles.checkbox}
          />
          <label htmlFor="confirm-checkbox" style={styles.checkboxLabel}>
            위 주문 내용을 확인하고 결제에 동의합니다.
          </label>
        </div>
        <button
          type="submit"
          disabled={!checked || loading}
          style={{
            ...styles.submitButton,
            backgroundColor: checked && !loading ? '#007bff' : '#ccc',
            cursor: checked && !loading ? 'pointer' : 'not-allowed'
          }}
        >
          {loading ? '주문 처리 중...' : '주문 완료하기'}
        </button>
      </form>
    </div>
  );
};

// 스타일 객체들
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  },
  productSection: {
    border: '2px solid #007bff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f8f9fa'
  },
  productSectionTitle: {
    color: '#007bff',
    marginBottom: '20px',
    textAlign: 'center'
  },
  productCard: {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  productCardTitle: {
    margin: '0 0 10px 0',
    color: '#333'
  },
  productCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productInfo: {
    margin: '5px 0',
    color: '#666'
  },
  productDetails: {
    textAlign: 'right',
    fontSize: '0.9em',
    color: '#888'
  },
  productDetailText: {
    margin: '2px 0'
  },
  noProductsMessage: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  optionsSection: {
    marginTop: '20px'
  },
  optionsTitle: {
    color: '#666',
    borderBottom: '2px solid #ddd',
    paddingBottom: '5px'
  },
  optionCard: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0'
  },
  paymentSection: {
    border: '2px solid #28a745',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#f8fff9'
  },
  paymentTitle: {
    color: '#28a745',
    marginBottom: '15px',
    textAlign: 'center'
  },
  paymentContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paymentText: {
    fontSize: '1.1em',
    margin: '5px 0'
  },
  totalAmount: {
    fontSize: '1.3em',
    margin: '10px 0',
    fontWeight: 'bold',
    color: '#28a745',
    borderTop: '1px solid #ddd',
    paddingTop: '10px'
  },
  form: {
    marginTop: '30px',
    textAlign: 'center'
  },
  checkboxContainer: {
    marginBottom: '20px'
  },
  checkbox: {
    marginRight: '10px',
    transform: 'scale(1.2)'
  },
  checkboxLabel: {
    fontSize: '1.1em',
    color: '#333'
  },
  submitButton: {
    padding: '15px 30px',
    fontSize: '1.2em',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s'
  }
};

export default SummaryPage;
