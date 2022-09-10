import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryMarcup(galleryItems);

function createGalleryMarcup(galleryItems) {
  const markup = galleryItems
    .map(
      (galleryItem) =>
        `<div class="gallery__item">
      <a class="gallery__link" href="${galleryItem.original}">
        <img
          class="gallery__image"
          src="${galleryItem.preview}"
          data-source="${galleryItem.original}"
          alt="${galleryItem.description}"
        />
      </a>
    </div>`
    )
    .join("\n");
  return markup;
}
galleryContainer.innerHTML = cardsMarkup;

galleryContainer.addEventListener("click", onClickGallery);

function onClickGallery(evt) {
  evt.preventDefault();
  if (evt.target.tagName !== "IMG") {
    return;
  }

  const instance =
    basicLightbox.create(`<img src="${evt.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  galleryContainer.addEventListener("keydown", function escapeClick(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  });
}
