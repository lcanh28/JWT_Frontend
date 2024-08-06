import config from '../config';
import DefaultLayout from '../layout/DefaultLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: DefaultLayout,
    },
    {
        path: config.routes.register,
        component: Home,
        layout: DefaultLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
