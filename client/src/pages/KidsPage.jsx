<div style={styles.form}>
  <input
    name="name"
    placeholder="Name"
    value={form.name}
    onChange={handleChange}
    style={styles.input}
    required
  />
  <input
    name="age"
    placeholder="Age"
    value={form.age}
    onChange={handleChange}
    style={styles.input}
    required
  />
  <input
    name="notes"
    placeholder="Notes"
    value={form.notes}
    onChange={handleChange}
    style={styles.input}
  />

  <button type="button" onClick={handleSubmit} style={styles.addBtn}>
    {editingId ? "Update Kid" : "Add Kid"}
  </button>

  {editingId && (
    <button
      type="button"
      onClick={handleCancel}
      style={styles.cancelBtn}
    >
      Cancel
    </button>
  )}
</div>




