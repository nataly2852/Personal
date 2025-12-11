import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // serve Page1, Page2, Assets, CSS, JS

const notionSecret = process.env.NOTION_SECRET;
const databaseId = process.env.NOTION_DB;

let cachedBanners = []; // store banners in memory

// Function to fetch banners from Notion and update cache
async function fetchBanners() {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${notionSecret}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [
          {
            property: "Banner ID",
            direction: "ascending"  // or "descending"
          }
        ]
      })
    });

    const result = await response.json();

    // Convert Notion’s format → clean format for frontend
    cachedBanners = result.results.map(page => ({
      id: page.properties["Banner ID"]?.number,
      title: page.properties["Title"]?.title?.[0]?.plain_text || "",
      description: page.properties["Description"]?.rich_text?.[0]?.plain_text || "",

      // 👇 FIX: Add ?. before [0] to check if the first element exists
      img: page.properties["IMG URL"]?.rich_text?.[0]?.plain_text || "",
      extraImg: page.properties["Extra IMG"]?.rich_text?.[0]?.plain_text || "",

      // Note: The Link property is correctly using the dedicated URL property:
      link: page.properties["Link"]?.url || "",
    }));

    console.log("Banners updated from Notion!");

  } catch (error) {
    console.error("Error fetching banners:", error);
  }
}

// Fetch banners immediately on server start
fetchBanners();

// Refresh every hour (3600000 ms)
setInterval(fetchBanners, 3600000);

// API route serves cached banners
app.get("/api/banners", (req, res) => {
  res.json(cachedBanners);
});
// Add this route handler to serve Page1.html for the root path (/)
app.get("/", (req, res) => {
  res.sendFile("Page1.html", { root: "public" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
