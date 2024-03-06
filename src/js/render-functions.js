import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderGallery = (images) => {
  const gallery = document.querySelector('.gallery');

  // Проверяем, есть ли изображения
  if (images.length === 0) {
    // Выводим уведомление, если массив пуст
    iziToast.info({
      title: 'Info',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });

    return; // Прерываем выполнение функции, так как нет изображений
  }

  // Создаем разметку для галереи
  const markup = images
    .map(image => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  // Вставляем разметку в контейнер галереи
  gallery.insertAdjacentHTML('beforeend', markup);

  // Создаем объект SimpleLightbox
 const lightbox = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
});

  // Обновляем SimpleLightbox для учета новых изображений
  lightbox.refresh();
};
