// ── GET — load initial ─────────────────────────────────────────────
async function loadProducts() {
  try {
    const data = await apiFetch("GET", `${API_BASE}?limit=12`);
    products = data.products || [];
    $("loading-state").style.display = "none";
    renderProducts();
  } catch (err) {
    $("loading-state").style.display = "none";
    showError("Gagal memuat produk: " + err.message);
  }
}
