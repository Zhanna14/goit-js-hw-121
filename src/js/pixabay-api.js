import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function searchImages(keyword, page) {
  try {
  const apiKey = '43190537-4b40a622c8cb8590492e33b18';
  const params = {
    key: apiKey,
    q: keyword,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  };

  const response = await axios.get('https://pixabay.com/api/', { params });

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Sorry',
        message:
          'There are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
    

    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
