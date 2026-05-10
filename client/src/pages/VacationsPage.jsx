import React, { useEffect, useState } from "react";
import {
  getVacations,
  createVacation,
  deleteVacation
} from "../services/vacationsService";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const VacationsPage = () => {
  const [vacations, setVacations] = useState([]);
  const [form, setForm] = useState({
    destination: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
    loadVacations();
  }, []);

  const loadVacations = async () => {
    const data = await getVacations();
    setVacations(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVacation(form);
    setForm({ destination: "", date: "", notes: "" });
    loadVacations();
  };

  const handleDelete = async (id) => {
    await deleteVacation(id);
    loadVacations();
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Vacations</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="date"
            type="date"
            value={form.date}
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
            Add Vacation
          </button>
        </form>

        {/* LIST */}
        <div style={styles.list}>
          {vacations.map((v) => (
            <div key={v._id} style={styles.item}>
              <strong>{v.destination}</strong> — {v.date}
              <br />
              {v.notes && <em>{v.notes}</em>}

              <div style={styles.buttons}>
                <Link
                  to={`/vacations/edit/${v._id}`}
                  style={styles.editBtn}
                >
                  Edit
                </Link>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(v._id)}
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

export default VacationsPage;

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
