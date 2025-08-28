import React, { useContext } from 'react';
import Products from './Products';
import Options from './Options';
import { OrderContext } from '../contexts/OrderContext';

const Type = ({ orderType }) => {
  const [orderDatas, updateItemCount] = useContext(OrderContext);

  if (orderType === 'products') {
    return (
      <div>
        <h2>주문 종류</h2>
        <p>총 가격: {orderDatas.totals[orderType].toLocaleString()}원</p>
        <Products
          updateItemCount={(itemName, newItemCount) =>
            updateItemCount(itemName, newItemCount, orderType)
          }
        />
      </div>
    );
  }

  // options의 경우 기존 로직 유지
  return (
    <div>
      <h2>주문 종류</h2>
      <p>총 가격: {orderDatas.totals[orderType].toLocaleString()}원</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Options
          updateItemCount={(itemName, newItemCount) =>
            updateItemCount(itemName, newItemCount, orderType)
          }
        />
      </div>
    </div>
  );
};

export default Type;
