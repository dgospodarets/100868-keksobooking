function loadHotelsCallback(data) {
  __registeredCallbacks.forEach(function(callback) {
    callback(data);
  });
};

var __registeredCallbacks = [];

(function() {
  var amenityClassName = {
    'breakfast': 'hotel-amenity-breakfast',
    'parking': 'hotel-amenity-parking',
    'wifi': 'hotel-amenity-wifi'
  };

  var starsClassName = {
    '1': 'hotel-stars',
    '2': 'hotel-stars-two',
    '3': 'hotel-stars-three',
    '4': 'hotel-stars-four',
    '5': 'hotel-stars-five'
  };

  var ratingClassName = {
    '4': 'hotel-rating-four',
    '5': 'hotel-rating-five',
    '6': 'hotel-rating-six',
    '7': 'hotel-rating-seven',
    '8': 'hotel-rating-eight',
    '9': 'hotel-rating-nine',
  };

  __registeredCallbacks.push(function(loadedHotels) {
    initializeHotelsList(loadedHotels);
  });

  var handleImageLoadError = function(hotelElement) {
    hotelElement.classList.add('hotel-nophoto');
  };

  var initializeHotelsList = function(hotels) {
    var IMAGE_FAILURE_TIMEOUT = 10000;

    var hotelsContainer = document.querySelector('.hotels-list');
    var hotelTemplate = document.getElementById('hotel-template');

    var hotelsFragment = document.createDocumentFragment();

    // // TODO: Pages
    if ('content' in hotelTemplate) {
      hotels.forEach(function(hotel, i) {
        var newHotelElement = document.importNode(hotelTemplate.content, true);

        // TODO: Favourites
        newHotelElement.querySelector('.hotel-stars').classList.add(starsClassName[hotel['stars']]);
        newHotelElement.querySelector('.hotel-name').textContent = hotel['name'];
        newHotelElement.querySelector('.hotel-distance-kilometers').textContent = hotel['distance'] + ' км';
        newHotelElement.querySelector('.hotel-price-value').textContent = hotel['price'];
        newHotelElement.querySelector('.hotel-rating').textContent = hotel['rating'];
        newHotelElement.querySelector('.hotel-rating').classList.add(ratingClassName[Math.floor(hotel['rating'])]);

        var amenitiesContainer = newHotelElement.querySelector('.hotel-amenities');
        hotel['amenities'].forEach(function(amenity) {
          var amenityElement = document.createElement('li');
          amenityElement.classList.add('hotel-amenity');
          amenityElement.classList.add(amenityClassName[amenity]);
          amenitiesContainer.appendChild(amenityElement);
        });

        hotelsFragment.appendChild(newHotelElement);

        // NB! newHotelElement is a {@code DocumentFragment} thus to modify
        // its style it's needed to get a corresponding {@code Element} first.
        // It's rough quick solution to be refactored.
        var recentlyAdded = [].slice.call(hotelsFragment.children, -1)[0];

        if (hotel['preview']) {
          var hotelBackground = new Image;
          hotelBackground.src = hotel['preview'];

          var imageLoadTimeout = setTimeout(function() {
            handleImageLoadError(recentlyAdded);
          }, IMAGE_FAILURE_TIMEOUT);

          hotelBackground.onerror = hotelBackground.onabort = function(evt) {
            handleImageLoadError(recentlyAdded);
          };

          hotelBackground.onload = function() {
            recentlyAdded.style.backgroundImage = 'url(\'' + hotelBackground.src + '\')';
            recentlyAdded.style.backgroundSize = '100% auto';
            clearTimeout(imageLoadTimeout);
          };
        }
      });
    }

    hotelsContainer.appendChild(hotelsFragment);
  };

  var loadHotels = function() {
    var scriptElement = document.createElement('script');
    scriptElement.onabort = function(evt) {}
    scriptElement.onerror = function(evt) {}

    scriptElement.src = 'js/hotels.js';
    document.body.appendChild(scriptElement);
  };

  loadHotels();
})();
