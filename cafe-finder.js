function cafeFinder() {
  const reset = document.querySelector('.reset-button-js');
  reset.addEventListener('click', () => {
    localStorage.clear();
    location.reload(true);
  });

  localStorage.removeItem('noLoadedWebsite');
  localStorage.removeItem('noLoadedHours');
  localStorage.removeItem('noLoadedContact');
  let buttonClicked = JSON.parse(localStorage.getItem('buttonClicked'));

  const search = document.querySelector('.search-button-js');
  const body = document.querySelector('.body-section');
  const name = document.querySelector('.location-names');
  const links = document.querySelector('.links-lo-names');
  const inputParish = document.querySelector('.enter-parish');
  const inputCountry = document.querySelector('.enter-country');
  const countryLocation = document.querySelector('.location-countries'); // --- IMAGE ARRAY DEFINITION (Must be global or outside the load block) ---

  const images = [
    'Gemini_Generated_Image_qc9rhyqc9rhyqc9r-removebg-preview.png',
    'Gemini_Generated_Image_ogc0nwogc0nwogc0-removebg-preview.png',
    'Gemini_Generated_Image_nq532qnq532qnq53-removebg-preview.png',
    'Gemini_Generated_Image_5juveg5juveg5juv-removebg-preview.png',
  ];
  localStorage.setItem('imagesLoaded', JSON.stringify(images)); // ----------------------------------------------------------------------- // Logic for page reload (not directly related to image issue, but kept for context)
  let reloadPage = JSON.parse(localStorage.getItem('reloadPage'));
  if (reloadPage) {
    window.addEventListener('load', () => {
      body.classList.add('hide-body');
    });
  }
  if (reloadPage) {
    inputCountry.addEventListener('focus', () => {
      console.log('hello');
    });
  }

  const loadCountry = JSON.parse(localStorage.getItem('savedCountry'));
  const loadState = JSON.parse(localStorage.getItem('savedParish'));
  const loadNames = JSON.parse(localStorage.getItem('savedNames'));
  const cafeDetails = JSON.parse(localStorage.getItem('cafeDetails')); // --- START: CORRECTED CODE BLOCK FOR LOADING FROM LOCAL STORAGE ---

  if (buttonClicked) {
    if (loadNames) {
      countryLocation.classList.remove('fadein-location-names');
      name.classList.remove('fadein-location-country');
      body.classList.remove('fadein-body');
      links.classList.remove('fade-link');
      countryLocation.classList.add('insta-names');
      name.classList.add('insta-country');
      body.classList.add('insta-body');
      links.classList.add('insta-link');

      countryLocation.textContent = `Cafes near: ${loadState}, ${loadCountry}`;
      cafeDetails.features.forEach((cafe) => {
        let newNames = document.createElement('p');
        newNames.textContent = cafe.properties.name;
        name.appendChild(newNames);
        newNames.classList.add('hover-names');
        newNames.style.width = 'auto';

        // --- REMOVED: THE DUPLICATE setInterval IMAGE ROTATION LOGIC WAS HERE ---

        newNames.addEventListener('click', () => {
          // Existing Local Storage saving logic (for cafe-info.html)
          let loadedContact = cafe.properties.contact;
          let loadedName = cafe.properties.name;
          let loadedWebsite = cafe.properties.website;
          let loadedAddress = cafe.properties.address_line2;
          let loadedHours = cafe.properties.opening_hours;
          let loadedDetails = true;

          // ... (Rest of Local Storage saving for loadedDetails) ...

          if (!loadedHours) {
            localStorage.setItem('noLoadedHours', JSON.stringify(false));
          } else {
            localStorage.setItem('loadedHours', JSON.stringify(loadedHours));
          }
          if (!loadedAddress) {
            localStorage.setItem('noLoadedAddress', JSON.stringify(false));
          } else {
            localStorage.setItem(
              'loadedAddress',
              JSON.stringify(loadedAddress),
            );
          }
          if (!loadedWebsite) {
            localStorage.setItem('noLoadedWebsite', JSON.stringify(false));
          } else {
            localStorage.setItem(
              'loadedWebsite',
              JSON.stringify(loadedWebsite),
            );
          }
          if (!loadedName) {
            localStorage.setItem('noLoadedName', JSON.stringify(false));
          } else {
            localStorage.setItem('loadedName', JSON.stringify(loadedName));
          }
          if (!loadedContact) {
            localStorage.setItem('noLoadedContact', JSON.stringify(false));
          } else {
            localStorage.setItem(
              'loadedContact',
              JSON.stringify(loadedContact),
            );
          }

          localStorage.setItem('loadedName', JSON.stringify(loadedName));
          localStorage.setItem('loadedWebsite', JSON.stringify(loadedWebsite));
          localStorage.setItem('loadedAddress', JSON.stringify(loadedAddress));
          localStorage.setItem('loadedHours', JSON.stringify(loadedHours));
          localStorage.setItem('loadedDetails', JSON.stringify(loadedDetails));
        });
      });
    }
  } else {
    console.log('false');
  } // --- END: CORRECTED CODE BLOCK FOR LOADING FROM LOCAL STORAGE --- // --- START: SINGLE, CENTRALIZED IMAGE ROTATION LOGIC --- // This runs only once when cafeFinder() is executed.
  let index = 0;

  setInterval(() => {
    const img = document.querySelector('.body-logo');
    img.classList.add('logo-fadeout');
    img.classList.remove('logo-fadein');

    const logoDiv = document.querySelector('.logo-div');

    logoDiv.classList.add('logoDiv-fadeout');
    logoDiv.classList.remove('logoDiv-fadein');

    setTimeout(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
      img.classList.remove('logo-fadeout');
      img.classList.add('logo-fadein');

      logoDiv.classList.remove('logoDiv-fadeout');
      logoDiv.classList.add('logoDiv-fadein');
    }, 2000);
  }, 3000); // --- END: SINGLE, CENTRALIZED IMAGE ROTATION LOGIC --- // when you click search it finds the country and the cafes near the parissh or state 49 to 69
  search.addEventListener('click', () => {
    body.classList.remove('hide-body');

    let oldStorage = JSON.parse(localStorage.getItem('oldStorage'));
    if (oldStorage) {
      name.textContent = '';
      localStorage.clear();
      console.log('hello');
    } // Input validation (kept as is)
    try {
      if (inputCountry.value === '') {
        body.classList.add('fadein-body');
        let errorMessage = document.createElement('p');
        errorMessage.textContent = 'YOU DID NOT ENTER A COUNTRY';
        body.textContent = errorMessage.textContent;
        return;
      }

      if (inputParish.value === '') {
        body.classList.add('fadein-body');
        let errorMessage = document.createElement('p');
        errorMessage.textContent = 'YOU DID NOT ENTER A PARISH OR STATE';
        body.textContent = errorMessage.textContent;
        return;
      }
    } catch (error) {
      console.log('didnt enter a parish or country');
    }

    // --- Geocoding API Call (kept as is) ---
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        inputCountry.value + ',' + inputParish.value,
      )}&apiKey=0a973dabed4f4d7abcd9c5536356561f`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const lat = data.features[0].properties.lat;
        const lon = data.features[0].properties.lon;

        const delta = 0.05;
        const left = lon - delta;
        const right = lon + delta;
        const top = lat + delta;
        const bottom = lat - delta;

        // --- Places API Call (kept as is) ---
        fetch(
          `https://api.geoapify.com/v2/places?categories=catering.cafe&filter=rect:${left},${top},${right},${bottom}&limit=20&apiKey=0a973dabed4f4d7abcd9c5536356561f`,
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let array = [];
            let newStorage = true;
            if (newStorage) {
              name.textContent = '';
              localStorage.clear();
            }
            localStorage.setItem('cafeDetails', JSON.stringify(data));

            data.features.forEach((cafe) => {
              const listNames = document.createElement('p');
              listNames.textContent = cafe.properties.name;
              name.appendChild(listNames); // Existing Local Storage saving logic (for search results list)
              listNames.classList.add('hover-names');
              listNames.style.width = 'auto';
              array.push(cafe.properties.name);
              localStorage.setItem('savedNames', JSON.stringify(array));
              localStorage.setItem(
                'savedCountry',
                JSON.stringify(inputCountry.value),
              );
              localStorage.setItem(
                'savedParish',
                JSON.stringify(inputParish.value),
              ); // when you click on one of the listed cafes it finds the address,website,opening hours and nmber for that cafe line 97 to 101

              listNames.addEventListener('click', () => {
                // Existing Local Storage saving logic (for cafe-info.html)
                let addresses = cafe.properties.address_line2;
                let website = cafe.properties.website;
                let opening = cafe.properties.opening_hours;
                let number = cafe.properties.contact;
                let buttonClicked = true;

                if (!number) {
                  localStorage.setItem('noNumber', JSON.stringify(false));
                } else {
                  localStorage.setItem('cafesNumbers', JSON.stringify(number));
                }

                if (!opening) {
                  localStorage.setItem('noOpening', JSON.stringify(false));
                } else {
                  localStorage.setItem('cafesOpening', JSON.stringify(opening));
                }

                if (!website) {
                  localStorage.setItem('noWebsite', JSON.stringify(false));
                } else {
                  localStorage.setItem('cafesWebsite', JSON.stringify(website));
                }

                if (!addresses) {
                  localStorage.setItem('noAddress', JSON.stringify(false));
                } else {
                  localStorage.setItem(
                    'cafesAddress',
                    JSON.stringify(addresses),
                  );
                } // pushes the cafes addresses,website,country,state,opening hours and number into local storage line 108 to 116

                localStorage.setItem(
                  'cafeNames',
                  JSON.stringify(listNames.textContent),
                );
                localStorage.setItem(
                  'buttonClicked',
                  JSON.stringify(buttonClicked),
                );
              });
            });
          }); // fades in the page with the info line 120 to 125
        countryLocation.classList.add('fadein-location-names');
        name.classList.add('fadein-location-country');
        body.classList.add('fadein-body');
        links.classList.add('fade-link');
        countryLocation.textContent = `CAFES NEAR: ${inputParish.value} , ${inputCountry.value}`;
      });
  });
}
cafeFinder();
