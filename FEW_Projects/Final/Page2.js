const thumbs = document.querySelectorAll(".thumb");
const detailText = document.getElementById("detailText");

thumbs.forEach((img) => {
    img.addEventListener("click", () => {
        console.log("Image clicked:", img);
        const description = img.getAttribute("data-desc");
        detailText.textContent = description;
    });
});

const scrollBox = document.querySelector(".scrollBox");

document.querySelector(".arrow.up").addEventListener("click", () => {
    scrollBox.scrollBy({ top: -225, behavior: "smooth" });
});

document.querySelector(".arrow.down").addEventListener("click", () => {
    scrollBox.scrollBy({ top: 225, behavior: "smooth" });
});


// Auto-select the first image when the page loads
window.addEventListener("DOMContentLoaded", () => {
    if (thumbs.length > 0) {
        const firstImg = thumbs[0];
        detailText.textContent = firstImg.getAttribute("data-desc");
    }
});

thumbs.forEach((img) => {
  img.addEventListener("click", () => {
    const wrapper = img.closest(".img-box");

    // Remove active class from all wrappers first
    document.querySelectorAll(".img-box").forEach(w => 
      w.classList.remove("active")
    );

    // Add active class to this wrapper
    wrapper.classList.add("active");

    // Update description text
    const description = img.getAttribute("data-desc");
    detailText.textContent = description;
  });
});
