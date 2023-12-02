import App from '../App';
import HookForm from '../pages/HookForm';
import UncontrolledForm from '../pages/UncontrolledForm';
import MainPage from '../pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'uncontrolledForm',
        element: <UncontrolledForm />,
      },
      {
        path: 'hookForm',
        element: <HookForm />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/RSSchool-react-course',
});
export default router;
