import imagesArray from "./gallery-items.js";

const refs = {
  ulGalleryRef: document.querySelector(`.js-gallery`),
  modal: document.querySelector(`.js-lightbox`),
  modalOverlay: document.querySelector(`.lightbox__overlay`),
  modalImage: document.querySelector(`.lightbox__image`),
  modalButton: document.querySelector(`button[data-action="close-lightbox"]`),
};
const {
  ulGalleryRef,
  modal,
  modalOverlay,
  modalImage,
  modalButton,
} = refs;

const imagesString = imagesArray.map(({ preview, description,  original}) => {
    return `<li>
        <a href="${original}">
        <img src="${preview}" alt="${description}" data-source="${original}"> 
    </a></li>`;
}).join(``);
ulGalleryRef.insertAdjacentHTML(`beforeend`, imagesString);

const lis = ulGalleryRef.querySelectorAll(`li`);
const links = ulGalleryRef.querySelectorAll(`a`)

lis.forEach((el) => el.classList.add(`gallery__item`));
links.forEach((link) => link.classList.add(`gallery__link`));
ulGalleryRef.querySelectorAll(`img`)
    .forEach(el => el.classList.add(`gallery__image`));

// modal
ulGalleryRef.addEventListener(`click`, onMouseClickListElementHandler)
modalButton.addEventListener(`click`, onModalCloseButtonClickHandler)
modalOverlay.addEventListener(`click`, onModalCloseButtonClickHandler);
document.addEventListener(`keydown`, onEscPress)

function onMouseClickListElementHandler(event) {
    event.preventDefault(); // we prevent transfer to another site by href click
    modal.classList.add(`is-open`);
    modalImage.alt = event.target.alt;
    modalImage.src = event.target.dataset.source;
}
function onModalCloseButtonClickHandler() {
    modal.classList.remove(`is-open`);
    // this deletes big image's cache when opening another big image
    // because old one could be seen in 0.1 second period
    modalImage.src = ``;
    modalImage.alt = ``;
}
function onEscPress(event) {
    if (event.key === `Escape`) {
        modal.classList.remove(`is-open`);
        modalImage.src = ``;
        modalImage.alt = ``;
    }
}

// changing images through arrow-press
const arrayOfDataSources = [];

imagesArray.forEach((el) => {
  arrayOfDataSources.push(el.original);
});

document.addEventListener(`keydown`, onArrowPressModalHandler);

function onArrowPressModalHandler(event) {
    let newIndex;
    const currentIndex = arrayOfDataSources.indexOf(
        modalImage.getAttribute(`src`)
    );
    
    if (event.key === `ArrowRight`) {
        newIndex = currentIndex + 1;
        if (newIndex == arrayOfDataSources.length) {
          newIndex = 0;
        }
    }
    if (event.key === `ArrowLeft`) {
        newIndex = currentIndex - 1;
        if (newIndex == -1) {
          newIndex = arrayOfDataSources.length - 1;
        }
    }
    modalImage.src = arrayOfDataSources[newIndex];
}













