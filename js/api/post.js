// ── POST ──────────────────────────────────────────────────────────
async function handleAdd(body) {
  setFormLoading(true);
  try {
    const prod = await apiFetch("POST", `${API_BASE}/add`, body);
    products.unshift(prod);
    renderProducts();
    resetForm();
    showToast("success", `Produk "${prod.title}" berhasil ditambahkan!`);
  } catch (err) {
    showError("Gagal menambah produk: " + err.message);
    showToast("error", err.message);
  } finally {
    setFormLoading(false);
  }
}
