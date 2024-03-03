// логика работы приложения
//импорт библиотеки и модулей 

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import searchImages from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

// Ссылки на элементы формы поиска, ввода и индикатора загрузки.
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const galleryContainer = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.querySelector('.loader'); // изменено на .loader
const loadingIndicator = document.querySelector('.loader'); // изменено на .loader

let currentQuery = ''; // хранит текущий запрос
let currentPage = 1;

// clearGallery очищает контейнер галереи.
function clearGallery() {
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
     hideLoader();
    loadMoreBtn.style.display = 'none'; // Скрываем кнопку "Load more"

    return;
  }

   // Сохраняем текущий запрос
  currentQuery = query;

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
            loadMoreBtn.style.display = 'block'; // Отображаем кнопку "Load more"
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

// Обработчик события для кнопки "Load more"
loadMoreBtn.addEventListener('click', function () {
  // Отправляем запрос на следующую страницу с текущим запросом
  showLoader();
  searchImages(currentQuery)
    .then(images => {
      if (images.length === 0) {
        // Если изображения не найдены, скрываем кнопку "Load more"
        loadMoreBtn.style.display = 'none';
        hideLoader();
      } else {
        renderGallery(images);
        hideLoader();
      }
    })
    .catch(error => {
      console.error('Error loading more images:', error);
      hideLoader();
    });
});
