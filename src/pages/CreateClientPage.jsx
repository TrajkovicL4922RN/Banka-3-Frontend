import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../services/ClientService";
import Sidebar from "../components/Sidebar.jsx";
import "./CreateEmployeePage.css"; 

export default function CreateClientPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phoneNumber: "", address: "", gender: "", dob: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Pretvaramo datum u Unix Timestamp (sekunde) za Backend
      const dobUnix = Math.floor(new Date(form.dob).getTime() / 1000);
      await createClient({ ...form, dateOfBirth: dobUnix });
      setMsg({ type: "success", text: "Klijent kreiran! Email za aktivaciju je poslat." });
      setTimeout(() => navigate("/clients"), 2000);
    } catch (err) {
      setMsg({ type: "error", text: "Greška pri kreiranju klijenta." });
    } finally { setLoading(false); }
  };

  return (
    <div className="page-bg">
      <Sidebar />
      <div className="create-page">
        <div className="create-form-card">
          <h1 className="profile-title">Dodaj klijenta</h1>
          {msg.text && <div className={msg.type === "success" ? "success-msg" : "submit-error"}>{msg.text}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input placeholder="Ime" onChange={e => setForm({...form, firstName: e.target.value})} required className="cp-input"/>
              <input placeholder="Prezime" onChange={e => setForm({...form, lastName: e.target.value})} required className="cp-input"/>
              <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} required className="cp-input"/>
              <input placeholder="Telefon" onChange={e => setForm({...form, phoneNumber: e.target.value})} required className="cp-input"/>
              <input placeholder="Adresa" onChange={e => setForm({...form, address: e.target.value})} required className="cp-input"/>
              <input type="date" onChange={e => setForm({...form, dob: e.target.value})} required className="cp-input"/>
              <select onChange={e => setForm({...form, gender: e.target.value})} required className="cp-input">
                <option value="">Pol</option>
                <option value="M">Muški</option>
                <option value="F">Ženski</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="create-btn create-btn-primary">
              {loading ? "Slanje..." : "Kreiraj i pošalji aktivaciju"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}