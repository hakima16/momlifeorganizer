import React, { useEffect, useState } from "react";
import {
  getCleaningTasks,
  createCleaningTask,
  deleteCleaningTask,
} from "../services/cleaningService";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const CleaningPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    task: "",
    frequency: "",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getCleaningTasks();
    setTasks(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCleaningTask(form);
    setForm({ task: "", frequency: "" });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteCleaningTask(id);
    loadTasks();
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Cleaning Tasks</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="task"
            placeholder="Task"
            value={form.task}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="frequency"
            placeholder="Frequency (daily, weekly...)"
            value={form.frequency}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.addBtn}>
            Add Task
          </button>
        </form>

        {/* LIST */}
        <div style={styles.list}>
          {tasks.map((t) => (
            <div key={t._id} style={styles.item}>
              <strong>{t.task}</strong> — {t.frequency}

              <div style={styles.buttons}>
                <Link
                  to={`/cleaning/edit/${t._id}`}
                  style={styles.editBtn}
                >
                  Edit
                </Link>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(t._id)}
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

export default CleaningPage;

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
    background: "#ff4f9a",   // pink like delete
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "14px",
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

