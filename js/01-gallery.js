import { galleryItems } from "./gallery-items.js";
// Change code below this line
function createGalleryMarcup(galleryItems) {
  //1. створюємо змінну murkup, беремо масив об’єктів "galleryItems",
  // які передаємо і перебираємо його за допомогою методу map(),
  // який дестроктиризуємо та вложемо в нього "<div></div>" із завдання
  // на кожен "<div></div>" буде повертатися картинка
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("\n");

  return markup;
}
// 2. Зарендерим розмітку в "<div></div>"
const galleryContainer = document.querySelector(".gallery");

// 3. Зробимо розмітку "cardsMarkup"
const cardsMarkup = createGalleryMarcup(galleryItems);
// console.log(createGalleryMarcup(galleryItems));

// 4. Розмістимо картинки (тобто "cardsMarkup") всередині elem,
// після усіх дітей
galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);

// 5. Використаємо делегування, додаємо до "gallery" кнопку "click",
// тобто вішаємо слухача події
galleryContainer.addEventListener("click", onClickGallery);

function onClickGallery(evt) {
  // 6. Якщо по елементу якому ми клацнули("evt.target"), в нього відсутній
  // "gallery__image", то не оброблюємо цей "click"
  evt.preventDefault(); // скасовує поведінку за замовчуванням, тобто перехід по посиланню в тегу "а" (href="${original}")
  if (!evt.target.classList.contains("gallery__image")) {
    // метод "contains" перевіряє наявність класа на цьому елементі.
    // Каже: "Чи є в цього елемента такий клас"
    return;
  }

  // console.log(evt.target);

  //7. Отримуємо посилання на data-source="${original}" в "const markup"
  // за допомогою властивості "dataset"
  const urlImage = evt.target.dataset.source;
  // Додаємо модальне вікно
  addModalWindow(urlImage);
  // Викликаємо функцію "function onCloseModal()"
  onCloseModal();
}
// 8. Вставляємо код з інструкції "https://basiclightbox.electerious.com/", пункт "Зображення"
function addModalWindow(urlOfEl) {
  const instance = basicLightbox.create(`
    <img src="${urlOfEl}" width="800" height="600">
`);
  instance.show();
}

// 9. Зробимо, щоб з допомогою клавіши "Escape" закривалось зображення
// Створюємо функцію onCloseModal(), яка буде удаляти тег "div",
// який створюється, коли натискаєш на картинку
// Шукаємо тег "div" з класом "basicLightbox"
function onCloseModal() {
  const elBasicLightbox = document.querySelector("div.basicLightbox");
  // console.log(elBasicLightbox);

  // Вішаємо на нього слухача події картинку, коли ми її відкриваємо
  document.addEventListener("keydown", escapeClick);

  // Створюємо функцію за допомогою якої можна видалити створений "div",
  // який створюється при відкритті картинки

  function escapeClick(evt) {
    // Якщо подія "keydown" не дорівнює `Escape` (при загрузці не нажимати "Escape"),
    // то ми закінчуємо подію "return"

    if (evt.key !== "Escape") {
      return;
    }
    // Яущо ж перша умова не виконується, то видаляємо "div.basicLightbox",
    // який створюється при відкритті картинки
    elBasicLightbox.remove(); //Метод Element.remove() видаляє елемент з DOM-дерева
  }
}

////////////////////////////////////////////////////////////////////////////
// Спробуємо вирішити це завдання тернарним оператором

//   function escapeClick(evt) {
//     evt.key === "Escape" ? elBasicLightbox.remove() : console.log();
//     //<умова> ? <вираз_якщо_умова_правдива> : <вираз_якщо_умова_хибна>
//   }
////////////////////////////////////////////////////////////////////////////

// // Трішки інший спосіб рішення

// function createGalleryMarcup(galleryItems) {
//   //1. створюємо змінну murkup, беремо масив об’єктів "galleryItems",
//   // які передаємо і перебираємо його за допомогою методу map(),
//   // який дестроктиризуємо та вложемо в нього "<div></div>" із завдання
//   // на кожен "<div></div>" буде повертатися картинка
//   const markup = galleryItems
//     // не дестроктеризуємо "map" (map({ preview, original, description })
//     .map(
//       (galleryItem) =>
//         `<div class="gallery__item">
//       <a class="gallery__link" href="${galleryItem.original}">
//         <img
//           class="gallery__image"
//           src="${galleryItem.preview}"
//           data-source="${galleryItem.original}"
//           alt="${galleryItem.description}"
//         />
//       </a>
//     </div>`
//     )
//     .join("\n");

//   return markup;
// }

// // 2. Зарендерим розмітку в "<div></div>"
// const galleryContainer = document.querySelector(".gallery");

// // 3. Зробимо розмітку "cardsMarkup"
// const cardsMarkup = createGalleryMarcup(galleryItems);
// // console.log(createGalleryMarcup(galleryItems));

// // 4. Можемо вибрати один з двох способів виведення картинок на екран
// // 4.1 За допомогою innerHTML виведемо на екран картинки
// galleryContainer.innerHTML = cardsMarkup;

// // 4.2 Розмістимо картинки (тобто "cardsMarkup") всередині elem,
// // після усіх дітей
// // galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);

// // 5. Використаємо делегування, додаємо до "gallery" кнопку "click",
// // тобто вішаємо слухача події
// galleryContainer.addEventListener("click", onClickGallery);

// function onClickGallery(evt) {
//   // 6. Якщо елемент по якому ми клацнули("evt.target") не картинка ("IMG"),
//   // то не оброблюємо цей "click"
//   evt.preventDefault(); //для початку, скасовує поведінку за замовчуванням, тобто перехід по посиланню в тегу "а" (href="${original}")
//   if (evt.target.tagName !== "IMG") {
//     return;
//   }

//   // 7. Отримуємо посилання на data-source="${original}" в "const markup"
//   // за допомогою властивості "dataset"
//   const urlImage = evt.target.dataset.source;

//   // 8. Підключаємо бібліотеку за інструкцією. Вставляємо код з інструкції
//   // "https://basiclightbox.electerious.com/", пункт "Зображення"
//   const instance =
//     basicLightbox.create(`<img src="${urlImage}" width="800" height="600">
// `);
//   instance.show();

//   // 9. Добавляємо слухача події "keydown" на function escapeClick(evt)
//   galleryContainer.addEventListener("keydown", function escapeClick(evt) {
//     // Якщо події "keydown" призначити "Escape", то картинка закривається "instance.close();"
//     if (evt.key === "Escape") {
//       instance.close();
//     }
//   });
// }

////////////////////////////////////////////////////////////////////////////
// Спробуємо вирішити це завдання тернарним оператором

//   function escapeClick(evt) {
//     evt.key === "Escape" ? elBasicLightbox.remove() : console.log();
//     //<умова> ? <вираз_якщо_умова_правдива> : <вираз_якщо_умова_хибна>
//   }
// }
////////////////////////////////////////////////////////////////////////////
