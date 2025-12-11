document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("gridContainer");

    // Fetch data from your Node server
    fetch("/api/banners")
        .then(response => response.json())
        .then(banners => {
            generateGrid(banners);
        })
        .catch(err => console.error("Error loading banners:", err));

    function generateGrid(data) {
        data.forEach((item) => {
            // Create the cell div
            const cell = document.createElement("div");
            
            // SIMPLIFIED: Every item is now just a 'rect'
            cell.className = "cell rect"; 
            
            // Set the Banner ID for the click
            cell.dataset.banner = item.id;

            // Create the image
            const img = document.createElement("img");
            img.src = item.img || "Aesprite_Assets/square.png"; 
            img.alt = item.title;
            img.loading = "lazy";

            // Assemble
            cell.appendChild(img);
            gridContainer.appendChild(cell);

            // Add Click Event
            cell.addEventListener("click", () => {
                window.location.href = `Page2.html?banner=${item.id}`;
            });
        });
    }
});