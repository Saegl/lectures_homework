const PHOTO_LIST = [
    "assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/5.jpg",
    "assets/6.jpg",
    "assets/7.jpg",
    "assets/9.jpg",
    "assets/10.jpg",
    "assets/11.jpg",
    "assets/12.jpg",
    "assets/13.jpg",
    "assets/14.jpg",
    "assets/15.jpg",
]

let currentPhoto = 0;

function onModalClick() {
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    modalView.innerHTML = '';
}

function ModalChangePhoto() {
    modalView.innerHTML = '';
    const image = createImage(PHOTO_LIST[currentPhoto]);
    modalView.appendChild(image);
}

const modalView = document.querySelector("#modal-view");
modalView.addEventListener('click', onModalClick);

function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    return image;
}

const albumView = document.querySelector("#album-view");
for (let i = 0; i < PHOTO_LIST.length; i++) {
    const photoSrc = PHOTO_LIST[i];
    const image = createImage(photoSrc);
    image.addEventListener('click', onThumbnailClick);
    albumView.appendChild(image);
}

function onThumbnailClick(event) {
    const image = createImage(event.currentTarget.src);
    let head = event.currentTarget.src.split('.jpg')[0].split('/');
    currentPhoto = head[head.length - 1] - 1;

    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    modalView.appendChild(image);
    modalView.classList.remove('hidden');
}

function onKeyUp(event) {
    console.log('key ' + event.key);
    if (event.key == 'Escape') {
        onModalClick();
    }

    if (event.key == 'ArrowLeft' && currentPhoto > 0) {
        currentPhoto -= 1;
        ModalChangePhoto();
    }
    if (event.key == 'ArrowRight' && currentPhoto < PHOTO_LIST.length - 1) {
        currentPhoto += 1;
        ModalChangePhoto();
    }
}

document.addEventListener('keyup', onKeyUp);