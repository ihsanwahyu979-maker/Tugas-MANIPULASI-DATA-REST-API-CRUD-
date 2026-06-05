// ── PUT ───────────────────────────────────────────────────────────
async function handleUpdate(id, body) {
  setFormLoading(true);
  try {
    const updated = await apiFetch("PUT", `${API_BASE}/${id}`, body);
    products = products.map(p => p.id === id ? { ...p, ...updated } : p);
    renderProducts();
    cancelEdit();
    showToast("success", "Produk berhasil diperbarui!");
  } catch (err) {
    showError("Gagal update produk: " + err.message);
    showToast("error", err.message);
  } finally {
    setFormLoading(false);
  }
}
