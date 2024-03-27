import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Unable to find root element with id "root"');
}