import React from 'react';
import ReactDom from 'react-dom';
import HelloWorld from './HelloWorld';

ReactDom.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>,
  document.getElementById('app')
);