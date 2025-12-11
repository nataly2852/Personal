const banners = document.querySelectorAll(".cell");

banners.forEach(cell => {
  cell.addEventListener("click", () => {
    const bannerId = cell.dataset.banner; // get banner ID
    window.location.href = `Test2.html?banner=${bannerId}`; // redirect ID
  });
});