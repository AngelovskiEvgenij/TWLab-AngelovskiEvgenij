"use strict";
// API Card
// API Name:         TheMealDB
// Base URL:         https://www.themealdb.com/api/json/v1/1
// Endpoint used:    /search.php?s={query}
// HTTP method:      GET
// Status code seen: 200
// Fields used:      idMeal, strMeal, strCategory, strArea, strMealThumb
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
async function getJSON(url) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return (await response.json());
    }
    finally {
        window.clearTimeout(timer);
    }
}
function setStatus(text) {
    statusEl.textContent = text;
}
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = item.strMealThumb;
    img.alt = item.strMeal;
    img.className = "meal-img";
    const title = document.createElement("h3");
    title.textContent = item.strMeal;
    const detail = document.createElement("p");
    detail.textContent = `${item.strCategory} • ${item.strArea}`;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(detail);
    return card;
}
function render(items) {
    resultsEl.innerHTML = "";
    if (items.length === 0) {
        setStatus("Niciun rezultat nu a fost gasit.");
        return;
    }
    items.forEach((item) => {
        resultsEl.appendChild(createCard(item));
    });
    setStatus(`Incarcate ${items.length} rezultate`);
}
function buildURL(query) {
    const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php";
    return `${BASE_URL}?s=${encodeURIComponent(query)}`;
}
async function search() {
    const query = queryInput.value.trim();
    if (!query) {
        setStatus("Adaugati un cuvant pentru a cauta");
        return;
    }
    searchBtn.disabled = true;
    setStatus("Loading...");
    resultsEl.innerHTML = "";
    try {
        const data = await getJSON(buildURL(query));
        const items = data.meals ?? [];
        render(items);
        localStorage.setItem("lastQuery", query);
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setStatus(`Load failed: ${msg}`);
    }
    finally {
        searchBtn.disabled = false;
    }
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
});
window.addEventListener("DOMContentLoaded", () => {
    const lastQuery = localStorage.getItem("lastQuery");
    if (lastQuery) {
        queryInput.value = lastQuery;
        search();
    }
});
