import config from "../config";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../Pages/Home";


const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
    layout: DefaultLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
