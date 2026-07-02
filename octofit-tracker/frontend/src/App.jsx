import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="text-muted">
          Configure VITE_CODESPACE_NAME in .env.local to target the Codespaces API URL.
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/users">Users</Link>
        <Link className="nav-link" to="/teams">Teams</Link>
        <Link className="nav-link" to="/activities">Activities</Link>
        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        <Link className="nav-link" to="/workouts">Workouts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div className="card p-3"><h2>Welcome</h2><p>Explore the multi-tier OctoFit experience.</p></div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
