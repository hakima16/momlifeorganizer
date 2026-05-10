import React, { useEffect, useState } from "react";
import { getKids, createKid, updateKid, deleteKid } from "../services/kidService";
import Navbar from "../components/Navbar";

const KidsPage = () => {
  const [kids, setKids] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadKids();
  }, []);

  const loadKids = async () => {
    const data = await getKids();
    setKids(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateKid(editingId, form);
      setEditingId(null);
    } else {
      await createKid(form);
    }

    setForm({ name: "", age: "", notes: "" });
    loadKids();
  };

  const handleEdit = (kid) => {
    setEditingId(kid._id);
    setForm({
      name: kid.name,
      age: kid.age,
      notes: kid.notes || ""
    });
  };

  const handleDelete = async (id) => {
    await deleteKid(id);
    loadKids();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", age: "", notes: "" });
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Kids</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
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

          <button type="submit" style={styles.addBtn}>
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
        </form>

        {/* LIST */}
        <div style={styles.list}>
          {kids.map((kid) => (
            <div key={kid._id} style={styles.item}>
              <strong>{kid.name}</strong> — {kid.age} years old
              <br />
              {kid.notes && <em>{kid.notes}</em>}

              <div style={styles.buttons}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEdit(kid)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(kid._id)}
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

export default KidsPage;

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



