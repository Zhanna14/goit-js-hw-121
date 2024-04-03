//вся логіка роботи додатка
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

let page = 1;

// Отримання елементів DOM
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const gallery = document.getElementById('gallery'); // Отримання елемента галереї

// Функція для завантаження додаткових зображень
async function loadMoreImages() {
  try {
    const keyword = searchInput.value.trim(); // Отримання ключового слова для пошуку
    const images = await searchImages(keyword); // Виклик функції пошуку з передачею ключового слова
    displayImages(images); // Відображення отриманих зображень
    page += 1; // Збільшення номера сторінки

    // Перевірка, чи дійшли до кінця колекції
    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Load more"
      iziToast.info({
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
    page = 1; // Скидання номера сторінки на початкове значення
    const images = await searchImages(keyword, page); // Виклик функції пошуку з передачею сторінки
    if (images.length > 0) {
      displayImages(images); // Відображення отриманих зображень
      const loadMoreBtn = document.createElement('button'); // Створення кнопки "Load more"
      loadMoreBtn.textContent = 'Load more';
      loadMoreBtn.classList.add('load-more-btn');
      loadMoreBtn.addEventListener('click', loadMoreImages); // Додавання обробника події на кнопку "Load more"
      gallery.insertAdjacentElement('afterend', loadMoreBtn);
      // Вставлення кнопки "Load more" після галереї
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none'; // Приховати кнопку "Load more", якщо результатів немає
    }
  } catch (error) {
    console.error('Error searching images:', error);
  }
});
