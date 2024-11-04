import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/auth-layout';
import HomePage from './pages/home/home.page';
import TasksPage from './pages/tasks/tasks.page';
import NotFoundPage from './pages/not-found/not-found.page';
import TasksProvider from './providers/tasks-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/tasks',
        element:
          <TasksProvider>
            <TasksPage />
          </TasksProvider>
      },
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;