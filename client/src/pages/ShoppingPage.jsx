import React, { useEffect, useState } from "react";
import {
  getShoppingItems,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
} from "../services/shoppingService";

import Navbar from "../components/Navbar";

const ShoppingPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getShoppingItems();
    setItems(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateShoppingItem(editingId, form);
      setEditingId(null);
    } else {
      await createShoppingItem(form);
    }

    setForm({ item: "", quantity: "", notes: "" });
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      item: item.item,
      quantity: item.quantity || "",
      notes: item.notes || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ item: "", quantity: "", notes: "" });
  };

  const handleDelete = async (id) => {
    await deleteShoppingItem(id);
    loadItems();
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Shopping List</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="item"
            placeholder="Item"
            value={form.item}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.addBtn}>
            {editingId ? "Update Item" : "Add Item"}
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
        </form>

        {/* LIST */}
        <div style={styles.list}>
          {items.map((i) => (
            <div key={i._id} style={styles.item}>
              <strong>{i.item}</strong> — {i.quantity}
              <br />
              {i.notes && <em>{i.notes}</em>}

              <div style={styles.buttons}>
                <button style={styles.editBtn} onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(i._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShoppingPage;

const styles = {
  container: {
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
  },
  title: {
    color: "#ff4f9a",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    background: "#ff4f9a",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelBtn: {
    background: "#ccc",
    color: "black",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "5px",
  },
  list: {
    marginTop: "20px",
  },
  item: {
    background: "#ffe6f2",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    background: "#ffb6d9",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ff4f9a",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

