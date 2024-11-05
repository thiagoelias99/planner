import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth-layout';
import HomePage from './pages/home/home.page';
import TasksPage from './pages/tasks/tasks.page';
import NotFoundPage from './pages/not-found/not-found.page';
import TasksProvider from './providers/tasks-provider';
import TaskGroupDetailsPage from './pages/tasks/group-details.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' replace={true} />
      },
      {
        path: '/dashboard',
        element: <HomePage />
      },
      {
        path: '/tasks',
        element:
          <TasksProvider>
            <TasksPage />
          </TasksProvider>,
      },
      {
        path: '/tasks/groups/:groupId',
        element: <TaskGroupDetailsPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;