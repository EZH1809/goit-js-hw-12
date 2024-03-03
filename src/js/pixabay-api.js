// функции для HTTP-запросов.
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '42552421-44c442bdd9fc0080a82eeb482';


async function searchImages(query) {
  const apiUrl = `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;

      if (!data.hits || data.hits.length === 0) {
      throw new Error('No images found for the given query.');
    }

      return data.hits;
      

  } catch (error) {
    // Выводим сообщение об ошибке
    console.error('Error fetching images:', error);
     throw error;
   
  }
}

export default searchImages;
