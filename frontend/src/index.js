import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StrictMode } from 'react';
import { StoreProvider } from './Store';
// import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);
