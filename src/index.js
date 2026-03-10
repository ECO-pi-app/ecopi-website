import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'handsontable/dist/handsontable.full.min.css'; // first
import './components/pages/ExcelEditor.css';          // overrides last


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />
);
