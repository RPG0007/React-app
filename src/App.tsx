import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <header>RSSchool</header>
      <main>
        <Outlet />
      </main>
      <footer>RSSchool</footer>
    </>
  );
}

export default App;
