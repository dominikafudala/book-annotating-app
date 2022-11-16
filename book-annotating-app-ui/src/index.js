import React from "react";
import * as ReactDOM from 'react-dom/client';
import Root from "views/Root/Root";
import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
