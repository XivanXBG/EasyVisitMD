// NotFoundPage.jsx

import React from 'react';
import './notFound.css';
import { Link } from 'react-router-dom'; // Импортирайте стиловете си

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="illustration-container">
        {/* Добавете илюстрация на лекар или подходящо изображение за страница с 404 грешка */}
        <img style={{width:'400px'}} src="https://ih1.redbubble.net/image.2382029100.6138/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="Доктор 404" />
      </div>
      <div className="text-container">
        <h1>404 - Страницата не е намерена</h1>
        <p>Опа! Изглежда, че сте достигнали страница, която не съществува.</p>
        <p>Не се притеснявайте, нашите лекари вече работят по проблема!</p>
        <p>
          Междувременно можете да се върнете към <Link style={{color:'black'}} to="/">началната страница</Link> или да се свържете с нашата поддръжка.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
