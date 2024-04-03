//вся логіка роботи додатка
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';


// Отримання елементів DOM
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
// Обробник події для форми пошуку
form.addEventListener('submit', async event => {
  event.preventDefault(); // Заборона стандартної поведінки форми

  const keyword = searchInput.value.trim(); // Отримання ключового слова для пошуку

  // Перевірка на порожній рядок
  if (keyword === '') {
    displayErrorMessage('Please enter a search keyword');
    return iziToast.error({
      message: 'Please enter a search keyword',
      position: 'topRight',
    });;
  }

  try {
    // Виконання пошуку зображень за ключовим словом
    const images = await searchImages(keyword);

    // Відображення отриманих зображень
    displayImages(images);
  } catch (error) {
    console.error('Error searching images:', error);
  }
});

function newButton(keyword, searchImages) {
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('load-more-btn');
  galleryContainer.appendChild(loadMoreBtn); // Додаємо кнопку до контейнера галереї

  loadMoreBtn.addEventListener('click', async () => {
    try {
      const images = await searchImages(keyword);
      displayImages(images);
    } catch (error) {
      console.error('Error loading more images:', error);
    }
  });
}




form.addEventListener('submit', () => {
  const keyword = searchInput.value.trim();
  newButton(keyword, searchImages);
});