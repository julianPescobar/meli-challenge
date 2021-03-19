import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('por lo menos no rompe al iniciar', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
