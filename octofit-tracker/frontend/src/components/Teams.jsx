import { useEffect, useState } from 'react';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiBaseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item._id || item.id}>
            <strong>{item.name}</strong> — {item.goal}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
