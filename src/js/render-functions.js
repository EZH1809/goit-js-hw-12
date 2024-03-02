//импорт библиотеки

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const URL = 'https://pixabay.com/api/';
const API_KEY = '42552421-44c442bdd9fc0080a82eeb482';

let currentPage = 1;
let currentQuery = '';

// Функция для отображения галереи изображений
export const renderGallery = (response) => {
  const images = response.hits || [];
  const totalHits = response.totalHits || 0;
  const galleryContainer = document.getElementById('gallery');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadingIndicator = document.getElementById('loading-indicator');

// Очищаем контейнер галереи от всех дочерних элементов
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }

// Если массив изображений пуст, выводим уведомление и прерываем выполнение функции
   if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });

    loadMoreBtn.style.display = 'none';
    loadingIndicator.style.display = 'none';

    return;
  }

  
  // Для каждого изображения создаем карточку и добавляем ее в контейнер галереи
  images.forEach((image) => {
    const card = createImageCard(image);
    galleryContainer.appendChild(card);
  });

    // Создаем объект SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });

   // Обновляем SimpleLightbox для учета новых изображений
    lightbox.refresh();
    
    // Проверяем, достигли ли конца коллекции
  if (images.length >= totalHits) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadMoreBtn.style.display = 'block';
  }

  loadingIndicator.style.display = 'none';
};




// Функция создания карточки изображения
const createImageCard = (image) => {
  const card = document.createElement('a');
  card.classList.add('gallery-item');
  card.href = image.largeImageURL;

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('gallery-item-info');

  const likes = createInfoElement('Likes', image.likes);
  const views = createInfoElement('Views', image.views);
  const comments = createInfoElement('Comments', image.comments);
  const downloads = createInfoElement('Downloads', image.downloads);

    // Добавляем элементы информации в контейнер
  infoContainer.appendChild(likes);
  infoContainer.appendChild(views);
  infoContainer.appendChild(comments);
  infoContainer.appendChild(downloads);

  card.appendChild(img);
  card.appendChild(infoContainer);

  return card;
};

// Создания элемента информации
const createInfoElement = (label, value) => {
  const infoElement = document.createElement('div');
  infoElement.classList.add('gallery-item-info-element');
  
  const labelElement = document.createElement('span');
  labelElement.textContent = `${label}: `;
  
  const valueElement = document.createElement('span');
  valueElement.textContent = value;
  
  infoElement.appendChild(labelElement);
  infoElement.appendChild(valueElement);

  return infoElement;
};

const loadMoreImages = async () => {
  currentPage++;
  try {
    const response = await fetchImages(currentQuery, currentPage);

    if (response) {
      renderGallery(response); // Передаем в renderGallery объект response
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  }
};

const fetchImages = async (query, page) => {
  const apiUrl = `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.hits.length === 0) {
      throw new Error('No images found for the given query.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

document.getElementById('load-more-btn').addEventListener('click', () => {
  document.getElementById('loading-indicator').style.display = 'block';
  document.getElementById('load-more-btn').style.display = 'none';

  loadMoreImages();
});

document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
 
    // Получаем значение из поисковой строки
  const query = event.target.querySelector('#search-input').value;
  currentPage = 1;
  currentQuery = query;

 
   try {
    const response = await fetchImages(query, currentPage);

    if (response && response.hits.length > 0) {
      renderGallery(response);
    } else {
      // Вывод сообщения, что изображения не найдены
      console.log("No images found for the given query.");
      renderGallery({ hits: [], totalHits: 0 });
    }
  } catch (error) {
    // Обработка других ошибок
    console.error('Error fetching images:', error);
  }
});


