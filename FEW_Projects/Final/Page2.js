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
    scrollBox.scrollBy({ top: -432, behavior: "smooth" });
});

document.querySelector(".arrow.down").addEventListener("click", () => {
    scrollBox.scrollBy({ top: 432, behavior: "smooth" });
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


// Get the banner ID from the URL
const params = new URLSearchParams(window.location.search);
const bannerId = params.get("banner"); // e.g., "1"


function selectBanner(index) {
    const wrapper = thumbs[index].closest(".img-box");
    
    // Remove active from all
    document.querySelectorAll(".img-box").forEach(w => w.classList.remove("active"));
    
    // Activate this one
    wrapper.classList.add("active");
    detailText.textContent = thumbs[index].getAttribute("data-desc");

    // Scroll into view
    wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
}

// If URL had banner ID, select it
if (bannerId) {
    const index = parseInt(bannerId) - 1; // convert to 0-based
    if (thumbs[index]) selectBanner(index);
} else {
    // Default to first
    selectBanner(0);
}

// Also keep your click event for manual selection
thumbs.forEach((img, i) => {
  img.addEventListener("click", () => selectBanner(i));
});