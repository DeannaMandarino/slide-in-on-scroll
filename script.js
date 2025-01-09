// Debounce function given by Wesbos
function debounce(func, wait = 15, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.content__image');

function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // Get the position of the image and its dimensions
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    // Check if the image is visible in the viewport
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    // Add or remove the 'active' class based on the image's visibility
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    }
    else {
      sliderImage.classList.remove('active');
    }
  });
}

// Attach the debounced 'checkSlide' function to the scroll event
window.addEventListener('scroll', debounce(checkSlide));