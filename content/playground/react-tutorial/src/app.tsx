import React from 'react';
import ReactDom from 'react-dom';
import { Game } from './ReactTutorial'

ReactDom.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('app')
);