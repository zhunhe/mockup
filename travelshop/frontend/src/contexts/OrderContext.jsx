import { createContext, useState, useMemo, useEffect, useCallback } from 'react';

export const OrderContext = createContext();

const pricePerItem = {
  options: 500,
};

function calculateSubtotal(orderType, orderCounts, productsData) {
  if (orderType === 'products') {
    let total = 0;
    for (const [productName, count] of orderCounts[orderType].entries()) {
      const product = productsData.find(p => p.title === productName);
      if (product) {
        total += count * product.price;
      }
    }
    return total;
  } else {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[orderType];
  }
}

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [productsData, setProductsData] = useState([]);

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCounts, productsData);
    const optionsTotal = calculateSubtotal('options', orderCounts, productsData);
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts, productsData]);

  const updateItemCount = useCallback((itemName, newItemCount, optionType) => {
    const oldOrderMap = orderCounts[optionType];
    const newOrderMap = new Map(oldOrderMap);

    newOrderMap.set(itemName, parseInt(newItemCount));

    const newOrderCounts = { ...orderCounts };
    newOrderCounts[optionType] = newOrderMap;

    setOrderCounts(newOrderCounts);
  }, [orderCounts]);

  const updateProductsData = useCallback((products) => {
    setProductsData(products);
  }, []);

  const resetOrder = useCallback(() => {
    setOrderCounts({
      products: new Map(),
      options: new Map(),
    });
    setProductsData([]);
    setTotals({ products: 0, options: 0, total: 0 });
  }, []);

  const value = useMemo(() => {
    return [
      { ...orderCounts, totals, productsData },
      updateItemCount,
      updateProductsData,
      resetOrder
    ];
  }, [orderCounts, totals, productsData, updateItemCount, updateProductsData, resetOrder]);

  return <OrderContext.Provider value={value} {...props} />;
}
