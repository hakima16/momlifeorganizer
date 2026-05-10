import React, { useEffect, useState } from "react";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../services/activityService";

import Navbar from "../components/Navbar";

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    day: "",
    time: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateActivity(editingId, form);
      setEditingId(null);
    } else {
      await createActivity(form);
    }

    setForm({ title: "", day: "", time: "", notes: "" });
    loadActivities();
  };

  const handleEdit = (activity) => {
    setEditingId(activity._id);
    setForm({
      title: activity.title,
      day: activity.day,
      time: activity.time || "",
      notes: activity.notes || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
    loadActivities();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", day: "", time: "", notes: "" });
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Activities</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="day"
            type="date"
            value={form.day}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="time"
            type="time"
            value={form.time}
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
            {editingId ? "Update Activity" : "Add Activity"}
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
          {activities.map((a) => (
            <div key={a._id} style={styles.item}>
              <strong>{a.title}</strong> — {a.day} {a.time && `at ${a.time}`}
              <br />
              {a.notes && <em>{a.notes}</em>}

              <div style={styles.buttons}>
                <button style={styles.editBtn} onClick={() => handleEdit(a)}>
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(a._id)}
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
}

export default ActivitiesPage;

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



