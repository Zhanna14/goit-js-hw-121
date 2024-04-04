//вся логіка роботи додатка
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

let page = 1;
const perPage = 15;
const totalHits = Math.ceil(100 / perPage);



// Отримання елементів DOM
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const gallery = document.getElementById('gallery'); // Отримання елемента галереї
const loadMoreBtn = document.createElement('button'); // Створення кнопки "Load more"
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more-btn');
loadMoreBtn.style.display = 'none'; // Початково ховаємо кнопку
gallery.insertAdjacentElement('afterend', loadMoreBtn);

// Обробник події для кнопки "Load more"
loadMoreBtn.addEventListener('click', loadMoreImages);

// Функція для завантаження додаткових зображень
async function loadMoreImages() {
  try {
    const keyword = searchInput.value.trim();
    const images = await searchImages(keyword);

    displayImages(images);
    page += 1;

    // Перевірка, чи дійшли до кінця колекції
    if (page > totalHits) {
      gallery.innerHTML = '';
      loadMoreBtn.style.display = 'none';
      iziToast.error({
        title: 'End of Search Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  }
}

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
    });
  }

  try {
    gallery.innerHTML = ''; // Очищення галереї перед новим пошуком
    const images = await searchImages(keyword, page); // Виклик функції пошуку з передачею сторінки
    if (images.length > 0) {
      displayImages(images); // Відображення отриманих зображень
      // Показуємо кнопку "Завантажити більше"
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error searching images:', error);
    gallery.innerHTML = ''; // Очищення галереї в разі помилки
    loadMoreBtn.style.display = 'none'; // Приховуємо кнопку "Завантажити більше" в разі помилки
  }
});


