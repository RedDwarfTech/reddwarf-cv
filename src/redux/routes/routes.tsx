import { createBrowserRouter } from "react-router-dom";
import App from "@/page/home/App";
import Exp from "@/page/exp/Exp";
import Template from "@/page/template/Template";
import CV from "@/page/cv/gen/CvGen";
import CvList from "@/page/cv/list/CvList";

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
]);

export default routes;

