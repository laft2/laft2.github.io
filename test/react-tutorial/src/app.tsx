import React from 'react';
import ReactDom from 'react-dom';
import HelloWorld from './HelloWorld';
import { ShoppingList, Game } from './HelloWorld'

ReactDom.render(
  <React.StrictMode>
    <HelloWorld />
    <ShoppingList name='sugar' />
    <Game />
  </React.StrictMode>,
  document.getElementById('app')
);