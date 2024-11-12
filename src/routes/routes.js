import config from '../config';
import DefaultLayout from '../layout/DefaultLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register/Register';
import User from '../Pages/ManageUsers';

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
        component: Register,
        layout: DefaultLayout,
    },
    {
        path: config.routes.user,
        component: User,
        layout: DefaultLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
