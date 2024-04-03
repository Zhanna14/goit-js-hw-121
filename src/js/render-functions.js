import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Spinner } from 'spin.js';

let spinner = null; // Змінна для зберігання індикатора завантаження
let instance = null; // Змінна для зберігання екземпляру SimpleLightbox

// Функція для створення і показу індикатора завантаження
function showLoader() {
  spinner = new Spinner().spin();
  document.getElementById('loader').appendChild(spinner.el);
}

// Функція для приховування індикатора завантаження
function hideLoader() {
  if (spinner) {
    spinner.stop();
    document.getElementById('loader').innerHTML = ''; // Очищаємо контейнер індикатора завантаження
  }
}

export function displayImages(images) {
  showLoader(); // Показуємо індикатор завантаження перед відображенням зображень
  const galleryElement = document.getElementById('gallery');

  images.forEach(image => {
    const imageCard = createImageCard(image);
    galleryElement.insertAdjacentHTML('beforeend', imageCard);
  });

  hideLoader(); // Приховуємо індикатор завантаження після відображення зображень
    // Плавне прокручування сторінки
  smoothScrollBy(galleryElement);
}

// Функція для плавного прокручування сторінки на дві висоти карточки галереї
function smoothScrollBy(element) {
  const cardHeight = getCardHeight(element.firstElementChild);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Функція для отримання висоти карточки галереї
function getCardHeight(cardElement) {
  const cardRect = cardElement.getBoundingClientRect();
  return cardRect.height;
}

  // Оновлюємо галерею, тільки якщо були додані нові картки зображень
  if (!instance) {
    createSimpleLightbox(); // Якщо екземпляр не існує, створюємо новий
  } else {
    instance.refresh(); // Якщо екземпляр вже існує, оновлюємо його
  }
  


// Створення картки зображення
export function createImageCard(image) {
  return `<div class="card">
  <div class="image-container">
   <a href="${image.largeImageURL}" data-lightbox="image">
        <img src="${image.webformatURL}" alt="${image.tags}" class="image" />
      </a>
  </div>
  <table class="table">
        <tr> 
          <th class="options-name">Likes</th>
          <th class="options-name">Views</th>
          <th class="options-name">Comments</th>
          <th class="options-name">Downloads</th>
        </tr>
        <tr> 
          <td class="value-description">${image.likes}</td>
          <td class="value-description">${image.views}</td>
          <td class="value-description">${image.comments}</td>
          <td class="value-description">${image.downloads}</td>
        </tr>
    </table>
  </div>`;
}

function createSimpleLightbox() {
  instance = new SimpleLightbox('#gallery a', {
    captionDelay: 250, // зображення підпису за 250 ms
    captionsData: 'alt', // підпис зображення
  });
}


