//импорт библиотеки

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Функция для отображения галереи изображений
export const renderGallery = (images) => {
  const galleryContainer = document.getElementById('gallery');

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
