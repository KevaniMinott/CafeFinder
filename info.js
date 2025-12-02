function cafeInfo() {
  const body = document.querySelector('.body-section');
  let links = document.querySelector('.links-lo-names');
  let cafeTitle = document.querySelector('.title');
  let contactTile = document.querySelector('.contact-title');
  let cafeNumber = document.querySelector('.contact-number');
  let cafeWebsite = document.querySelector('.website-link');
  let websiteTile = document.querySelector('.cafe-Website');
  let cafeAddress = document.querySelector('.address');
  let contactInfo = document.querySelector('.contact-info');
  let cafeTime = document.querySelector('.time');
  let timeDiv = document.querySelector('.opening-div');

  window.addEventListener('load', () => {
    let reloadPage = JSON.parse(localStorage.getItem('reloadPage'));
    let noWebsite = JSON.parse(localStorage.getItem('noWebsite'));
    let noOpening = JSON.parse(localStorage.getItem('noOpening'));
    let noNumber = JSON.parse(localStorage.getItem('noNumber'));
    let loadedDetails = JSON.parse(localStorage.getItem('loadedDetails'));
    let noLoadedContact = JSON.parse(localStorage.getItem('noLoadedContact'));
    let noLoadedAddress = JSON.parse(localStorage.getItem('noLoadedAddress'));
    let noLoadedName = JSON.parse(localStorage.getItem('noLoadedName'));
    let noLoadedWebsite = JSON.parse(localStorage.getItem('noLoadedWebsite'));
    let noLoadedHours = JSON.parse(localStorage.getItem('noLoadedHours'));
    reloadPage = false;

    if (loadedDetails) {
      console.log('it is trueee');
      if (noLoadedContact === false) {
        console.log('no number');
        cafeNumber.remove();
        contactTile.remove();
      } else {
        const loadedContact = JSON.parse(localStorage.getItem('loadedContact'));
        cafeNumber.textContent = `Contact Number: ${loadedContact.phone}`;
        console.log(cafeNumber.textContent);
      }

      if (noLoadedHours === false) {
        cafeTime.remove();
        timeDiv.remove();
        console.log('no opening');
      } else {
        const loadedHours = JSON.parse(localStorage.getItem('loadedHours'));
        cafeTime.textContent = loadedHours;
        console.log(cafeTime.textContent);
      }

      if (noLoadedWebsite === false) {
        console.log('no website');
        websiteTile.remove();
        cafeWebsite.remove();
      } else {
        const loadedWebsite = JSON.parse(localStorage.getItem('loadedWebsite'));
        cafeWebsite.textContent = `${loadedWebsite}`;
        links.href = cafeWebsite.textContent;
        console.log(cafeWebsite.textContent);
      }

      if (noLoadedAddress === false) {
        console.log('no address');
        cafeAddress.remove();
      } else {
        const loadedAddress = JSON.parse(localStorage.getItem('loadedAddress'));
        cafeAddress.textContent = `${loadedAddress}`;
        console.log(cafeAddress.textContent);
      }

      if (noLoadedName === false) {
        console.log('no name');
        infoName.remove();
      } else {
        const loadedName = JSON.parse(localStorage.getItem('loadedName'));
        cafeTitle.textContent = `${loadedName}`;
        console.log(cafeTitle.textContent);
      }
    } else {
      //gets the cafe name from local storage
      const infoName = JSON.parse(localStorage.getItem('cafeNames'));
      cafeTitle.textContent = infoName;

      //gets the cafe number from local storage
      if (noNumber === false) {
        console.log('no number');
        cafeNumber.remove();
        contactTile.remove();
      } else {
        const infoContact = JSON.parse(localStorage.getItem('cafesNumbers'));
        cafeNumber.textContent = `Contact Number: ${infoContact.phone}`;
        console.log(cafeNumber.textContent);
      }

      //gets the cafe opening time from local storage
      if (noOpening === false) {
        cafeTime.remove();
        timeDiv.remove();
        console.log('no opening');
      } else {
        const infoHours = JSON.parse(localStorage.getItem('cafesOpening'));
        cafeTime.textContent = infoHours;
        console.log(cafeTime.textContent);
      }

      //gets the cafe website from local storage
      if (noWebsite === false) {
        console.log('no website');
        websiteTile.remove();
        cafeWebsite.remove();
      } else {
        const infoWebsite = JSON.parse(localStorage.getItem('cafesWebsite'));
        cafeWebsite.textContent = `${infoWebsite}`;
        links.href = cafeWebsite.textContent;
        console.log(cafeWebsite.textContent);
      }

      //gets the cafe location from local storage
      const infoLocation = JSON.parse(localStorage.getItem('cafesAddress'));
      cafeAddress.textContent = infoLocation;
    }

    document.body.classList.add('fade-in');
    body.classList.add('fadein-body');
  });
}
cafeInfo();

/* use local storage to store the data for when the page reloads the names are saved*/

// find better images for the front page and fix the circle background and add decorations for the headers and body also finish the javascript
