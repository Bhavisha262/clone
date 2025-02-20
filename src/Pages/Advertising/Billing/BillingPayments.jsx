import React from "react";
import { useNavigate } from "react-router-dom";
import "./BillingPayments.scss";

const BillingPayments = () => {
  const navigate = useNavigate();

  return (
    <div className="billing-payments-page">
      <header className="billing-payments-header">
        <div className="header-content">
          <h1>Billing & Payments</h1>
          <p>Manage your payment methods, review invoices, and track spending.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <main className="billing-payments-content">
        <section className="section">
          <h2>Payment Methods</h2>
          <p>
            Update and securely manage your payment information, including credit cards and bank accounts.
          </p>
        </section>

        <section className="section">
          <h2>Invoices</h2>
          <p>
            View, download, or email your invoices for all your billing cycles.
          </p>
        </section>

        <section className="section">
          <h2>Spending Overview</h2>
          <p>
            Monitor your advertising spend with detailed reports and insights.
          </p>
        </section>

        <section className="section">
          <h2>Need Assistance?</h2>
          <p>
            For billing-related questions or issues, contact our support team.
          </p>
          <button
            className="billing-support-btn"
            onClick={() => navigate("/help")}
          >
            Contact Billing Support
          </button>
        </section>
      </main>
    </div>
  );
};

export default BillingPayments;
