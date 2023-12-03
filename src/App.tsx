import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <main className="mainBlock">
        <Outlet />
      </main>
      <footer>
        <Link to="https://rs.school/">
          <img src="RSS_React_logo.png" alt="logo" width={'200px'} />
        </Link>
      </footer>
    </>
  );
}

export default App;
