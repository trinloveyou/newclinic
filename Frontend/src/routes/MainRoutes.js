import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Editpassword from 'layout/MainLayout/Header/HeaderContent/Profile/Editpassword';
import Viewprofile from 'layout/MainLayout/Header/HeaderContent/Profile/Viewprofile';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const Historybooking = Loadable(lazy(() => import('pages/components-overview/Historybooking')));
const Booking = Loadable(lazy(() => import('pages/components-overview/Booking')));
// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Editprofile = Loadable(lazy(() => import('layout/MainLayout/Header/HeaderContent/Profile/Editprofile.js')));
const Dashboarduser = Loadable(lazy(() => import('pages/dashboard/indexuser.js')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'edit_profile',
      element: <Editprofile />
    },
    {
      path: 'edit_password',
      element: <Editpassword />
    },
    {
      path: '/view_profile',
      element: <Viewprofile />
    },
    {
      path: '/indexuser',
      element: <Dashboarduser />
    },
    {
      path: '/Historybooking',
      element: <Historybooking />
    },
    {
      path: '/Booking',
      element: <Booking />
    }
  ]
};

export default MainRoutes;
