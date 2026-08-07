const STORAGE_KEY = "diary-entries";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function sortByCreatedAtDesc(entries) {
  return [...entries].sort((a, b) => b.createdAt - a.createdAt);
}

function renderToday() {
  const todayEl = document.getElementById("today");
  todayEl.textContent = formatDate(new Date());
}

function renderEntries(entries) {
  const listEl = document.getElementById("entry-list");
  const sorted = sortByCreatedAtDesc(entries);

  listEl.innerHTML = "";
  for (const entry of sorted) {
    const li = document.createElement("li");
    li.className = "text-sm border-b border-slate-100 pb-2";
    li.innerHTML = `
      <span class="text-slate-400">${entry.date} ${entry.time}</span>
      <span class="block text-slate-800">${entry.text}</span>
    `;
    listEl.appendChild(li);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const inputEl = document.getElementById("entry-input");
  const text = inputEl.value.trim();
  if (!text) return;

  const now = new Date();
  const entry = {
    date: formatDate(now),
    time: formatTime(now),
    text,
    createdAt: now.getTime(),
  };

  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);

  inputEl.value = "";
  renderEntries(entries);
  document.getElementById("entry-list").scrollTop = 0;
}

function init() {
  renderToday();
  renderEntries(loadEntries());
  document.getElementById("entry-form").addEventListener("submit", handleSubmit);
}

init();
