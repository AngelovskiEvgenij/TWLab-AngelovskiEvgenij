"use strict";
const images = [
    "../MEDIA/images.jpeg",
    "../MEDIA/images1.jpeg",
    "../MEDIA/UVT.jpg",
    "../MEDIA/uvt-2.jpg"
];
const mainImage = document.getElementById("carousel-image");
if (!mainImage) {
    throw new Error("Elementul n-a putut fi gasit!");
}
let currentIndex = 0;
function showNextImage() {
    mainImage.style.opacity = "0.1";
    mainImage.style.transform = "scale(0.95)";
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
        mainImage.style.opacity = "1";
        mainImage.style.transform = "scale(1)";
    }, 300);
}
setInterval(showNextImage, 3000);
