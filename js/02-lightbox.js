import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryMarcup(galleryItems);

function createGalleryMarcup(galleryItems) {
  const markup = galleryItems
    .map(
      (galleryItem) =>
        `<a class="gallery__item" href="${galleryItem.original}">
        <img
          class="gallery__image"
          src="${galleryItem.preview}"
          alt="${galleryItem.description}"
        /></a>`
    )
    .join("\n");

  return markup;
}

galleryContainer.innerHTML = cardsMarkup;

galleryContainer.addEventListener("click", onClickGallery);

function onClickGallery(evt) {
  evt.preventDefault(); //для початку, скасовує поведінку за замовчуванням, тобто перехід по посиланню в тегу "а" (href="${original}")
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

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
  docClose: false,
});

console.log(galleryItems);
