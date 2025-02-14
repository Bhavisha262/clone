// App.jsx
import React, { useState, useEffect } from 'react';
import './Settings.scss';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://backl-main.vercel.app//api/settings')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="me-page">
      <section className="account">
        <h2>Account</h2>
        <img src={data.account.profileImage} alt="Profile" />
        <p>Name: {data.account.name}</p>
        <p>Email: {data.account.email}</p>
      </section>
      <section className="manage">
        <h2>Manage</h2>
        <ul>
          <li>{data.manage.settings}</li>
          <li>{data.manage.privacy}</li>
          <li>{data.manage.security}</li>
        </ul>
      </section>
      <section className="auth">
        <h2>Authentication</h2>
        <button onClick={() => alert('Sign In clicked')}>{data.auth.signIn}</button>
        <button onClick={() => alert('Sign Out clicked')}>{data.auth.signOut}</button>
      </section>
    </div>
  );
}

export default App;
