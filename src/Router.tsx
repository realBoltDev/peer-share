import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/layouts/BaseLayout'
import { HomePage } from '@/pages/Home/Home.page';
import { ConnectPage } from '@/pages/Connect/Connect.page';
import { AboutPage } from '@/pages/About/About.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <HomePage />},
      { path: 'connect', element: <ConnectPage /> },
      { path: 'about', element: <AboutPage /> }
    ]
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
