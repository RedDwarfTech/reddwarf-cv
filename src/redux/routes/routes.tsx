import { createBrowserRouter } from "react-router-dom";
import App from "@/page/home/App";
import Exp from "@/page/exp/Exp";
import Template from "@/page/template/Template";
import CV from "@/page/cv/gen/CvGen";
import CvList from "@/page/cv/list/CvList";
import Login from "@/page/user/login/Login";
import Reg from "@/page/user/reg/Reg";
import CvGen from "@/page/cv/gen/CvGen";
import AppGoods from "@/page/goods/AppGoods";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/exp",
        element: <Exp />
    },
    {
        path: "/user/login",
        element: <Login />
    },
    {
        path: "/user/reg",
        element: <Reg />
    },
    {
        path: "/template",
        element: <Template />
    },
    {
        path: "/cvlist",
        element: <CV />
    },
    {
        path: "/user/cv/list",
        element: <CvList />
    },
    {
        path: "/user/cv/gen/list",
        element: <CvGen />
    },
    {
        path: "/goods",
        element: <AppGoods />
    },
]);

export default routes;

