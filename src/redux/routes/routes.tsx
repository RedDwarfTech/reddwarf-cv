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
import Profile from "@/page/user/panel/profile/Profile";
import { PaySuccess } from "rd-component";
import "rd-component/dist/style.css";
import About from "@/page/about/About";
import CvSetting from "@/page/cv/setting/CvSetting";
import ResetPwd from "@/page/user/pwd/ResetPwd";

const routes = createBrowserRouter([
    {
        path: "/product/pay/success",
        element: <PaySuccess />
    },
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
    {
        path: "/user/profile",
        element: <Profile />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/setting-cv",
        element: <CvSetting />
    },
    {
        path: "/user/pwd/reset",
        element: <ResetPwd />
    }
]);

export default routes;

