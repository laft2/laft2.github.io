import React from 'react';
import ReactDom from 'react-dom';
import { GachaCalculator } from './GachaCalculator'

ReactDom.render(
  <React.StrictMode>
    <GachaCalculator />
  </React.StrictMode>,
  document.getElementById('app')
);