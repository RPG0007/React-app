import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import MainPage from '../pages/MainPage/MainPage';
import Error404 from '../pages/Error404/Error404';

window.onpopstate = () => {
  history.go(0);
};

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </ErrorBoundary>
  );
}
