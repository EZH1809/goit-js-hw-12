
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import searchImages from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

// Cсылки на элементы формы поиска, ввода и индикатора загрузки.
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');

// clearGallery очищает контейнер галереи.
function clearGallery() {
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';
}

// hideLoader скрывает индикатор загрузки.
function hideLoader() {
  loader.style.display = 'none';
}

// showLoader отображает индикатор загрузки.
const showLoader = () => {
  loader.style.display = 'block';
};

// Обработчик события для формы поиска
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

    // Получаем значение из поля ввода и убираем пробелы по краям
  const query = searchInput.value.trim();

   // Очищаем галерею перед новым поиском
  clearGallery();

  // Если запрос пустой, выводится предупреждение, и происходит очистка галереи 
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
    clearGallery(); // Очистка галереи при вводе пустой строки
    return;
  }

  // Иначе, вызывается функция showLoader для отображения индикатора загрузки
  showLoader();
  

  // Отправка запроса к API 
  searchImages(query)
    .then(images => {
      if (images.length === 0) {
          // Если изображения не найдены, выводим сообщение об ошибке
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again.',
        });
      } else {
        renderGallery(images);
        searchInput.value = '';
      }
    })
    .catch(error => {
      console.error('Error in search:', error);
      searchInput.value = '';
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again.',
      });
    })
    .finally(() => {
      hideLoader(); 
    });
});
