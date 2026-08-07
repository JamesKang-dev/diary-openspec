const STORAGE_KEY = "diary-entries";

let editingId = null;

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
    if (!Array.isArray(parsed)) return [];
    return parsed.map((entry, index) => ({
      ...entry,
      id: entry.id ?? `legacy-${index}`,
    }));
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
    li.dataset.id = entry.id;

    if (entry.id === editingId) {
      const meta = document.createElement("span");
      meta.className = "text-slate-400";
      meta.textContent = `${entry.date} ${entry.time}`;

      const editRow = document.createElement("div");
      editRow.className = "flex gap-2 mt-1";

      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = entry.text;
      editInput.className =
        "flex-1 border border-slate-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";
      editInput.dataset.role = "edit-input";

      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.textContent = "저장";
      saveBtn.className = "text-xs bg-slate-800 text-white rounded px-2 py-1 hover:bg-slate-700";
      saveBtn.addEventListener("click", () => handleEditSave(entry.id, editInput.value));

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.textContent = "취소";
      cancelBtn.className = "text-xs bg-slate-200 text-slate-700 rounded px-2 py-1 hover:bg-slate-300";
      cancelBtn.addEventListener("click", () => handleEditCancel());

      editRow.append(editInput, saveBtn, cancelBtn);
      li.append(meta, editRow);
    } else {
      const meta = document.createElement("span");
      meta.className = "text-slate-400";
      meta.textContent = `작성: ${entry.date} ${entry.time}`;

      const updatedMeta = document.createElement("span");
      updatedMeta.className = "block text-slate-400 text-xs";
      updatedMeta.textContent = entry.updatedAt
        ? `최종 수정: ${formatDate(new Date(entry.updatedAt))} ${formatTime(new Date(entry.updatedAt))}`
        : "수정한 내역이 없습니다.";

      const textRow = document.createElement("div");
      textRow.className = "flex items-start justify-between gap-2";

      const textSpan = document.createElement("span");
      textSpan.className = "text-slate-800";
      textSpan.textContent = entry.text;

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "수정";
      editBtn.className = "text-xs text-slate-500 hover:text-slate-800 shrink-0";
      editBtn.addEventListener("click", () => handleEditStart(entry.id));

      textRow.append(textSpan, editBtn);
      li.append(meta, updatedMeta, textRow);
    }

    listEl.appendChild(li);
  }
}

function handleEditStart(id) {
  editingId = id;
  renderEntries(loadEntries());
}

function handleEditCancel() {
  editingId = null;
  renderEntries(loadEntries());
}

function handleEditSave(id, newText) {
  const text = newText.trim();
  if (!text) return;

  const entries = loadEntries();
  const target = entries.find((entry) => entry.id === id);
  if (!target) return;

  if (text !== target.text.trim()) {
    target.updatedAt = Date.now();
  }
  target.text = text;
  saveEntries(entries);

  editingId = null;
  renderEntries(entries);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputEl = document.getElementById("entry-input");
  const text = inputEl.value.trim();
  if (!text) return;

  const now = new Date();
  const entry = {
    id: crypto.randomUUID(),
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
