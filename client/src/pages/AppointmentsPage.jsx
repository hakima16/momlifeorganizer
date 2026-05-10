import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  getAppointments,
  createAppointment,
  deleteAppointment,
} from "../services/appointmentService";
import { Link } from "react-router-dom";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Load appointments on page load
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.name || !form.date || !form.time) {
      console.log("❌ Missing required fields");
      return;
    }

    // CREATE new appointment
    await createAppointment(form);

    // Reload list
    loadAppointments();

    // Reset form
    setForm({ name: "", date: "", time: "", notes: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    loadAppointments();
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Appointments</h1>

        {/* FORM */}
        <div style={styles.form}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            style={styles.input}
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

          <button onClick={handleAdd} style={styles.addBtn}>
            Add Appointment
          </button>
        </div>

        {/* LIST */}
        <div style={styles.list}>
          {appointments.map((appt) => (
            <div key={appt._id} style={styles.item}>
              <strong>{appt.name}</strong> — {appt.date} at {appt.time}
              <br />
              <em>{appt.notes}</em>

              <div style={styles.buttons}>
                <Link
                  to={`/appointments/edit/${appt._id}`}
                  style={styles.editBtn}
                >
                  Edit
                </Link>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(appt._id)}
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


