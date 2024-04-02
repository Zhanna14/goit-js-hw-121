//функції для HTTP-запитів

import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Функція для виконання HTTP-запитів до API Pixabay
export function searchImages(keyword) {
  const apiKey = '43190537-4b40a622c8cb8590492e33b18';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    keyword
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Sorry',
          message:
            'There are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      return data.hits;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
