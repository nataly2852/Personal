// Page2.js

const detailText = document.getElementById("detailText");
const scrollBox = document.getElementById("scrollContainer");

// 1. Fetch Data immediately
fetch("/api/banners")
    .then(response => response.json())
    .then(banners => {
        renderList(banners);
        checkUrlParams(banners);
    })
    .catch(err => console.error("Error loading banners:", err));

// 2. Function to build the HTML list
function renderList(banners) {
    scrollBox.innerHTML = ""; // Ensure empty

    banners.forEach((item, index) => {
        // Create main wrapper: <div class="img-box">
        const imgBox = document.createElement("div");
        imgBox.className = "img-box";
        imgBox.dataset.index = index; // Store index for easier lookup

        // Create Thumbnail Image
        const img = document.createElement("img");
        img.className = "thumb";
        img.src = item.img || "Aesprite_Assets/square.png";
        img.dataset.desc = item.description; // Store desc on element
        img.dataset.id = item.id;

        // Create the GIF overlay (hidden by default via CSS)
        const gifDiv = document.createElement("div");
        gifDiv.className = "gif";
        const gifImg = document.createElement("img");
        gifImg.src = "Aesprite_Assets/Wanderer3.gif"; // Hardcoded or from Notion if you want
        gifDiv.appendChild(gifImg);

        // Assemble
        imgBox.appendChild(img);
        imgBox.appendChild(gifDiv);
        scrollBox.appendChild(imgBox);

        // Click Event
        img.addEventListener("click", () => {
            setActive(imgBox, item.description);
        });
    });
}

// 3. Handle Active State & Description
function setActive(targetBox, description) {
    // Remove 'active' from all boxes
    document.querySelectorAll(".img-box").forEach(box => {
        box.classList.remove("active");
    });

    // Add 'active' to clicked box
    targetBox.classList.add("active");

    // Update Text
    detailText.textContent = description;
    
    // Smooth Scroll to it
    targetBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

// 4. Handle URL Params (Redirect from Page 1)
function checkUrlParams(banners) {
    const params = new URLSearchParams(window.location.search);
    const bannerId = params.get("banner");

    if (bannerId) {
        // Find the index of the banner with this ID
        const index = banners.findIndex(b => b.id == bannerId);
        if (index !== -1) {
            const boxes = document.querySelectorAll(".img-box");
            if (boxes[index]) {
                setActive(boxes[index], banners[index].description);
                return;
            }
        }
    }

    // Default: Select the first item if no URL param
    const firstBox = document.querySelector(".img-box");
    if (firstBox && banners.length > 0) {
        setActive(firstBox, banners[0].description);
    }
}

// 5. Scroll Buttons (Up/Down)
document.querySelector(".arrow.up").addEventListener("click", () => {
    scrollBox.scrollBy({ top: -432, behavior: "smooth" });
});

document.querySelector(".arrow.down").addEventListener("click", () => {
    scrollBox.scrollBy({ top: 432, behavior: "smooth" });
});