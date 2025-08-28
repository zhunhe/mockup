import React, { useContext } from 'react';
import Type from '../../components/Type';
import { OrderContext } from '../../contexts/OrderContext';

const OrderPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>여행 상품 선택</h1>

      <div style={styles.mainSection}>
        <div style={styles.productsSection}>
          <h2 style={styles.sectionTitle}>여행 상품</h2>
          <Type orderType="products" />
        </div>
      </div>

      <div style={styles.summarySection}>
        <div style={styles.priceDisplay}>
          <h3 style={styles.priceTitle}>주문 요약</h3>
          <div style={styles.priceInfo}>
            <p style={styles.priceText}>
              <strong>상품 총액:</strong> {orderDatas.totals.products.toLocaleString()}원
            </p>
            <p style={styles.priceText}>
              <strong>옵션 총액:</strong> {orderDatas.totals.options.toLocaleString()}원
            </p>
            <p style={styles.totalPrice}>
              <strong>총 결제 금액:</strong> {orderDatas.totals.total.toLocaleString()}원
            </p>
          </div>
          <button
            onClick={() => setStep(1)}
            style={styles.orderButton}
            disabled={orderDatas.totals.total === 0}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

// 스타일 객체들
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontWeight: 'bold'
  },
  mainSection: {
    display: 'flex',
    gap: '30px',
    marginBottom: '30px'
  },
  productsSection: {
    flex: '1',
    border: '2px solid #007bff',
    borderRadius: '15px',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    color: '#007bff',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 'bold'
  },
  summarySection: {
    border: '2px solid #28a745',
    borderRadius: '15px',
    padding: '25px',
    backgroundColor: '#f8fff9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  priceDisplay: {
    textAlign: 'center'
  },
  priceTitle: {
    color: '#28a745',
    marginBottom: '20px',
    fontSize: '1.3em',
    fontWeight: 'bold'
  },
  priceInfo: {
    marginBottom: '25px'
  },
  priceText: {
    fontSize: '1.1em',
    margin: '8px 0',
    color: '#555'
  },
  totalPrice: {
    fontSize: '1.4em',
    margin: '15px 0',
    fontWeight: 'bold',
    color: '#28a745',
    borderTop: '2px solid #ddd',
    paddingTop: '15px'
  },
  orderButton: {
    padding: '15px 40px',
    fontSize: '1.2em',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  }
};

export default OrderPage;
