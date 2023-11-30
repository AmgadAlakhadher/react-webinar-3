import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Ковёр ',price: 500,count: 0, selected: false},
    {code: 2, title: 'Футболка летняя',price: 1050,count: 0, selected: false},
    {code: 3, title: 'Носки ',price: 10630,count: 0, selected: false},
    {code: 4, title: 'Очень длинное название элемента из семи слов',price: 100,count: 0, selected: false},
    {code: 5, title: 'Запись',price: 1300,count: 0, selected: false},
    {code: 6, title: ' чай',price: 10,count: 0, selected: false},
    {code: 7, title: 'Седьмая запись',price: 900,count: 0, selected: false},
  ],
  cart: []
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
