import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EFDemoComponentExt from './EFDemoComponentExt';
import reportWebVitals from './reportWebVitals';

export async function init() {
  /* Put your Initialization code here */
}

export function mount(arg) {
  const root = ReactDOM.createRoot(document.getElementById('ef-demo-ext-container'));
  root.render(
    <React.StrictMode>
      <EFDemoComponentExt />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

}

export function unmount() {
  /* Cleanup */
}
