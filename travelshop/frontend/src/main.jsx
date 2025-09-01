import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { OrderContextProvider } from './contexts/OrderContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </StrictMode>
);
