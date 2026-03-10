import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'handsontable/css/handsontable.min.css';
import './components/pages/ExcelEditor.css';          // overrides last


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />
);
