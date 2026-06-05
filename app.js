"use strict";

const API_BASE = "https://dummyjson.com/products";

// ── State ────────────────────────────────────────────────────────────
let products    = [];
let editingId   = null;
let toastTimer  = null;

// ── Helpers ──────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

function showToast(type, msg) {
  const el = $("toast");
  el.className = `toast toast-${type}`;
  el.innerHTML = (type === "success" ? "✅ " : "❌ ") + msg;
  el.style.display = "flex";
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = "none"; }, 3200);
}

function showError(msg) {
  $("error-text").textContent = msg;
  $("error-banner").classList.add("visible");
}
function closeError() { $("error-banner").classList.remove("visible"); }

function updateStats() {
  const n = products.length;
  const avg = n ? (products.reduce((s, p) => s + (p.price || 0), 0) / n).toFixed(2) : "0.00";
  const max = n ? Math.max(...products.map(p => p.price || 0)).toFixed(2) : "0.00";
  $("stat-count").textContent = n;
  $("stat-avg").textContent   = "$" + avg;
  $("stat-max").textContent   = "$" + max;
  $("count-badge").textContent = n + " produk";
}

function addLog(method, endpoint, status, ms) {
  const colors = { GET:"#3b82f6", POST:"#22c55e", PUT:"#f59e0b", DELETE:"#ef4444" };
  const isOk = status >= 200 && status < 300;
  const list = $("log-list");
  const el = document.createElement("div");
  el.className = "log-entry";
  el.innerHTML = `
    <span class="log-method" style="color:${colors[method]||"#94a3b8"}">${method}</span>
    <span class="log-url">${endpoint}</span>
    <span class="${isOk ? "log-status-ok" : "log-status-err"}">${status}</span>
    <span class="log-ms">${ms}ms</span>
  `;
  list.prepend(el);
  $("log-section").classList.remove("hidden");
}

// ── Core fetch wrapper ─────────────────────────────────────────────
async function apiFetch(method, url, body = null) {
  const t0 = performance.now();
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const ms  = Math.round(performance.now() - t0);
  addLog(method, url.replace("https://dummyjson.com", ""), res.status, ms);

  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  return res.json();
}

// ── Render ────────────────────────────────────────────────────────
function renderProducts() {
  const grid  = $("product-grid");
  const empty = $("empty-state");
  grid.innerHTML = "";

  if (products.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.id = `card-${p.id}`;

    const imgHtml = p.thumbnail
      ? `<img src="${p.thumbnail}" alt="${escHtml(p.title)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="card-initial" style="display:none">${(p.title||"P").charAt(0).toUpperCase()}</div>`
      : `<div class="card-initial">${(p.title||"P").charAt(0).toUpperCase()}</div>`;

    card.innerHTML = `
      <div class="card-image">
        ${imgHtml}
        <div class="card-image-overlay"></div>
        ${p.brand    ? `<span class="badge badge-brand">${escHtml(p.brand)}</span>` : ""}
        ${p.rating   ? `<span class="badge badge-rating">★ ${p.rating}</span>` : ""}
        ${p.category ? `<span class="badge badge-category">${escHtml(p.category)}</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-title">${escHtml(p.title)}</div>
        ${p.description ? `<div class="card-desc">${escHtml(p.description)}</div>` : ""}
        <div class="card-footer">
          <div>
            <div class="card-price-label">Harga</div>
            <div class="card-price-value">$${(p.price||0).toFixed(2)}</div>
          </div>
          <div class="card-actions">
            <button class="btn-icon btn-edit" title="Edit produk" onclick="startEdit(${p.id})">✎</button>
            <button class="btn-icon btn-del"  title="Hapus produk" id="del-${p.id}" onclick="handleDelete(${p.id})">✕</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  updateStats();
}

function escHtml(str) {
  return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ── Form helpers ──────────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const title = $("input-title").value.trim();
  const price = parseFloat($("input-price").value);
  const desc  = $("input-desc").value.trim();
  if (!title || isNaN(price)) return;

  const id = $("editing-id").value;
  const body = { title, price, description: desc };
  if (id) {
    handleUpdate(parseInt(id), body);
  } else {
    handleAdd(body);
  }
}

function startEdit(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;

  $("editing-id").value  = id;
  $("input-title").value = p.title || "";
  $("input-price").value = p.price || "";
  $("input-desc").value  = p.description || "";

  // Switch form appearance to EDIT mode
  $("form-avatar").className    = "form-avatar edit";
  $("form-avatar").textContent  = "✎";
  $("form-title").textContent   = "Edit Produk";
  $("form-sub").textContent     = "Mengedit: " + p.title;
  $("form-method-pill").className = "pill pill-put";
  $("form-method-pill").textContent = "PUT";
  $("btn-submit-text").textContent  = "Simpan Perubahan";
  $("btn-submit").className = "btn btn-amber";
  $("btn-cancel-edit").style.display  = "inline-flex";
  $("btn-cancel-edit2").style.display = "inline-flex";

  $("form-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelEdit() {
  editingId = null;
  resetForm();
}

function resetForm() {
  $("product-form").reset();
  $("editing-id").value = "";

  $("form-avatar").className    = "form-avatar add";
  $("form-avatar").textContent  = "+";
  $("form-title").textContent   = "Tambah Produk";
  $("form-sub").textContent     = "Isi form lalu kirim ke API";
  $("form-method-pill").className = "pill pill-post";
  $("form-method-pill").textContent = "POST";
  $("btn-submit-text").textContent  = "Tambah Produk";
  $("btn-submit").className = "btn btn-primary";
  $("btn-cancel-edit").style.display  = "none";
  $("btn-cancel-edit2").style.display = "none";
}

function setFormLoading(on) {
  $("btn-submit").disabled = on;
  $("submit-spinner").className = "spinner" + (on ? " visible" : "");
}

// ── Boot ──────────────────────────────────────────────────────────
// Karena dipisah filenya, loadProducts dipanggil setelah semua file ter-load
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
