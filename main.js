function main() {
  let mainButton = document.querySelector('.main-button');
  mainButton.addEventListener('click', () => {
    localStorage.setItem('reloadPage', JSON.stringify(true));
    localStorage.clear();
    console.log('clicked');
  });
}
main();
