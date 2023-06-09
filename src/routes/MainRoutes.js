import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - main
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const ReleasePage = Loadable(lazy(() => import('pages/moneycenter/ReleasePage')));
const HistoryPage = Loadable(lazy(() => import('pages/moneycenter/HistoryPage')));
const LikesPage = Loadable(lazy(() => import('pages/moneycenter/LikesPage')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Page404 = Loadable(lazy(() => import('pages/components-overview/Page404')));


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
            path: 'release',
            element: <ReleasePage />
        },
        {
            path: 'history',
            element: <HistoryPage />         
        },
        {
            path: 'likes',
            element: <LikesPage />         
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
            path: '404',
            element: <Page404 />
        }
    ]
};

export default MainRoutes;
