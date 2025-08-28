import React, { useContext, useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { OrderContext } from '../../contexts/OrderContext'

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([])
  const [orderData, , , resetOrder] = useContext(OrderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderHistory();
  }, [])

  // 주문 일시를 사람이 보기 편한 형태로 변환하는 함수
  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  const fetchOrderHistory = async () => {
    try {
      const historyResponse = await fetch(`${API_BASE_URL}/api/cart/orders`);
      if (!historyResponse.ok) {
        throw new Error('주문 내역 조회에 실패했습니다.');
      }
      const historyData = await historyResponse.json();
      console.log('Fetched order history:', historyData);
      setOrderHistory(historyData);
      setLoading(false);
    } catch (error) {
      console.error('주문 내역 조회 중 오류:', error);
      setLoading(false);
    }
  };

  const orderTable = orderHistory.map((order) => (
    <tr key={order.id} style={styles.tableRow}>
      <td style={styles.tableCell}>{order.id}</td>
      <td style={styles.tableCell}>
        {order.items && order.items.length > 0 ? (
          <ul style={styles.productList}>
            {order.items.map((item, index) => (
              <li key={index} style={styles.productItem}>
                {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <span style={styles.noData}>상품 정보 없음</span>
        )}
      </td>
      <td style={styles.tableCell}>
        {order.items && order.items.length > 0 ? (
          <ul style={styles.quantityList}>
            {order.items.map((item, index) => (
              <li key={index} style={styles.quantityItem}>
                {item.quantity}개
              </li>
            ))}
          </ul>
        ) : (
          <span style={styles.noData}>-</span>
        )}
      </td>
      <td style={styles.tableCell}>
        <span style={styles.totalAmount}>
          {order.items ? order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString() : 0}원
        </span>
      </td>
      <td style={styles.tableCell}>
        <span style={styles.orderDate}>{formatOrderDate(order.orderedAt)}</span>
      </td>
    </tr>
  ))

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>주문 내역을 불러오는 중...</p>
      </div>
    )
  } else {
    return (
      <div style={styles.container}>
        <div style={styles.successSection}>
          <h1 style={styles.successTitle}>🎉 주문이 성공했습니다!</h1>
          <p style={styles.successMessage}>
            주문이 정상적으로 처리되었습니다. 아래에서 주문 내역을 확인하세요.
          </p>
        </div>

        <div style={styles.historySection}>
          <h2 style={styles.historyTitle}>📋 전체 주문 내역</h2>

          {orderHistory.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>아직 주문 내역이 없습니다.</p>
              <p style={styles.emptySubtext}>첫 번째 주문을 시작해보세요!</p>
            </div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.tableHeaderCell}>주문번호</th>
                    <th style={styles.tableHeaderCell}>주문 상품</th>
                    <th style={styles.tableHeaderCell}>수량</th>
                    <th style={styles.tableHeaderCell}>총 금액</th>
                    <th style={styles.tableHeaderCell}>주문일시</th>
                  </tr>
                </thead>
                <tbody>
                  {orderTable}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={styles.buttonSection}>
          <button
            onClick={() => { resetOrder(); setStep(0); }}
            style={styles.homeButton}
          >
            🏠 첫 페이지로 돌아가기
          </button>
        </div>
      </div>
    )
  }
}

// 스타일 객체들
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  loadingText: {
    fontSize: '1.2em',
    color: '#666',
    margin: 0
  },
  successSection: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: '#d4edda',
    borderRadius: '15px',
    border: '2px solid #28a745'
  },
  successTitle: {
    color: '#155724',
    fontSize: '2.5em',
    margin: '0 0 15px 0',
    fontWeight: 'bold'
  },
  successMessage: {
    color: '#155724',
    fontSize: '1.2em',
    margin: 0
  },
  historySection: {
    marginBottom: '40px'
  },
  historyTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2em',
    marginBottom: '30px',
    fontWeight: 'bold'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    border: '2px dashed #dee2e6'
  },
  emptyText: {
    fontSize: '1.3em',
    color: '#6c757d',
    margin: '0 0 10px 0',
    fontWeight: 'bold'
  },
  emptySubtext: {
    fontSize: '1.1em',
    color: '#6c757d',
    margin: 0
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px solid #007bff'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white'
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  tableHeaderCell: {
    padding: '15px 10px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.1em',
    borderBottom: '2px solid #0056b3'
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  tableCell: {
    padding: '12px 10px',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  productList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  productItem: {
    padding: '4px 0',
    fontSize: '0.95em',
    color: '#333'
  },
  quantityList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  quantityItem: {
    padding: '4px 0',
    fontSize: '0.95em',
    color: '#666',
    fontWeight: '500'
  },
  totalAmount: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#28a745'
  },
  orderDate: {
    fontSize: '0.9em',
    color: '#666',
    fontStyle: 'italic'
  },
  noData: {
    color: '#999',
    fontStyle: 'italic'
  },
  buttonSection: {
    textAlign: 'center',
    marginTop: '30px'
  },
  homeButton: {
    padding: '15px 30px',
    fontSize: '1.2em',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  }
};

// CSS 애니메이션 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  tr:hover {
    background-color: #f8f9fa !important;
  }
`;
document.head.appendChild(styleSheet);

export default CompletePage
