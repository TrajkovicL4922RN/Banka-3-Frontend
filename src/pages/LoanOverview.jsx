import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { getLoans } from "../services/LoanService.js";
import "./LoanOverview.css";

export default function LoanOverview() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const loadLoans = async () => {
      try {
        const data = await getLoans();
        if (!cancelled) {
          setLoans(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Greška pri učitavanju kredita.");
          console.error("Error loading loans:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    loadLoans();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <div className="lov-loading">Učitavanje kredita...</div>;
  }

  if (error) {
    return (
      <div className="lov-page">
        <Sidebar />
        <div className="lov-loading" style={{ color: "red" }}>{error}</div>
      </div>
    );
  }

  return (
      <div className="lov-page">
            <Sidebar />

        <h1 className="lov-title">Moji krediti</h1>

        <div className="lov-grid">
          {loans && loans.length > 0 ? (
            loans.map((loan) => (
                <div key={loan.id} className="lov-card">

                  <div className={`lov-status ${loan.status}`}>
                    {loan.status}
                  </div>

                  <div className="lov-amount">
                    {loan.amount.toLocaleString()} €
                  </div>

                  <div className="lov-info">
                    <div>
                      <span>Rok otplate</span>
                      <strong>{loan.repaymentPeriod} meseci</strong>
                    </div>
                    <div>
                      <span>Mesečna rata</span>
                      <strong>{loan.monthlyInstallment} €</strong>
                    </div>
                  </div>

                </div>
            ))
          ) : (
            <p>Nema dostupnih kredita.</p>
          )}
        </div>
      </div>
  );
}