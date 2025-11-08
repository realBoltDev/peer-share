import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/layouts/BaseLayout'
import { HomePage } from '@/pages/Home/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <HomePage />}
    ]
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
