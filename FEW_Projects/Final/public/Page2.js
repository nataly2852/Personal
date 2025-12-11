// CORRECTED CODE in Page2.js (near the top)

document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.getElementById("scrollContainer");
    const detailText = document.getElementById("detailText");
    const detailImage = document.getElementById("detailImage");
    const detailTitle = document.getElementById("detailTitle");
    // const detailLink = document.getElementById("detailLink"); // REMOVE: Not needed, you use the anchor
    const detailLinkAnchor = document.getElementById("detailLinkContainer"); // <-- FIX: Use correct HTML ID
    let allBanners = []; 
    // --- Helper Functions ---

    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Function to update the right column
    function displayDetails(banner) {

        //set title
        detailTitle.textContent = banner.title;

        // 1. Update the description text
        detailText.textContent = banner.description;

        // Set the link attribute and visibility
        if (banner.link) {
            detailLinkAnchor.href = banner.link;
            detailLinkAnchor.style.display = 'inline-block'; // Or 'block', depending on CSS
        } else {
            detailLinkAnchor.style.display = 'none';
        }

        // 2. Handle the extra image (extraImg)
        if (banner.extraImg) {
            detailImage.src = banner.extraImg;
            detailImage.alt = banner.title + " Detail Image";
            detailImage.style.display = 'block';
        } else {
            detailImage.src = "";
            detailImage.style.display = 'none';
        }

        // 3. Update the 'active' state for the list items (visual feedback)
        document.querySelectorAll('.img-box').forEach(box => {
            box.classList.remove('active');
        });
        const activeBox = document.querySelector(`.img-box[data-banner="${banner.id}"]`);

        if (activeBox) {
            activeBox.classList.add('active');

            // ⭐ NEW: Scroll the selected item into the center of the scroll container
            activeBox.scrollIntoView({
                behavior: 'smooth',
                block: 'center' // This centers the element vertically
            });
        }
    }
    // --- Core Logic ---

    // Initial fetch and setup
    fetch("/api/banners")
        .then(response => response.json())
        .then(banners => {
            allBanners = banners; // Store banners here, first thing!

            let selectedBannerId = getQueryParam("banner");
            let selectedBanner = null;

            // ⭐️ AUTO-SELECT LOGIC IS HERE (MISSING IN YOUR SNIPPET)
            if (!selectedBannerId && allBanners.length > 0) {
                const firstBanner = allBanners[0];
                selectedBannerId = firstBanner.id;
                selectedBanner = firstBanner;
                // Update URL state via history.pushState()
            } else if (selectedBannerId) {
                // If an ID is in the URL, find that banner
                selectedBanner = allBanners.find(b => b.id == selectedBannerId);
            }

            // 1. Generate the list using the determined ID (from URL or auto-selected)
            generateList(allBanners, selectedBannerId);

            // 2. Initial detail display using the determined banner object
            if (selectedBanner) {
                displayDetails(selectedBanner);
            } else {
                detailText.textContent = "Select a project from the left column to see its details.";
                detailImage.style.display = 'none';
            }
        })
        .catch(err => console.error("Error loading banners:", err));


    // Function to generate list items and set up click handlers
    function generateList(data, activeId) {
        data.forEach((item) => {
            // ... (rest of your list creation is the same) ...
            const imgBox = document.createElement("div");
            imgBox.className = "img-box";
            imgBox.dataset.banner = item.id; // Crucial for selection

            if (item.id == activeId) {
                imgBox.classList.add('active');
            }

            // Create and append the thumbnail and GIF elements (as you had before)
            const thumbImg = document.createElement("img");
            thumbImg.className = "thumb";
            thumbImg.src = item.img || "Aesprite_Assets/square.png";
            thumbImg.alt = item.title;
            thumbImg.loading = "lazy";

            const gifDiv = document.createElement("div");
            gifDiv.className = "gif";
            const gifImg = document.createElement("img");
            gifImg.src = "Aesprite_Assets/Wanderer3.gif";
            gifDiv.appendChild(gifImg);

            imgBox.appendChild(thumbImg);
            imgBox.appendChild(gifDiv);
            scrollContainer.appendChild(imgBox);


            // ** THE FIX IS HERE: Use a dynamic handler instead of full reload **
            imgBox.addEventListener("click", () => {
                const clickedBanner = allBanners.find(b => b.id === item.id);
                if (clickedBanner) {
                    // 1. Update the URL without reloading the page
                    const newUrl = `${window.location.pathname}?banner=${item.id}`;
                    window.history.pushState({ bannerId: item.id }, clickedBanner.title, newUrl);

                    // 2. Update the details content dynamically
                    displayDetails(clickedBanner);
                }
            });
        });
    }

    // Handle browser back/forward buttons for dynamic updates
    window.addEventListener('popstate', (event) => {
        const bannerIdFromUrl = getQueryParam("banner");
        if (bannerIdFromUrl) {
            const banner = allBanners.find(b => b.id == bannerIdFromUrl);
            if (banner) {
                displayDetails(banner);
            }
        } else {
            // If no banner is in the URL (e.g., hit back to Page2.html)
            detailText.textContent = "Select a project from the left column to see its details.";
            detailImage.style.display = 'none';
            document.querySelectorAll('.img-box').forEach(box => {
                box.classList.remove('active');
            });
        }
    });
});
