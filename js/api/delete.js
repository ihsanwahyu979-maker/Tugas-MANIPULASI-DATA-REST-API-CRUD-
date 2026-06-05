// ── DELETE ────────────────────────────────────────────────────────
async function handleDelete(id) {
  const delBtn = $("del-" + id);
  if (delBtn) { 
    delBtn.disabled = true; 
    delBtn.innerHTML = `<div class="spinner visible" style="border-color:rgba(239,68,68,.3);border-top-color:#ef4444"></div>`; 
  }

  try {
    const data = await apiFetch("DELETE", `${API_BASE}/${id}`);
    if (data.isDeleted) {
      const card = $("card-" + id);
      if (card) {
        card.classList.add("removing");
        setTimeout(() => {
          products = products.filter(p => p.id !== id);
          renderProducts();
        }, 260);
      }
      showToast("success", "Produk berhasil dihapus.");
    }
  } catch (err) {
    showError("Gagal hapus produk: " + err.message);
    showToast("error", err.message);
    if (delBtn) { 
      delBtn.disabled = false; 
      delBtn.innerHTML = "✕"; 
    }
  }
}
